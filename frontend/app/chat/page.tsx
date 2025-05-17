'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react'; // atau icon lain
import { useEffect, useRef, useState } from 'react';

export default function ChatPage() {
    const router = useRouter();
    const [messages, setMessages] = useState([
        { role: 'assistant', content: 'Halo! Ada yang bisa saya bantu?' },
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        const updatedMessages = [...messages, userMessage];
        setMessages(updatedMessages);
        setInput('');
        setLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: updatedMessages }),
            });

            const data = await res.json();

            if (data.error) {
                setMessages([...updatedMessages, { role: 'assistant', content: `❌ Error: ${data.error}` }]);
            } else {
                setMessages([...updatedMessages, { role: 'assistant', content: data.response }]);
            }
        } catch (err) {
            setMessages([...updatedMessages, { role: 'assistant', content: '❌ Error: Tidak dapat menghubungi server.' }]);
        }

        setLoading(false);
    };




    function resetChat(_event: React.MouseEvent<HTMLButtonElement>): void {
        setMessages([
            { role: 'assistant', content: 'Halo! Ada yang bisa saya bantu?' },
        ]);
        setInput('');
    }

    return (
        <div className="flex flex-col h-screen p-4 bg-gray-100">
            {/* Back Button */}
            <div className="mb-2">
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1 text-gray-700 hover:text-black"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span>Kembali</span>
                </button>
            </div>

            {/* Chat Box */}
            <div className="flex-1 overflow-y-auto space-y-2 mb-4">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`p-3 max-w-md rounded-xl whitespace-pre-wrap ${msg.role === 'user'
                            ? 'bg-blue-500 text-white self-end ml-auto'
                            : 'bg-white text-black self-start'
                            }`}
                    >
                        {msg.content}
                    </div>
                ))}

                {loading && (
                    <div className="flex items-center space-x-2 text-gray-600">
                        <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                        <span>AI sedang mengetik...</span>
                    </div>
                )}

                <div ref={messagesEndRef} />
            </div>

            {/* Input + Reset */}
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
                    disabled={loading || !input.trim()}
                    className={`px-4 py-2 rounded-md text-white transition-colors ${loading || !input.trim()
                            ? 'bg-blue-300 cursor-not-allowed'
                            : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                >
                    {loading ? 'Mengirim...' : 'Kirim'}
                </button>

                <button
                    onClick={resetChat}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                >
                    Reset
                </button>
            </div>
        </div>
    );
}
