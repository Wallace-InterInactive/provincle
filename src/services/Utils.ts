// TODO: refactor function
export function sanitizeString(str: string): string {
  let retVal = str.trim().toLowerCase();

  const accentsMap: { [accented: string]: string } = {
    á: "a",
    é: "e",
    í: "i",
    ó: "o",
    ú: "u",
    à: "a",
    è: "e",
    ì: "i",
    ò: "o",
    ù: "u",
    â: "a",
    ê: "e",
    î: "i",
    ô: "o",
    û: "u",
    ä: "a",
    ë: "e",
    ï: "i",
    ö: "o",
    ü: "u",
    ã: "a",
    õ: "o",
    ñ: "n",
    ç: "c",
    Á: "A",
    É: "E",
    Í: "I",
    Ó: "O",
    Ú: "U",
    À: "A",
    È: "E",
    Ì: "I",
    Ò: "O",
    Ù: "U",
    Â: "A",
    Ê: "E",
    Î: "I",
    Ô: "O",
    Û: "U",
    Ä: "A",
    Ë: "E",
    Ï: "I",
    Ö: "O",
    Ü: "U",
    Ã: "A",
    Õ: "O",
    Ñ: "N",
    Ç: "C",
    ß: "ss",
  };

  for (const accentedChar in accentsMap) {
    const regex = new RegExp(accentedChar, "g");
    retVal = retVal.replace(regex, accentsMap[accentedChar]);
  }

  return retVal;
}
