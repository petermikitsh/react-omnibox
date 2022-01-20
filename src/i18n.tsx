const langPacks = {
  de: {
    search: "Suchen",
  },
  en: {
    search: "Search",
  },
  es: {
    search: "Buscar",
  },
  fr: {
    search: "Rechercher",
  },
  ja: {
    search: "検索",
  },
};

export type langCode = "en" | "es" | "de" | "fr" | "ja";

export const getTranslation = (key: string, language: langCode = "en") => {
  const langPack = langPacks[language];
  return langPack[key] || key;
};
