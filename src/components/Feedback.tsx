import { useState, useEffect } from "react";
import Markdown from "react-markdown";
import { invoke, Channel } from "@tauri-apps/api/core";
import { NavLink } from "react-router";

export default function Feedback() {
  const [feedback, setFeedback] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const onEvent = new Channel<string>();
  const warningMessage =
    "Looks like the model has been thinking for a while. If this is unexpected, please verify your model is running and re-enter your git repo";

  // Event called when model streams it's response
  onEvent.onmessage = (chunk) => {
    setShowWarning(false);
    setFeedback((prev) => prev + chunk);
  };

  useEffect(() => {
    invoke("give_feedback", { onEvent });

    const timer = setTimeout(() => {
      setShowWarning(true);
    }, 20000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="bg-black min-h-screen p-10">
      <NavLink className="text-white font-bold mb-5 hover:underline" to="/">
        ◄ Back
      </NavLink>
      <h1 className="my-3 text-white text-2xl font-bold">
        See Feedback Below:
      </h1>
      {showWarning && (
        <p className="text-yellow-400 font-bold mb-2">{warningMessage}</p>
      )}
      <section className="max-w-none rounded-lg prose prose-invert prose-zinc p-10 border-2 border-zinc-800">
        {feedback.length == 0 ? (
          <p className="font-bold">Thinking...</p>
        ) : (
          <Markdown>{feedback}</Markdown>
        )}
      </section>
    </main>
  );
}
