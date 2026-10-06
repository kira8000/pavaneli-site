import { ExternalLink, MailLink } from "@/components/ui/ExternalLink";
import { PROFILE } from "@/content/profile";
import { T } from "@/i18n/T";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-border text-subtle border-t px-4 py-6 font-mono text-xs sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3">
        <p>
          © {year} {PROFILE.name}
          <span aria-hidden> · </span>
          {PROFILE.location}
        </p>
        <ul className="flex flex-wrap gap-4">
          <li>
            <ExternalLink href={PROFILE.links.github}>GitHub</ExternalLink>
          </li>
          <li>
            <ExternalLink href={PROFILE.links.linkedin}>LinkedIn</ExternalLink>
          </li>
          <li>
            <MailLink email={PROFILE.email}>
              <T k="footer.email" />
            </MailLink>
          </li>
        </ul>
      </div>
    </footer>
  );
}
