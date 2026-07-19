import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
const root = process.cwd();
const dist = path.join(root, 'dist');
async function walk(dir){const out=[];for(const name of await readdir(dir)){const p=path.join(dir,name);const s=await stat(p);if(s.isDirectory()) out.push(...await walk(p)); else out.push(p)}return out}
const files = await walk(dist);
const html = files.filter(f => f.endsWith('.html'));
let failures=[];
const ga4MeasurementId = (process.env.GA4_MEASUREMENT_ID || process.env.GOOGLE_ANALYTICS_MEASUREMENT_ID || '').trim();
const ga4Enabled = /^G-[A-Z0-9]{6,}$/.test(ga4MeasurementId);
const allPaths = new Set(files.map(f => '/' + path.relative(dist, f).replace(/\\/g,'/')));
for(const p of html.map(f => '/' + path.relative(dist, f).replace(/index\.html$/,'').replace(/\\/g,'/')).map(p => p === '/' ? '/' : p)) allPaths.add(p);
for(const f of html){
  const text=await readFile(f,'utf8');
  const rel='/' + path.relative(dist,f).replace(/\\/g,'/');
  if(rel === '/404.html') continue;
  for(const marker of ['<title>','<meta name="description"','<link rel="canonical"','application/ld+json','Sample report only','Educational signal, not forensic proof']) if(!text.includes(marker)) failures.push(`${rel}: missing ${marker}`);
  if(/\bDetectVideo\b/.test(text)) failures.push(`${rel}: forbidden public brand DetectVideo`);
  for(const m of text.matchAll(/href="([^"]+)"/g)){
    const href=m[1]; if(href.startsWith('http')||href.startsWith('mailto:')||href.startsWith('#')) continue;
    const clean=href.split('#')[0].split('?')[0]; if(clean && !allPaths.has(clean) && !allPaths.has(clean.replace(/\/$/,''))) failures.push(`${rel}: broken href ${href}`);
  }
}
const renderedHtml = (await Promise.all(html.map(f => readFile(f,'utf8')))).join('\n');
if(ga4Enabled){
  const scriptMarkers = [...renderedHtml.matchAll(/googletagmanager\.com\/gtag\/js\?id=([^"&<]+)/g)].map(m => m[1]);
  if(!scriptMarkers.length) failures.push('GA4 enabled but no gtag script emitted');
  if(scriptMarkers.some(id => id !== ga4MeasurementId)) failures.push('GA4 script emitted with unexpected measurement id');
  if(!renderedHtml.includes(`gtag('config','${ga4MeasurementId}'`)) failures.push('GA4 config call missing expected measurement id');
  if(!renderedHtml.includes('Google Analytics 4 is enabled')) failures.push('Privacy page missing Google Analytics disclosure');
  if(renderedHtml.includes('static.cloudflareinsights.com')) failures.push('Cloudflare Web Analytics tag emitted alongside GA4');
  if(/clarity\.ms/i.test(renderedHtml)) failures.push('Clarity/session replay marker emitted');
} else {
  if(/googletagmanager\.com\/gtag\/js|gtag\('config'|google-analytics\.com/i.test(renderedHtml)) failures.push('GA4 tag emitted without a valid Measurement ID');
}
const sitemap=await readFile(path.join(dist,'sitemap.xml'),'utf8');
if(sitemap.includes('/scan/') || sitemap.includes('/api/')) failures.push('sitemap includes noindex route');
const robots=await readFile(path.join(dist,'robots.txt'),'utf8');
if(!robots.includes('Disallow: /scan/') || !robots.includes('Disallow: /api/')) failures.push('robots missing noindex disallows');
if(failures.length){console.error(failures.join('\n')); process.exit(1)}
console.log(`CHECK_PASS html=${html.length} files=${files.length}`);
