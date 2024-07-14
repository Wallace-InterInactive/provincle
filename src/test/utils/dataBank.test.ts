import { describe, expect, it } from "vitest";
import { getTodaysPotCode, potCodes } from "../../utils/dataBank.ts";

describe("getTodaysPortCode should return a pot code from the dataBank", () => {
  it("returns a potCode from the dataBank", () => {
    expect(potCodes).toContain(getTodaysPotCode());
  });
});
