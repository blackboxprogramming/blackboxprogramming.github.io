#!/usr/bin/env node
/**
 * BlackRoad OS, Inc. — Proprietary. All Rights Reserved.
 * Build script: copies static assets to dist/
 */

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const DIST = path.join(ROOT, 'dist');

const STATIC_FILES = ['index.html', 'LICENSE'];

// Create dist directory
if (!fs.existsSync(DIST)) {
  fs.mkdirSync(DIST, { recursive: true });
}

// Copy static files
for (const file of STATIC_FILES) {
  const src = path.join(ROOT, file);
  const dest = path.join(DIST, file);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`  ✓ ${file}`);
  } else {
    console.warn(`  ⚠ ${file} not found, skipping`);
  }
}

// Copy public/ directory if it exists
const publicDir = path.join(ROOT, 'public');
if (fs.existsSync(publicDir)) {
  copyDirSync(publicDir, DIST);
  console.log('  ✓ public/ assets copied');
}

console.log(`\nBuild complete → ${DIST}`);

function copyDirSync(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath, { recursive: true });
      }
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}
