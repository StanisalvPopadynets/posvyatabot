import TelegramBot from "node-telegram-bot-api";
import {
  ADMIN_CHAT_ID,
  formatInfoMsg,
  greetingMsg,
  invalidLinksMsg,
  notALinkMsg,
  textOnlyMessagesMsg,
  validLinkMsg,
} from "./constants.js";
import db from "./db.js";
import { validateLink } from "./utils.js";

const token = process.env.TELEGRAM_BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const bannedTable = db("banned");

// bot.on("message", (metadata) => {
//   console.log(getDateTimeString() + metadata);
// })

bot.on(
  "message",
  async ({
    text,
    from: { first_name, last_name, username },
    chat: { id },
    reply_to_message,
  }) => {
    const currentColorScheme = getColorSchemeString();

    if (await bannedTable.checkIfBanned(id)) {
      console.log(currentColorScheme, getDateTimeString() + `[${id}|msg from banned id @${username}]`);
      if (id == "xxx") {
        bot.sendMessage(id, "custom ban msg");
      } else if (id == "xxx") {
        bot.sendMessage(id, "custom ban msg");
      }
      else {
        console.log(currentColorScheme, getDateTimeString() + `[${id}|ignoring...]`);
      }
      return;
    }

    console.log(currentColorScheme, getDateTimeString() + `[${id}|receieving msg from ${first_name} ${last_name || ""} @${username}]\n` +
      ` {${text}}`);

    if (id === Number(ADMIN_CHAT_ID) && reply_to_message) {
      console.log(currentColorScheme, getDateTimeString() + `[${id}|recognised as reply from ADMIN_CHAT_ID]`);
      const arrOfSplitByNewLine = reply_to_message.text.split(`\n`);
      const userToBeReplied =
        arrOfSplitByNewLine[arrOfSplitByNewLine.length - 1];
      if (!text) {
        console.log(currentColorScheme, getDateTimeString() + `[${id}|no text in msg]`);
        bot.sendMessage(ADMIN_CHAT_ID, textOnlyMessagesMsg);
        console.log(currentColorScheme, getDateTimeString() + `[${id}|sent textOnlyMessagesMsg to ${ADMIN_CHAT_ID}]`);
      } else {
        bot.sendMessage(userToBeReplied, text);
        console.log(currentColorScheme, getDateTimeString() + `[${id}|sent msg text to ${userToBeReplied}]`);
      }
      return;
    }

    if (!text) {
      console.log(currentColorScheme, getDateTimeString() + `[${id}|no text in msg]`);
      bot.sendMessage(id, notALinkMsg);
      console.log(currentColorScheme, getDateTimeString() + `[${id}|sent notALinkMsg to ${id}]`);
      return;
    }


    if (text[0] === "/") {
      console.log(currentColorScheme, getDateTimeString() + `[${id}|recognised text as command, ignoring here...]`);
      return;
    }

    let responseMessage = notALinkMsg;
    console.log(currentColorScheme, getDateTimeString() + `[${id}|set responseMessage = notALinkMsg]`);
    if (validateLink(text)) {
      console.log(currentColorScheme, getDateTimeString() + `[${id}|text successfully validated with regex`);
      responseMessage = validLinkMsg;
      console.log(currentColorScheme, getDateTimeString() + `[${id}|set responseMessage = validLinkMsg]`);
      bot.sendMessage(
        ADMIN_CHAT_ID,
        `${text}\n\n${first_name} ${last_name || ""}\n@${username}\n${id}`
      );
      console.log(currentColorScheme, getDateTimeString() + `[${id}|forwarded msg to admin(${ADMIN_CHAT_ID})]`);
    } else {
      console.log(currentColorScheme, getDateTimeString() + `[${id}|text not validated with regex]`);
      if (/http/.test(text)) {
        console.log(currentColorScheme, getDateTimeString() + `[${id}|text is an http link]`);
        responseMessage = invalidLinksMsg;
        console.log(currentColorScheme, getDateTimeString() + `[${id}|set responseMessage = invalidLinksMsg]`);
      }
      console.log(currentColorScheme, getDateTimeString() + `[${id}|text is not an http link]`);
    }
    bot.sendMessage(id, responseMessage);
    console.log(currentColorScheme, getDateTimeString() + `[${id}|sent responseMessage to ${id}]`);
  }
);

