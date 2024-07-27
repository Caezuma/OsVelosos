const fs = require('fs');
const path = require('path');

const envConfig = JSON.parse(fs.readFileSync(path.join(__dirname, 'env.json')));

for (const [key, value] of Object.entries(envConfig)) {
  process.env[key] = value;
}