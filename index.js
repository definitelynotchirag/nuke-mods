#!/usr/bin/env node

const fs = require('fs/promises');
const path = require('path');
const rimraf = require('rimraf');

/**
 * Delete all `node_modules` directories within a given folder.
 * Excludes directories specified in the `excludeFolders` array.
 */
async function deleteNodeModules(dir, excludeFolders = []) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      // Skip excluded folders (match exact paths)
      if (excludeFolders.includes(fullPath)) {
        console.log(`Skipping: ${fullPath}`);
        continue;
      }

      if (entry.isDirectory()) {
        if (entry.name === "node_modules") {
          console.log(`Deleting: ${fullPath}`);
          rimraf.sync(fullPath); // Delete the node_modules folder
        } else {
          await deleteNodeModules(fullPath, excludeFolders); // Recursively check subdirectories
        }
      }
    }
  } catch (err) {
    console.error(`Error processing ${dir}: ${err.message}`);
  }
}

/**
 * Main logic to handle arguments and call deleteNodeModules for each folder.
 */
(async () => {
  // Parse arguments
  const args = process.argv.slice(2);

  // Target folders to search for node_modules
  const targetFoldersArg = args.find(arg => !arg.startsWith("--exclude="));
  const targetFolders = targetFoldersArg ? targetFoldersArg.split(",") : [process.cwd()];

  // Folders to exclude
  const excludeArg = args.find(arg => arg.startsWith("--exclude="));
  const excludeFolders = excludeArg ? excludeArg.split("=")[1].split(",").map(ex => path.resolve(ex)) : [];

  console.log(`Target folders to search: ${targetFolders.join(", ")}`);
  if (excludeFolders.length > 0) {
    console.log(`Excluding folders: ${excludeFolders.join(", ")}`);
  }

  // Process each target folder
  for (const folder of targetFolders) {
    console.log(`Processing folder: ${folder}`);
    await deleteNodeModules(path.resolve(folder), excludeFolders);
  }

  console.log("Node_modules deletion completed!");
})();
