import { invoke } from "@tauri-apps/api/core";
import { useState } from "react";
import { useNavigate } from "react-router";
import llamaImage from "./assets/mascot.gif";

function App() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const ollamaModel = "qwen2.5-coder:7b";

  async function validateRepoPath(formData: FormData) {
    try {
      const path = formData.get("filePath");
      await invoke("validate_repo_path", { path });
      navigate("/feedback");
    } catch (e) {
      setError(String(e));
    }
  }

  return (
    <main className="flex flex-col min-h-screen justify-center items-center bg-black text-white p-10">
      <img className="min-w-1/4" src={llamaImage} alt="Image of a llama" />
      <h1 className="mt-5 text-3xl font-bold">Llama Reviewer</h1>
      <p className="min-w-1/2 text-zinc-400 mt-3">
        Welcome to Llama Reviewer! To get started, run the ollama '{ollamaModel}
        ' model and enter the path to your Git repo!
      </p>

      <form
        action={validateRepoPath}
        className="flex flex-col justify-center items-center gap-4 mt-10"
      >
        <div className="w-96 max-w-3/4">
          <label
            htmlFor="filePath"
            className="w-full mb-2 block text-sm font-medium text-zinc-300"
          >
            Repository Path
          </label>

          <input
            name="filePath"
            type="text"
            placeholder="/home/user/projects/my-repo"
            className="w-full bg-zinc-900 p-3 rounded-lg border border-zinc-700 outline-none focus:border-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-96 max-w-3/4 bg-blue-600 p-3 rounded-lg cursor-pointer font-medium"
        >
          Get Feedback
        </button>
      </form>

      <p className="mt-4 text-red-400 font-bold">{error}</p>
    </main>
  );
}

export default App;
