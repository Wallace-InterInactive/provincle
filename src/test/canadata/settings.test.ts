import { describe, expect, it } from "vitest";
import i18next from "../../canadata/i18n";
import { toggleLanguage } from "../../canadata/settings.ts";

describe("it should test switching the language", () => {
  it("should switch to French from English", () => {
    i18next.changeLanguage("en");
    toggleLanguage().then(() => expect(i18next.language).toBe("fr"));
  });

  it("should switch to English from French", () => {
    i18next.changeLanguage("en");
    toggleLanguage().then(() => expect(i18next.language).toBe("fr"));
  });

  it("should switch to English when the current language is not English or French", () => {
    i18next.changeLanguage("hu");
    toggleLanguage().then(() => expect(i18next.language).toBe("en"));
  });
});
