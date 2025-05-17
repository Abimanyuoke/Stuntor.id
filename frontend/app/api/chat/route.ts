// soruce code from openrouter.ai

import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
        return NextResponse.json({ error: "'messages' array is required" }, { status: 400 });
    }

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'http://localhost:3000',
                'X-Title': 'MyAIChatApp',
            },
            body: JSON.stringify({
                model: '//', // rek ini bisa diganti model lain sesuai kebutuhan di openrouter
                messages,
            }),
        });

        const data = await response.json();

        if (data.error) {
            return NextResponse.json({ error: data.error.message }, { status: 500 });
        }

        return NextResponse.json({ response: data.choices[0].message.content });
    } catch (error) {
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
