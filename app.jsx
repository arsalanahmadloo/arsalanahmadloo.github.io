// فایل: src/App.jsx import React from "react"; import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; import Home from "./pages/Home"; import Login from "./pages/Login"; import Signup from "./pages/Signup"; import Profile from "./pages/Profile"; import Game from "./pages/Game"; import Dashboard from "./pages/Dashboard";

function App() { return ( <Router> <Routes> <Route path="/" element={<Home />} /> <Route path="/login" element={<Login />} /> <Route path="/signup" element={<Signup />} /> <Route path="/profile" element={<Profile />} /> <Route path="/game" element={<Game />} /> <Route path="/dashboard" element={<Dashboard />} /> </Routes> </Router> ); }

export default App;

// فایل: src/pages/Home.jsx import React from "react"; import { Link } from "react-router-dom";

const Home = () => { return ( <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-600 to-purple-700 text-white"> <h1 className="text-5xl font-bold mb-4">خوش آمدی به سایت ارسلان احمدلو</h1> <p className="text-xl mb-6">بازی کن، امتیاز بگیر، حرفه‌ای شو!</p> <div className="space-x-4"> <Link to="/login" className="px-4 py-2 bg-white text-blue-700 rounded-xl">ورود</Link> <Link to="/signup" className="px-4 py-2 bg-white text-blue-700 rounded-xl">ثبت‌نام</Link> </div> </div> ); };

export default Home;

// فایل: src/pages/Login.jsx import React, { useState } from "react"; import { useNavigate } from "react-router-dom";

const Login = () => { const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const navigate = useNavigate();

const handleLogin = async () => { const res = await fetch("http://localhost:5000/api/login", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email, password }) }); const data = await res.json(); if (data.token) { localStorage.setItem("token", data.token); navigate("/dashboard"); } else { alert("ورود ناموفق"); } };

return ( <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100"> <h2 className="text-3xl mb-4">ورود</h2> <input type="email" placeholder="ایمیل" value={email} onChange={e => setEmail(e.target.value)} className="p-2 border rounded mb-2" /> <input type="password" placeholder="رمز عبور" value={password} onChange={e => setPassword(e.target.value)} className="p-2 border rounded mb-2" /> <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">ورود</button> </div> ); };

export default Login;

// فایل: src/pages/Signup.jsx import React, { useState } from "react"; import { useNavigate } from "react-router-dom";

const Signup = () => { const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const navigate = useNavigate();

const handleSignup = async () => { const res = await fetch("http://localhost:5000/api/signup", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, password }) }); if (res.ok) navigate("/login"); };

return ( <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100"> <h2 className="text-3xl mb-4">ثبت‌نام</h2> <input type="text" placeholder="نام" value={name} onChange={e => setName(e.target.value)} className="p-2 border rounded mb-2" /> <input type="email" placeholder="ایمیل" value={email} onChange={e => setEmail(e.target.value)} className="p-2 border rounded mb-2" /> <input type="password" placeholder="رمز عبور" value={password} onChange={e => setPassword(e.target.value)} className="p-2 border rounded mb-2" /> <button onClick={handleSignup} className="bg-green-500 text-white px-4 py-2 rounded">ثبت‌نام</button> </div> ); };

export default Signup;

