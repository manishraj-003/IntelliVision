import { useEffect, useState } from "react";
import API from "../api/gateway";
import Navbar from "../components/Navbar";

export default function Admin() {
  const [list, setList] = useState([]);

  useEffect(() => {
    API.get("/history/all").then(res => setList(res.data.history));
  }, []);

  return (
    <>
      <Navbar />
      <div className="p-6">
        <h1 className="text-xl mb-4">Admin History</h1>
        <pre>{JSON.stringify(list, null, 2)}</pre>
      </div>
    </>
  );
}
