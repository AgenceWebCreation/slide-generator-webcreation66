const express = require('express');
const puppeteer = require('puppeteer');
const { templateExpert, templateRealisation, templateChiffre, templateLocal, templateCTA } = require('./templates');

const app = express();

// ── CORS — autoriser les requêtes depuis file:// et tout domaine ────
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

app.use(express.json({ limit: '2mb' }));

// ── Lancer le browser une seule fois au démarrage ───────────────────
let browser;
(async () => {
  browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage', '--disable-gpu', '--no-first-run', '--no-zygote', '--single-process']
  });
  console.log('🚀 Puppeteer ready');
})();

// ── Fonction centrale : HTML → PNG ──────────────────────────────────
async function htmlToPng(html, width, height) {
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 2 }); // x2 pour la qualité
  await page.setContent(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>*{margin:0;padding:0;box-sizing:border-box}body{overflow:hidden}</style></head><body>${html}</body></html>`, { waitUntil: 'networkidle0' });
  const buffer = await page.screenshot({ type: 'png', clip: { x: 0, y: 0, width, height } });
  await page.close();
  return buffer;
}

// ── Sélectionner le template ─────────────────────────────────────────
function getTemplate(template, params) {
  switch (template) {
    case 'expert':       return templateExpert(params);
    case 'realisation':  return templateRealisation(params);
    case 'chiffre':      return templateChiffre(params);
    case 'local':        return templateLocal(params);
    case 'cta':          return templateCTA(params);
    default:             return templateExpert(params);
  }
}

// ─────────────────────────────────────────────────────────────────────
// POST /generate-slide
// Génère UN slide et retourne PNG (base64 ou buffer)
// Body: { template, size, slide_type, title, subtitle, content, ... }
// ─────────────────────────────────────────────────────────────────────
app.post('/generate-slide', async (req, res) => {
  try {
    const params = { size: 'square', ...req.body };
    const w = params.size === 'wide' ? 1200 : 1080;
    const h = params.size === 'wide' ? 627 : 1080;
    const html = getTemplate(params.template || 'expert', params);
    const png = await htmlToPng(html, w, h);

    const format = req.query.format || 'base64';
    if (format === 'buffer') {
      res.set('Content-Type', 'image/png');
      return res.send(png);
    }
    res.json({ success: true, image: png.toString('base64'), width: w, height: h });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────
// POST /generate-carousel
// Génère un carrousel complet (tableau de slides)
// Body: { template, size, slides: [ { slide_type, title, content, ... }, ... ] }
// Retourne: { images: [ "base64...", ... ] }
// ─────────────────────────────────────────────────────────────────────
app.post('/generate-carousel', async (req, res) => {
  try {
    const { template = 'expert', size = 'square', slides = [] } = req.body;
    const w = size === 'wide' ? 1200 : 1080;
    const h = size === 'wide' ? 627 : 1080;

    const images = [];
    for (const slide of slides) {
      const html = getTemplate(template, { ...slide, size });
      const png = await htmlToPng(html, w, h);
      images.push(png.toString('base64'));
    }

    res.json({ success: true, images, count: images.length, width: w, height: h });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────
// POST /generate-ai-carousel
// Génère le texte avec Groq (gratuit) + les slides visuels
// Body: { topic, pillar, network, groq_api_key }
// ─────────────────────────────────────────────────────────────────────
app.post('/generate-ai-carousel', async (req, res) => {
  try {
    const { topic, pillar = 'expert', network = 'instagram', groq_api_key } = req.body;

    if (!groq_api_key) {
      return res.status(400).json({ success: false, error: 'groq_api_key manquant' });
    }

    const templateName = pillar === 'local' ? 'local' : pillar === 'realisation' ? 'realisation' : 'expert';

    // 1. Générer le contenu avec Groq (API OpenAI-compatible, gratuit)
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${groq_api_key}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 1200,
        temperature: 0.7,
        messages: [{
          role: 'system',
          content: 'Tu es expert en marketing digital pour une agence web freelance (WebCréation66, Perpignan). Tu réponds UNIQUEMENT avec du JSON valide, sans texte avant ni après, sans markdown, sans balises ```.'
        }, {
          role: 'user',
          content: `Génère un carrousel de 5 slides sur ce sujet : "${topic}"
Pilier : ${pillar} (expert=conseils pro, realisation=avant/après projet, local=ancrage Perpignan/66)

Réponds UNIQUEMENT avec ce JSON exact :
{
  "template": "${templateName}",
  "caption": "texte du post réseaux sociaux avec hashtags (max 300 caractères)",
  "slides": [
    { "slide_type": "cover", "title": "titre accrocheur court", "subtitle": "sous-titre", "tag": "label court" },
    { "slide_type": "content", "number": "1", "title": "titre slide 2", "content": ["point A", "point B", "point C"] },
    { "slide_type": "content", "number": "2", "title": "titre slide 3", "content": ["point A", "point B", "point C"] },
    { "slide_type": "content", "number": "3", "title": "titre slide 4", "content": ["point A", "point B"] },
    { "slide_type": "cta", "title": "Votre ${topic} mérite mieux", "cta_text": "Audit gratuit → webcreation66@gmail.com", "benefit1": "Devis sous 24h", "benefit2": "16 ans d'expérience", "benefit3": "100% sur mesure" }
  ]
}`
        }]
      })
    });

    if (!groqRes.ok) {
      const err = await groqRes.text();
      throw new Error(`Groq API error ${groqRes.status}: ${err}`);
    }

    const groqData = await groqRes.json();
    let rawText = groqData.choices[0].message.content.trim();
    // Nettoyer les éventuels blocs markdown
    rawText = rawText.replace(/^```json\s*/i, '').replace(/^```\s*/i, '').replace(/```\s*$/i, '').trim();
    const carousel = JSON.parse(rawText);

    // 2. Générer les images
    const size = network === 'linkedin' ? 'wide' : 'square';
    const w = size === 'wide' ? 1200 : 1080;
    const h = size === 'wide' ? 627 : 1080;

    const images = [];
    for (const slide of carousel.slides) {
      // Slide CTA utilise toujours le template CTA
      const tmpl = slide.slide_type === 'cta' ? 'cta' : carousel.template;
      const html = getTemplate(tmpl, { ...slide, size });
      const png = await htmlToPng(html, w, h);
      images.push(png.toString('base64'));
    }

    res.json({
      success: true,
      template: carousel.template,
      caption: carousel.caption,
      images,
      count: images.length,
      width: w,
      height: h
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// ── Health check ─────────────────────────────────────────────────────
app.get('/health', (req, res) => res.json({ status: 'ok', service: 'slide-generator', brand: 'WebCréation66' }));

// ── Preview HTML (pour tester sans générer PNG) ──────────────────────
app.get('/preview', (req, res) => {
  const params = {
    template: req.query.template || 'expert',
    slide_type: req.query.slide_type || 'cover',
    size: req.query.size || 'square',
    title: req.query.title || 'Votre site web vous fait perdre des clients',
    subtitle: req.query.subtitle || 'Découvrez les 5 signes qui ne trompent pas',
    tag: req.query.tag || 'EXPERTISE WEB'
  };
  const html = getTemplate(params.template, params);
  const w = params.size === 'wide' ? 1200 : 1080;
  const h = params.size === 'wide' ? 627 : 1080;
  res.send(`<!DOCTYPE html><html><head><meta charset="UTF-8"><style>body{background:#f0f0f0;display:flex;align-items:center;justify-content:center;min-height:100vh;margin:0}div.wrap{transform:scale(0.5);transform-origin:top center}</style></head><body><div class="wrap">${html}</div></body></html>`);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Slide Generator running on port ${PORT}`));

process.on('SIGTERM', async () => { if (browser) await browser.close(); process.exit(0); });
