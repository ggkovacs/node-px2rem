# Pixel to rem
Version: **1.0.3**

## Installation

Run `npm install node-px2rem`

## Usage

```js
'use strict';

var fs = require('fs');
var px2rem = require('node-px2rem');
var css = fs.readFileSync('main.css', 'utf8');
var processedCss = px2rem.process(css, {
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
- `propWhiteList` (Array) The properties that can change from px to rem
- `replace` (Boolean) replaces rules containing rems instead of adding fallbacks.
- `mediaQuery` (Boolean) Allow px to be converted in media queries.
- `minPx` (Number) If minimum px greater than or equal can change from px to rem.

# License
MIT (c) 2015 Gergely Kovács (gg.kovacs@gmail.com)
