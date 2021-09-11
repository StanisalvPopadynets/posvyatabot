import TelegramBot from "node-telegram-bot-api";
import { validateLink } from "./utils.js";

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  let responseMessage = "INVALID";
  if (validateLink(msg.text)) {
    responseMessage = "VALID";
  }

  bot.sendMessage(chatId, responseMessage);
});

bot.on("polling_error", console.log);
