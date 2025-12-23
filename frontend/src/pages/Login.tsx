import { useContext, useState } from "react";
import API from "../api/gateway";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const { login } = useContext(AuthContext);
  const [form, setForm] = useState({ email: "", password: "" });
  const [err, setErr] = useState("");

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token, res.data.user);
      window.location.href = "/dashboard";
    } catch {
      setErr("Invalid credentials");
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded w-96 shadow">
        <h1 className="text-xl font-bold mb-4">Login</h1>

        <input className="w-full border p-2 mb-3"
          placeholder="Email"
          onChange={e => setForm({...form, email: e.target.value})}
        />

        <input className="w-full border p-2 mb-3"
          type="password"
          placeholder="Password"
          onChange={e => setForm({...form, password: e.target.value})}
        />

        {err && <p className="text-red-500">{err}</p>}

        <button className="bg-blue-600 text-white w-full p-2">
          Login
        </button>
      </form>
    </div>
  );
}
