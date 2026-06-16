import { redirect } from "next/navigation";

// The A/B comparison now lives inline on the skill detail page. Keep this URL
// working by redirecting to the embedded section.
export default function ResearchComparePage() {
  redirect("/projects/deep-research-report#compare");
}
