"""Create the production zip file from dist/public/."""
import zipfile
import os
from pathlib import Path

dist_dir = Path("dist/public")
output_zip = Path("gws-website-production.zip")

# Use a date after 1980 to avoid zipfile warnings
zip_date = (2026, 9, 15, 0, 0, 0)

with zipfile.ZipFile(output_zip, 'w', zipfile.ZIP_DEFLATED) as zf:
    for file_path in sorted(dist_dir.rglob('*')):
        if file_path.is_file():
            arcname = file_path.relative_to(dist_dir)
            info = zipfile.ZipInfo(filename=str(arcname), date_time=zip_date)
            info.compress_type = zipfile.ZIP_DEFLATED
            with open(file_path, 'rb') as f:
                zf.writestr(info, f.read())
            print(f"Added: {arcname}")

print(f"\nCreated: {output_zip} ({output_zip.stat().st_size / 1024 / 1024:.1f} MB)")
