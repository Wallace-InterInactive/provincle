import jsonData from "../dataBank.json";

interface DataBank {
  [key: string]: {
    name: string;
    neighbors: string[];
    capital: string[];
  };
}

//function getDayString(): string { return "2024-03-13"; }

const dataBank: DataBank = jsonData.dataBank;
const codes: string[] = Object.keys(jsonData.dataBank);
const potNames: string[] = codes.map(code => dataBank[code].name);

const getRandomPotCode = (): string => {
  return codes[Math.floor(Math.random() * codes.length)];
};

const getTodaysQuizId = (): number => {
  return 0;
};
const getTodaysQuiz = (): string => {
  return codes[getTodaysQuizId()];
};
const getRandomQuiz = (): string => {
  return codes[Math.floor(Math.random() * codes.length)];
};

const getPotNames = (): string[] => {
  return potNames;
};

const getDataBank = (): DataBank => {
  return dataBank;
};

export {
  getTodaysQuiz,
  getRandomQuiz,
  getRandomPotCode,
  getPotNames,
  getDataBank,
};
