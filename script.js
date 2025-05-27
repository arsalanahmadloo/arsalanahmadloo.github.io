// script.js

// پینگ آی‌پی (نمایشی - واقعی نیست چون JS محدودیت داره)
function runPing() {
  const ip = document.getElementById('ping-ip').value.trim();
  const resultEl = document.getElementById('ping-result');
  if (!ip) {
    resultEl.textContent = 'لطفاً یک آی‌پی معتبر وارد کنید.';
    return;
  }
  resultEl.textContent = `پینگ به ${ip} در حال اجرا...\n`;
  let count = 0;
  let interval = setInterval(() => {
    count++;
    let time = (Math.random() * 100).toFixed(2);
    resultEl.textContent += `Reply from ${ip}: time=${time}ms\n`;
    if (count === 5) {
      clearInterval(interval);
      resultEl.textContent += 'پینگ تمام شد.';
    }
  }, 700);
}

// هش‌ساز MD5 / SHA1 / SHA256 با crypto-js
function generateHash() {
  const input = document.getElementById('hash-input').value;
  const type = document.getElementById('hash-type').value;
  const resultEl = document.getElementById('hash-result');
  if (!input) {
    resultEl.textContent = 'لطفاً متنی وارد کنید.';
    return;
  }
  let hash;
  switch (type) {
    case 'MD5':
      hash = CryptoJS.MD5(input).toString();
      break;
    case 'SHA1':
      hash = CryptoJS.SHA1(input).toString();
      break;
    case 'SHA256':
      hash = CryptoJS.SHA256(input).toString();
      break;
  }
  resultEl.textContent = `${type} hash:\n${hash}`;
}

// نمایش اطلاعات مرورگر و سیستم
function showSystemInfo() {
  const resultEl = document.getElementById('sysinfo-result');
  let info = '';
  info += `User Agent: ${navigator.userAgent}\n`;
  info += `Platform: ${navigator.platform}\n`;
  info += `Language: ${navigator.language}\n`;
  info += `Online: ${navigator.onLine}\n`;
  info += `Cookies Enabled: ${navigator.cookieEnabled}\n`;
  info += `Screen Resolution: ${screen.width}x${screen.height}\n`;
  info += `Color Depth: ${screen.colorDepth}\n`;
  resultEl.textContent = info;
}

// شبیه‌ساز حمله DDoS (نمایشی)
function fakeDdos() {
  const resultEl = document.getElementById('ddos-result');
  resultEl.textContent = 'شروع حمله DDoS...\n';
  let count = 0;
  const target = '192.168.1.1';
  const interval = setInterval(() => {
    count++;
    resultEl.textContent += `فرستادن درخواست به ${target}... ${count}\n`;
    resultEl.scrollTop = resultEl.scrollHeight;
    if (count >= 30) {
      clearInterval(interval);
      resultEl.textContent += 'حمله متوقف شد (نمایشی).';
    }
  }, 200);
}

// اسکن پورت (نمایشی)
function scanPorts() {
  const ip = document.getElementById('scan-ip').value.trim();
  const resultEl = document.getElementById('scan-result');
  if (!ip) {
    resultEl.textContent = 'لطفاً آی‌پی وارد کنید.';
    return;
  }
  resultEl.textContent = `اسکن پورت‌های ${ip} در حال اجرا...\n`;
  let ports = [21, 22, 80, 443, 8080];
  let openPorts = [];
  let i = 0;
  function scanNext() {
    if (i >= ports.length) {
      resultEl.textContent += `پورت‌های باز: ${openPorts.join(', ') || 'هیچکدام'}\nاسکن تمام شد.`;
      return;
    }
    let port = ports[i];
    let isOpen = Math.random() > 0.5; // شبیه‌سازی باز یا بسته بودن پورت
    resultEl.textContent += `پورت ${port}: ${isOpen ? 'باز' : 'بسته'}\n`;
    if (isOpen) openPorts.push(port);
    i++;
    setTimeout(scanNext, 500);
  }
  scanNext();
}

// آی‌پی‌یاب (نمایشی)
function geoipLookup() {
  const ip = document.getElementById('geoip-input').value.trim();
  const resultEl = document.getElementById('geoip-result');
  if (!ip) {
    resultEl.textContent = 'لطفاً آی‌پی وارد کنید.';
    return;
  }
  resultEl.textContent = `در حال جستجو برای آی‌پی ${ip}...\n`;
  setTimeout(() => {
    // داده‌های فرضی برای نمایش
    let fakeData = {
      ip: ip,
      country: 'ایران',
      city: 'تهران',
      isp: 'شرکت اینترنتی فرضی',
      lat: '35.6892',
      lon: '51.3890',
    };
    let info = `آی‌پی: ${fakeData.ip}\nکشور: ${fakeData.country}\nشهر: ${fakeData.city}\nISP: ${fakeData.isp}\nعرض جغرافیایی: ${fakeData.lat}\nطول جغرافیایی: ${fakeData.lon}`;
    resultEl.textContent = info;
  }, 1500);
}

// ماشین حساب باینری
function binaryConvert() {
  const input = document.getElementById('bin-calc-input').value.trim();
  const resultEl = document.getElementById('bin-result');
  if (!input || isNaN(input)) {
    resultEl.textContent = 'لطفاً عددی معتبر وارد کنید.';
    return;
  }
  let num = Number(input);
  let binary = num.toString(2);
  resultEl.textContent = `عدد ${num} در مبنای دو برابر است با:\n${binary}`;
}

// تولید رمز عبور قوی
function generatePassword() {
  const length = 16;
  const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    password += charset.charAt(Math.floor(Math.random() * charset.length));
  }
  const resultEl = document.getElementById('passgen-result');
  resultEl.textContent = `رمز عبور تولید شده:\n${password}`;
}
