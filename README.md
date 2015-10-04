# Pixel to rem [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
Version: **1.0.5**

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
    propertyWhiteList: [],
    replace: false,
    mediaQuery: false,
    minPx: 1
}
```

- `rootValue` (Number) The root element font size.
- `unitPrecision` (Number) The decimal numbers to allow the REM units to grow to.
- `propertyBlackList` (Array) The properties that can't change from px to rem.
- `propertyWhiteList` (Array) The properties that can change from px to rem
- `replace` (Boolean) replaces rules containing rems instead of adding fallbacks.
- `mediaQuery` (Boolean) Allow px to be converted in media queries.
- `minPx` (Number) If minimum px greater than or equal can change from px to rem.

# License
MIT © 2015 Gergely Kovács (gg.kovacs@gmail.com)

[npm-image]: https://badge.fury.io/js/node-px2rem.svg
[npm-url]: https://npmjs.org/package/node-px2rem
[daviddm-image]: https://david-dm.org/ggkovacs/node-px2rem.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/ggkovacs/node-px2rem
