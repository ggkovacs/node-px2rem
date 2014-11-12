# Pixel to rem
Version: **1.0.0**

## Installation

Run `npm install node-px2rem`

## Usage

```js
'use strict';

var fs = require('fs');
var pxtorem = require('pxtorem');
var css = fs.readFileSync('main.css', 'utf8');
var processedCss = pxtorem.process(css, {
    rootValue: 16
});

fs.writeFile('main-rem.css', processedCss, function(err) {
    if (err) {
        throw err;
    }
    console.log('Done.');
});
```

## API

### Options

Type: `Object | Null`  
Default:
```js
{
    rootValue: 16,
    unitPrecision: 5,
    propertyBlackList: [],
    replace: false,
    mediaQuery: false,
    minPx: 1
}
```

- `rootValue` (Number) The root element font size.
- `unitPrecision` (Number) The decimal numbers to allow the REM units to grow to.
- `propertyBlackList` (Array) The properties that can't change from px to rem.
- `replace` (Boolean) replaces rules containing rems instead of adding fallbacks.
- `mediaQuery` (Boolean) Allow px to be converted in media queries.
- `minPx` (Number) If minimum px greater than or equal can change from px to rem.

# License
MIT (c) 2014 Gergely Kovács (gg.kovacs@gmail.com)
