import type { Metadata } from "next";
import { PageHeader } from "@/components/ui/PageHeader";
import { Playground } from "@/features/playground/Playground";
import { T } from "@/i18n/T";

export const metadata: Metadata = {
  title: "Engineering Playground",
  description:
    "Interactive demo on a simulated backend: data table, CRUD, validated forms, modal, toasts and an API demo.",
};

export default function PlaygroundPage() {
  return (
    <div className="space-y-10">
      <PageHeader
        title={<T k="nav.playground" />}
        description={<T k="playground.description" />}
      />
      <Playground />
    </div>
  );
}
