// Todo: extract to separate file and store the file in .gitignore
const apiKey = "t8yaydrbaft3dpp950285vmtcal743";

export const fetchStreamers = userInput => {
  return `https://api.twitch.tv/kraken/search/channels?client_id=${apiKey}&query=${userInput}&limit=5`;
};
