import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { NextRoundButton } from "./NextRoundButton.tsx";
import { GameRoundStatus } from "../../types/data.ts";

describe("the NextRoundButton component", () => {
  const WRAPPER_DIV_TEST_ID = "next-round-btn-wrapper-div";
  const NEXT_ROUND_BTN_TEST_ID = "next-round-btn-finished";
  const GIVE_UP_BTN_TEST_ID = "give-up-btn";

  const mockedHandleNextButtonClicked = vi.fn();
  const mockedHandleGiveUpButtonClicked = vi.fn();
  const giveUpCnt = 0;

  it("is rendered", () => {
    render(
      <NextRoundButton
        currentRound={1}
        currentRoundStatus={"n/a"}
        handleNextButtonClicked={mockedHandleNextButtonClicked}
        handleGiveUpButtonClicked={mockedHandleGiveUpButtonClicked}
        giveUpCnt={giveUpCnt}
      />
    );
    expect(screen.getByTestId(WRAPPER_DIV_TEST_ID)).toBeTypeOf("object");
  });

  [
    { status: "won" as GameRoundStatus, shouldRenderNextRound: true },
    { status: "lost" as GameRoundStatus, shouldRenderNextRound: true },
    { status: "n/a" as GameRoundStatus, shouldRenderNextRound: true },
    { status: "pending" as GameRoundStatus, shouldRenderNextRound: false },
  ].forEach(({ status, shouldRenderNextRound }) => {
    it(`conditionally renders the "Next Round" button for status ${status}`, () => {
      render(
        <NextRoundButton
          currentRound={1}
          currentRoundStatus={status}
          handleNextButtonClicked={mockedHandleNextButtonClicked}
          handleGiveUpButtonClicked={mockedHandleGiveUpButtonClicked}
          giveUpCnt={giveUpCnt}
        />
      );

      if (shouldRenderNextRound) {
        expect(screen.getByTestId(NEXT_ROUND_BTN_TEST_ID)).toBeTypeOf("object");
      } else {
        expect(screen.queryByTestId(NEXT_ROUND_BTN_TEST_ID)).toBeNull();
      }
    });
  });

  it("does not render the 'Give Up' button in the 1st round", () => {
    render(
      <NextRoundButton
        currentRound={1}
        currentRoundStatus={"pending"}
        handleNextButtonClicked={mockedHandleNextButtonClicked}
        handleGiveUpButtonClicked={mockedHandleGiveUpButtonClicked}
        giveUpCnt={giveUpCnt}
      />
    );
    expect(screen.queryByTestId(GIVE_UP_BTN_TEST_ID)).toBeNull();
  });

  [
    { status: "won" as GameRoundStatus, shouldRenderGiveUp: false },
    { status: "lost" as GameRoundStatus, shouldRenderGiveUp: false },
    { status: "n/a" as GameRoundStatus, shouldRenderGiveUp: false },
    { status: "pending" as GameRoundStatus, shouldRenderGiveUp: true },
  ].forEach(({ status, shouldRenderGiveUp }) => {
    it(`conditionally renders the 'Give up' button for status ${status}`, () => {
      render(
        <NextRoundButton
          currentRound={2}
          currentRoundStatus={status}
          handleNextButtonClicked={mockedHandleNextButtonClicked}
          handleGiveUpButtonClicked={mockedHandleGiveUpButtonClicked}
          giveUpCnt={giveUpCnt}
        />
      );

      if (shouldRenderGiveUp) {
        expect(screen.getByTestId(GIVE_UP_BTN_TEST_ID)).toBeTypeOf("object");
      } else {
        expect(screen.queryByTestId(GIVE_UP_BTN_TEST_ID)).toBeNull();
      }
    });
  });

  it("calls the onClick function on the 'Next Round' button", () => {
    // Arrange
    render(
      <NextRoundButton
        currentRound={1}
        currentRoundStatus={"won"}
        handleNextButtonClicked={mockedHandleNextButtonClicked}
        handleGiveUpButtonClicked={mockedHandleGiveUpButtonClicked}
        giveUpCnt={giveUpCnt}
      />
    );
    const btn = screen.getByTestId(NEXT_ROUND_BTN_TEST_ID);
    // Act
    fireEvent.click(btn);
    // Assert
    expect(mockedHandleNextButtonClicked).toHaveBeenCalled();
  });

  it("calls the onClick function on the 'Give up' button", () => {
    // Arrange
    render(
      <NextRoundButton
        currentRound={2}
        currentRoundStatus={"pending"}
        handleNextButtonClicked={mockedHandleNextButtonClicked}
        handleGiveUpButtonClicked={mockedHandleGiveUpButtonClicked}
        giveUpCnt={giveUpCnt}
      />
    );
    const btn = screen.getByTestId(GIVE_UP_BTN_TEST_ID);
    // Act
    fireEvent.click(btn);
    // Assert
    expect(mockedHandleGiveUpButtonClicked).toHaveBeenCalled();
  });
});
