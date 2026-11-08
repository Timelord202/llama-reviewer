import { useState, useEffect } from "react";
import Markdown from 'react-markdown';
import { invoke, Channel } from '@tauri-apps/api/core';
import { NavLink } from "react-router";

export default function Feedback() {
    const [feedback, setFeedback] = useState('');
    const onEvent = new Channel<string>();

    onEvent.onmessage = (chunk) => {
        setFeedback(prev => prev + chunk);
    };

    useEffect(() => {
        invoke('give_feedback', { onEvent });
    }, []);

    return (
        <main className="bg-black min-h-screen p-10">
            <NavLink className="text-white font-bold mb-5 hover:underline" to="/">◄ Back</NavLink>
            <h1 className="my-3 text-white text-2xl font-bold">See Feedback Below:</h1>
            <div className="max-w-none rounded-lg prose prose-invert prose-zinc p-10 border-2 border-zinc-800">
                {feedback.length == 0 ? (
                    <p className="font-bold">Thinking...</p>
                ) : <Markdown>{feedback}</Markdown> }
            </div>
        </main>
    );
}