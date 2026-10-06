import { PROFILE } from "@/content/profile";
import { SITE_URL } from "@/lib/site";
import { toJsonLd } from "@/lib/safe";

export function JsonLd() {
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: PROFILE.name,
    jobTitle: PROFILE.role,
    url: SITE_URL,
    email: PROFILE.email,
    address: { "@type": "Place", name: PROFILE.location },
    sameAs: [PROFILE.links.github, PROFILE.links.linkedin],
    knowsAbout: PROFILE.stackSummary.split(" | "),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: toJsonLd(person) }}
    />
  );
}
