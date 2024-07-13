import { expect, it } from "vitest";
import { Settings } from "./Settings.tsx";
import { render, screen } from "@testing-library/react";

it("render the game title", () => {
  render(<Settings />);
  expect(screen.getByTestId("settings")).toBeTypeOf("object");
});
