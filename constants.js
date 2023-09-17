export const YOUTUBE_REGEXP =
  /(?:http?s?:\/\/)?(?:www.)?(?:m.)?(?:music.)?youtu(?:\.?be)(?:\.com)?(?:(?:\w*.?:\/\/)?\w*.?\w*-?.?\w*\/(?:embed|e|v|watch|.*\/)?\??(?:feature=\w*\.?\w*)?&?(?:v=)?\/?)([\w\d_-]{11})(?:\S+)?/gm;
export const YOUTUBE_SAFEGUARD_REGEXP =
  /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/gm;
// export const SOUNDCLOUD_REGEXP = /^(?:https?:\/\/)((?:www\.)|(?:m\.))?soundcloud\.com\/[a-z0-9](?!.*?(-|_){2})[\w-]{1,23}[a-z0-9](?:\/.+)?$/gm;
export const SOUNDCLOUD_REGEXP = /^https?:\/\/((on\.)?soundcloud\.com)\/(.*)$/gm;
// export const SPOTIFY_REGEXP = /^(?:https:\/\/open\.spotify\.com|spotify)\/(track|playlist)/gm;
export const SPOTIFY_REGEXP = /(?:https:\/\/open\.spotify\.com|spotify)\/(track\/|playlist\/)[a-zA-Z0-9]+(\?si=)[a-zA-Z0-9]+|(?:https:\/\/spotify\.link)\/([a-zA-Z0-9]+)/gm;

export const greetingMsg = `Привіт!
Я - музичний агент Посвяти ФІТ 2023 😎`;
export const formatInfoMsg = `Кидай мені посилання на улюблений трек із Spotify, SoundCloud або YouTube Music (в крайньому випадку - просто лінк на муз. відео з YouTube), і можливо саме під твої треки ми будемо запалювати посвяту! 💃

Якщо маєш більше 3-х крутих треків - збери їх, будь ласка, в один плейліст і кидай посилання саме на нього :)

Ось приклади валідних посилань, як орієнтир:
► https://open.spotify.com/track/5InNoJxaUQK1jkxQEF2l2Q?si=4c581b8597284466
► https://music.youtube.com/watch?v=BLcqj8w2vZ4&si=PBQlb_7uozL_5j6v
► https://soundcloud.com/tol1kebol1k/fluff-kisa
► https://www.youtube.com/watch?v=CtwEm71Tn8M`;
export const invalidLinksMsg = `вибачте, це посилання не підтримується
звіртеся з допустимими форматами (/format_info)`;
export const notALinkMsg = `вибачте, ми приймаємо тільки посилання
можете звіритися з допустимими форматами (/format_info)`;
export const validLinkMsg = `ваше повідомлення було переслано!
дякуємо за внесок і сподіваємося саме ваші треки зберуть повний танцпол`;
// admin chat only message so leaving it untranslated
export const textOnlyMessagesMsg = `Text messages only!`;

export const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;
