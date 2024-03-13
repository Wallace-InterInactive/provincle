import jsonData from "../dataBank.json";

interface DataBank {
  [key: string]: {
    name: string;
    neighbors: string[];
    capital: string[];
  };
}

const dataBank: DataBank = jsonData.dataBank;
const codes: string[] = Object.keys(jsonData.dataBank);
const potNames: string[] = codes.map(code => dataBank[code].name);

const getRandomElement = (): string => {
  return codes[Math.floor(Math.random() * codes.length)];
};

const getPotNames = (): string[] => {
  return potNames;
};

export { getRandomElement, getPotNames };
