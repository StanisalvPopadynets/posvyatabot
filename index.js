import TelegramBot from "node-telegram-bot-api";
import { ADMIN_CHAT_ID, formatInfoMsg, greetingMsg, invalidLinksMsg, notALinkMsg, validLinkMsg } from "./constants.js";
import db from "./db.js";
import { validateLink } from "./utils.js";

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const bannedTable = db("banned");

bot.on("message", async ({ text, from: { first_name, last_name, username }, chat: { id }, reply_to_message }) => {
  if (await bannedTable.checkIfBanned(id)) {
    return;
  }
  if (id === Number(ADMIN_CHAT_ID) && reply_to_message) {
    const arrOfSplitByNewLine = reply_to_message.text.split(`\n`);
    const userToBeReplied = arrOfSplitByNewLine[arrOfSplitByNewLine.length - 1];
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

bot.onText(/\/ban/, async ({ chat: { id }, text }) => {
  if (id === Number(ADMIN_CHAT_ID)) {
    const idToBeBanned = text.split(" ")[1];
    const resultMsg = await bannedTable.create(idToBeBanned);
    bot.sendMessage(id, resultMsg);
  }
});

bot.onText(/\/unban/, async ({ chat: { id }, text }) => {
  if (id === Number(ADMIN_CHAT_ID)) {
    const idToBeUnBanned = text.split(" ")[1];
    const resultMsg = await bannedTable.delete(idToBeUnBanned);
    bot.sendMessage(id, resultMsg);
  }
});

bot.on("polling_error", console.log);
