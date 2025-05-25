import telebot
from telebot.types import InlineKeyboardMarkup, InlineKeyboardButton
from dotenv import load_dotenv
import subprocess
import os

load_dotenv()
TOKEN = os.getenv("7585176724:AAGsVZkeKvclGf7pDYe3N6TcdN5UWyu5hiM")

bot = telebot.TeleBot(TOKEN)

@bot.message_handler(commands=['start'])
def start(message):
    markup = InlineKeyboardMarkup()
    markup.row_width = 2
    markup.add(
        InlineKeyboardButton("devices", callback_data="devices"),
        InlineKeyboardButton("dump", callback_data="dump")
    )
    bot.send_message(message.chat.id, "سلام! یکی از دستورات زیر رو انتخاب کن:", reply_markup=markup)

@bot.callback_query_handler(func=lambda call: True)
def callback_query(call):
    cmd = call.data
    try:
        result = subprocess.check_output(f"python3 adbwebkit.py {cmd}", shell=True, stderr=subprocess.STDOUT)
        output = result.decode('utf-8')
        bot.send_message(call.message.chat.id, output if output else "دستور اجرا شد ولی خروجی نداشت.")
    except subprocess.CalledProcessError as e:
        bot.send_message(call.message.chat.id, "خطا:\n" + e.output.decode('utf-8'))

bot.polling()
