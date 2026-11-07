import { invoke } from '@tauri-apps/api/core';
import { useState } from 'react';

type Feedback = {
  error: boolean,
  err_message: string,
  response: string,
};

function App() {
  const [feedback, setFeedback] = useState<Feedback | null>(null);

  async function analyzeRepo(formData: FormData) {
    const path = formData.get('filePath');
    const feedback: Feedback = await invoke('give_feedback', { path });
    setFeedback(feedback);
  }

  return (
    <main className="flex flex-col gap-6 min-h-screen items-center justify-center bg-black text-white">
      <div className="max-w-lg">
        <h1 className="text-3xl font-bold">Llama Reviewer</h1>

        <p className="text-zinc-400">
          Enter file path to a Git repo to receive feedback!
        </p>

        <form action={analyzeRepo} className="flex flex-col gap-4 mt-10">
          <div>
            <label
              htmlFor="filePath"
              className="mb-2 block text-sm font-medium text-zinc-300"
            >
              Repository Path
            </label>

            <input
              name="filePath"
              type="text"
              placeholder="/home/user/projects/my-repo"
              className="w-full bg-zinc-900 px-4 py-3 rounded-lg border border-zinc-700 outline-none focus:border-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 px-4 py-3 rounded-lg cursor-pointer font-medium"
          >
            Get Feedback
          </button>
        </form>
      </div>

      {feedback?.error && (
        <p className="text-red-400 font-bold">{feedback.err_message}</p>
      )}
    </main>
  )
}

export default App;
