// ============================================================
// TEMPLATES SLIDES PREMIUM — WebCréation66
// 5 styles : expert, realisation, chiffre, local, cta
// Format carré 1080×1080 (IG/FB) ou wide 1200×627 (LinkedIn)
// ============================================================

const BRAND = {
  name: "WebCréation66",
  tagline: "Création de sites web · Perpignan",
  url: "agence-webcreation.fr",
  colors: {
    primary: "#1a1a2e",
    accent: "#e94560",
    gold: "#f5a623",
    white: "#ffffff",
    light: "#f5f5f7"
  }
};

// Encodage SVG du logo W (inline, pas de fichier externe)
const LOGO_SVG = `<svg width="36" height="36" viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="18" r="18" fill="white" fill-opacity="0.2"/><text x="18" y="24" font-family="Arial Black, sans-serif" font-size="18" font-weight="900" fill="white" text-anchor="middle">W</text></svg>`;
const LOGO_B64 = `data:image/svg+xml;base64,${Buffer.from(LOGO_SVG).toString('base64')}`;

function brandBar(bgDark = true) {
  const textColor = bgDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)';
  return `
    <div style="display:flex;align-items:center;gap:10px;margin-top:auto;padding-top:20px;border-top:1px solid rgba(255,255,255,0.15)">
      <img src="${LOGO_B64}" style="width:28px;height:28px;border-radius:50%"/>
      <div>
        <div style="color:${bgDark ? 'white' : '#1a1a2e'};font-size:13px;font-weight:700;line-height:1">${BRAND.name}</div>
        <div style="color:${textColor};font-size:11px;margin-top:2px">${BRAND.url}</div>
      </div>
    </div>`;
}

// ── TEMPLATE 1 : EXPERT (fond sombre, gradient bleu/violet) ──────────────
function templateExpert({ slide_type, title, subtitle, content, number, tag, size }) {
  const w = size === 'wide' ? 1200 : 1080;
  const h = size === 'wide' ? 627 : 1080;

  if (slide_type === 'cover') {
    return `
    <div style="width:${w}px;height:${h}px;background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%);display:flex;flex-direction:column;justify-content:space-between;padding:60px;font-family:'Segoe UI',Arial,sans-serif;box-sizing:border-box;position:relative;overflow:hidden">
      <div style="position:absolute;top:-100px;right:-100px;width:400px;height:400px;background:radial-gradient(circle,rgba(233,69,96,0.3) 0%,transparent 70%);border-radius:50%"></div>
      <div style="position:absolute;bottom:-80px;left:-80px;width:300px;height:300px;background:radial-gradient(circle,rgba(99,102,241,0.2) 0%,transparent 70%);border-radius:50%"></div>

      ${tag ? `<div style="background:#e94560;color:white;font-size:13px;font-weight:800;padding:8px 18px;border-radius:20px;width:fit-content;text-transform:uppercase;letter-spacing:1px">${tag}</div>` : '<div></div>'}

      <div>
        <div style="color:white;font-size:${size === 'wide' ? '44px' : '54px'};font-weight:900;line-height:1.1;margin-bottom:20px">${title}</div>
        ${subtitle ? `<div style="color:rgba(255,255,255,0.7);font-size:${size === 'wide' ? '20px' : '24px'};line-height:1.4">${subtitle}</div>` : ''}
      </div>

      ${brandBar(true)}
    </div>`;
  }

  if (slide_type === 'content') {
    const items = Array.isArray(content) ? content : [content];
    return `
    <div style="width:${w}px;height:${h}px;background:linear-gradient(160deg,#1a1a2e 0%,#16213e 100%);display:flex;flex-direction:column;padding:60px;font-family:'Segoe UI',Arial,sans-serif;box-sizing:border-box">
      ${number ? `<div style="font-size:80px;font-weight:900;color:#e94560;line-height:1;margin-bottom:10px">${number}</div>` : ''}
      <div style="color:white;font-size:${size === 'wide' ? '32px' : '38px'};font-weight:800;line-height:1.2;margin-bottom:30px">${title}</div>
      <div style="flex:1;display:flex;flex-direction:column;gap:16px">
        ${items.map(item => `
          <div style="display:flex;gap:14px;align-items:flex-start">
            <div style="width:8px;height:8px;background:#e94560;border-radius:50%;margin-top:10px;flex-shrink:0"></div>
            <div style="color:rgba(255,255,255,0.85);font-size:${size === 'wide' ? '18px' : '22px'};line-height:1.5">${item}</div>
          </div>`).join('')}
      </div>
      ${brandBar(true)}
    </div>`;
  }
}

