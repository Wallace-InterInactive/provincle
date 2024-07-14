import { describe, expect, it } from "vitest";
import { Settings } from "./Settings.tsx";
import { render, screen } from "@testing-library/react";

describe("test the settings functionality", () => {
  it("renders the Settings component", () => {
    render(<Settings />);
    expect(screen.getByTestId("settings")).toBeTypeOf("object");
  });
});
