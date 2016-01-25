'use strict';

var fs = require('fs');
var px2rem = require('../index.js');
var css = fs.readFileSync('main.css', 'utf8');
var processedCSS = px2rem.process(css, {
    mediaQuery: true
});

fs.writeFile('main-rem.css', processedCSS, function(err) {
    if (err) {
        throw err;
    }

    console.log('Done.');
});
