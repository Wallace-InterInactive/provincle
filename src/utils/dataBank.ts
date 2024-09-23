import { PotCode, PotData, MultiLangName } from "../types/data.ts";
import i18n from "../utils/i18n.ts";

// data sources
// - https://en.wikipedia.org/wiki/Geography_of_Canada
// - https://en.wikipedia.org/wiki/Provinces_and_territories_of_Canada
// - https://latlong.info/canada/alberta#info
// - https://alliancevisas.com/canada-and-its-provinces/
// - https://www.sporcle.com/blog/2018/12/interesting-facts-about-canadian-provinces/
// - https://www.cntraveler.com/stories/2013-06-10/mount-thor-canada-maphead-ken-jennings
// - https://history.howstuffworks.com/world-history/canadian-provinces.htm
// - https://en.wikipedia.org/wiki/List_of_highest_points_of_Canadian_provinces_and_territories
// - https://www.google.com/maps/search/?api=1&query=<lat>,<lng>

const dataBank: Record<PotCode, PotData> = {
  on: {
    name: {
      en: "Ontario",
      fr: "Ontario",
    },
    neighbors: ["nu", "qc", "mb"],
    capital: {
      en: "Toronto",
      fr: "Toronto",
    },
    coordinates: {
      latitude: 49.25,
      longitude: -84.5,
    },
    population: 15996989,
    largestCities: [
      { name: "city_toronto", population: 0 },
      { name: "city_ottawa", population: 0 },
      { name: "city_mississauga", population: 0 },
      { name: "city_brampton", population: 0 },
    ],
    interestingFacts: [
      "home of the world's longest street",
      "it borders the most US states (5)",
      "the nickel capital of the world",
      "world largest skating rink",
    ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
  },
  qc: {
    name: {
      en: "Quebec",
      fr: "Québec",
    },
    neighbors: ["nu", "nl", "pe", "nb", "on"],
    capital: {
      en: "Quebec City",
      fr: "Ville de Québec",
    },
    coordinates: {
      latitude: 52,
      longitude: -72,
    },
    population: 9030684,
    largestCities: [
      { name: "city_montreal", population: 0 },
      { name: "city_quebec", population: 0 },
      { name: "city_gatineau", population: 0 },
      { name: "city_sherbrooke", population: 0 },
    ],
    interestingFacts: [
      "largest province",
      "home to 72% of world's maple syrup production",
    ],
    highestPoint: "Mont D'Iberville 1652m",
    coastlineInKM: 13000,
  },
  ns: {
    name: {
      en: "Nova Scotia",
      fr: "Nouvelle-Écosse",
    },
    neighbors: ["nl", "nb", "pe"],
    capital: {
      en: "Halifax",
      fr: "Halifax",
    },
    coordinates: {
      latitude: 45,
      longitude: -63,
    },
    population: 1072545,
    largestCities: [
      { name: "city_halifax", population: 0 },
      { name: "city_cape_breton", population: 0 },
      { name: "city_truro", population: 0 },
      { name: "city_new_glasgow", population: 0 },
    ],
    interestingFacts: [
      "home to world's highest tides",
      "home to Sable Island, the graveyard of the Atlantic",
    ],
    highestPoint: "White Hill 532m",
    coastlineInKM: 7579,
  },
  nb: {
    name: {
      en: "New Brunswick",
      fr: "Nouveau-Brunswick",
    },
    neighbors: ["pe", "ns", "qc"],
    capital: {
      en: "Fredericton",
      fr: "Fredericton",
    },
    coordinates: {
      latitude: 46.5,
      longitude: -66,
    },
    population: 850894,
    largestCities: [
      { name: "city_moncton", population: 0 },
      { name: "city_fredericton", population: 0 },
      { name: "city_saint_John", population: 0 },
      { name: "city_quispamsis", population: 0 },
    ],
    interestingFacts: [
      "the only bilingual province",
      "83% is covered in forest",
    ],
    highestPoint: "Mount Carleton 817m",
    coastlineInKM: 5500,
  },
  mb: {
    name: {
      en: "Manitoba",
      fr: "Manitoba",
    },
    neighbors: ["nu", "on", "sk"],
    capital: {
      en: "Winnipeg",
      fr: "Winnipeg",
    },
    coordinates: {
      latitude: 55,
      longitude: -97,
    },
    population: 1484135,
    largestCities: [
      { name: "city_winnipeg", population: 0 },
      { name: "city_brandon", population: 0 },
      { name: "city_steinbach", population: 0 },
      { name: "city_winkler", population: 0 },
    ],
    interestingFacts: [
      "the lowest population density",
      "there are over 100 000 lakes, 90% nameless",
      "polar bear capital of the world",
    ],
    highestPoint: "Baldy Mountain 832m",
    coastlineInKM: 1210,
  },
  bc: {
    name: {
      en: "British Columbia",
      fr: "Colombie-Britannique",
    },
    neighbors: ["yt", "nt", "ab"],
    capital: {
      en: "Victoria",
      fr: "Victoria",
    },
    coordinates: {
      latitude: 54,
      longitude: -125,
    },
    population: 5646467,
    largestCities: [
      { name: "city_vancouver", population: 0 },
      { name: "city_victoria", population: 0 },
      { name: "city_kelowna", population: 0 },
      { name: "city_abbotsford", population: 0 },
    ],
    interestingFacts: [
      "home of World's tallest tree",
      "hosted the Olympics in 2010",
    ],
    highestPoint: "Mount Fairweather 4663m",
    coastlineInKM: 27200,
  },
  pe: {
    name: {
      en: "Prince Edward Island",
      fr: "Île-du-Prince-Édouard",
    },
    neighbors: ["qc", "nl", "ns", "nb"],
    capital: {
      en: "Charlottetown",
      fr: "Charlottetown",
    },
    coordinates: {
      latitude: 46.4,
      longitude: -63.2,
    },
    population: 177081,
    largestCities: [
      { name: "city_charlottetown", population: 0 },
      { name: "city_summerside", population: 0 },
      { name: "city_montague", population: 0 },
      { name: "city_kensington", population: 0 },
    ],
    interestingFacts: [
      "smallest province (5660km2)",
      "inspite the name it includes 232 islands",
      "has the most lighthouses (63)",
    ],
    highestPoint: "Unnamed point 142m",
    coastlineInKM: 1260,
  },
  sk: {
    name: {
      en: "Saskatchewan",
      fr: "Saskatchewan",
    },
    neighbors: ["nt", "nu", "mb", "ab"],
    capital: {
      en: "Regina",
      fr: "Regina",
    },
    coordinates: {
      latitude: 54.5,
      longitude: -106.000556,
    },
    population: 1231043,
    largestCities: [
      { name: "city_saskatoon", population: 0 },
      { name: "city_regina", population: 0 },
      { name: "city_prince_albert", population: 0 },
      { name: "city_moose_jaw", population: 0 },
    ],
    interestingFacts: [
      "home to held the world's potash reserves",
      "Cree is the 2nd most spoken language",
    ],
    highestPoint: "Unnamed Point 1392m",
    coastlineInKM: 0,
  },
  ab: {
    name: {
      en: "Alberta",
      fr: "Alberta",
    },
    neighbors: ["nt", "sk", "bc"],
    capital: {
      en: "Edmonton",
      fr: "Edmonton",
    },
    coordinates: {
      latitude: 54.5,
      longitude: -114.376667,
    },
    population: 4849906,
    largestCities: [
      { name: "city_calgary", population: 0 },
      { name: "city_edmonton", population: 0 },
      { name: "city_red_deer", population: 0 },
      { name: "city_lethbridge", population: 0 },
    ],
    interestingFacts: [
      "has the most lakes",
      "over half the population lives in two cities",
      "has oldest national park",
    ],
    highestPoint: "Mount Columbia 3747m",
    coastlineInKM: 0,
  },
  nl: {
    name: {
      en: "Newfoundland and Labrador",
      fr: "Terre-Neuve-et-Labrador",
    },
    neighbors: ["nu", "ns", "pe", "qc"],
    capital: {
      en: "St. John's",
      fr: "St. John's",
    },
    coordinates: {
      latitude: 53.23,
      longitude: -59.999167,
    },
    population: 541391,
    largestCities: [
      { name: "city_st_johns", population: 0 },
      { name: "city_corner_brook", population: 0 },
      { name: "city_grand_falls_windsor", population: 0 },
      { name: "city_gander", population: 0 },
    ],
    interestingFacts: [
      "easternmost province",
      "the last province to join Canada",
      "oldest city in Canada, since 1519",
      "home to world's first trans atlantic flight",
    ],
    highestPoint: "Mount Caubvick 1652m",
    coastlineInKM: 29000,
  },
  nt: {
    name: {
      en: "Northwest Territories",
      fr: "Territoires du Nord-Ouest",
    },
    neighbors: ["nu", "sk", "ab", "bc", "yt"],
    capital: {
      en: "Yellowknife",
      fr: "Yellowknife",
    },
    coordinates: {
      latitude: 67,
      longitude: -121,
    },
    population: 44920,
    largestCities: [
      { name: "city_yellowknife", population: 0 },
      { name: "city_hay_river", population: 0 },
      { name: "city_inuvik", population: 0 },
      { name: "city_fort_smith", population: 0 },
    ],
    interestingFacts: [
      "It was once french",
      "diamond capital of North America",
    ],
    highestPoint: "Mount Nirvana 2773",
    coastlineInKM: 25000,
  },
  yt: {
    name: {
      en: "Yukon",
      fr: "Yukon",
    },
    neighbors: ["nt", "bc"],
    capital: {
      en: "Whitehorse",
      fr: "Whitehorse",
    },
    coordinates: {
      latitude: 63,
      longitude: -135,
    },
    population: 45750,
    largestCities: [
      { name: "city_whitehorse", population: 0 },
      { name: "city_dawson", population: 0 },
      { name: "city_watson_lake", population: 0 },
      { name: "city_haines_junction", population: 0 },
    ],
    interestingFacts: [
      "there is no sun for 24 hours",
      "there is sun risen for 24 hours",
      "home to highest mountain, Mount Logan 5959m",
    ],
    highestPoint: "Mount Logan, 5959m",
    coastlineInKM: 213,
  },
  nu: {
    name: {
      en: "Nunavut",
      fr: "Nunavut",
    },
    neighbors: ["qc", "nl", "on", "mb", "sk", "nt"],
    capital: {
      en: "Iqaluit",
      fr: "Iqaluit",
    },
    coordinates: {
      latitude: 73,
      longitude: -93,
    },
    population: 40758,
    largestCities: [
      { name: "city_iqaluit", population: 0 },
      { name: "city_rankin_inlet", population: 0 },
      { name: "city_arviat", population: 0 },
      { name: "city_baker_lake", population: 0 },
    ],
    interestingFacts: [
      "did not exist until 1999",
      "home to Mt Thor, the world's steepest cliff",
    ],
    highestPoint: "Barbeau Peek 2616m",
    coastlineInKM: 38000,
  },
};

export function getPotNamesByLang(langCode: string): string[] {
  if (!langCode.startsWith("en") && !langCode.startsWith("fr")) {
    throw new Error("invalid language");
  }
  langCode = langCode.substring(0, 2);
  return Object.values(dataBank).map(
    (entry: PotData) => entry.name[langCode as keyof MultiLangName]
  );
}

export function getPotNameByLang(potCode: PotCode, langCode: string): string {
  if (!langCode.startsWith("en") && !langCode.startsWith("fr")) {
    throw new Error("invalid language");
  }
  langCode = langCode.substring(0, 2);
  return dataBank[potCode as PotCode].name[langCode as keyof MultiLangName];
}

export function getPotName(potCode: PotCode): string {
  return getPotNameByLang(potCode, i18n.language);
}

export function getPotCodeByName(name: string): string {
  for (const [key, val] of Object.entries(dataBank)) {
    if (name === val.name.en || name === val.name.fr) {
      return key as PotCode;
    }
  }
  return "invalid";
}

export function getCapitalsByLang(langCode: string): string[] {
  if (!langCode.startsWith("en") && !langCode.startsWith("fr")) {
    throw new Error("invalid language");
  }
  langCode = langCode.substring(0, 2);
  return Object.values(dataBank).map(
    (entry: PotData) => entry.capital[langCode as keyof MultiLangName]
  );
}

/*
export function getLargestCitiesByLang(langCode: string): string[] {
  if (!langCode.startsWith("en") && !langCode.startsWith("fr")) {
    throw new Error("invalid language");
  }
  langCode = langCode.substring(0, 2);

  const largestCities: string[] = [];

  Object.values(dataBank).forEach((province) => {
    province.largestCities.forEach((city: City) => {
      largestCities.push(city.name[langCode as keyof MultiLangName]);
    });
  });

  return largestCities;
}

export function getCapitalsAndLargestCitiesByLang(langCode: string): string[] {
  const retVal = getCapitalsByLang(langCode);
  getLargestCitiesByLang(langCode).forEach((city: string) => {
    if (!retVal.includes(city)) {
      retVal.push(city);
    }
  });
  return retVal;
}
*/

export const potCodes = Object.keys(dataBank) as PotCode[];
// export const potNamesEn: string[] = getPotNamesByLang("en-ca");
// export const potNamesFr: string[] = getPotNamesByLang("fr-ca");

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

export default dataBank;
