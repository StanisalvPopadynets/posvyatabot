export const YOUTUBE_REGEXP =
  /(?:http?s?:\/\/)?(?:www.)?(?:m.)?(?:music.)?youtu(?:\.?be)(?:\.com)?(?:(?:\w*.?:\/\/)?\w*.?\w*-?.?\w*\/(?:embed|e|v|watch|.*\/)?\??(?:feature=\w*\.?\w*)?&?(?:v=)?\/?)([\w\d_-]{11})(?:\S+)?/gm;
export const YOUTUBE_SAFEGUARD_REGEXP =
  /(?:https?:\/\/)?(?:www\.)?youtu\.?be(?:\.com)?\/?.*(?:watch|embed)?(?:.*v=|v\/|\/)([\w\-_]+)\&?/gm;
export const SOUNDCLOUD_REGEXP = /^(?:(https?):\/\/)?(?:(?:www|m)\.)?(soundcloud\.com|snd\.sc)\/(.*)$/gm;
export const SPOTIFY_REGEXP = /^(?:https:\/\/open\.spotify\.com|spotify)\/(track|playlist)/gm;

export const greetingMsg =
  "приветствуем в боте предложки музыки для посвяты фит 2021! здесь вы можете предложить музыкальные (и не совсем) композиции на рассмотрение нашим мастерам над музыкой. главное правило что выбрать - что угодно, что вы бы хотели услышать в 3 часа ночи на танцполе со своими собратьями по клятве (это ведь посвята, верно? ;)) ну и разьебать танцпол конечно же :3";
export const formatInfoMsg = `мы рассматриваем ссылки на soundcloud, spotify и youtube music (если нету здесь, то можно просто youtube). если вы хотите скинуть больше пары треков то обьедините их в плейлист.
примеры ссылок:
    треки:
        https://soundcloud.com/chillbabycash/pure
        https://open.spotify.com/track/6nSwJU4SgdIRCnrBju9JKM?si=d34a5bad5cd84f9d
        https://music.youtube.com/watch?v=YHLb_fQJziA&feature=share
        https://youtu.be/x6ujpjHQTh4
        https://www.youtube.com/watch?v=MhGG5u_ELKE
    плейлисты:
        https://soundcloud.com/jose-luis-palomino-morales/sets/brawl-stars
        https://open.spotify.com/playlist/2qpP6Sff1LEqk84SqSKCD1?si=47a9994d0d0f44f3
        https://music.youtube.com/playlist?list=PLunYNvMEosXz61QJHIIcvNVDPmik22mLJ&feature=share
        https://youtube.com/playlist?list=PLunYNvMEosXx7iQoEC6IyE8MxAeAYMEZy
        https://www.youtube.com/watch?v=rmHDhAohJlQ&list=PLD6PdoxCrfx8hpUHnqdca5K6qRumFCWJZ`;
export const invalidLinksMsg = `извините, данная ссылка не поддерживается
сверьтесь с допустимыми форматами (/format_info)`;
export const notALinkMsg = `извините, мы принимаем только ссылки
можете свериться с допустимыми форматами (/format_info)`;
export const validLinkMsg = `ваше сообщение было переслано!
благодарим за вклад и надеемся именно ваши треки соберут полный танцпол`;

export const ADMIN_CHAT_ID = process.env.ADMIN_CHAT_ID;
