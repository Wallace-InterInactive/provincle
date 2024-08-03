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

export interface GameState {
  potCode: string;
  currentRound: number;
  //  currentRoundIsFinished: boolean;
  //  rounds: Round[];
}
