import { beforeAll, describe, expect, it } from "vitest";
import dataBank, {
  getCapitalsByLang,
  getPotCodeByName,
  getPotNamesByLang,
  getPseudoRandomPotCode,
  getTodaysPotCode,
  getListOfCapitals,
  potCodes,
} from "../../utils/dataBank.ts";
import { calculateDistanceInKm } from "../../utils/geo.ts";
import i18n from '../../../src/utils/i18n'; // Import the actual i18n instance


describe("test functions in dataBank", () => {
  beforeAll(() => {
    // Ensure i18n is initialized properly
    return i18n.init();
  });

  it("returns a potCode from the dataBank", () => {
    expect(potCodes).toContain(getTodaysPotCode());
  });

  it("returns a potCode from the dataBank ", () => {
    expect(potCodes).toContain(getPseudoRandomPotCode(3));
  });

  it("should return the code of the pot", async () => {
    await i18n.changeLanguage('en'); // Set language to English
    expect(getPotCodeByName("British Columbia")).toBe("bc");
    expect(getPotCodeByName("Colombie-Britannique")).toBe("bc");
    expect(getPotCodeByName("Colombie-Britannique")).toBe("bc");
    expect(getPotCodeByName("Quebec")).toBe("qc");
    expect(getPotCodeByName("Québec")).toBe("qc");
    expect(getPotCodeByName("Alaska")).toBe("invalid");
  });

  it("should throw an error for invalid language code", () => {
    expect(() => getPotNamesByLang("")).toThrowError();
    expect(() => getPotNamesByLang("hu")).toThrowError();
  });

  it("should return the English potNames", () => {
    let potNames = getPotNamesByLang("en");
    expect(potNames.length).toBe(13);
    expect(potNames).toContain("New Brunswick");

    potNames = getPotNamesByLang("en-us");
    expect(potNames.length).toBe(13);
    expect(potNames).toContain("Nova Scotia");
  });

  it("should return the French potNames", () => {
    let potNames = getPotNamesByLang("fr");
    expect(potNames.length).toBe(13);
    expect(potNames).toContain("Colombie-Britannique");

    potNames = getPotNamesByLang("fr-ca");
    expect(potNames.length).toBe(13);
    expect(potNames).toContain("Terre-Neuve-et-Labrador");
  });

  it("should throw an error for invalid language code", () => {
    expect(() => getCapitalsByLang("")).toThrowError();
    expect(() => getCapitalsByLang("hu")).toThrowError();
  });

  it("should return the capitals in English", () => {
    let capitals = getCapitalsByLang("en");
    expect(capitals.length).toBe(13);
    expect(capitals).toContain("Quebec City");

    capitals = getCapitalsByLang("en-us");
    expect(capitals.length).toBe(13);
    expect(capitals).toContain("Quebec City");
  });

  it("should return the capitals in French", () => {
    let capitals = getCapitalsByLang("fr");
    expect(capitals.length).toBe(13);
    expect(capitals).toContain("Ville de Québec");

    capitals = getCapitalsByLang("fr-ca");
    expect(capitals.length).toBe(13);
    expect(capitals).toContain("Ville de Québec");
  });

  it("should return a list of capitals", () => {
    const capitals = getListOfCapitals();
    expect(capitals).toBeTypeOf("object");
    expect(capitals[0]).toBeTypeOf("string");
    expect(capitals.length).toBe(13);
  });
});

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
