import { useState, useEffect } from "react";
import { invoke, Channel } from "@tauri-apps/api/core";
import { NavLink } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { MdError } from "react-icons/md";
import Markdown from "react-markdown";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [error, setError] = useState("");
  const [showThinking, setShowThinking] = useState(false);

  useEffect(() => {
    const onEvent = new Channel<string>();

    // Event called when model streams it's response
    onEvent.onmessage = (chunk) => {
      setFeedback((prev) => prev + chunk);
    };

    async function getFeedback() {
      try {
        await invoke("give_feedback", { onEvent });
        setShowThinking(true);
      } catch (e) {
        const err = JSON.parse(String(e));
        setError(err.error);
        setShowThinking(false);
      }
    }
    getFeedback();
  }, []);

  return (
    <main className="bg-black min-h-screen p-10">
      <NavLink
        className="flex gap-2 items-center text-white font-bold mb-5 hover:underline"
        to="/"
      >
        <IoIosArrowBack /> Back
      </NavLink>
      <h1 className="my-3 text-white text-2xl font-bold">
        See Feedback Below:
      </h1>
      <section className="max-w-none min-h-lg rounded-lg prose prose-invert prose-zinc p-10 border-2 border-zinc-800">
        {error.length > 0 && (
          <p className="text-red-400 flex gap-1 items-center font-bold">
            <MdError /> Error: {error}
          </p>
        )}
        {showThinking && <p className="text-white font-bold">Thinking...</p>}
        <Markdown>{feedback}</Markdown>
      </section>
    </main>
  );
}
