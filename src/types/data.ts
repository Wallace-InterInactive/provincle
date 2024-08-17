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

export interface GameState {
  potCode: string;
  currentRound: number;
  //  currentRoundIsFinished: boolean;
  //  rounds: Round[];
}
