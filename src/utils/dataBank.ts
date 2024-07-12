export interface PotData {
  name: string;
  neighbors: string[];
  capital: string[];
}

const dataBank: Record<string, PotData> = {
  on: {
    name: "Ontario",
    neighbors: ["nu", "qc", "mb"],
    capital: ["Toronto"],
  },
  qc: {
    name: "Québec",
    neighbors: ["nu", "nl", "pe", "nb", "on"],
    capital: ["Quebec City", "Ville de Québec"],
  },
  ns: {
    name: "Nova Scotia",
    neighbors: ["nl", "nb", "pe"],
    capital: ["Halifax"],
  },
  nb: {
    name: "New Brunswick",
    neighbors: ["pe", "ns", "qc"],
    capital: ["Fredericton"],
  },
  mb: {
    name: "Manitoba",
    neighbors: ["nu", "on", "sa", "nt"],
    capital: ["Winnipeg"],
  },
  bc: {
    name: "British Columbia",
    neighbors: ["yt", "nt", "ab"],
    capital: ["Victoria"],
  },
  pe: {
    name: "Prince Edward Island",
    neighbors: ["qc", "nl", "ns", "nb"],
    capital: ["Charlottetown"],
  },
  sk: {
    name: "Saskatchewan",
    neighbors: ["nt", "nu", "mb", "ab"],
    capital: ["Regina"],
  },
  ab: {
    name: "Alberta",
    neighbors: ["nt", "sk", "bc"],
    capital: ["Edmonton"],
  },
  nl: {
    name: "Newfoundland and Labrador",
    neighbors: ["nu", "ns", "pe", "qc"],
    capital: ["St. John's"],
  },
  nt: {
    name: "Northwest Territories",
    neighbors: ["nu", "mb", "sa", "ab", "bc", "yt"],
    capital: ["Yellowknife"],
  },
  yt: {
    name: "Yukon",
    neighbors: ["nt", "bc"],
    capital: ["Whitehorse"],
  },
  nu: {
    name: "Nunavut",
    neighbors: ["qc", "nl", "on", "mb", "sk", "nt"],
    capital: ["Iqaluit"],
  },
};

export const potCodes = Object.keys(dataBank);
export const potNames = Object.keys(dataBank).map(
  potCode => dataBank[potCode].name
);

function getCurrentDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}-${month}-${day}`;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    // TODO: replace this ole for loop
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
}

export function getTodaysPotCode(): string {
  const dateString = getCurrentDateString();
  const hash = hashString(dateString);
  const index = Math.abs(hash) % potCodes.length;
  return potCodes[index];
}

export default dataBank;

/*
import jsonData from "../dataBank.json";


// interface DataBank {
//   [key: string]: {
//     name: string;
//     neighbors: string[];
//     capital: string[];
//   };
// }

//function getDayString(): string { return "2024-03-13"; }

const dataBank = jsonData.dataBank;
const codes = Object.keys(jsonData.dataBank);
const potNames = codes.map(code => dataBank[code].name);

const getRandomPotCode = (): string => {
  return codes[Math.floor(Math.random() * codes.length)];
};

// const getNameByPotCode = (code: string): string => {
//   return dataBank[code].name;
// };

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

// const getDataBank = (): DataBank => {
//   return dataBank;
// };

export {
  getTodaysQuiz,
  getRandomQuiz,
  getRandomPotCode,
  // getNameByPotCode,
  // getPotNames,
  dataBank
  // getDataBank,
};
*/
