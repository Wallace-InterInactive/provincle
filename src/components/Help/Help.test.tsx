import { describe, expect, it } from "vitest";
import { Help } from "./Help.tsx";
import { render, screen } from "@testing-library/react";

describe("test the help functionality", () => {
  it("renders the Help component", () => {
    render(<Help />);
    expect(screen.getByTestId("help")).toBeTypeOf("object");
  });
});
