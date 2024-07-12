import accentsMap from "./accentsMap.ts";
import { potNames } from "./dataBank.ts";

export function sanitizeString(str: string): string {
  let retVal = str.trim().toLowerCase();

  for (const accentedChar in accentsMap) {
    const regex = new RegExp(accentedChar, "g");
    retVal = retVal.replace(regex, accentsMap[accentedChar]);
  }

  return retVal;
}

export function isValidPot(currentGuess: string): boolean {
  const sanitized = sanitizeString(currentGuess);
  return (
    undefined !== sanitized &&
    "" !== sanitized &&
    potNames.some(name => sanitizeString(name) === sanitized)
  );
}

export function calculateDistance(
  solutionCode: string,
  guessCode: string
): string {
  console.log(`calculateDistance(${solutionCode}, ${guessCode})`);
  return "4321 km";
}

export function getDirectionFromSolution(
  solutionCode: string,
  guessCode: string
): string {
  console.log(`getDirectionFromSolution(${solutionCode}, ${guessCode})`);
  return "↗️";
}

export function getPotMapSvgUrl(potCode: string): string {
  return new URL(
    `../assets/provinces-and-territories/${potCode}/${potCode}-map.svg`,
    import.meta.url
  ).href;
}

export function getPotFlagSvgUrl(potCode: string): string {
  return new URL(
    `../assets/provinces-and-territories/${potCode}/${potCode}-flag.svg`,
    import.meta.url
  ).href;
}
