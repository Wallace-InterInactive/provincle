import { describe, expect, it, vi, beforeEach } from "vitest";
import { Settings } from "./Settings.tsx";
import { fireEvent, render, screen } from "@testing-library/react";
import * as settingsModule from "../../canadata/settings";

describe("the Settings component", () => {
  const TEST_ID = "settings";
  const mockedOnClick = vi.fn();

  beforeEach(() => {
    vi.spyOn(settingsModule, "toggleLanguage").mockImplementation(
      mockedOnClick
    );
  });

  it("is rendered", () => {
    render(<Settings />);
    expect(screen.getByTestId(TEST_ID)).toBeTypeOf("object");
  });

  it("calls the onClick function", () => {
    // Arrange
    render(<Settings />);
    const btn = screen.getByTestId(TEST_ID);
    // Act
    fireEvent.click(btn);
    // Assert
    expect(mockedOnClick).toHaveBeenCalled();
  });
});
