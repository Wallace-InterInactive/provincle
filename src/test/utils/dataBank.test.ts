import { describe, expect, it } from "vitest";
import dataBank, {
  getPotCode,
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
    expect(getPotCode("Saskatchewan")).toBe("sk");
    expect(getPotCode("Québec")).toBe("qc");
    expect(getPotCode("Alaska")).toBe("invalid");
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
