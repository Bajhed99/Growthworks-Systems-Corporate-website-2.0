import zipfile, os

zip_path = r'C:\Users\sjhed\Downloads\How GWS Applies the Framework.zip'
out_dir  = r'C:\Users\sjhed\Downloads\How_GWS_Applies'

os.makedirs(out_dir, exist_ok=True)

z = zipfile.ZipFile(zip_path)
print('Zip contents:', z.namelist())
for name in z.namelist():
    z.extract(name, out_dir)
print('Extraction complete.')
for root, dirs, files in os.walk(out_dir):
    for f in files:
        print(os.path.join(root, f))
