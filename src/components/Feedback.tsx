import { useState } from "react";
import Markdown from 'react-markdown';
import { Channel } from '@tauri-apps/api/core';


export default function Feedback() {
    const [feedback, setFeedback] = useState('');
    const onEvent = new Channel<string>();

    onEvent.onmessage = (chunk) => {
        setFeedback(prev => prev + chunk);
    };
    
    return (
        <p>Test</p>
    )
}