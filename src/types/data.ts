import { MyGeoMapping } from "../utils/utils";

export type GameRoundStatus = "won" | "lost" | "pending" | "n/a";

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

export type PotCode = string; // YYYY make a superclass of GameCode ?
export type PotCode2 =
  | "on"
  | "qc"
  | "ns"
  | "nb"
  | "mb"
  | "bc"
  | "pe"
  | "sk"
  | "ab"
  | "nl"
  | "nt"
  | "yt"
  | "nu";

export type GeoNameKey = string;

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface City {
  key: GeoNameKey;
  population: number;
}

export interface PotData {
  //name: MultiLangName;
  neighbors: string[];
  capital: GeoNameKey;
  coordinates: Coordinates;
  population: number;
  largestCities: City[];
  interestingFacts: string[];
  highestPoint: string;
  coastlineInKM: number;
  majorLeagueTeams: string[];
}

export enum GameRoundResult {
  NoRoundToday = 0,
  NotStarted = 1,
  Failed = 2,
  Fair = 3,
  Good = 4,
  Excellent = 5,
}

export interface GameRoundStat {
  i18nId: string; // TODO: shall we extract to type?
  result: GameRoundResult;
}

export interface GameState {
  potCode: string; // lovas: PotCode ??
  currentRound: number;
  rounds: Map<string, GameRoundStat>;
  //results: Map<string, GameRoundResult>;
}

export interface DataBank {
  data: Record<PotCode, PotData>;
  isValidCode(currentGuess: string, tGeo: MyGeoMapping): boolean;
  getPotCodeByName(name: string, tGeo: MyGeoMapping): string;
  getPotNamesByLang(tGeo: MyGeoMapping): string[];
  //getDistanceWithUnitBySetting(from: PotCode,to: PotCode): string;
  getDirectionEmoji(fromGuess: PotCode, toSolution: PotCode): string;
}
