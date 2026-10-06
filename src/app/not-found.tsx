import type { Metadata } from "next";
import { StatusView } from "@/components/StatusView";

export const metadata: Metadata = { title: "404" };

export default function NotFound() {
  return <StatusView code="404" variant="not-found" />;
}
