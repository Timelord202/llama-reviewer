import { useState, useEffect } from "react";
import Markdown from 'react-markdown';
import { invoke, Channel } from '@tauri-apps/api/core';

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
        <main className="flex bg-black min-h-screen">
            <div className="prose prose-invert max-w-none prose-zinc p-10 border-2 border-zinc-800 m-10">
                {feedback.length == 0 ? (
                    <p className="font-bold">Thinking...</p>
                ) : <Markdown>{feedback}</Markdown> }
            </div>
        </main>
    );
}