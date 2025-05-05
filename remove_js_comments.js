import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name from the URL of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to remove comments from a JavaScript string
function removeComments(code) {
  // Remove single-line comments
  code = code.replace(/\/\/.*$/gm, '');
  
  // Remove multi-line comments
  code = code.replace(/\/\*[\s\S]*?\*\//g, '');
  
  // Remove empty lines
  code = code.replace(/^\s*[\r\n]/gm, '');
  
  return code;
}

// Function to process a file
function processFile(filePath) {
  console.log(`Processing: ${filePath}`);
  
  try {
    // Read the file
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Remove comments
    const cleanedContent = removeComments(content);
    
    // Write the cleaned content back to the file
    fs.writeFileSync(filePath, cleanedContent, 'utf8');
    
    console.log(`Successfully processed: ${filePath}`);
  } catch (error) {
    console.error(`Error processing ${filePath}: ${error.message}`);
  }
}

// Function to walk through directory recursively
function processDirectory(directory) {
  const items = fs.readdirSync(directory);
  
  for (const item of items) {
    const itemPath = path.join(directory, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory() && item !== 'node_modules') {
      // Recursively process subdirectories
      processDirectory(itemPath);
    } else if (stats.isFile() && (item.endsWith('.js') || item.endsWith('.jsx'))) {
      // Process JavaScript/JSX files
      processFile(itemPath);
    }
  }
}

// Start processing the src directory
console.log('Starting to remove comments from JavaScript/JSX files...');
processDirectory(path.join(__dirname, 'src'));
console.log('Finished removing comments from JavaScript/JSX files.'); 