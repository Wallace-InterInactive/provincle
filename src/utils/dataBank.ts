import { DirectionsFromTo, PotCode, PotData } from "../types/data.ts";

// data sources
// - https://en.wikipedia.org/wiki/Geography_of_Canada
// - https://en.wikipedia.org/wiki/Provinces_and_territories_of_Canada
// - https://latlong.info/canada/alberta#info
// - https://alliancevisas.com/canada-and-its-provinces/
// - https://www.sporcle.com/blog/2018/12/interesting-facts-about-canadian-provinces/
// - https://www.cntraveler.com/stories/2013-06-10/mount-thor-canada-maphead-ken-jennings
// - https://history.howstuffworks.com/world-history/canadian-provinces.htm
// - https://en.wikipedia.org/wiki/List_of_highest_points_of_Canadian_provinces_and_territories

const dataBank: Record<PotCode, PotData> = {
  on: {
    name: "Ontario",
    neighbors: ["nu", "qc", "mb"],
    capital: ["Toronto"],
    coordinates: {
      latitude: 49.25,
      longitude: -84.5,
    },
    population: 15996989,
    interestingFacts: ["home of the world's longest street", "it borders the most US states (5)", "the nickel capital of the world", "world largest skating rink"],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
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
    interestingFacts: ["largest province", "home to 72% of world's maple syrup production"],
    highestPoint: "Mont D'Iberville 1652m",
    coastlineInKM: 13000,
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
    interestingFacts: ["home to world's highest tides", "home to Sable Island, the graveyard of the Atlantic"],
    highestPoint: "White Hill 532m",
    coastlineInKM: 7579,
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
    interestingFacts: ["the only bilingual province", "83% is covered in forest"],
    highestPoint: "Mount Carleton 817m",
    coastlineInKM: 5500,
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
    interestingFacts: ["the lowest population density", "there are over 100 000 lakes, 90% nameless", "polar bear capital of the world"],
    highestPoint: "Baldy Mountain 832m",
    coastlineInKM: 1210,
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
    interestingFacts: ["home of World's tallest tree", "hosted the Olympics in 2010"],
    highestPoint: "Mount Fairweather 4663m",
    coastlineInKM: 27200,
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
    interestingFacts: ["smallest province (5660km2)", "inspite the name it includes 232 islands", "has the most lighthouses (63)"],
    highestPoint: "Unnamed point 142m",
    coastlineInKM: 1260,
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
    interestingFacts: ["home to held the world's potash reserves"],
    highestPoint: "Unnamed Point 1392m",
    coastlineInKM: 0,
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
    interestingFacts: [ "has the most lakes", "over half the population lives in two cities", "has oldest national park" ],
    highestPoint: "Mount Columbia 3747m",
    coastlineInKM: 0,
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
    interestingFacts: ["easternmost province", "the last province to join Canada", "oldest city in Canada, since 1519", "home to world's first trans atlantic flight"
    ],
    highestPoint: "Mount Caubvick 1652m",
    coastlineInKM: 29000,
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
    interestingFacts: ["It was once french", "diamond capital of North America", ],
    highestPoint: "Mount Nirvana 2773",
    coastlineInKM: 25000,
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
    interestingFacts: ["there is no sun for 24 hours", "there is sun risen for 24 hours", "home to highest mountain, Mount Logan 5959m"],
    highestPoint: "Mount Logan, 5959m",
    coastlineInKM: 213,
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
    interestingFacts: ["did not exist until 1999", "home to Mt Thor, the world's steepest cliff"],
    highestPoint: "Barbeau Peek 2616m",
    coastlineInKM: 38000,
  },
};

export const potCodes = Object.keys(dataBank) as PotCode[];
export const potNames = (Object.keys(dataBank) as PotCode[]).map(
  (potCode: PotCode) => dataBank[potCode].name
);

export function getPotCode(potName: string): string {
  for (const [key, data] of Object.entries(dataBank)) {
    if (data.name === potName) {
      return key;
    }
  }
  return "invalid";
}

export function getCurrentDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();
  return `${year}-0${month}-0${day}`;
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

export function getPseudoRandomNumber(): number {
  const dateString = getCurrentDateString();
  const hash = hashString(dateString);
  return Math.abs(hash);
}

