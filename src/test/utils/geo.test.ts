import { describe, expect, it } from "vitest";
import { calculateDirection } from "../../utils/geo.ts";

describe("test geographical calculations", () => {
  it("TODO: test calculateDistanceInMeters", () => {
    expect(1).toBe(1);
  });

  it("returns a hard coded value", () => {
    expect(
      calculateDirection(
        {
          latitude: 0,
          longitude: 0,
        },
        {
          latitude: 0,
          longitude: 0,
        }
      )
    ).toBe("NNW");
  });
});
