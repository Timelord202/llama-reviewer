import { useState, useEffect } from "react";
import { invoke, Channel } from "@tauri-apps/api/core";
import { NavLink } from "react-router";
import { IoIosArrowBack } from "react-icons/io";
import { MdError } from "react-icons/md";
import Markdown from "react-markdown";

type FeedbackState = {
  text: string;
  error: boolean;
};

export default function Feedback() {
  const [feedbackState, setFeedbackState] = useState<FeedbackState>({
    text: "Thinking...",
    error: false,
  });

  useEffect(() => {
    const onEvent = new Channel<string>();

    // Event called when model streams it's response
    onEvent.onmessage = (chunk) => {
      setFeedbackState((prev) => ({
        text: prev.text + chunk,
        error: false,
      }));
    };

    async function getFeedback() {
      try {
        await invoke("give_feedback", { onEvent });
      } catch (e) {
        const err = JSON.parse(String(e));
        setFeedbackState({
          text: err.error,
          error: true,
        });
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
        {feedbackState.error ? (
          <p className="flex gap-1 items-center text-red-400 font-bold">
            <MdError /> Error: {feedbackState.text}
          </p>
        ) : (
          <Markdown>{feedbackState.text}</Markdown>
        )}
      </section>
    </main>
  );
}
