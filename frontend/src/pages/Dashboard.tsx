import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="p-6 grid grid-cols-2 gap-4">
        <Link to="/upload" className="bg-blue-500 text-white p-6 rounded">
          Upload File
        </Link>
        <Link to="/history" className="bg-gray-700 text-white p-6 rounded">
          View History
        </Link>
      </div>
    </>
  );
}
