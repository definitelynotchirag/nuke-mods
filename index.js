#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
const rimraf = require('rimraf');

async function deleteNodeModules(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory() && entry.name === 'node_modules') {
        console.log(`Deleting: ${fullPath}`);
        rimraf.sync(fullPath); // Cross-platform folder deletion
      } else if (entry.isDirectory()) {
        await deleteNodeModules(fullPath); // Recursively check subdirectories
      }
    }
  } catch (err) {
    console.error(`Error processing ${dir}: ${err.message}`);
  }
}

(async () => {
  // Get the directory from arguments or use the current working directory
  const targetDir = process.argv[2] || process.cwd();
  console.log(`Scanning directory: ${targetDir}`);
  await deleteNodeModules(path.resolve(targetDir));
  console.log('All node_modules folders deleted.');
})();
