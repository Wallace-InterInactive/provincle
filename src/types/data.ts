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

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface MultiLangName {
  en: string;
  fr: string;
}

export interface PotData {
  name: MultiLangName;
  neighbors: string[];
  capital: MultiLangName;
  coordinates: Coordinates;
  population: number;
  interestingFacts: string[];
  highestPoint: string;
  coastlineInKM: number;
}

export enum GameRoundResult {
  Pending = "🎭",
  ZeroStar = "★★★",
  OneStar = "★★⭐ 🥉",
  TwoStars = "★⭐⭐ 🥈",
  ThreeStars = "⭐⭐⭐ 🥇",
  Abandoned = "🚫", // give-up etc
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
