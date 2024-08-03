import i18n from "./i18n.ts";

export async function toggleLanguage(): Promise<void> {
  await i18n.changeLanguage(i18n.language === "en" ? "fr" : "en");
}
