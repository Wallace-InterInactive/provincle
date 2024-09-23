import { describe, expect, it } from "vitest";
import dataBank, {
  getCapitalsByLang,
  getPotCodeByName,
  getPotNamesByLang,
  getPseudoRandomPotCode,
  getTodaysPotCode,
  potCodes,
} from "../../utils/dataBank.ts";
import { calculateDistanceInKm } from "../../utils/geo.ts";

describe("test functions in dataBank", () => {
  it("returns a potCode from the dataBank", () => {
    expect(potCodes).toContain(getTodaysPotCode());
  });

  it("returns a potCode from the dataBank ", () => {
    expect(potCodes).toContain(getPseudoRandomPotCode(3));
  });

  it("should return the code of the pot", () => {
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
