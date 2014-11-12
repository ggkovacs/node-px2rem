'use strict';

var fs = require('fs');
var pxtorem = require('../index.js');
var css = fs.readFileSync('main.css', 'utf8');
var processedCss = pxtorem.process(css, {
    mediaQuery: true
});

fs.writeFile('main-rem.css', processedCss, function(err) {
    if (err) {
        throw err;
    }
    console.log('Done.');
});
