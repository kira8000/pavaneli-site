import type { EducationEntry } from "./types";

/** From the owner's CV. */
export const EDUCATION: readonly EducationEntry[] = [
  {
    id: "unicid",
    institution: "Universidade Cidade de São Paulo (UNICID)",
    course: {
      en: "Technology degree in Systems Analysis and Development",
      "pt-BR": "Tecnologia em Análise e Desenvolvimento de Sistemas",
    },
    startDate: "2019-08",
    endDate: "2021-08",
  },
  {
    id: "fmu",
    institution: "Centro Universitário FMU | FIAM-FAAM",
    course: {
      en: "Technology degree in Digital Games",
      "pt-BR": "Tecnologia em Jogos Digitais",
    },
    startDate: "2016-08",
    endDate: "2018-12",
  },
];
