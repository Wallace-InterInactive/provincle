import { GameRoundStatus } from "../../utils/dataBank.ts";

export interface GameRoundProps {
    currentRoundStatus: GameRoundStatus;
    setCurrentRoundStatus: React.Dispatch<React.SetStateAction<GameRoundStatus>>;
}
