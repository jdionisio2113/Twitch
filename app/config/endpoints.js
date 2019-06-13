import apiKey from "./apiKey";

export const fetchStreamers = userInput => {
  return `https://api.twitch.tv/kraken/search/channels?client_id=${apiKey}&query=${userInput}&limit=3`;
};

export const liveStreamers = userInput => {
  return `https://api.twitch.tv/kraken/search/streams?client_id=${apiKey}&query=${userInput}&limit=3`;
};
