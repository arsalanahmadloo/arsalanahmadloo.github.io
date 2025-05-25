import { useState } from "react";
import PasswordModal from "../components/PasswordModal";
import { useRouter } from "next/router";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(null); // "site" یا "settings"
  const router = useRouter();

  const handleAccess = (section) => {
    setModalOpen(section);
  };

  const onSuccess = (section) => {
    setModalOpen(null);
    if (section === "site") router.push("/site");
    else if (section === "settings") router.push("/settings");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-500 to-yellow-400 flex flex-col items-center justify-center">
      <h1 className="text-4xl mb-12 font-extrabold text-white drop-shadow-lg">صفحه اصلی سایت</h1>
      <div className="space-x-6">
        <button
          onClick={() => handleAccess("site")}
          className="px-8 py-4 bg-white rounded-lg shadow-md text-lg font-semibold hover:bg-gray-200 transition"
        >
          باز کردن بخش سایت
        </button>
        <button
          onClick={() => handleAccess("settings")}
          className="px-8 py-4 bg-white rounded-lg shadow-md text-lg font-semibold hover:bg-gray-200 transition"
        >
          تنظیمات سایت
        </button>
      </div>

      {modalOpen && (
        <PasswordModal section={modalOpen} onClose={() => setModalOpen(null)} onSuccess={onSuccess} />
      )}
    </div>
  );
}
