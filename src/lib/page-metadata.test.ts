import { describe, expect, it } from "vitest";
import { SITE_URL } from "./site";
import { pageMetadata } from "./page-metadata";

describe("pageMetadata", () => {
  it("sets a unique canonical, Open Graph URL and description per path", () => {
    const home = pageMetadata({
      title: "Full Stack Developer",
      description: "Home description.",
      path: "/",
    });
    const projects = pageMetadata({
      title: "Projects",
      description: "Projects description.",
      path: "/projects",
    });

    expect(home.alternates?.canonical).toBe(SITE_URL);
    expect(projects.alternates?.canonical).toBe(`${SITE_URL}/projects`);
    expect(home.description).not.toBe(projects.description);
    expect(home.openGraph?.url).toBe(SITE_URL);
    expect(projects.twitter?.title).toBe("Projects | Guilherme Pavaneli");
  });
});
