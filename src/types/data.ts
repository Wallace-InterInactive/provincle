export type GameRoundStatus = "won" | "lost" | "pending";

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

export type PotCode =
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
  name: GeoNameKey;
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
}

//export type GameRoundGrade = 1 | 2 | 3 | 4 | 5;
export enum GameRoundResult {
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
