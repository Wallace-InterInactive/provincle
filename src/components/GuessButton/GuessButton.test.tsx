import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { GuessButton } from "./GuessButton.tsx";

describe("the GuessButton component", () => {
  const TEST_ID = "guess-btn";
  const mockedOnClick = vi.fn();
  const text = "lovas";

  it("is rendered with the passed text parameter", () => {
    render(<GuessButton handler={mockedOnClick} text={text} />);
    expect(screen.getByTestId(TEST_ID)).toBeTypeOf("object");
  });

  it("displays the passed text argument", () => {
    render(<GuessButton handler={mockedOnClick} text={text} />);
    const btn = screen.getByTestId(TEST_ID);
    expect(btn.textContent).toBe(text);
  });

  it("calls the onClick function", () => {
    // Arrange
    render(<GuessButton handler={mockedOnClick} text={text} />);
    const btn = screen.getByTestId(TEST_ID);
    // Act
    fireEvent.click(btn);
    // Assert
    expect(mockedOnClick).toHaveBeenCalled();
  });
});
