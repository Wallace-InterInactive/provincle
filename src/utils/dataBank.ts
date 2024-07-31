export type GameRoundStatus = "won" | "lost" | "pending";

// data sources
// - https://en.wikipedia.org/wiki/Geography_of_Canada
// - https://en.wikipedia.org/wiki/Provinces_and_territories_of_Canada
// - https://latlong.info/canada/alberta#info

export type CardinalDirection =
  | "*"
  | "N"
  | "W"
  | "S"
  | "E"
  | "NW"
  | "NE"
  | "SW"
  | "SE";

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface PotData {
  name: string;
  neighbors: string[];
  capital: string[];
  coordinates: Coordinates;
  population: number;
}

const dataBank: Record<string, PotData> = {
  on: {
    name: "Ontario",
    neighbors: ["nu", "qc", "mb"],
    capital: ["Toronto"],
    coordinates: {
      latitude: 49.25,
      longitude: -84.5,
    },
    population: 15996989,
  },
  qc: {
    name: "Québec",
    neighbors: ["nu", "nl", "pe", "nb", "on"],
    capital: ["Quebec City", "Ville de Québec"],
    coordinates: {
      latitude: 52,
      longitude: -72,
    },
    population: 9030684,
  },
  ns: {
    name: "Nova Scotia",
    neighbors: ["nl", "nb", "pe"],
    capital: ["Halifax"],
    coordinates: {
      latitude: 45,
      longitude: -63,
    },
    population: 1072545,
  },
  nb: {
    name: "New Brunswick",
    neighbors: ["pe", "ns", "qc"],
    capital: ["Fredericton"],
    coordinates: {
      latitude: 46.5,
      longitude: -66,
    },
    population: 850894,
  },
  mb: {
    name: "Manitoba",
    neighbors: ["nu", "on", "sa", "nt"],
    capital: ["Winnipeg"],
    coordinates: {
      latitude: 55,
      longitude: -97,
    },
    population: 1484135,
  },
  bc: {
    name: "British Columbia",
    neighbors: ["yt", "nt", "ab"],
    capital: ["Victoria"],
    coordinates: {
      latitude: 54,
      longitude: -125,
    },
    population: 5646467,
  },
  pe: {
    name: "Prince Edward Island",
    neighbors: ["qc", "nl", "ns", "nb"],
    capital: ["Charlottetown"],
    coordinates: {
      latitude: 46.4,
      longitude: -63.2,
    },
    population: 177081,
  },
  sk: {
    name: "Saskatchewan",
    neighbors: ["nt", "nu", "mb", "ab"],
    capital: ["Regina"],
    coordinates: {
      latitude: 54,
      longitude: -106.000556,
    },
    population: 1231043,
  },
  ab: {
    name: "Alberta",
    neighbors: ["nt", "sk", "bc"],
    capital: ["Edmonton"],
    coordinates: {
      latitude: 55.991667,
      longitude: -114.376667,
    },
    population: 4849906,
  },
  nl: {
    name: "Newfoundland and Labrador",
    neighbors: ["nu", "ns", "pe", "qc"],
    capital: ["St. John's"],
    coordinates: {
      latitude: 53.23,
      longitude: -59.999167,
    },
    population: 541391,
  },
  nt: {
    name: "Northwest Territories",
    neighbors: ["nu", "mb", "sa", "ab", "bc", "yt"],
    capital: ["Yellowknife"],
    coordinates: {
      latitude: 67,
      longitude: -121,
    },
    population: 44920,
  },
  yt: {
    name: "Yukon",
    neighbors: ["nt", "bc"],
    capital: ["Whitehorse"],
    coordinates: {
      latitude: 63,
      longitude: -135,
    },
    population: 45750,
  },
  nu: {
    name: "Nunavut",
    neighbors: ["qc", "nl", "on", "mb", "sk", "nt"],
    capital: ["Iqaluit"],
    coordinates: {
      latitude: 70.166667,
      longitude: -90.733333,
    },
    population: 40758,
  },
};

export const potCodes = Object.keys(dataBank);
export const potNames = Object.keys(dataBank).map(
  potCode => dataBank[potCode].name
);

export function getPotCode(potName: string): string {
  let ret: string = "invalid";
  for (const [key, data] of Object.entries(dataBank)) {
    if (data.name === potName) {
      return key;
    }
  }
  return ret;
}

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

export function getTodaysPotCodeIndex(): number {
  const dateString = getCurrentDateString();
  const hash = hashString(dateString);
  const index = Math.abs(hash) % potCodes.length;
  return index;
}
export function getTodaysPotCode(): string {
  return potCodes[getTodaysPotCodeIndex()];
}

export function getPseudoRandomPotCode(n: number): string {
  const idx2 = (getTodaysPotCodeIndex() + n) % potCodes.length;
  return potCodes[idx2];
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