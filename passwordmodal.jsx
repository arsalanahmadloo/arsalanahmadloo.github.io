import { useState } from "react";
import { doc, getDoc } from "../firebase";

export default function PasswordModal({ section, onClose, onSuccess }) {
  const [inputPass, setInputPass] = useState("");
  const [error, setError] = useState("");

  const checkPassword = async () => {
    const docRef = doc(getDoc().firestore, "passwords", section);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const realPass = docSnap.data().password;
      if (inputPass === realPass) {
        onSuccess(section);
      } else {
        setError("رمز اشتباه است");
      }
    } else {
      setError("هیچ رمزی پیدا نشد");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkPassword();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg w-96 shadow-lg">
        <h2 className="text-xl mb-4 font-bold">رمز {section === "site" ? "بخش سایت" : "تنظیمات"}</h2>
        <input
          type="password"
          value={inputPass}
          onChange={(e) => setInputPass(e.target.value)}
          placeholder="رمز را وارد کنید"
          className="w-full border border-gray-300 rounded px-3 py-2 mb-3"
        />
        {error && <p className="text-red-600 mb-3">{error}</p>}
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 transition"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 transition"
          >
            ارسال
          </button>
        </div>
      </form>
    </div>
  );
}
