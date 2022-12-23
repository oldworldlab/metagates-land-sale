// Step 1: Read "build/asset-manifest.json" and parse the JSON data

const assetManifest = require("../build/asset-manifest.json");

// Step 2: Get all the chunk names from "files" property

const chunkNames = Object.values(assetManifest.files).filter((fileName) =>
  fileName.endsWith(".js") || fileName.endsWith(".css")
);

// Step 3: Add the chunk names to "entrypoints" property

assetManifest.entrypoints = chunkNames;

// Step 4: Write the updated "asset-manifest.json" file

const fs = require("fs");
const path = require("path");
fs.writeFileSync(
  path.resolve(__dirname, "../build/asset-manifest.json"),
  JSON.stringify(assetManifest, null, 2)
);
