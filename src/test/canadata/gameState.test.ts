import { describe, it, expect } from "vitest";
import defaultGameState from "../../canadata/gameState.ts";
import { potCodes } from "../../canadata/dataBank.ts";

describe("verify the gameState", () => {
  it("defaultNewGameState should have a potCode from the dataBank", () => {
    expect(potCodes).toContain(defaultGameState.potCode);
  });
});
