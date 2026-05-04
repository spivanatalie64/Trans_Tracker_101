import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://trans-tracker-101.vercel.app', // Update when deployed
        'X-Title': 'Trans Tracker 101',
      },
      body: JSON.stringify({
        model: 'meta-llama/llama-3.3-70b-instruct:free',
        messages: [
          {
            role: 'system',
            content: 'You are Sprungles, a helpful and friendly bot for Trans Tracker 101. Your job is to help users understand complex anti-trans or pro-trans legislation, state bills, and legal jargon by translating it into plain, easy-to-understand English. Be concise, supportive, and informative.',
          },
          {
            role: 'user',
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenRouter Error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch from OpenRouter' }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json({ reply: data.choices[0].message.content });
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
