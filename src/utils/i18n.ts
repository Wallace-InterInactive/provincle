import i18next from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// preferably use title case, unless it is a sentence with punctuation
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
          capitalCity: "Capital City",
          attempts: "Attempts",
          gamePotRoundInstruction: "Select the Province",
          gameFlagRoundInstruction: "Select the Flag",
          gameCapitalRoundInstruction: "What is the Capital",
          gameNeighborRoundInstruction: "What are the neighbors",
          gamePotRoundFinaleStats: "Stats",
        },
        geo: {
          ca: "Canada",
          of_ca: "of Canada",
          // names of provinces and territories
          on: "Ontario",
          qc: "Quebec",
          ns: "Nova Scotia",
          nb: "New Brunswick",
          mb: "Manitoba",
          bc: "British Columbia",
          pe: "Prince Edward Island",
          sk: "Saskatchewan",
          ab: "Alberta",
          nl: "Newfoundland and Labrador",
          nt: "Northwest Territories",
          yt: "Yukon",
          nu: "Nunavut",
          // names of provinces and territories with prepositions
          of_on: "of Ontario",
          of_qc: "of Quebec",
          of_ns: "of Nova Scotia",
          of_nb: "of New Brunswick",
          of_mb: "of Manitoba",
          of_bc: "of British Columbia",
          of_pe: "of Prince Edward Island",
          of_sk: "of Saskatchewan",
          of_ab: "of Alberta",
          of_nl: "of Newfoundland and Labrador",
          of_nt: "of Northwest Territories",
          of_yt: "of the Yukon", // irregular, but it's also correct w/o 'the'
          of_nu: "of Nunavut",
          // TODO: names of cities and towns (capitals & perhaps more)
        },
      },
      fr: {
        base: {
          guessVerb: "Deviner",
          guessNoun: "Guess", // since there is no such word in French
          giveUp: "Abandonner",
          nextRound: "Prochaine Manche",
          province: "Province",
          territory: "Territoire",
          provinceOrTerritory: "Province ou Territoire",
          capitalCity: "Ville capitale",
          attempts: "Essais",
          gamePotRoundInstruction: "TODO", // TODO: we probably don't need this
          gameFlagRoundInstruction: "Quel est le drapeau",
          gameCapitalRoundInstruction: "Quelle est la capitale",
          gamePotRoundFinaleStats: "Stats",
        },
        geo: {
          ca: "Canada",
          of_ca: "du Canada",
          // names of provinces and territories
          on: "Ontario",
          qc: "Québec",
          ns: "Nouvelle-Écosse",
          nb: "Nouveau-Brunswick",
          mb: "Manitoba",
          bc: "Colombie-Britannique",
          pe: "Île-du-Prince-Édouard",
          sk: "Saskatchewan",
          ab: "Alberta",
          nl: "Terre-Neuve-et-Labrador",
          nt: "Territoires du Nord-Ouest",
          yt: "Yukon",
          nu: "Nunavut",
          // names of provinces and territories with prepositions
          of_on: "de l'Ontario",
          of_qc: "du Québec",
          of_ns: "de la Nouvelle-Écosse",
          of_nb: "du Nouveau-Brunswick",
          of_mb: "du Manitoba",
          of_bc: "de la Colombie-Britannique",
          of_pe: "de l'Île-du-Prince-Édouard",
          of_sk: "de la Saskatchewan",
          of_ab: "de l'Alberta",
          of_nl: "de Terre-Neuve-et-Labrador",
          of_nt: "des Territoires du Nord-Ouest",
          of_yt: "du Yukon", // irregular, but it's also correct w/o 'the'
          of_nu: "du Nunavut",
          // TODO: names of cities and towns (capitals & perhaps more)
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
          capitalCity: "LOLCapital City",
          attempts: "LOLAttempts",
          gamePotRoundInstruction: "LOLTODO", // TODO: we probably don't need this
          gameFlagRoundInstruction: "LOLSelect the flag",
          gameCapitalRoundInstruction: "LOLWhat is the capital",
          gamePotRoundFinaleStats: "LOLStats",
        },
        geo: {
          ca: "LOLCanada",
          of_ca: "LOLof Canada",
          // names of provinces and territories
          on: "LOLOntario",
          qc: "LOLQuebec",
          ns: "LOLNova Scotia",
          nb: "LOLNew Brunswick",
          mb: "LOLManitoba",
          bc: "LOLBritish Columbia",
          pe: "LOLPrince Edward Island",
          sk: "LOLSaskatchewan",
          ab: "LOLAlberta",
          nl: "LOLNewfoundland and Labrador",
          nt: "LOLNorthwest Territories",
          yt: "LOLYukon",
          nu: "LOLNunavut",
          // names of provinces and territories with prepositions
          of_on: "LOLof Ontario",
          of_qc: "LOLof Quebec",
          of_ns: "LOLof Nova Scotia",
          of_nb: "LOLof New Brunswick",
          of_mb: "LOLof Manitoba",
          of_bc: "LOLof British Columbia",
          of_pe: "LOLof Prince Edward Island",
          of_sk: "LOLof Saskatchewan",
          of_ab: "LOLof Alberta",
          of_nl: "LOLof Newfoundland and Labrador",
          of_nt: "LOLof Northwest Territories",
          of_yt: "LOLof the Yukon", // irregular, but it's also correct w/o 'the'
          of_nu: "LOLof Nunavut",
          // TODO: names of cities and towns (capitals & perhaps more)
        },
      },
    },
  });

export default i18next;