export function getTodaysPotCodeIndex(): number {
  const dateString = getCurrentDateString();
  const hash = hashString(dateString);
  return Math.abs(hash) % potCodes.length;
}

export function getTodaysPotCode(): string {
  return potCodes[getTodaysPotCodeIndex()];
}

export function getPseudoRandomPotCode(n: number): string {
  const idx2 = (getTodaysPotCodeIndex() + n) % potCodes.length; // TODO: improve or delete
  return potCodes[idx2];
}

export const directionsFromTo: DirectionsFromTo = {
  on: {
    qc: "E",
    ns: "E",
    nb: "E",
    mb: "W",
    bc: "W",
    pe: "W",
    sk: "W",
    ab: "W",
    nl: "NE",
    nt: "NW",
    yt: "NW",
    nu: "NW",
  },
  qc: {
    on: "W",
    ns: "E",
    nb: "E",
    mb: "W",
    bc: "W",
    pe: "E",
    sk: "W",
    ab: "W",
    nl: "NE",
    nt: "NW",
    yt: "NW",
    nu: "NW",
  },
  ns: {
    on: "W",
    qc: "W",
    nb: "W",
    mb: "W",
    bc: "W",
    pe: "N",
    sk: "W",
    ab: "W",
    nl: "N",
    nt: "NW",
    yt: "NW",
    nu: "NW",
  },
  nb: {
    on: "W",
    qc: "W",
    ns: "E",
    mb: "W",
    bc: "W",
    pe: "NE",
    sk: "W",
    ab: "W",
    nl: "N",
    nt: "NW",
    yt: "NW",
    nu: "NW",
  },
  mb: {
    on: "E",
    qc: "E",
    ns: "E",
    nb: "E",
    bc: "W",
    pe: "E",
    sk: "W",
    ab: "W",
    nl: "NE",
    nt: "NW",
    yt: "NW",
    nu: "N",
  },
  bc: {
    on: "E",
    qc: "E",
    ns: "E",
    nb: "E",
    mb: "E",
    pe: "E",
    sk: "E",
    ab: "E",
    nl: "NE",
    nt: "NE",
    yt: "NW",
    nu: "NE",
  },
  pe: {
    on: "W",
    qc: "W",
    ns: "S",
    nb: "SW",
    mb: "W",
    bc: "W",
    sk: "W",
    ab: "W",
    nl: "N",
    nt: "NW",
    yt: "NW",
    nu: "NW",
  },
  sk: {
    on: "E",
    qc: "E",
    ns: "E",
    nb: "E",
    mb: "E",
    bc: "W",
    pe: "E",
    ab: "W",
    nl: "NE",
    nt: "NW",
    yt: "NW",
    nu: "NE",
  },
  ab: {
    on: "E",
    qc: "E",
    ns: "E",
    nb: "E",
    mb: "E",
    bc: "W",
    pe: "E",
    sk: "E",
    nl: "NE",
    nt: "N",
    yt: "NW",
    nu: "NE",
  },
  nl: {
    on: "SW",
    qc: "SW",
    ns: "S",
    nb: "S",
    mb: "SW",
    bc: "SW",
    pe: "S",
    sk: "SW",
    ab: "SW",
    nt: "NW",
    yt: "NW",
    nu: "NW",
  },
  nt: {
    on: "SE",
    qc: "SE",
    ns: "SE",
    nb: "SE",
    mb: "SE",
    bc: "SW",
    pe: "SE",
    sk: "SE",
    ab: "S",
    nl: "SE",
    yt: "W",
    nu: "E",
  },
  yt: {
    on: "SE",
    qc: "SE",
    ns: "SE",
    nb: "SE",
    mb: "SE",
    bc: "SE",
    pe: "SE",
    sk: "SE",
    ab: "SE",
    nl: "SE",
    nt: "E",
    nu: "E",
  },
  nu: {
    on: "SE",
    qc: "SE",
    ns: "SE",
    nb: "SE",
    mb: "S",
    bc: "SW",
    pe: "SE",
    sk: "SW",
    ab: "SW",
    nl: "SE",
    nt: "W",
    yt: "W",
  },
};

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
