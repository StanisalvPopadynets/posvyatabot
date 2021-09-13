import { SOUNDCLOUD_REGEXP, YOUTUBE_REGEXP, SPOTIFY_REGEXP, YOUTUBE_SAFEGUARD_REGEXP } from "./constants.js";

export const validateLink = (link) => {
  switch (true) {
    case SOUNDCLOUD_REGEXP.test(link):
      SOUNDCLOUD_REGEXP.lastIndex = 0;
      return true;
    case YOUTUBE_REGEXP.test(link):
      YOUTUBE_REGEXP.lastIndex = 0;
      return true;
    case YOUTUBE_SAFEGUARD_REGEXP.test(link):
      YOUTUBE_SAFEGUARD_REGEXP.lastIndex = 0;
      return true;
    case SPOTIFY_REGEXP.test(link):
      SPOTIFY_REGEXP.lastIndex = 0;
      return true;
    default:
      return false;
  }
};
