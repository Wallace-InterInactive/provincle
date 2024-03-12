import jsonData from "../dataBank.json";

const codes: string[] = Object.keys(jsonData["dataBank"]);

const getRandomElement = (): string => {
  return codes[Math.floor(Math.random() * codes.length)];
};

export default getRandomElement;
