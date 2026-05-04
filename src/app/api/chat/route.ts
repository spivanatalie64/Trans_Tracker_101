import { NextResponse } from 'next/server';

// Prioritized OpenRouter caller
const OPENROUTER_BASE = 'https://openrouter.ai/api/v1';
const API_KEY = process.env.OPENROUTER_API_KEY;

async function fetchModelsList() {
  try {
    const resp = await fetch(`${OPENROUTER_BASE}/models`, {
      headers: { Authorization: `Bearer ${API_KEY}` },
      next: { revalidate: 300 },
    });
    if (!resp.ok) return [];
    const json = await resp.json();
    return Array.isArray(json.data) ? json.data : [];
  } catch (e) {
    console.error('Failed to fetch models list', e);
    return [];
  }
}

function pickCandidates(models: any[]) {
  const free = models.filter((m) => {
    if (!m || !m.id) return false;
    if (String(m.id).endsWith(':free')) return true;
    if (m.pricing && (m.pricing.prompt === 0 || m.pricing.completion === 0)) return true;
    return false;
  });

  const ids = Array.from(new Set(free.map((m) => String(m.id))));

  ids.sort((a, b) => {
    const ma = free.find((m) => m.id === a) || {};
    const mb = free.find((m) => m.id === b) || {};
    const ca = ma?.pricing?.upstream_inference_cost ?? ma?.upstream_inference_cost ?? 0;
    const cb = mb?.pricing?.upstream_inference_cost ?? mb?.upstream_inference_cost ?? 0;
    if (ca !== cb) return ca - cb;
    return a.length - b.length;
  });

  return ids;
}

async function tryModel(modelId: string, messages: any[]) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const resp = await fetch(`${OPENROUTER_BASE}/chat/completions`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model: modelId, messages }),
      signal: controller.signal,
    });
    clearTimeout(timeout);
    const text = await resp.text();
    let json = null;
    try { json = JSON.parse(text); } catch (e) { /* ignore */ }
    return { ok: resp.ok, status: resp.status, json, raw: text };
  } catch (err) {
    clearTimeout(timeout);
    return { ok: false, error: String(err) };
  }
}

export async function POST(req: Request) {
  if (!API_KEY) {
    return NextResponse.json({ error: 'OpenRouter API key is not configured on the server.' }, { status: 500 });
  }

  try {
    const { message } = await req.json();
    if (!message) return NextResponse.json({ error: 'Message is required' }, { status: 400 });

    const systemPrompt = `You are Sprungles, a helpful and friendly bot for Trans Tracker 101. Your job is to help users understand complex anti-trans or pro-trans legislation, state bills, and legal jargon by translating it into plain, easy-to-understand English. Be concise, supportive, and informative.`;

    const models = await fetchModelsList();
    const candidates = pickCandidates(models);

    if (candidates.length === 0) candidates.push('openrouter/free');

    const attempts: any[] = [];

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: message },
    ];

    const maxAttempts = Math.min(candidates.length, 12);
    for (let i = 0; i < maxAttempts; i++) {
      const modelId = candidates[i];
      const start = Date.now();
      const result = await tryModel(modelId, messages);
      const duration = Date.now() - start;
      attempts.push({ model: modelId, duration, result: result.ok ? 'ok' : 'fail', status: result.status, error: result.error || (result.json && result.json.error) || null });

      if (result.ok && result.json) {
        const reply = result.json?.choices?.[0]?.message?.content || result.json?.choices?.[0]?.text || null;
        return NextResponse.json({ reply, model: modelId, attempts });
      }
    }

    return NextResponse.json({ error: 'All model attempts failed', attempts }, { status: 502 });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
