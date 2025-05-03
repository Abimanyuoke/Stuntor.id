// "use client";
// import { useState } from "react";

// export default function ChatPage() {
//     const [messages, setMessages] = useState([{ role: "system", content: "Halo! Ada yang bisa saya bantu?" }]);
//     const [input, setInput] = useState("");
//     const [loading, setLoading] = useState(false);

//     const sendMessage = async () => {
//         if (!input.trim()) return;

//         const userMessage = { role: "user", content: input };
//         const updatedMessages = [...messages, userMessage];
//         setMessages(updatedMessages);
//         setInput("");
//         setLoading(true);

//         const res = await fetch("/api/chat", {
//             method: "POST",
//             headers: { "Content-Type": "application/json" },
//             body: JSON.stringify({ messages: updatedMessages }),
//         });

//         const data = await res.json();
//         setMessages([...updatedMessages, { role: "assistant", content: data.response }]);
//         setLoading(false);
//     };

//     return (
//         <div className="flex flex-col h-screen p-4 bg-gray-100">
//             <div className="flex-1 overflow-y-auto space-y-2 mb-4">
//                 {messages.map((msg, i) => (
//                     <div key={i} className={`p-3 max-w-md rounded-xl ${msg.role === "user" ? "bg-blue-500 text-white self-end ml-auto" : "bg-white text-black self-start"}`}>
//                         {msg.content}
//                     </div>
//                 ))}
//                 {loading && <div className="italic text-gray-500">AI sedang mengetik...</div>}
//             </div>

//             <div className="flex gap-2">
//                 <input
//                     value={input}
//                     onChange={(e) => setInput(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                     className="flex-1 p-2 rounded-md border"
//                     placeholder="Ketik pesan..."
//                 />
//                 <button onClick={sendMessage} className="bg-blue-600 text-white px-4 rounded-md">Kirim</button>
//             </div>
//         </div>
//     );
// }

// "use client"

// import { useState } from 'react';

// export default function Home() {
//     const [prompt, setPrompt] = useState('');
//     const [reply, setReply] = useState('');
//     const [loading, setLoading] = useState(false);

//     const sendPrompt = async () => {
//         setLoading(true);
//         const res = await fetch('/chat', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ prompt }),
//         });
//         const data = await res.json();
//         setReply(data.reply);
//         setLoading(false);
//     };

//     return (
//         <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
//             <h1 className="text-3xl font-bold mb-6">Chat AI via OpenRouter</h1>
//             <div className="w-full max-w-md space-y-4">
//                 <textarea
//                     rows={4}
//                     placeholder="Tulis pertanyaan kamu..."
//                     className="w-full p-3 rounded border border-gray-300"
//                     value={prompt}
//                     onChange={(e) => setPrompt(e.target.value)}
//                 />
//                 <button
//                     onClick={sendPrompt}
//                     className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
//                 >
//                     {loading ? 'Memproses...' : 'Kirim'}
//                 </button>
//                 <div className="bg-white p-4 rounded shadow">
//                     <p className="text-gray-700 whitespace-pre-line">{reply}</p>
//                 </div>
//             </div>
//         </div>
//     );
// }



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