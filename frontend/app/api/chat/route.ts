// // pages/api/chat.ts

// import type { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const { prompt } = req.body;

//     const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             model: 'openai/gpt-3.5-turbo', // bisa diganti jadi claude-3, mistral, dll
//             messages: [{ role: 'user', content: prompt }],
//         }),
//     });

//     const data = await response.json();
//     const reply = data.choices?.[0]?.message?.content || 'Tidak ada jawaban.';
//     res.status(200).json({ reply });
// }


import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { messages } = req.body;

    if (!messages) {
        return res.status(400).json({ error: "'messages' is required in the request body" });
    }

    try {
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'mistralai/mistral-7b-instruct', // model gratis
                messages,
            }),
        });

        const data = await response.json();

        if (data.error) {
            return res.status(500).json({ error: data.error.message });
        }

        res.status(200).json({ response: data.choices[0].message.content });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}
