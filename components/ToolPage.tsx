import { Hero } from "@/components/Hero";
import { ToolSeo } from "@/components/seo/ToolSeo";
import { JsonLdScript, breadcrumbLd, faqLd, softwareAppLd } from "@/lib/seo";
import { TOOL_BY_ID, type ToolId } from "@/lib/tools";
import { ConcreteCalculator } from "@/components/tools/ConcreteCalculator";
import { GpaCalculator } from "@/components/tools/GpaCalculator";
import { AgeCalculator } from "@/components/tools/AgeCalculator";
import { BinomialCalculator } from "@/components/tools/BinomialCalculator";
import { ScientificCalculator } from "@/components/tools/ScientificCalculator";

type WorkspaceComponent = (props: { titleTag?: "h1" | "h2" }) => React.ReactElement;

const WORKSPACE: Record<ToolId, WorkspaceComponent> = {
  concrete: ConcreteCalculator,
  gpa: GpaCalculator,
  age: AgeCalculator,
  binomial: BinomialCalculator,
  scientific: ScientificCalculator,
};

/**
 * Server-rendered shell around one client calculator. The hero, SEO block,
 * formulas and FAQ all exist in the HTML; only the workspace hydrates.
 */
export function ToolPage({ toolId }: { toolId: ToolId }) {
  const tool = TOOL_BY_ID[toolId];
  const Workspace = WORKSPACE[toolId];

  return (
    <>
      <JsonLdScript
        data={[
          softwareAppLd(tool),
          faqLd(tool),
          breadcrumbLd([
            { name: "Home", path: "/" },
            { name: tool.name, path: `/${tool.slug}` },
          ]),
        ]}
      />
      <Hero activeTool={toolId} />
      <main id="main" style={{ maxWidth: 1240, margin: "0 auto", padding: "0 24px 20px" }}>
        <Workspace />
        <ToolSeo tool={tool} />
      </main>
    </>
  );
}
