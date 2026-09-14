"""Remove orphaned <> and </> fragment tags from helper functions."""
import re
from pathlib import Path

pages_dir = Path("client/src/pages")

files = [
    "About.tsx",
    "AIReadyWebsite.tsx",
    "AIVisibilityCall.tsx",
    "AIVisibilityReview.tsx",
    "ConversionSystems.tsx",
    "CRMAutomation.tsx",
    "FinancialAdvisors.tsx",
    "GoogleBusinessProfileOptimizationReview.tsx",
    "Industries.tsx",
    "InsuranceAgencies.tsx",
    "RevenueDiagnostic.tsx",
]

for filename in files:
    filepath = pages_dir / filename
    text = filepath.read_text(encoding="utf-8")
    original = text

    # Remove orphaned opening fragment: lines with just "<>"
    # These are inside helper function returns
    text = re.sub(r'\n(\s+)<>(\n)', r'\n\1', text)

    # Remove orphaned closing fragment: lines with just "</>"
    text = re.sub(r'(\n\s+)</>(\s*\n)', r'\1\2', text)

    if text != original:
        filepath.write_text(text, encoding="utf-8")
        print(f"FIXED {filename}")
    else:
        print(f"OK {filename}")

print("\nDone!")
