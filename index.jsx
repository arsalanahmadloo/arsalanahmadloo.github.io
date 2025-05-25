import { useState } from "react";
import { useRouter } from "next/router";

const MASTER_PASSWORD = "sitetopsecret"; // رمز اول برای باز کردن سایت

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === MASTER_PASSWORD) {
      router.push("/home");
    } else {
      setError("رمز اشتباه است");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl mb-4 font-bold text-center">ورود به سایت</h2>
        <input
          type="password"
          placeholder="رمز را وارد کنید"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <button className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
          ورود
        </button>
      </form>
    </div>
  );
}
