import accentsMap from "./accentsMap.ts";
import dataBank, { potNames } from "./dataBank.ts";
import { calculateDirection, calculateDistanceInKm } from "./geo.ts";
import { CardinalDirection, GameRoundStatus, PotCode } from "../types/data.ts";

// TODO some UI or i18n module
const directionEmojiMap = new Map<CardinalDirection, string>([
  ["N", "⬆️"],
  ["S", "⬇️"],
  ["W", "⬅️"],
  ["E", "➡️"],
  ["NW", "↖️"],
  ["NE", "↗️"],
  ["SW", "↙️"],
  ["SE", "↘️"],
  ["*", "🎯"],
  // Add more mappings as needed
  // note: https://emojipedia.org/search?q=arrow
  //   ⬆️ ↗️ ➡️ ↘️ ⬇️ ↙️ ⬅️ ↖️ 📍 🏁 🎯
  // note: https://www.toptal.com/designers/htmlarrows/arrows/
  //   &uarr; &rarr; &darr; &larr; &nwarr; &nearr; &swarr; &searr; &#x25CE;
]);

export function sanitizeString(str: string): string {
  let retVal = str.trim().toLowerCase();

  for (const accentedChar in accentsMap) {
    const regex = new RegExp(accentedChar, "g");
    retVal = retVal.replace(regex, accentsMap[accentedChar]);
  }

  return retVal;
}

export function isValidPot(currentGuess: string): boolean {
  if (!currentGuess) {
    return false;
  }

  const sanitized = sanitizeString(currentGuess);
  return (
    undefined !== sanitized &&
    "" !== sanitized &&
    potNames.some(name => sanitizeString(name) === sanitized)
  );
}

/**
 * Returns a string of the distance between the guess and
 * the solution in kilometers or miles and the corresponding
 * unit based on the current setting.
 */
export function getDistanceWithUnitBySetting(
  fromGuess: PotCode,
  toSolution: PotCode
): string {
  // TODO: setting for mi
  const distance = calculateDistanceInKm(
    dataBank[toSolution].coordinates,
    dataBank[fromGuess].coordinates
  );
  return `${distance} km`;
}

export function getDirectionEmoji(
  fromGuess: PotCode,
  toSolution: PotCode
): string {
  const direction: CardinalDirection = calculateDirection(
    fromGuess,
    toSolution
  );
  return directionEmojiMap.get(direction) as string;
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

export function getBgOfStatus(currentRoundStatus: GameRoundStatus): string {
  return currentRoundStatus === "won"
    ? "bg-green-700"
    : currentRoundStatus === "lost"
      ? "bg-red-600"
      : "bg-gray-500";
}

// =================== deprecated functions with no usage =================== //
/*
export function calculateDistance(
  solutionCode: string,
  guessCode: string
): number {
  console.log(`calculateDistance(${solutionCode}, ${guessCode})`);
  if (solutionCode === "" || guessCode === "") {
    return 0;
  }
  return calculateDistanceInKm(
    dataBank[solutionCode].coordinates,
    dataBank[guessCode].coordinates
  );
}

export function getDirectionFromSolution(
  solutionCode: string,
  guessCode: string
): string {
  console.log(`getDirectionFromSolution(${solutionCode}, ${guessCode})`);
  if (solutionCode === "" || guessCode == "") {
    // TODO: write a nicer input validation
    return "*";
  }

  const dir = calculateDirectionOf(solutionCode, guessCode);
  return directionEmojiMap.get(dir) || "*";
}
*/

/*
export const arrowImageUrl: string = new URL(
  "../assets/misc/arrow-up.png",
  import.meta.url
).href;

const directionImgRotate = new Map<string, number>([
  //: Record<string, string> = {
  ["N", 0],
  ["S", 180],
  ["W", 270],
  ["E", 90],
  ["NW", 315],
  ["NE", 45],
  ["SW", 225],
  ["SE", 135],
  ["*", 0],
]);

export function getImgRotateFromSolution(
  solutionCode: string,
  guessCode: string
): number {
  const dir = calculateDirectionOf(solutionCode, guessCode);
  return directionImgRotate.get(dir) || 0;
}

export function getCssRotate(angle: number): string {
  return `rotate-${angle}`;
}
*/
