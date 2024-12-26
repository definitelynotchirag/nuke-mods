
# Nuke-mods 🚀

`nuke-mods` is a command-line tool to delete all `node_modules` directories in a specified folder and its subdirectories, with the option to exclude specific folders from deletion. 💻🗑️

No more manual deletion and don't let `node_modules` eat up your storage!

## Features ✨

- Delete all `node_modules` directories inside the specified folder and its subfolders.
- Exclude specific folders (both top-level and nested) from deletion.
- Process multiple folders at once.
- Defaults to the current directory if no folder is specified.

## Installation ⚙️

Install `nuke-mods` globally with npm:

```bash
npm install -g nuke-mods
```

## Usage 📜

### Basic Usage

By default, `nuke-mods` will delete all `node_modules` directories inside the current directory:

```bash
nuke-mods
```

### Specify Folders to Search

Specify one or more folders to search for `node_modules` directories:

```bash
nuke-mods folder1,folder2
```

### Exclude Specific Folders

Use the `--exclude` flag to exclude one or more folders (and their `node_modules`) from deletion. The script will skip deleting `node_modules` inside these excluded folders:

```bash
nuke-mods --exclude=folder3,folder4
```

You can specify multiple folders to exclude, and they can be nested. The script will only skip `node_modules` inside the specified folders.

### Combine Folders and Exclusions

You can combine both folder specifications and exclusions:

```bash
nuke-mods folder1,folder2 --exclude=folder3,folder4
```

This will:
- Search for `node_modules` inside `folder1` and `folder2`.
- Exclude any `node_modules` inside `folder3` and `folder4` (including nested ones).

### Examples

1. **Delete `node_modules` inside the current directory:**
   ```bash
   nuke-mods
   ```

2. **Delete `node_modules` inside `project-1` and `project-2`, but exclude `node_modules` inside `project-2/pro-4`:**
   ```bash
   nuke-mods project-1,project-2 --exclude=project-2/pro-4
   ```

3. **Delete `node_modules` inside `project-1`, `project-2`, and `project-3`, but exclude `project-2/pro-4` and `project-1/pro-1`:**
   ```bash
   nuke-mods project-1,project-2,project-3 --exclude=project-2/pro-4,project-1/pro-1
   ```

---

## How It Works 🛠️

1. **Target Folders**: The script looks for `node_modules` inside the folders you specify or the current directory by default.
2. **Exclusion Logic**: If you specify `--exclude`, the script will skip deleting `node_modules` inside those excluded folders, whether they are top-level or nested.

---

## Installation Issues 🚨

If you run into issues with the command not being recognized, ensure the package is installed globally:

```bash
npm install -g nuke-mods
```

You may also need to ensure the script has executable permissions:

```bash
chmod +x /path/to/nuke-mods
```

Accidently deleted node_modules??
No worries just run:
```bash
npm install
```

---
