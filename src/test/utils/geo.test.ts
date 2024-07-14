import { describe, expect, it } from "vitest";
import { Coordinates } from "../../utils/dataBank.ts";
import { calculateDirection } from "../../utils/geo.ts";

describe("test geographical calculations", () => {
  it("TODO: test calculateDistanceInMeters", () => {
    expect(1).toBe(1);
  });

  it("returns a hard coded value", () => {
    const coord: Coordinates = {
      latitude: 0,
      longitude: 0,
    };

    expect(calculateDirection(coord, coord)).toBe("*");
  });
});
