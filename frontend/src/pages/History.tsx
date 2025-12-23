import { useEffect, useState } from "react";
import API from "../api/gateway";
import Navbar from "../components/Navbar";

export default function History() {
  const [list, setList] = useState([]);

  useEffect(() => {
    API.get("/history").then(res => setList(res.data.history));
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th>File</th><th>Latency</th><th>Summary</th><th>Objects</th>
            </tr>
          </thead>
          <tbody>
            {list.map((x:any) => (
              <tr key={x.id} className="border">
                <td>{x.filename}</td>
                <td>{x.latency}s</td>
                <td>{x.summary?.slice(0,50)}</td>
                <td>{x.objects?.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
