interface Profile {
  name: string;
  role: string;
  stackSummary: string;
  location: string;
  email: string;
  links: { github: string; linkedin: string };
}

/** Verified, owner-provided facts only (from the owner's CV). The phone number is intentionally not published. */
export const PROFILE: Profile = {
  name: "Guilherme Pavaneli",
  role: "Full Stack Developer",
  stackSummary: "React.js | Next.js | TypeScript | Node.js",
  location: "São Paulo, SP",
  email: "guilherme_pavanelli@hotmail.com",
  links: {
    github: "https://github.com/kira8000",
    linkedin: "https://www.linkedin.com/in/guilherme-pavaneli/",
  },
};
