import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// preferably use title case
i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: "en",
    fallbackNS: "base",
    resources: {
      en: {
        base: {
          guess: "Guess",
          giveUp: "Give up",
          nextRound: "Next Round",
          province: "Province",
          territory: "Territory",
          provinceOrTerritory: "Province or Territory",
          attempts: "Attempts",
          gamePotRoundInstruction: "Select the Flag of",
          gamePotRoundFinaleStats: "Stats",
        },
      },
      fr: {
        base: {
          guess: "Deviner",
          giveUp: "Abandonner",
          nextRound: "Prochaine Manche",
          province: "Province",
          territory: "Territoire",
          provinceOrTerritory: "Province ou Territoire",
          attempts: "Essais",
          gamePotRoundInstruction: "TODO",
          gamePotRoundFinaleStats: "Stats",
        },
      },
      LOLcalize: {
        base: {
          guess: "LOLGuess",
          giveUp: "LOLGive up",
          nextRound: "LOLNext Round",
          province: "LOLProvince",
          territory: "LOLTerritory",
          provinceOrTerritory: "LOLProvince or Territory",
          attempts: "LOLAttempts",
          gamePotRoundInstruction: "LOLSelect the Flag of",
          gamePotRoundFinaleStats: "LOLStats",
        },
      },
    },
    interpolation: { escapeValue: false },
  });

export default i18next;
