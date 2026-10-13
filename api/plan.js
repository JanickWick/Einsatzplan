// Vercel Serverless Function: Plan laden (GET) und speichern (PUT) in Vercel Blob.
// Jeder Speichervorgang legt eine neue Version an; die letzten 30 bleiben als Verlauf erhalten.
import { put, list, del } from '@vercel/blob';

const PREFIX = 'einsatzplan/plan-';
const KEEP = 30;

function cors(res){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-plan-password');
  res.setHeader('Cache-Control', 'no-store');
}
function revOf(pathname){ const m = /plan-\d+-(\d+)\.json$/.exec(pathname); return m ? Number(m[1]) : 0; }
async function versions(){
  const all = []; let cursor;
  do {
    const r = await list({ prefix: PREFIX, limit: 1000, cursor });
    all.push(...r.blobs);
    cursor = r.hasMore ? r.cursor : undefined;
  } while(cursor);
  all.sort((a, b) => (a.pathname < b.pathname ? 1 : a.pathname > b.pathname ? -1 : 0)); // neueste zuerst
  return all;
}
async function readDoc(blob){
  const r = await fetch(blob.url, { cache: 'no-store' });
  if(!r.ok) throw new Error('Blob nicht lesbar: HTTP ' + r.status);
  return r.json();
}

export default async function handler(req, res){
  cors(res);
  if(req.method === 'OPTIONS') return res.status(204).end();
  try{
    if(req.method === 'GET'){
      const blobs = await versions();
      if(!blobs.length) return res.status(200).json({ rev: 0, data: null });
      const rev = revOf(blobs[0].pathname);
      const want = Number((req.query && req.query.rev) ?? -1);
      if(want === rev) return res.status(200).json({ rev, unchanged: true });
      const doc = await readDoc(blobs[0]);
      return res.status(200).json({ rev, savedAt: doc.savedAt, data: doc.data });
    }
    if(req.method === 'PUT'){
      const pw = process.env.PLAN_PASSWORD;
      if(!pw) return res.status(500).json({ error: 'PLAN_PASSWORD ist auf Vercel nicht gesetzt' });
      if((req.headers['x-plan-password'] || '') !== pw) return res.status(401).json({ error: 'Passwort falsch' });
      const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
      if(!body.data || typeof body.data !== 'object') return res.status(400).json({ error: 'Keine Daten' });
      const blobs = await versions();
      const rev = blobs.length ? revOf(blobs[0].pathname) : 0;
      if(body.baseRev != null && Number(body.baseRev) !== rev && blobs.length){
        const doc = await readDoc(blobs[0]);
        return res.status(409).json({ rev, savedAt: doc.savedAt, data: doc.data });
      }
      const next = rev + 1, savedAt = new Date().toISOString();
      const pathname = PREFIX + String(Date.now()).padStart(15, '0') + '-' + next + '.json';
      await put(pathname, JSON.stringify({ rev: next, savedAt, data: body.data }), { access: 'public', addRandomSuffix: false, contentType: 'application/json' });
      if(blobs.length >= KEEP){ try{ await del(blobs.slice(KEEP - 1).map(b => b.url)); }catch(e){ console.warn('Aufräumen fehlgeschlagen', e); } }
      return res.status(200).json({ rev: next, savedAt });
    }
    res.setHeader('Allow', 'GET, PUT, OPTIONS');
    return res.status(405).json({ error: 'Methode nicht erlaubt' });
  }catch(e){
    console.error(e);
    return res.status(500).json({ error: String((e && e.message) || e) });
  }
}
