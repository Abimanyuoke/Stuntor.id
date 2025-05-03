"use client"
import { useState } from 'react';

export default function ChatPage() {
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Halo! Ada yang bisa saya bantu?' },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setLoading(true);

        const res = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ messages: updatedMessages }),
        });

        const data = await res.json();
        setMessages([...updatedMessages, { role: 'assistant', content: data.response }]);
        setLoading(false);
    };

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-100">
            {/* Chat Box */}
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`p-3 max-w-md rounded-xl whitespace-pre-wrap ${
                            msg.role === 'user'
                                ? 'bg-blue-500 text-white self-end ml-auto'
                                : 'bg-white text-black self-start'
                        }`}
                    >
                        {msg.content}
                    </div>
                ))}
                {loading && (
                    <div className="italic text-gray-500">AI sedang mengetik...</div>
                )}
            </div>

            {/* Input */}
            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1 p-2 rounded-md border border-gray-300 focus:outline-none"
                    placeholder="Ketik pesan..."
                />
                <button
                    onClick={sendMessage}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Kirim
                </button>
            </div>
        </div>
    );
}