bot.onText(/\/start/, ({ chat: { id } }) => {
  const currentColorScheme = getColorSchemeString();

  console.log(currentColorScheme, getDateTimeString() + `[${id}|receieved /start command]`);
  bot.sendMessage(id, greetingMsg).then(() => {
    console.log(currentColorScheme, getDateTimeString() + `[${id}|sent greetingMsg to ${id}]`);
    bot.sendMessage(id, formatInfoMsg);
    console.log(currentColorScheme, getDateTimeString() + `[${id}|sent formatInfoMsg to ${id}]`);
  });
});

bot.onText(/\/format_info/, ({ chat: { id } }) => {
  const currentColorScheme = getColorSchemeString();

  console.log(currentColorScheme, getDateTimeString() + `[${id}|receieved /format_info command]`);
  bot.sendMessage(id, formatInfoMsg);
  console.log(currentColorScheme, getDateTimeString() + `[${id}|sent formatInfoMsg to ${id}]`);
});

bot.onText(/\/ban/, async ({ chat: { id }, text }) => {
  const currentColorScheme = getColorSchemeString();

  console.log(currentColorScheme, getDateTimeString() + `[${id}|receieved /ban command]`);
  if (id === Number(ADMIN_CHAT_ID)) {
    console.log(currentColorScheme, getDateTimeString() + `[${id}|successfull check for ADMIN_CHAT_ID]`);

    const idToBeBanned = text.split(" ")[1];
    console.log(currentColorScheme, getDateTimeString() + `[${id}|ban for id:${idToBeBanned}]`)

    const resultMsg = await bannedTable.create(idToBeBanned);

    console.log(currentColorScheme, getDateTimeString() + `[${id}|${resultMsg}]`)
    bot.sendMessage(id, resultMsg);
  } else {
    console.log(currentColorScheme, getDateTimeString() + `[${id}|unsuccessfull check for ADMIN_CHAT_ID]`);
  }
});

bot.onText(/\/unban/, async ({ chat: { id }, text }) => {
  const currentColorScheme = getColorSchemeString();

  console.log(currentColorScheme, getDateTimeString() + `[${id}|receieved /unban command]`);
  if (id === Number(ADMIN_CHAT_ID)) {
    console.log(currentColorScheme, getDateTimeString() + `[${id}|successfull check for ADMIN_CHAT_ID]`);

    const idToBeUnBanned = text.split(" ")[1];
    console.log(currentColorScheme, getDateTimeString() + `[${id}|unban for id:${idToBeUnBanned}]`)

    const resultMsg = await bannedTable.delete(idToBeUnBanned);

    console.log(currentColorScheme, getDateTimeString() + `[${id}|${resultMsg}]`)
    bot.sendMessage(id, resultMsg);
  } else {
    console.log(currentColorScheme, getDateTimeString() + `[${id}|unsuccessfull check for ADMIN_CHAT_ID]`);
  }
});

bot.on("polling_error", console.log);

// custom functions

function getDateTimeString() {
  var currentdate = new Date();
  return `(${currentdate.getDate()}.${currentdate.getMonth() + 1}-${currentdate.getHours()}:${currentdate.getMinutes()}:${currentdate.getSeconds()})`;
}


var colorSchemesCounter = -1;

function getColorSchemeString() {
  const colorSchemes = ["\x1b[32m", "\x1b[33m", "\x1b[34m", "\x1b[35m", "\x1b[36m"];
  colorSchemesCounter = (colorSchemesCounter + 1) % colorSchemes.length;
  return colorSchemes[colorSchemesCounter];
}