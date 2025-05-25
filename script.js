function enterSite() {
  const mainPass = document.getElementById("main-password").value;
  if (mainPass === "1234") {
    document.getElementById("site-content").classList.remove("hidden");
  } else {
    alert("رمز اشتباهه!");
  }
}

function showAdmin() {
  const adminPass = document.getElementById("admin-password").value;
  if (adminPass === "admin123") {
    document.getElementById("admin-panel").classList.remove("hidden");
  } else {
    alert("دسترسی تنظیمات محدود است!");
  }
}
