import fs from 'fs/promises';
import path from 'path';

// The single parent folder containing all individual galleries, relative to project root
const PARENT_ASSET_DIR = 'public/gallery-assets'; 
const MANIFEST_FILE_NAME = 'manifest.json';

// Image extensions to include in the manifest
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg']);

async function generateManifests() {
  const parentPath = path.resolve(process.cwd(), PARENT_ASSET_DIR);

  try {
    // 1. Read all items (files and folders) in the parent directory
    const items = await fs.readdir(parentPath, { withFileTypes: true });

    // 2. Filter for actual directories (subfolders)
    const subfolders = items
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name);

    if (subfolders.length === 0) {
      console.log(`ℹ️ No subfolders found in '${PARENT_ASSET_DIR}'. No manifests created.`);
      return;
    }

    // 3. Iterate and create a manifest for each subfolder
    for (const folderName of subfolders) {
      const subfolderPath = path.join(parentPath, folderName);
      const manifestPath = path.join(subfolderPath, MANIFEST_FILE_NAME);

      // Read the files within the subfolder
      const files = await fs.readdir(subfolderPath);

      // Filter for images, and exclude the manifest file if it exists from a previous run
      const imageFiles = files.filter(file => {
        const fileExt = path.extname(file).toLowerCase();
        
        // Exclude the manifest file and any non-image file
        return file !== MANIFEST_FILE_NAME && IMAGE_EXTENSIONS.has(fileExt);
      });

      // Write the JSON file directly into the subfolder
      await fs.writeFile(manifestPath, JSON.stringify(imageFiles, null, 2));

      console.log(`✅ Manifest generated for subfolder: /${PARENT_ASSET_DIR.replace('public/', '')}/${folderName} (${imageFiles.length} images)`);
    }

  } catch (e) {
    // Catch errors like the parent directory not existing
    console.error(`❌ Failed to process '${PARENT_ASSET_DIR}'. Ensure the directory exists.`);
    console.error(e.message);
    process.exit(1);
  }
}

generateManifests();