// ── TEMPLATE 2 : RÉALISATION (gradient rose/violet, portfolio) ─────────────
function templateRealisation({ slide_type, title, subtitle, content, tag, size }) {
  const w = size === 'wide' ? 1200 : 1080;
  const h = size === 'wide' ? 627 : 1080;

  if (slide_type === 'cover') {
    return `
    <div style="width:${w}px;height:${h}px;background:linear-gradient(135deg,#667eea 0%,#764ba2 50%,#f093fb 100%);display:flex;flex-direction:column;justify-content:space-between;padding:60px;font-family:'Segoe UI',Arial,sans-serif;box-sizing:border-box;position:relative;overflow:hidden">
      <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:linear-gradient(to bottom,rgba(0,0,0,0.1),rgba(0,0,0,0.5))"></div>
      <div style="position:relative;z-index:1;width:fit-content">
        ${tag ? `<div style="background:rgba(255,255,255,0.25);backdrop-filter:blur(10px);color:white;font-size:13px;font-weight:700;padding:8px 18px;border-radius:20px;border:1px solid rgba(255,255,255,0.3)">${tag}</div>` : ''}
      </div>
      <div style="position:relative;z-index:1">
        <div style="color:white;font-size:${size === 'wide' ? '44px' : '52px'};font-weight:900;line-height:1.1;margin-bottom:16px;text-shadow:0 2px 20px rgba(0,0,0,0.3)">${title}</div>
        ${subtitle ? `<div style="color:rgba(255,255,255,0.85);font-size:${size === 'wide' ? '20px' : '24px'};line-height:1.4">${subtitle}</div>` : ''}
      </div>
      <div style="position:relative;z-index:1">${brandBar(true)}</div>
    </div>`;
  }

  if (slide_type === 'content') {
    const items = Array.isArray(content) ? content : [content];
    return `
    <div style="width:${w}px;height:${h}px;background:white;display:flex;flex-direction:column;padding:60px;font-family:'Segoe UI',Arial,sans-serif;box-sizing:border-box">
      <div style="background:linear-gradient(135deg,#667eea,#764ba2);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-size:${size === 'wide' ? '32px' : '38px'};font-weight:900;line-height:1.2;margin-bottom:30px">${title}</div>
      <div style="flex:1;display:flex;flex-direction:column;gap:18px">
        ${items.map((item, i) => `
          <div style="display:flex;gap:16px;align-items:flex-start;background:#f8f4ff;border-radius:14px;padding:16px 20px">
            <div style="width:32px;height:32px;background:linear-gradient(135deg,#667eea,#764ba2);border-radius:50%;display:flex;align-items:center;justify-content:center;color:white;font-size:14px;font-weight:800;flex-shrink:0">${i + 1}</div>
            <div style="color:#333;font-size:${size === 'wide' ? '17px' : '21px'};line-height:1.5">${item}</div>
          </div>`).join('')}
      </div>
      <div style="display:flex;align-items:center;gap:10px;margin-top:24px;padding-top:20px;border-top:1px solid #eee">
        <img src="${LOGO_B64}" style="width:28px;height:28px;border-radius:50%;background:#1a1a2e"/>
        <div>
          <div style="color:#1a1a2e;font-size:13px;font-weight:700">${BRAND.name}</div>
          <div style="color:#86868b;font-size:11px">${BRAND.url}</div>
        </div>
      </div>
    </div>`;
  }
}

// ── TEMPLATE 3 : CHIFFRE IMPACT (stat ou fact fort) ───────────────────────
function templateChiffre({ title, number, unit, description, color_accent, size }) {
  const w = size === 'wide' ? 1200 : 1080;
  const h = size === 'wide' ? 627 : 1080;
  const accent = color_accent || '#e94560';
  return `
  <div style="width:${w}px;height:${h}px;background:linear-gradient(135deg,#1a1a2e,#0f3460);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px;font-family:'Segoe UI',Arial,sans-serif;box-sizing:border-box;text-align:center;position:relative;overflow:hidden">
    <div style="position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:600px;height:600px;background:radial-gradient(circle,${accent}20,transparent 70%);border-radius:50%"></div>
    <div style="color:rgba(255,255,255,0.5);font-size:${size === 'wide' ? '18px' : '22px'};font-weight:700;text-transform:uppercase;letter-spacing:3px;margin-bottom:20px">${title}</div>
    <div style="font-size:${size === 'wide' ? '120px' : '160px'};font-weight:900;color:${accent};line-height:1;margin-bottom:10px">${number}</div>
    ${unit ? `<div style="color:white;font-size:${size === 'wide' ? '32px' : '40px'};font-weight:800;margin-bottom:20px">${unit}</div>` : ''}
    <div style="color:rgba(255,255,255,0.7);font-size:${size === 'wide' ? '20px' : '24px'};max-width:700px;line-height:1.5">${description}</div>
    <div style="margin-top:40px;color:rgba(255,255,255,0.4);font-size:14px;font-weight:600">${BRAND.name} · ${BRAND.url}</div>
  </div>`;
}

