import { City, PotCode, PotData, DataBank } from "../types/data.ts";
import {
  MyGeoMapping,
  sanitizeString,
  getTodaysCodeIndex,
  directionEmojiMap,
} from "../utils/utils.ts";
import { calculateAngle, angle15ToDir } from "../utils/geo.ts";
//import { useTranslation } from "react-i18next";
//import i18n from "../utils/i18n.ts";

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

const listOfPotCodes: PotCode[] = [
  // lovas: get it
  "on",
  "qc",
  "ns",
  "nb",
  "mb",
  "bc",
  "pe",
  "sk",
  "ab",
  "nl",
  "nt",
  "yt",
  "nu",
];

const dataBankData: Record<PotCode, PotData> = {
  on: {
    neighbors: ["nu", "qc", "mb"],
    capital: "capital_on",
    coordinates: {
      latitude: 49.25,
      longitude: -84.5,
    },
    population: 15996989,
    largestCities: [
      { key: "city_toronto", population: 0 },
      { key: "city_ottawa", population: 0 },
      { key: "city_mississauga", population: 0 },
      { key: "city_brampton", population: 0 },
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
    neighbors: ["nu", "nl", "pe", "nb", "on"],
    capital: "capital_qc",
    coordinates: {
      latitude: 52,
      longitude: -72,
    },
    population: 9030684,
    largestCities: [
      { key: "city_montreal", population: 0 },
      { key: "city_quebec", population: 0 },
      { key: "city_gatineau", population: 0 },
      { key: "city_sherbrooke", population: 0 },
    ],
    interestingFacts: [
      "largest province",
      "home to 72% of world's maple syrup production",
    ],
    highestPoint: "Mont D'Iberville 1652m",
    coastlineInKM: 13000,
  },
  ns: {
    neighbors: ["nl", "nb", "pe"],
    capital: "capital_ns",
    coordinates: {
      latitude: 45,
      longitude: -63,
    },
    population: 1072545,
    largestCities: [
      { key: "city_halifax", population: 0 },
      { key: "city_cape_breton", population: 0 },
      { key: "city_truro", population: 0 },
      { key: "city_new_glasgow", population: 0 },
    ],
    interestingFacts: [
      "home to world's highest tides",
      "home to Sable Island, the graveyard of the Atlantic",
    ],
    highestPoint: "White Hill 532m",
    coastlineInKM: 7579,
  },
  nb: {
    neighbors: ["pe", "ns", "qc"],
    capital: "capital_nb",
    coordinates: {
      latitude: 46.5,
      longitude: -66,
    },
    population: 850894,
    largestCities: [
      { key: "city_moncton", population: 0 },
      { key: "city_fredericton", population: 0 },
      { key: "city_saint_john", population: 0 },
      { key: "city_quispamsis", population: 0 },
    ],
    interestingFacts: [
      "the only bilingual province",
      "83% is covered in forest",
    ],
    highestPoint: "Mount Carleton 817m",
    coastlineInKM: 5500,
  },
  mb: {
    neighbors: ["nu", "on", "sk"],
    capital: "capital_mb",
    coordinates: {
      latitude: 55,
      longitude: -97,
    },
    population: 1484135,
    largestCities: [
      { key: "city_winnipeg", population: 0 },
      { key: "city_brandon", population: 0 },
      { key: "city_steinbach", population: 0 },
      { key: "city_winkler", population: 0 },
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
    neighbors: ["yt", "nt", "ab"],
    capital: "capital_bc",
    coordinates: {
      latitude: 54,
      longitude: -125,
    },
    population: 5646467,
    largestCities: [
      { key: "city_vancouver", population: 0 },
      { key: "city_victoria", population: 0 },
      { key: "city_kelowna", population: 0 },
      { key: "city_abbotsford", population: 0 },
    ],
    interestingFacts: [
      "home of World's tallest tree",
      "hosted the Olympics in 2010",
    ],
    highestPoint: "Mount Fairweather 4663m",
    coastlineInKM: 27200,
  },
  pe: {
    neighbors: ["qc", "nl", "ns", "nb"],
    capital: "capital_pe",
    coordinates: {
      latitude: 46.4,
      longitude: -63.2,
    },
    population: 177081,
    largestCities: [
      { key: "city_charlottetown", population: 0 },
      { key: "city_summerside", population: 0 },
      { key: "city_montague", population: 0 },
      { key: "city_kensington", population: 0 },
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
    neighbors: ["nt", "nu", "mb", "ab"],
    capital: "capital_sk",
    coordinates: {
      latitude: 54.5,
      longitude: -106.000556,
    },
    population: 1231043,
    largestCities: [
      { key: "city_saskatoon", population: 0 },
      { key: "city_regina", population: 0 },
      { key: "city_prince_albert", population: 0 },
      { key: "city_moose_jaw", population: 0 },
    ],
    interestingFacts: [
      "home to held the world's potash reserves",
      "Cree is the 2nd most spoken language",
    ],
    highestPoint: "Unnamed Point 1392m",
    coastlineInKM: 0,
  },
  ab: {
    neighbors: ["nt", "sk", "bc"],
    capital: "capital_ab",
    coordinates: {
      latitude: 54.5,
      longitude: -114.376667,
    },
    population: 4849906,
    largestCities: [
      { key: "city_calgary", population: 0 },
      { key: "city_edmonton", population: 0 },
      { key: "city_red_deer", population: 0 },
      { key: "city_lethbridge", population: 0 },
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
    neighbors: ["nu", "ns", "pe", "qc"],
    capital: "capital_nl",
    coordinates: {
      latitude: 53.23,
      longitude: -59.999167,
    },
    population: 541391,
    largestCities: [
      { key: "city_st_johns", population: 0 },
      { key: "city_corner_brook", population: 0 },
      { key: "city_grand_falls_windsor", population: 0 },
      { key: "city_gander", population: 0 },
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
    neighbors: ["nu", "sk", "ab", "bc", "yt"],
    capital: "capital_nt",
    coordinates: {
      latitude: 67,
      longitude: -121,
    },
    population: 44920,
    largestCities: [
      { key: "city_yellowknife", population: 0 },
      { key: "city_hay_river", population: 0 },
      { key: "city_inuvik", population: 0 },
      { key: "city_fort_smith", population: 0 },
    ],
    interestingFacts: [
      "It was once french",
      "diamond capital of North America",
    ],
    highestPoint: "Mount Nirvana 2773",
    coastlineInKM: 25000,
  },
  yt: {
    neighbors: ["nt", "bc"],
    capital: "capital_yt",
    coordinates: {
      latitude: 63,
      longitude: -135,
    },
    population: 45750,
    largestCities: [
      { key: "city_whitehorse", population: 0 },
      { key: "city_dawson", population: 0 },
      { key: "city_watson_lake", population: 0 },
      { key: "city_haines_junction", population: 0 },
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
    neighbors: ["qc", "nl", "on", "mb", "sk", "nt"],
    capital: "capital_nu",
    coordinates: {
      latitude: 73,
      longitude: -93,
    },
    population: 40758,
    largestCities: [
      { key: "city_iqaluit", population: 0 },
      { key: "city_rankin_inlet", population: 0 },
      { key: "city_arviat", population: 0 },
      { key: "city_baker_lake", population: 0 },
    ],
    interestingFacts: [
      "did not exist until 1999",
      "home to Mt Thor, the world's steepest cliff",
    ],
    highestPoint: "Barbeau Peek 2616m",
    coastlineInKM: 38000,
  },
};

//export function getPotNamesByLang(langCode: string): string[] {
//export function getPotNamesByLang(tGeo: (key: string) => string): string[] {
export function getPotNamesByLang(tGeo: MyGeoMapping): string[] {
  return Object.keys(dataBank.data).map((code: string) => tGeo(code));
}

//export function getPotNameByLang(potCode: PotCode, tGeo: (key: string) => string): string {
export function getPotNameByLang(potCode: PotCode, tGeo: MyGeoMapping): string {
  return tGeo(potCode); // lovas: as PotCode
}
// export function getPotNameByLangX(potCode: PotCode, langCode: string): string {
//   //const { t } = useTranslation();
//   const { t: tGeo } = useTranslation("geo");

//   if (!langCode.startsWith("en") && !langCode.startsWith("fr")) {
//     throw new Error("invalid language");
//   }
//   langCode = langCode.substring(0, 2);
//   return tGeo(potCode as PotCode);
//   //return dataBank[potCode as PotCode].name[langCode as keyof MultiLangName];
// }

//export function getPotName(potCode: PotCode): string {
//  return getPotNameByLang(potCode, i18n.language);
//}

export function getPotCodeByName(name: string, tGeo: MyGeoMapping): string {
  //for (const [code] of Object.keys(dataBank)) {
  for (const code of listOfPotCodes) {
    if (name === tGeo(code)) {
      return code; // as PotCode;
    }
  }
  return "invalid";
}

//export function isValidPot(currentGuess: string, langCode: string): boolean {
export function isValidPot(currentGuess: string, tGeo: MyGeoMapping): boolean {
  if (!currentGuess) {
    return false;
  }

  const sanitized = sanitizeString(currentGuess);

  return (
    undefined !== sanitized &&
    "" !== sanitized &&
    getPotNamesByLang(tGeo).some(name => sanitizeString(name) === sanitized)
  );
}

// export function getListOfCapitals(): string[] {
//   const { t: tGeo } = useTranslation("geo");
//   return Object.values(dataBank).map(
//     (entry: PotData) => tGeo(entry.capital) // tGeo(`capital${code}`) ?
//   );
//   //return potCodes.map((pot: PotCode) => dataBank[pot].capital.en); // how to make it work for FR?
// }

/**
 * Returns a string of the distance between the guess and
 * the solution in kilometers or miles and the corresponding
 * unit based on the current setting.
 */
// export function getDistanceWithUnitBySetting(
//   fromGuess: PotCode,
//   toSolution: PotCode
// ): string {
//   // TODO: setting for mi
//   const distance = calculateDistanceInKm(
//     dataBank[toSolution].coordinates,
//     dataBank[fromGuess].coordinates
//   );
//   return `${distance} km`;
// }

export function getCapitals(tGeo: MyGeoMapping): string[] {
  //   const { t: tGeo } = useTranslation("geo");
  // if (!langCode.startsWith("en") && !langCode.startsWith("fr")) {
  //   throw new Error("invalid language");
  // }
  // langCode = langCode.substring(0, 2);
  //return Object.entries(dataBank).map(
  return Object.values(dataBank).map(
    (entry: PotData) => tGeo(entry.capital) // tGeo(`capital${code}`) ?
  );
}

export function getLargestCities(tGeo: MyGeoMapping): string[] {
  return Object.values(dataBank.data).flatMap((pot: PotData) =>
    pot.largestCities.map((city: City) => tGeo(city.key))
  );
}

export function getCities(tGeo: MyGeoMapping): string[] {
  const retVal = getLargestCities(tGeo);
  getCapitals(tGeo).forEach((cap: string) => {
    if (!retVal.includes(cap)) {
      retVal.push(cap);
    }
  });
  retVal.sort();

  return retVal;
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

export function getDirectionEmoji(
  fromGuess: PotCode,
  toSolution: PotCode
): string {
  if (fromGuess === toSolution) {
    return directionEmojiMap.get("*") as string;
  }
  const angle: number = calculateAngle(
    dataBankData[fromGuess].coordinates,
    dataBankData[toSolution].coordinates
  );
  // console.log(
  //   `.calculateAngle(${fromGuess}, ${toSolution})=>${angle}:${angle15ToDir(angle)}:${directionEmojiMap.get(angle15ToDir(angle))}`
  // );
  return directionEmojiMap.get(angle15ToDir(angle)) as string;
  // const direction: CardinalDirection = calculateDirection(
  //   fromGuess,
  //   toSolution
  // );
  // return directionEmojiMap.get(direction) as string;
}

export const potCodes = Object.keys(dataBankData) as PotCode[];
// export const potNamesEn: string[] = getPotNamesByLang("en-ca");
// export const potNamesFr: string[] = getPotNamesByLang("fr-ca");

export function getTodaysPotCodeIndex(): number {
  return getTodaysCodeIndex(potCodes.length);
}

export function getTodaysPotCode(): string {
  return potCodes[getTodaysPotCodeIndex()];
}

export function getPseudoRandomPotCode(n: number): string {
  const idx2 = (getTodaysPotCodeIndex() + n) % potCodes.length; // TODO: improve or delete
  return potCodes[idx2];
}

export function getPotMapSvgUrl(potCode: PotCode): string {
  //export function getPotMapSvgUrl(potCode: string): string {
  return new URL(
    `../assets/provinces-and-territories/${potCode}/${potCode}-map.svg`,
    import.meta.url
  ).href;
}

//export default dataBank;
//export default dataBank;
export const dataBank: DataBank = {
  data: dataBankData,
  isValidCode: isValidPot,
  getPotCodeByName: getPotCodeByName,
  getPotNamesByLang: getPotNamesByLang,
  //getDistanceWithUnitBySetting:getDistanceWithUnitBySetting,
  getDirectionEmoji: getDirectionEmoji,
};
