#!/bin/sh
# Lighthouse (mobil, Standardprofil: simuliertes langsames 4G, 4x CPU-Drosselung) für eine URL. Aufruf: tools/lighthouse.sh <URL> <Ausgabe.json>
# dist/ muss lokal laufen (python3 -m http.server 8770 -d dist).
CHROME=$(ls -d /opt/pw-browsers/chromium-*/chrome-linux/chrome | head -1)
CHROME_PATH="$CHROME" npx lighthouse "$1" --output=json --output-path="$2" --quiet \
  --chrome-flags="--headless --no-sandbox" --only-categories=performance,accessibility,best-practices,seo
node -e "
const r=require('$2');const c=r.categories;
console.log('$1', 'Performance', Math.round(c.performance.score*100), 'Accessibility', Math.round(c.accessibility.score*100), 'Best Practices', Math.round(c['best-practices'].score*100), 'SEO', Math.round(c.seo.score*100), 'LCP', r.audits['largest-contentful-paint'].displayValue, 'CLS', r.audits['cumulative-layout-shift'].displayValue, 'TBT', r.audits['total-blocking-time'].displayValue);
for (const [k,a] of Object.entries(r.audits)) if (a.score!==null && a.score<1 && a.scoreDisplayMode==='binary') console.log('  offen:',k,'-',a.title);
"
