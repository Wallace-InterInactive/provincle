import { describe, expect, it } from "vitest";
import dataBank, {
  // getCapitalsByLang,
  // getPotCodeByName,
  // getPotNamesByLang,
  getPseudoRandomPotCode,
  getTodaysPotCode,
  potCodes,
} from "../../utils/dataBank.ts";
import { calculateDistanceInKm } from "../../utils/geo.ts";

describe("test functions in dataBank", () => {
  it("returns a potCode from the dataBank ", () => {
    expect(potCodes).toContain(getPseudoRandomPotCode(3));
  });

  it("returns a potCode from the dataBank", () => {
    expect(potCodes).toContain(getTodaysPotCode());
  });
});

/** this shall go to i18n.test.ts or databank.test.ts
describe("test functions in dataBank", () => {
  const { t: tGeo } = useTranslation("geo");
  beforeAll(() => {
    // Ensure i18n is initialized properly
    return i18n.init();
  });

  it("should return the code of the pot", async () => {
    await i18n.changeLanguage("en"); // Set language to English
    expect(getPotCodeByName("British Columbia", tGeo)).toBe("bc");
    expect(getPotCodeByName("Colombie-Britannique", tGeo)).toBe("bc");
    expect(getPotCodeByName("Colombie-Britannique", tGeo)).toBe("bc");
    expect(getPotCodeByName("Quebec", tGeo)).toBe("qc");
    //expect(getPotCodeByName("Québec", tGeo)).toBe("qc");
    expect(getPotCodeByName("Alaska", tGeo)).toBe("invalid");
  });

  it("should throw an error for invalid language code", () => {
    expect(() => getPotNamesByLang(tGeo)).toThrowError();
    expect(() => getPotNamesByLang(tGeo)).toThrowError();
  });

  it("should return the English potNames", () => {
    i18n.changeLanguage("en");
    let potNames = getPotNamesByLang(tGeo);
    expect(potNames.length).toBe(13);
    expect(potNames).toContain("New Brunswick");

    i18n.changeLanguage("en-us");
    potNames = getPotNamesByLang(tGeo);
    expect(potNames.length).toBe(13);
    expect(potNames).toContain("Nova Scotia");
  });

  it("should return the French potNames", () => {
    i18n.changeLanguage("fr");
    let potNames = getPotNamesByLang(tGeo);
    expect(potNames.length).toBe(13);
    expect(potNames).toContain("Colombie-Britannique");

    i18n.changeLanguage("fr-ca");
    potNames = getPotNamesByLang(tGeo);
    expect(potNames.length).toBe(13);
    expect(potNames).toContain("Terre-Neuve-et-Labrador");
  });

  // it("should throw an error for invalid language code", () => {
  //   expect(() => getCapitalsByLang("")).toThrowError();
  //   expect(() => getCapitalsByLang("hu")).toThrowError();
  // });

  it("should return the capitals in English", () => {
    i18n.changeLanguage("en");
    let capitals = getCapitalsByLang(tGeo);
    expect(capitals.length).toBe(13);
    expect(capitals).toContain("Quebec City");

    i18n.changeLanguage("en-us");
    capitals = getCapitalsByLang(tGeo);
    expect(capitals.length).toBe(13);
    expect(capitals).toContain("Quebec City");
  });

  it("should return the capitals in French", () => {
    i18n.changeLanguage("fr");
    let capitals = getCapitalsByLang(tGeo);
    expect(capitals.length).toBe(13);
    expect(capitals).toContain("Ville de Québec");

    i18n.changeLanguage("fr-ca");
    capitals = getCapitalsByLang(tGeo);
    expect(capitals.length).toBe(13);
    expect(capitals).toContain("Ville de Québec");
  });

  /*
  it("should return the the largest cities of each province in English", () => {
    let cities = getLargestCitiesByLang("en");
    expect(cities.length).toBe(13 * 4);
    expect(cities).toContain("Quebec City");

    cities = getLargestCitiesByLang("en-us");
    expect(cities.length).toBe(13 * 4);
    expect(cities).toContain("Montreal");
  });

  it("should return the the largest cities of each province in French", () => {
    let cities = getLargestCitiesByLang("fr");
    expect(cities.length).toBe(13 * 4);
    expect(cities).toContain("Ville de Québec");

    cities = getLargestCitiesByLang("fr-ca");
    expect(cities.length).toBe(13 * 4);
    expect(cities).toContain("Montréal");
  });
  */

  // it("should return a list of capitals", () => {
  //   const capitals = getListOfCapitals();
  //   expect(capitals).toBeTypeOf("object");
  //   expect(capitals[0]).toBeTypeOf("string");
  //   expect(capitals.length).toBe(13);
  // });
// });

describe("check geo distances", () => {
  it("returns 0 for same self-compare", () => {
    expect(
      calculateDistanceInKm(dataBank.on.coordinates, dataBank.on.coordinates)
    ).toBe(0);
    expect(
      calculateDistanceInKm(
        dataBank["on"].coordinates,
        dataBank["on"].coordinates
      )
    ).toBe(0);
    expect(
      calculateDistanceInKm(dataBank.ab.coordinates, dataBank.ab.coordinates)
    ).toBe(0);
  });

  it("check distances ab-on", () => {
    expect(
      calculateDistanceInKm(dataBank.ab.coordinates, dataBank.on.coordinates)
    ).toBe(2114);
    expect(
      calculateDistanceInKm(dataBank.on.coordinates, dataBank.ab.coordinates)
    ).toBe(2114);
  });

  it("check distances nu-ma", () => {
    expect(
      calculateDistanceInKm(dataBank.nu.coordinates, dataBank.mb.coordinates)
    ).toBe(2009);
    expect(
      calculateDistanceInKm(dataBank.mb.coordinates, dataBank.nu.coordinates)
    ).toBe(2009);
  });
});
