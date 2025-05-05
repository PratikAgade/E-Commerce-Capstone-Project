import fs from 'fs';

// Read the broken file
const filePath = 'src/data/sampleProducts.js';
const content = fs.readFileSync(filePath, 'utf8');

// Fix the line breaks in the file by ensuring each property is on a single line
// Look for patterns of URLs and strings that might be broken across lines
let fixedContent = content
  // Join lines that are broken in the middle of URLs (https:)
  .replace(/https:[^\n"]*\n[^"]*"/g, match => match.replace(/\n/g, ''))
  // Join lines that are broken in the middle of descriptions
  .replace(/description:[^\n"]*\n[^"]*"/g, match => match.replace(/\n/g, ''))
  // Fix any other broken strings
  .replace(/("[^"\n]*)\n([^"]*")/g, (match, p1, p2) => p1 + p2);

// Write the fixed content back to the file
fs.writeFileSync(filePath, fixedContent, 'utf8');

console.log('Fixed sampleProducts.js file'); 