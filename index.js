import TelegramBot from "node-telegram-bot-api";
import { ADMIN_CHAT_ID, formatInfoMsg, greetingMsg, invalidLinksMsg, notALinkMsg, validLinkMsg } from "./constants.js";
import { validateLink } from "./utils.js";

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

bot.on("message", ({ text, from: { first_name, last_name, username }, chat: { id }, reply_to_message }) => {
  console.log(reply_to_message);
  if (id === Number(ADMIN_CHAT_ID)) {
    const arrOfSpltByNewLine = reply_to_message.text.split(`\n`);
    const userToBeReplied = arrOfSpltByNewLine[arrOfSpltByNewLine.length - 1];
    bot.sendMessage(userToBeReplied, text);
    return;
  }
  if (text[0] === "/") return;
  let responseMessage = notALinkMsg;
  if (validateLink(text)) {
    responseMessage = validLinkMsg;
    bot.sendMessage(ADMIN_CHAT_ID, `${text}\n\n${first_name} ${last_name}\n@${username}\n${id}`);
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
