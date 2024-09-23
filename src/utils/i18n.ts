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
      // we strive to use only one flavor of English on the UI, with that being
      // Canadian English - in the code, we stick to U.S. spelling if possible
      en: {
        base: {
          guessVerb: "Guess",
          guessNoun: "Guess",
          giveUp: "Give up",
          areYouSure: "Are you sure",
          nextRound: "Next Round",
          province: "Province",
          territory: "Territory",
          provinceOrTerritory: "Province or Territory",
          capitalCity: "Capital City",
          attempts: "Attempts",
          // game round instructions
          gamePotRoundInstruction: "Select the province", // TODO: we probably don't need this
          gameFlagRoundInstruction: "Select the flag",
          gameCapitalRoundInstruction: "What is the capital",
          gameNeighborRoundInstruction: "What are the neighbours",
          gamePotRoundFinaleStats: "Stats",
          // alerts
          unknownPot: "Unknown province ot territory!",
          unknownCity: "Unknown city!",
          alreadyGuessed: "Already Guessed!",
          guessedIt: "Spot on!",
          failedIt: "Sorry, you missed it!",
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
          of_yt: "of the Yukon", // irregular, but it is also correct w/o 'the'
          of_nu: "of Nunavut",
          // capitals
          capital_on: "Toronto",
          capital_qc: "Quebec City",
          capital_ns: "Halifax",
          capital_nb: "Fredericton",
          capital_mb: "Winnipeg",
          capital_bc: "Victoria",
          capital_pe: "Charlottetown",
          capital_sk: "Regina",
          capital_ab: "Edmonton",
          capital_nl: "St. John's",
          capital_nt: "Yellowknife",
          capital_yt: "Whitehorse",
          capital_nu: "Iqaluit",
          // most populous cities/municipalities
          city_toronto: "Toronto",
          city_ottawa: "Ottawa",
          city_mississauga: "Mississauga",
          city_brampton: "Brampton",
          city_montreal: "Montreal",
          city_quebec: "Quebec City",
          city_gatineau: "Gatineau",
          city_sherbrooke: "Sherbrooke",
          city_halifax: "Halifax",
          city_cape_breton: "Cape Breton",
          city_truro: "Truro",
          city_new_glasgow: "New Glasgow",
          city_moncton: "Moncton",
          city_fredericton: "Fredericton",
          city_saint_john: "Saint John",
          city_quispamsis: "Quispamsis",
          city_winnipeg: "Winnipeg",
          city_brandon: "Brandon",
          city_steinbach: "Steinbach",
          city_winkler: "Winkler",
          city_vancouver: "Vancouver",
          city_victoria: "Victoria",
          city_kelowna: "Kelowna",
          city_abbotsford: "Abbotsford",
          city_charlottetown: "Charlottetown",
          city_summerside: "Summerside",
          city_montague: "Montague",
          city_kensington: "Kensington",
          city_saskatoon: "Saskatoon",
          city_regina: "Regina",
          city_prince_albert: "Prince Albert",
          city_moose_jaw: "Moose Jaw",
          city_calgary: "Calgary",
          city_edmonton: "Edmonton",
          city_red_deer: "Red Deer",
          city_lethbridge: "Lethbridge",
          city_st_johns: "St. John's",
          city_corner_brook: "Corner Brook",
          city_falls_windsor: "Grand Falls-Windsor",
          city_gander: "Gander",
          city_yellowknife: "Yellowknife",
          city_hay_river: "Hay River",
          city_inuvik: "Inuvik",
          city_fort_smith: "Fort Smith",
          city_whitehorse: "Whitehorse",
          city_dawson: "Dawson",
          city_watson_lake: "Watson Lake",
          city_haines_junction: "Haines Junction",
          city_iqaluit: "Iqaluit",
          city_rankin_inlet: "Rankin Inlet",
          city_arviat: "Arviat",
          city_baker_lake: "Baker Lake",
        },
      },
      fr: {
        base: {
          guessVerb: "Deviner",
          guessNoun: "Guess", // since there is no such word in French
          giveUp: "Abandonner",
          areYouSure: "Tu es sûr",
          nextRound: "Prochaine Manche",
          province: "Province",
          territory: "Territoire",
          provinceOrTerritory: "Province ou Territoire",
          capitalCity: "Ville capitale",
          attempts: "Essais",
          // game round instructions
          gamePotRoundInstruction: "Devinez la province", // TODO: we probably don't need this
          gameFlagRoundInstruction: "Quel est le drapeau",
          gameCapitalRoundInstruction: "Quelle est la capitale",
          gameNeighborRoundInstruction: "Quelles sont les voisins",
          gamePotRoundFinaleStats: "Stats",
          // alerts
          unknownPot: "Province ou territoire inconnu!",
          unknownCity: "Ville inconnue!",
          alreadyGuessed: "Déjà deviné!",
          guessedIt: "Touché-coulé!",
          failedIt: "Désolé, vous l'avez manqué!",
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
          // capitals
          capital_qc: "Ville de Québec",
          // most populous cities/municipalities
          city_montreal: "Montréal",
          city_quebec: "Québec City",
          city_cape_breton: "Cap-Breton",
        },
      },
    },
  });

export default i18next;
