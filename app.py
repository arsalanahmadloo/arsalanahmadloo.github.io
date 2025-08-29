from flask import Flask, request, jsonify, render_template_string
import telebot

app = Flask(__name__)
bot = None

# HTML سایت
index_html = """
<!DOCTYPE html>
<html lang="fa">
<head>
  <meta charset="UTF-8">
  <title>پنل مدیریت ربات تلگرام</title>
  <style>
    body {
      font-family: Tahoma, sans-serif;
      background: #f4f4f9;
      direction: rtl;
      text-align: center;
      padding: 20px;
    }
    h1 { color: #222; }
    .box {
      background: white;
      padding: 20px;
      margin: 20px auto;
      border-radius: 15px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.2);
      max-width: 450px;
    }
    input, button {
      padding: 10px;
      margin: 5px 0;
      width: 90%;
      border-radius: 10px;
      border: 1px solid #ccc;
      font-size: 14px;
    }
    button {
      background: #007bff;
      color: white;
      cursor: pointer;
      transition: 0.3s;
    }
    button:hover { background: #0056b3; }
    .result { margin-top: 10px; font-weight: bold; }
    #resultToken { color: green; }
    #resultMessage { color: darkblue; }
  </style>
</head>
<body>

  <h1>پنل مدیریت ربات تلگرام</h1>

  <div class="box">
    <h3>تنظیم توکن</h3>
    <input type="text" id="token" placeholder="توکن ربات را وارد کنید">
    <button onclick="setToken()">ذخیره توکن</button>
    <div id="resultToken" class="result"></div>
  </div>

  <div class="box" id="msgBox" style="display:none;">
    <h3>ارسال پیام</h3>
    <input type="text" id="chatId" placeholder="آیدی عددی یا یوزرنیم">
    <input type="text" id="message" placeholder="متن پیام">
    <button onclick="sendMessage()">ارسال پیام</button>
    <div id="resultMessage" class="result"></div>
  </div>

  <script>
    let apiBase = window.location.origin;

    function setToken() {
      let token = document.getElementById("token").value;
      if(!token) { alert("توکن را وارد کنید!"); return; }
      fetch(apiBase + "/set_token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: token })
      })
      .then(res => res.json())
      .then(data => {
        document.getElementById("resultToken").innerText = "✅ " + data.message;
        if (data.status === "ok") document.getElementById("msgBox").style.display = "block";
      })
      .catch(err => alert("❌ خطا در اتصال به سرور"));
    }

    function sendMessage() {
      let chatId = document.getElementById("chatId").value;
      let message = document.getElementById("message").value;
      if(!chatId || !message) { alert("آیدی و متن پیام را پر کنید"); return; }

      fetch(apiBase + "/send_message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message })
      })
      .then(res => res.json())
      .then(data => {
        document.getElementById("resultMessage").innerText = "📩 " + data.message;
      })
      .catch(err => alert("❌ خطا در ارسال پیام"));
    }
  </script>

</body>
</html>
"""

@app.route("/")
def home():
    return render_template_string(index_html)

@app.route("/set_token", methods=["POST"])
def set_token():
    global bot
    data = request.json
    token = data.get("token")
    try:
        bot = telebot.TeleBot(token)
        return jsonify({"status": "ok", "message": "توکن تنظیم شد ✅"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

@app.route("/send_message", methods=["POST"])
def send_message():
    global bot
    if bot is None:
        return jsonify({"status": "error", "message": "❌ اول توکن را ست کن!"})
    data = request.json
    chat_id = data.get("chat_id")
    text = data.get("text")
    try:
        bot.send_message(chat_id, text)
        return jsonify({"status": "ok", "message": "پیام ارسال شد 📩"})
    except Exception as e:
        return jsonify({"status": "error", "message": str(e)})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
