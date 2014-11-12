# Pixel to rem
Version: **0.0.1**

## Installation

Run `npm install node-pxtorem`

## Usage

```js
'use strict';

var fs = require('fs');
var pxtorem = require('pxtorem');
var css = fs.readFileSync('main.css', 'utf8');
var processedCss = pxtorem.process(css, '16px');

fs.writeFile('main-rem.css', processedCss, function(err) {
    if (err) {
        throw err;
    }
    console.log('Done.');
});
```

# License
MIT (c) 2014 Gergely Kovács (gg.kovacs@gmail.com)
