import accentsMap from "./accentsMap";
import { getNameByPotCode } from "./dataBank";

export function sanitizeString(str: string): string {
  let retVal = str.trim().toLowerCase();

  for (const accentedChar in accentsMap) {
    const regex = new RegExp(accentedChar, "g");
    retVal = retVal.replace(regex, accentsMap[accentedChar]);
  }

  return retVal;
}

export function guessedIt(code: string, currentGuess: string): boolean {
  return (
    sanitizeString(getNameByPotCode(code)) === sanitizeString(currentGuess)
  );
}

export function calculateDistance(
  solutionCode: string,
  guessCode: string
): string {
  console.log(solutionCode, guessCode);
  return "4321 km";
}

export function getDirectionFromSolution(
  solutionCode: string,
  guessCode: string
): string {
  console.log(solutionCode, guessCode);
  return "➡️";
}
