import { useState } from "react";
import API from "../api/gateway";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [jobId, setJobId] = useState(null);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    const form = new FormData();
    form.append("file", file);

    const res = await API.post("/file/process", form);
    setJobId(res.data.jobId);

    // poll for results
    const interval = setInterval(async () => {
      const st = await API.get(`/job/status/${res.data.jobId}`);
      if (st.data.status === "completed") {
        setResult(st.data.result);
        clearInterval(interval);
      }
    }, 1000);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl mb-4">Upload Document</h1>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />

      <button
        onClick={handleUpload}
        className="bg-green-600 text-white px-4 py-2 mt-4"
      >
        Process
      </button>

      {jobId && !result && <p>Processing...</p>}

      {result && (
        <div className="mt-6 p-4 border rounded bg-gray-100">
          <h2 className="font-bold mb-2">Results</h2>
          <p><b>OCR:</b> {result.ocr.slice(0, 100)}...</p>
          <p><b>Summary:</b> {result.summary}</p>
          <p><b>Objects:</b> {result.objects.join(", ")}</p>
        </div>
      )}
    </div>
  );
}
