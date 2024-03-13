import accentsMap from "./AccentsMap";

export function sanitizeString(str: string): string {
  let retVal = str.trim().toLowerCase();

  for (const accentedChar in accentsMap) {
    const regex = new RegExp(accentedChar, "g");
    retVal = retVal.replace(regex, accentsMap[accentedChar]);
  }

  return retVal;
}
