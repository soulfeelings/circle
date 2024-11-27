const fs = require("fs");
const path = require("path");

// Get the folder name from the console input
const folderName = process.argv[2];

if (!folderName) {
    console.error("Please provide a folder name.");
    process.exit(1);
}

// Define the destination folder
const destination = path.join(__dirname, "..", "src", "ui", folderName);

// Ensure the destination folder doesn't already exist
if (fs.existsSync(destination)) {
    console.error(`Folder "${folderName}" already exists in ./src/ui.`);
    process.exit(1);
}

// Create the folder and files
fs.mkdirSync(destination, {recursive: true});

// Create the component file
const tsxContent = `export const ${folderName} = () => {
  return <div>${folderName} Component</div>;
};
`;

fs.writeFileSync(path.join(destination, `${folderName}.tsx`), tsxContent);

// Create the style file
const styleContent = `// Add styles for ${folderName} here
`;

fs.writeFileSync(path.join(destination, `${folderName}.styles.ts`), styleContent);

console.log(`Folder "${folderName}" created with ${folderName}.tsx and ${folderName}.styles.ts.`);
