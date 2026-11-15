import type { Metadata } from "next";
import { ToolPage } from "@/components/ToolPage";
import { TOOL_BY_ID } from "@/lib/tools";

const tool = TOOL_BY_ID.concrete;

export const metadata: Metadata = {
  title: tool.title,
  description: tool.description,
  keywords: tool.keywords,
  alternates: { canonical: `/${tool.slug}/` },
  openGraph: {
    type: "website",
    title: tool.title,
    description: tool.description,
    url: `/${tool.slug}/`,
  },
  twitter: {
    card: "summary_large_image",
    title: tool.title,
    description: tool.description,
  },
};

export default function Page() {
  return <ToolPage toolId="concrete" />;
}
