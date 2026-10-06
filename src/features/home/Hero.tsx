import Link from "next/link";
import { buttonStyles } from "@/components/ui/Button";
import { PROFILE } from "@/content/profile";
import { T } from "@/i18n/T";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading">
      <p className="text-accent font-mono text-sm">
        <span aria-hidden>&gt; </span>
        {PROFILE.role}
      </p>
      <h1
        id="hero-heading"
        className="mt-4 font-mono text-4xl font-semibold tracking-tight sm:text-5xl"
      >
        {PROFILE.name}
      </h1>
      <p className="text-muted mt-3 font-mono text-base sm:text-lg">
        {PROFILE.stackSummary}
      </p>
      <p className="text-muted mt-6 max-w-2xl text-lg">
        <T k="home.heroDescription" />
      </p>
      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/projects" className={buttonStyles({ variant: "primary" })}>
          <T k="home.ctaProjects" />
        </Link>
        <Link href="/contact" className={buttonStyles()}>
          <T k="home.ctaContact" />
        </Link>
      </div>
    </section>
  );
}
