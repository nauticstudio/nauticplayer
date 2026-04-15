import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const dir = 'public/captures';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

for (const file of files) {
  const name = path.parse(file).name;
  const inPath = path.join(dir, file);
  const outPath = path.join(dir, `${name}.webp`);
  
  // Use sharp-cli to convert
  console.log(`Optimizing ${file} to ${name}.webp...`);
  execSync(`npx -y sharp-cli@^3.0.0 -i "${inPath}" -o "${outPath}"`);
}
console.log('All done!');