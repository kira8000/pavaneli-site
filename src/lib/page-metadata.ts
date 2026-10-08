import type { Metadata } from "next";
import { PROFILE } from "@/content/profile";
import { SITE_URL } from "./site";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: "/" | `/${string}`;
}): Metadata {
  const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
  const ogTitle =
    path === "/" ? `${PROFILE.name} | ${PROFILE.role}` : `${title} | ${PROFILE.name}`;

  return {
    title: path === "/" ? { absolute: ogTitle } : title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: ogTitle,
      description,
      url,
      type: "website",
      siteName: PROFILE.name,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}
