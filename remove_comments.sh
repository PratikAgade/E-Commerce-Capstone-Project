#!/bin/bash

# Function to remove single line and block comments from JS/JSX files
remove_comments() {
  local file=$1
  echo "Processing $file"
  
  # Create a temporary file
  temp_file=$(mktemp)
  
  # Step 1: Remove single-line comments (// comment)
  # This preserves newlines to maintain line numbers
  sed 's|//.*$||g' "$file" > "$temp_file"
  
  # Step 2: Remove multi-line comments (/* comment */)
  # We use perl for multi-line patterns
  perl -0777 -pe 's|/\*[\s\S]*?\*/||g' "$temp_file" > "$file"
  
  # Step 3: Remove empty lines and extra whitespace
  temp_file2=$(mktemp)
  sed '/^[[:space:]]*$/d' "$file" > "$temp_file2"
  cat "$temp_file2" > "$file"
  
  # Clean up
  rm "$temp_file" "$temp_file2"
}

# Find all JavaScript and JSX files in the src directory
find src -type f \( -name "*.js" -o -name "*.jsx" \) | while read file; do
  remove_comments "$file"
done

echo "All comments have been removed from JavaScript and JSX files in the src directory." 