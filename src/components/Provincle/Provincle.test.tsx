import { expect, it } from "vitest";
import { Provincle } from "./Provincle.tsx";
import { render, screen } from "@testing-library/react";

it("render the game title", () => {
  render(<Provincle />);
  expect(screen.getByTestId("provincle")).toBeTypeOf("object");
});
