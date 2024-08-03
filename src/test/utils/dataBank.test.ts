import { describe, expect, it } from "vitest";
import dataBank, { getTodaysPotCode, potCodes } from "../../utils/dataBank.ts";
import { calculateDirection, calculateDistanceInKm } from "../../utils/geo.ts";

describe("getTodaysPortCode should return a pot code from the dataBank", () => {
  it("returns a potCode from the dataBank", () => {
    expect(potCodes).toContain(getTodaysPotCode());
  });
});

describe("check geo distances", () => {
  //console.log(dataBank);
  console.log("lovas1 - " + JSON.stringify(dataBank.on));
  console.log("lovas2 - " + JSON.stringify(dataBank["on"]));
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
    ).toBe(2131);
    expect(
      calculateDistanceInKm(dataBank.on.coordinates, dataBank.ab.coordinates)
    ).toBe(2131);
  });
  it("check distances nu-ma", () => {
    expect(
      calculateDistanceInKm(dataBank.nu.coordinates, dataBank.mb.coordinates)
    ).toBe(1714);
    expect(
      calculateDistanceInKm(dataBank.mb.coordinates, dataBank.nu.coordinates)
    ).toBe(1714);
  });
});

describe("check geo directions", () => {
  it("returns * for same self-compare", () => {
    expect(
      calculateDirection(dataBank.on.coordinates, dataBank.on.coordinates)
    ).toBe("*");
    expect(
      calculateDirection(dataBank.ab.coordinates, dataBank.ab.coordinates)
    ).toBe("*");
  });
  /*
  it("check some random", () => {
    expect(
      calculateDirection(dataBank.ab.coordinates, dataBank.on.coordinates)
    ).toBe("E");
    expect(
      calculateDirection(dataBank.on.coordinates, dataBank.ab.coordinates)
    ).toBe("W");
  });
   */
});
