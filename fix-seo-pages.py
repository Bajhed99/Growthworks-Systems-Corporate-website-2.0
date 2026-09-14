"""Fix remaining misplaced <Seo /> in page files - handles both opening and closing fragments."""
import re
from pathlib import Path

pages_dir = Path("client/src/pages")

fixes = [
    ("About.tsx", "/about"),
    ("AIReadyWebsite.tsx", "/ai-ready-website"),
    ("AIVisibilityCall.tsx", "/ai-visibility-call"),
    ("AIVisibilityReview.tsx", "/ai-visibility-review"),
    ("ConversionSystems.tsx", "/conversion-systems"),
    ("CRMAutomation.tsx", "/crm-automation"),
    ("FinancialAdvisors.tsx", "/financial-advisors"),
    ("GoogleBusinessProfileOptimizationReview.tsx", "/google-business-profile-optimization-review"),
    ("Industries.tsx", "/industries"),
    ("InsuranceAgencies.tsx", "/insurance-agencies"),
    ("RevenueDiagnostic.tsx", "/revenue-diagnostic"),
]

for filename, canonical in fixes:
    filepath = pages_dir / filename
    text = filepath.read_text(encoding="utf-8")
    original = text

    # 1. Remove ALL lines containing <><Seo ... />
    # Also remove the corresponding closing </> lines
    lines = text.split('\n')
    new_lines = []
    i = 0
    removed_seo = False
    removed_closing = False

    while i < len(lines):
        line = lines[i]

        # Remove the <><Seo ... /> line
        if re.search(r'<><Seo\s', line):
            removed_seo = True
            i += 1
            continue

        # Remove the closing </> line (it's a standalone closing fragment tag)
        if re.search(r'^\s+</>\s*$', line):
            removed_closing = True
            i += 1
            continue

        new_lines.append(line)
        i += 1

    text = '\n'.join(new_lines)

    # 2. Now remove the opening < and closing > from fragment wrappers in helper functions
    # The agent removed <><Seo /> but left the < > fragment wrapper, or removed the Seo but left <>
    # We need to handle:
    #   return (
    #     <>
    #       <div
    #   =>
    #   return (
    #     <div
    # AND
    #   </div>
    #   </>
    #   );
    #   =>
    #   </div>
    # );

    # Remove opening < followed by > on next line when it's a fragment
    # Pattern: lines like "      <>" (opening fragment)
    text = re.sub(r'\n(\s+)<>(\n)', r'\n\1', text)

    # Remove closing > followed by </ on same or next line when it's a fragment
    # Pattern: "    </>" (closing fragment)
    text = re.sub(r'(\n\s+)</>(\s*\n)', r'\1\2', text)

    # 3. Add <Seo /> to the main component's return
    main_component_match = re.search(r'export default function (\w+)\(\) \{', text)
    if not main_component_match:
        print(f"WARNING: Could not find main component in {filename}")
        continue

    func_start = main_component_match.end()

    # Find the first "return (\n" after the function signature
    return_match = re.search(r'\n(  return \(\n)(\s*)(<)', text[func_start:])
    if not return_match:
        print(f"WARNING: Could not find main return in {filename}")
        continue

    return_pos = func_start + return_match.start(1)
    newline_after_return = return_pos + len(return_match.group(1))
    indent = return_match.group(2)

    # Check if Seo is already there
    snippet = text[return_pos:return_pos+400]
    if '<Seo' in snippet:
        print(f"SKIP {filename}: Seo already present")
        continue

    # Insert <Seo /> as first child
    seo_tag = f'{indent}<Seo canonical="{canonical}" />\n'
    text = text[:newline_after_return] + seo_tag + text[newline_after_return:]

    filepath.write_text(text, encoding="utf-8")
    print(f"FIXED {filename}")

print("\nDone!")
