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
          guessVerb: "Guess",
          guessNoun: "Guess",
          giveUp: "Give up",
          nextRound: "Next Round",
          province: "Province",
          territory: "Territory",
          provinceOrTerritory: "Province or Territory",
          capitalCity: "Capital city",
          attempts: "Attempts",
          gamePotRoundInstruction: "Select the Flag of",
          gameFlagRoundInstruction: "Select the Flag of",
          gameCapitalRoundInstruction: "What is the Capital of",
          gamePotRoundFinaleStats: "Stats",
        },
      },
      fr: {
        base: {
          guessVerb: "Deviner",
          guessNoun: "Devine",
          giveUp: "Abandonner",
          nextRound: "Prochaine Manche",
          province: "Province",
          territory: "Territoire",
          provinceOrTerritory: "Province ou Territoire",
          capitalCity: "Ville capitale",
          attempts: "Essais",
          gamePotRoundInstruction: "TODO",
          gameCapitalRoundInstruction: "Quelle est la capitale du",
          gamePotRoundFinaleStats: "Stats",
        },
      },
      LOLcalize: {
        base: {
          guessVerb: "LOLGuess",
          guessNoun: "LOLGuess",
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
