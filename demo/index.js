'use strict';

const fs = require('fs');
const path = require('path');
const px2rem = require('../index.js');
const css = fs.readFileSync(path.join(__dirname, 'main.css'), 'utf8');
const processedCSS = px2rem.process(css, {
  mediaQuery: true
});

fs.writeFile(path.join(__dirname, 'main-rem.css'), processedCSS, (err) => {
  if (err) {
    throw err;
  }

  console.log('Done.');
});