// ── TEMPLATE 4 : LOCAL (chaud, proximité, Perpignan) ──────────────────────
function templateLocal({ slide_type, title, subtitle, content, tag, size }) {
  const w = size === 'wide' ? 1200 : 1080;
  const h = size === 'wide' ? 627 : 1080;

  return `
  <div style="width:${w}px;height:${h}px;background:linear-gradient(135deg,#f5a623 0%,#f0932b 40%,#e55d00 100%);display:flex;flex-direction:column;justify-content:space-between;padding:60px;font-family:'Segoe UI',Arial,sans-serif;box-sizing:border-box;position:relative;overflow:hidden">
    <div style="position:absolute;top:-60px;right:-60px;width:280px;height:280px;background:rgba(255,255,255,0.1);border-radius:50%"></div>
    <div style="position:absolute;bottom:-40px;left:40px;width:200px;height:200px;background:rgba(255,255,255,0.07);border-radius:50%"></div>

    <div style="position:relative;z-index:1">
      ${tag ? `<div style="background:rgba(255,255,255,0.25);color:white;font-size:12px;font-weight:800;padding:8px 16px;border-radius:20px;width:fit-content;text-transform:uppercase;letter-spacing:1px">📍 ${tag}</div>` : ''}
    </div>

    <div style="position:relative;z-index:1">
      <div style="color:white;font-size:${size === 'wide' ? '42px' : '52px'};font-weight:900;line-height:1.1;margin-bottom:16px;text-shadow:0 2px 10px rgba(0,0,0,0.15)">${title}</div>
      ${subtitle ? `<div style="color:rgba(255,255,255,0.9);font-size:${size === 'wide' ? '20px' : '24px'};line-height:1.5">${subtitle}</div>` : ''}
      ${content ? `<div style="background:rgba(255,255,255,0.2);border-radius:14px;padding:20px;margin-top:24px;color:white;font-size:${size === 'wide' ? '17px' : '21px'};line-height:1.6">${content}</div>` : ''}
    </div>

    ${brandBar(true)}
  </div>`;
}

// ── TEMPLATE 5 : CTA (call to action fort, conversion) ───────────────────
function templateCTA({ title, cta_text, cta_detail, benefit1, benefit2, benefit3, size }) {
  const w = size === 'wide' ? 1200 : 1080;
  const h = size === 'wide' ? 627 : 1080;
  return `
  <div style="width:${w}px;height:${h}px;background:#1a1a2e;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px;font-family:'Segoe UI',Arial,sans-serif;box-sizing:border-box;text-align:center;position:relative;overflow:hidden">
    <div style="position:absolute;top:0;left:0;right:0;bottom:0;background:radial-gradient(circle at 50% 40%,rgba(233,69,96,0.15) 0%,transparent 60%)"></div>

    <div style="position:relative;z-index:1;width:100%;max-width:900px">
      <div style="color:white;font-size:${size === 'wide' ? '42px' : '50px'};font-weight:900;line-height:1.1;margin-bottom:32px">${title}</div>

      ${benefit1 || benefit2 || benefit3 ? `
      <div style="display:flex;flex-direction:column;gap:14px;margin-bottom:40px">
        ${benefit1 ? `<div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.07);border-radius:12px;padding:14px 20px"><span style="color:#e94560;font-size:20px">✓</span><span style="color:rgba(255,255,255,0.85);font-size:${size === 'wide' ? '17px' : '21px'}">${benefit1}</span></div>` : ''}
        ${benefit2 ? `<div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.07);border-radius:12px;padding:14px 20px"><span style="color:#e94560;font-size:20px">✓</span><span style="color:rgba(255,255,255,0.85);font-size:${size === 'wide' ? '17px' : '21px'}">${benefit2}</span></div>` : ''}
        ${benefit3 ? `<div style="display:flex;align-items:center;gap:12px;background:rgba(255,255,255,0.07);border-radius:12px;padding:14px 20px"><span style="color:#e94560;font-size:20px">✓</span><span style="color:rgba(255,255,255,0.85);font-size:${size === 'wide' ? '17px' : '21px'}">${benefit3}</span></div>` : ''}
      </div>` : ''}

      <div style="background:linear-gradient(135deg,#e94560,#c0392b);color:white;font-size:${size === 'wide' ? '22px' : '28px'};font-weight:800;padding:22px 40px;border-radius:16px;margin-bottom:16px;box-shadow:0 8px 30px rgba(233,69,96,0.4)">${cta_text}</div>
      ${cta_detail ? `<div style="color:rgba(255,255,255,0.5);font-size:16px">${cta_detail}</div>` : ''}

      <div style="margin-top:30px;color:rgba(255,255,255,0.35);font-size:13px">${BRAND.name} · ${BRAND.url}</div>
    </div>
  </div>`;
}

module.exports = { templateExpert, templateRealisation, templateChiffre, templateLocal, templateCTA };
