import { City, PotCode, PotData, DataBank } from "../types/data.ts";
import {
  MyGeoMapping,
  sanitizeString,
  getTodaysCodeIndex,
  directionEmojiMap,
  defaultTFunction,
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
    capital: "city_toronto",
    coordinates: {
      latitude: 49.25,
      longitude: -84.5,
    },
    population: 15996989,
    largestCities: [
      { key: "city_toronto", population: 2_794_356 },
      { key: "city_ottawa", population: 1_017_449 },
      { key: "city_mississauga", population: 717_961 },
      { key: "city_brampton", population: 656_480 },
    ],
    interestingFacts: [
      "home of the world's longest street",
      "it borders the most US states (5)",
      "the nickel capital of the world",
      "world largest skating rink",
      "home of the nation's capital",
    ],
    highestPoint: "Ishpatina Ridge 693m",
    coastlineInKM: 3840,
    majorLeagueTeams: [
      "senators",
      "mapleleafs",
      "bluejays",
      "raptors",
      "argonauts",
      "redblacks",
      "torontofc",
      "tigercats",
    ],
  },
  qc: {
    neighbors: ["nu", "nl", "pe", "nb", "on"],
    capital: "city_quebec",
    coordinates: {
      latitude: 52,
      longitude: -72,
    },
    population: 9030684,
    largestCities: [
      { key: "city_montreal", population: 1_762_949 },
      { key: "city_quebec", population: 549_459 },
      { key: "city_gatineau", population: 291_041 },
      { key: "city_sherbrooke", population: 172_950 },
    ],
    interestingFacts: [
      "largest province",
      "home to 72% of world's maple syrup production",
    ],
    highestPoint: "Mont D'Iberville 1652m",
    coastlineInKM: 13000,
    majorLeagueTeams: [
      "canadiens",
      "nordiques",
      "expos",
      "alouettes",
      "cfmontreal",
    ],
  },
  ns: {
    neighbors: ["nl", "nb", "pe"],
    capital: "city_halifax",
    coordinates: {
      latitude: 45,
      longitude: -63,
    },
    population: 1072545,
    largestCities: [
      { key: "city_halifax", population: 439_819 },
      { key: "city_cape_breton", population: 93_694 },
      { key: "city_truro", population: 12_954 },
      { key: "city_new_glasgow", population: 9_075 },
    ],
    interestingFacts: [
      "home to world's highest tides",
      "home to Sable Island, the graveyard of the Atlantic",
      "Nova Scotia is closer to the Republic of Ireland, than British Columbia, CA",
    ],
    highestPoint: "White Hill 532m",
    coastlineInKM: 7579,
    majorLeagueTeams: [],
  },
  nb: {
    neighbors: ["pe", "ns", "qc"],
    capital: "city_fredericton",
    coordinates: {
      latitude: 46.5,
      longitude: -66,
    },
    population: 850894,
    largestCities: [
      { key: "city_moncton", population: 79_470 },
      { key: "city_saint_john", population: 69_895 },
      { key: "city_fredericton", population: 63_116 },
      { key: "city_quispamsis", population: 18_768 },
    ],
    interestingFacts: [
      "the only bilingual province",
      "83% is covered in forest",
    ],
    highestPoint: "Mount Carleton 817m",
    coastlineInKM: 5500,
    majorLeagueTeams: [],
  },
  mb: {
    neighbors: ["nu", "on", "sk"],
    capital: "city_winnipeg",
    coordinates: {
      latitude: 55,
      longitude: -97,
    },
    population: 1484135,
    largestCities: [
      { key: "city_winnipeg", population: 749_607 },
      { key: "city_brandon", population: 51_313 },
      { key: "city_steinbach", population: 17_806 },
      { key: "city_winkler", population: 13_745 },
    ],
    interestingFacts: [
      "the lowest population density",
      "there are over 100 000 lakes, 90% nameless",
      "polar bear capital of the world",
    ],
    highestPoint: "Baldy Mountain 832m",
    coastlineInKM: 1210,
    majorLeagueTeams: ["jets", "bluebombers"],
  },
  bc: {
    neighbors: ["yt", "nt", "ab"],
    capital: "city_victoria",
    coordinates: {
      latitude: 54,
      longitude: -125,
    },
    population: 5646467,
    largestCities: [
      { key: "city_vancouver", population: 662_248 },
      { key: "city_abbotsford", population: 153_524 },
      { key: "city_kelowna", population: 144_576 },
      { key: "city_victoria", population: 91_867 },
    ],
    interestingFacts: [
      "home of World's tallest tree",
      "hosted the Olympics in 2010",
    ],
    highestPoint: "Mount Fairweather 4663m",
    coastlineInKM: 27200,
    majorLeagueTeams: ["canucks", "whitecaps", "lions"],
  },
  pe: {
    neighbors: ["qc", "nl", "ns", "nb"],
    capital: "city_charlottetown",
    coordinates: {
      latitude: 46.4,
      longitude: -63.2,
    },
    population: 177081,
    largestCities: [
      { key: "city_charlottetown", population: 38_809 },
      { key: "city_summerside", population: 14_829 },
      { key: "city_montague", population: 2_027 },
      { key: "city_kensington", population: 1_812 },
    ],
    interestingFacts: [
      "smallest province (5660km2)",
      "inspite the name it includes 232 islands",
      "has the most lighthouses (63)",
    ],
    highestPoint: "Unnamed point 142m",
    coastlineInKM: 1260,
    majorLeagueTeams: [],
  },
  sk: {
    neighbors: ["nt", "nu", "mb", "ab"],
    capital: "city_regina",
    coordinates: {
      latitude: 54.5,
      longitude: -106.000556,
    },
    population: 1231043,
    largestCities: [
      { key: "city_saskatoon", population: 266_141 },
      { key: "city_regina", population: 226_404 },
      { key: "city_prince_albert", population: 37_756 },
      { key: "city_moose_jaw", population: 33_665 },
    ],
    interestingFacts: [
      "home to held the world's potash reserves",
      "Cree is the 2nd most spoken language",
      "Moose Jaw's tunnels are linked to Al Capone legends of Prohibition-era alcohol smuggling, though evidence is unclear",
    ],
    highestPoint: "Unnamed Point 1392m",
    coastlineInKM: 0,
    majorLeagueTeams: ["roughriders"],
  },
  ab: {
    neighbors: ["nt", "sk", "bc"],
    capital: "city_edmonton",
    coordinates: {
      latitude: 54.5,
      longitude: -114.376667,
    },
    population: 4849906,
    largestCities: [
      { key: "city_calgary", population: 1_306_784 },
      { key: "city_edmonton", population: 1_010_899 },
      { key: "city_red_deer", population: 100_844 },
      { key: "city_lethbridge", population: 98_406 },
    ],
    interestingFacts: [
      "has the most lakes",
      "over half the population lives in two cities",
      "has the oldest national park",
      "The Calgary Stampede is one of the largest rodeos and festivals in the world",
    ],
    highestPoint: "Mount Columbia 3747m",
    coastlineInKM: 0,
    majorLeagueTeams: ["flames", "oilers", "stampeders", "elks"],
  },
  nl: {
    neighbors: ["nu", "ns", "pe", "qc"],
    capital: "city_st_johns",
    coordinates: {
      latitude: 53.23,
      longitude: -59.999167,
    },
    population: 541391,
    largestCities: [
      { key: "city_st_johns", population: 110_525 },
      { key: "city_corner_brook", population: 19_333 },
      { key: "city_grand_falls_windsor", population: 13_853 },
      { key: "city_gander", population: 11_880 },
    ],
    interestingFacts: [
      "easternmost province",
      "the last province to join Canada",
      "oldest city in Canada, since 1519",
      "home to world's first trans atlantic flight",
    ],
    highestPoint: "Mount Caubvick 1652m",
    coastlineInKM: 29000,
    majorLeagueTeams: [],
  },
  nt: {
    neighbors: ["nu", "sk", "ab", "bc", "yt"],
    capital: "city_yellowknife",
    coordinates: {
      latitude: 67,
      longitude: -121,
    },
    population: 44920,
    largestCities: [
      { key: "city_yellowknife", population: 20_340 },
      { key: "city_hay_river", population: 3_169 },
      { key: "city_inuvik", population: 3_137 },
      { key: "city_fort_smith", population: 2_248 },
    ],
    interestingFacts: [
      "It was once french",
      "diamond capital of North America",
    ],
    highestPoint: "Mount Nirvana 2773",
    coastlineInKM: 25000,
    majorLeagueTeams: [],
  },
  yt: {
    neighbors: ["nt", "bc"],
    capital: "city_whitehorse",
    coordinates: {
      latitude: 63,
      longitude: -135,
    },
    population: 45750,
    largestCities: [
      { key: "city_whitehorse", population: 28_201 },
      { key: "city_dawson", population: 1_577 },
      { key: "city_watson_lake", population: 1_133 },
      { key: "city_haines_junction", population: 688 },
    ],
    interestingFacts: [
      "there is no sun for 24 hours",
      "there is sun risen for 24 hours",
      "home to highest mountain, Mount Logan 5959m",
    ],
    highestPoint: "Mount Logan, 5959m",
    coastlineInKM: 213,
    majorLeagueTeams: [],
  },
  nu: {
    neighbors: ["qc", "nl", "on", "mb", "sk", "nt"],
    capital: "city_iqaluit",
    coordinates: {
      latitude: 73,
      longitude: -93,
    },
    population: 40758,
    largestCities: [
      { key: "city_iqaluit", population: 7_429 },
      { key: "city_rankin_inlet", population: 2_975 },
      { key: "city_arviat", population: 2_657 },
      { key: "city_baker_lake", population: 2_069 },
    ],
    interestingFacts: [
      "did not exist until 1999",
      "home to Mt Thor, the world's steepest cliff",
    ],
    highestPoint: "Barbeau Peek 2616m",
    coastlineInKM: 38000,
    majorLeagueTeams: [],
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
  return "invalid"; // TBD, it should be extracted/standardized better
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

export function getMajorLeagueTeamKeys(): string[] {
  return Object.values(dataBankData).flatMap(
    (potData: PotData) => potData.majorLeagueTeams
  );
}

export function getMajorLeagueTeams(tML: MyGeoMapping): string[] {
  return getMajorLeagueTeamKeys().map((team: string) => tML(team));
}

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

export const potCodes = Object.keys(dataBankData);
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
  return new URL(
    `../assets/provinces-and-territories/${potCode}/${potCode}-map.svg`,
    import.meta.url
  ).href;
}

