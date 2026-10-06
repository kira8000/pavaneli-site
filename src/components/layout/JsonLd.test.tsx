import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PROFILE } from "@/content/profile";
import { SITE_URL } from "@/lib/site";
import { JsonLd } from "./JsonLd";

describe("JsonLd", () => {
  it("describes the owner as a Person, without a phone number", () => {
    const { container } = render(<JsonLd />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();

    const data = JSON.parse(script?.textContent ?? "{}") as Record<string, unknown>;
    expect(data).toMatchObject({
      "@type": "Person",
      name: PROFILE.name,
      jobTitle: PROFILE.role,
      url: SITE_URL,
      email: PROFILE.email,
      sameAs: [PROFILE.links.github, PROFILE.links.linkedin],
    });
    expect(JSON.stringify(data)).not.toMatch(/\d{8,}/);
    expect(script?.innerHTML).not.toContain("<");
  });
});
