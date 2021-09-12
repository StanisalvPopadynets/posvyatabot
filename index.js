import TelegramBot from "node-telegram-bot-api";
import { formatInfoMsg, greetingMsg, invalidLinksMsg, notALinkMsg, validLinkMsg } from "./constants.js";
import { validateLink } from "./utils.js";

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", ({ text, chat: { id } }) => {
  if (text[0] === "/") return;
  let responseMessage = notALinkMsg;
  if (validateLink(text)) {
    responseMessage = validLinkMsg;
  } else {
    if (/http/.test(text)) {
      responseMessage = invalidLinksMsg;
    }
  }

  bot.sendMessage(id, responseMessage);
});

bot.onText(/\/start/, ({ chat: { id } }) => {
  bot.sendMessage(id, greetingMsg);
});

bot.onText(/\/format_info/, ({ chat: { id } }) => {
  bot.sendMessage(id, formatInfoMsg);
});

bot.on("polling_error", console.log);