export function getPotFlagSvgUrl(potCode: PotCode): string {
  return new URL(
    `../assets/provinces-and-territories/${potCode}/${potCode}-flag.svg`,
    import.meta.url
  ).href;
}

export function getTeamLogoSvgUrl(teamName: string): string {
  return new URL(`../assets/major-league/team-${teamName}.svg`, import.meta.url)
    .href;
}

// TBD: should this go to some i18n block, like tGeo?
function getGuessEmoji(): string {
  return "🍁";
}

function getLinkUrlWikipedia(potCode: string): string {
  console.log(`potCode: ${potCode}`);
  return "https://en.wikipedia.org/wiki/Provinces_and_territories_of_Canada";
}

function getLinkUrlGoogleMaps(potCode: string): string {
  return `https://www.google.com/maps?q=${potCode},Canada`;
}

//export default dataBank;
//export default dataBank;
export const dataBank: DataBank = {
  data: dataBankData,
  isValidCode: isValidPot,
  getPotCodeByName: getPotCodeByName,
  getPotNamesByLang: getPotNamesByLang,
  getPotMapSvgUrl: getPotMapSvgUrl, // warning: does not work as I'd expect
  getPotFlagSvgUrl: getPotFlagSvgUrl,
  getLinkUrlWikipedia: getLinkUrlWikipedia,
  getLinkUrlGoogleMaps: getLinkUrlGoogleMaps,
  getCities: getCities,
  //getDistanceWithUnitBySetting:getDistanceWithUnitBySetting,
  getDirectionEmoji: getDirectionEmoji,
  getGuessEmoji: getGuessEmoji,
  tLang: defaultTFunction, // warning: to be set in Game.tsx
  tGeo: defaultTFunction, // warning: to be set in Game.tsx
};
