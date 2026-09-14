import { readdirSync, readFileSync, writeFileSync } from "fs";
import { join } from "path";

const pagesDir = join(process.cwd(), "client/src/pages");
const files = readdirSync(pagesDir).filter(f => f.endsWith(".tsx"));

const seoImport = 'import { Seo } from "@/components/Seo";\n';

for (const file of files) {
  const fullPath = join(pagesDir, file);
  let content = readFileSync(fullPath, "utf8");

  // Skip if already has Seo
  if (content.includes("@/components/Seo")) {
    console.log(`SKIP (already has Seo): ${file}`);
    continue;
  }

  // Add import after TableOfContents
  if (content.includes("@/components/TableOfContents")) {
    content = content.replace(
      /import TableOfContents from "@\/components\/TableOfContents";/,
      `import TableOfContents from "@/components/TableOfContents";\n${seoImport}`
    );
  }

  // Add <Seo /> as first child of the outermost div/jsx return
  // Find the page's main return div
  content = content.replace(
    /(return \(\s*)(<div)/,
    `$1<><Seo />\n      <div`
  );

  // Close the React.Fragment at the end
  content = content.replace(
    /(\s+\);)(\s*\})(\s*export default function)/,
    `$1</>$2$3`
  );

  writeFileSync(fullPath, content);
  console.log(`Updated: ${file}`);
}
