import { useState, useEffect } from "react";
import { doc, getDoc, setDoc } from "../firebase";

export default function SettingsPage() {
  const [sitePass, setSitePass] = useState("");
  const [settingsPass, setSettingsPass] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchPasswords = async () => {
      const siteRef = doc("passwords", "site");
      const settingsRef = doc("passwords", "settings");
      const siteSnap = await getDoc(siteRef);
      const settingsSnap = await getDoc(settingsRef);
      if (siteSnap.exists()) setSitePass(siteSnap.data().password);
      if (settingsSnap.exists()) setSettingsPass(settingsSnap.data().password);
    };
    fetchPasswords();
  }, []);

  const handleSave = async () => {
    await setDoc(doc("passwords", "site"), { password: sitePass });
    await setDoc(doc("passwords", "settings"), { password: settingsPass });
    setMessage("رمزها با موفقیت ذخیره شدند");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-6">تنظیمات رمزها</h1>
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <label className="block mb-2 font-semibold">رمز بخش سایت:</label>
        <input
          type="text"
          value={sitePass}
          onChange={(e) => setSitePass(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        />
        <label className="block mb-2 font-semibold">رمز بخش تنظیمات:</label>
        <input
          type="text"
          value={settingsPass}
          onChange={(e) => setSettingsPass(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2 mb
