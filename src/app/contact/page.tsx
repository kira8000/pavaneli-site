import type { Metadata } from "next";
import { CopyEmailButton } from "@/components/ui/CopyEmailButton";
import { ExternalLink, MailLink } from "@/components/ui/ExternalLink";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section } from "@/components/ui/Section";
import { PROFILE } from "@/content/profile";
import { T } from "@/i18n/T";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact Guilherme Pavaneli — LinkedIn, GitHub or email. São Paulo, SP, open to remote opportunities in Brazil.",
  path: "/contact",
});

function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

const ROW = "flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-4";

export default function ContactPage() {
  const { email, location, links } = PROFILE;

  return (
    <div className="space-y-16">
      <PageHeader
        title={<T k="nav.contact" />}
        description={<T k="contact.description" />}
      />

      <Section
        id="channels"
        title={<T k="contact.channelsTitle" />}
        description={<T k="contact.channelsBody" />}
      >
        <ul className="divide-border border-border divide-y border-y font-mono text-sm">
          <li className={ROW}>
            <span className="text-subtle">LinkedIn</span>
            <ExternalLink href={links.linkedin}>
              {displayUrl(links.linkedin)}
            </ExternalLink>
          </li>
          <li className={ROW}>
            <span className="text-subtle">GitHub</span>
            <ExternalLink href={links.github}>{displayUrl(links.github)}</ExternalLink>
          </li>
          <li className={ROW}>
            <span className="text-subtle">
              <T k="contact.email" />
            </span>
            <span className="flex flex-wrap items-center justify-end gap-2">
              <MailLink email={email}>{email}</MailLink>
              <CopyEmailButton email={email} />
            </span>
          </li>
          <li className={ROW}>
            <span className="text-subtle">
              <T k="contact.location" />
            </span>
            <span className="text-muted">{location}</span>
          </li>
        </ul>
      </Section>
    </div>
  );
}
