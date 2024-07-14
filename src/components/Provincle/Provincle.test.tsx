import { describe, expect, it } from "vitest";
import { Provincle } from "./Provincle.tsx";
import { render, screen } from "@testing-library/react";

describe("test the game title", () => {
  it("renders the Provincle component", () => {
    render(<Provincle />);
    expect(screen.getByTestId("provincle")).toBeTypeOf("object");
  });
});
