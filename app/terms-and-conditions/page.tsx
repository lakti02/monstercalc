import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";
import { TERMS } from "@/lib/content/legal";

const doc = TERMS;

export const metadata: Metadata = {
  title: doc.metaTitle,
  description: doc.description,
  alternates: { canonical: `/${doc.slug}/` },
  openGraph: {
    type: "website",
    title: doc.metaTitle,
    description: doc.description,
    url: `/${doc.slug}/`,
  },
  twitter: {
    card: "summary_large_image",
    title: doc.metaTitle,
    description: doc.description,
  },
};

export default function Page() {
  return <LegalPage doc={doc} />;
}
