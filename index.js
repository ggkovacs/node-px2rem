'use strict';

var postCSS = require('postcss');
var extend = require('extend');

var pxRegExp = /(\d*\.?\d+)px/ig;

var defaults = {
    rootValue: 16,
    unitPrecision: 5,
    propertyBlackList: [],
    propertyWhiteList: [],
    replace: false,
    mediaQuery: false,
    minPx: 1
};

var o;

var px2rem;

function toPx(value) {
    var parts = /^(\d+\.?\d*)([a-zA-Z%]*)$/.exec(value);
    var number = parts[1];
    var unit = parts[2];

    if (unit === 'px' || unit === '') {
        return parseFloat(number);
    } else if (unit === 'em' || unit === 'rem') {
        return parseFloat(number) * 16;
    } else if (unit === '%') {
        return (parseFloat(number) / 100) * 16;
    }

    return 1;
}

function toFixed(number, precision) {
    var multiplier = Math.pow(10, precision + 1);
    var wholeNumber = Math.floor(number * multiplier);

    return Math.round(wholeNumber / 10) * 10 / multiplier;
}

function pxReplace(strArg) {
    var str = parseFloat(strArg);

    if (o.minPx >= str) {
        return str + 'px';
    }

    return toFixed(str / toPx(o.rootValue), o.unitPrecision) + 'rem';
}

function equals(decls, prop, value) {
    return decls.some(function(decl) {
        return (decl.prop === prop && decl.value === value);
    });
}

function Px2Rem(options) {
    o = extend(true, {}, defaults, options);
}

Px2Rem.prototype.process = function(css, options) {
    return postCSS(this.postCSS).process(css, options).css;
};

Px2Rem.prototype.postCSS = function(css) {
    css.walkDecls(function(decl, i) {
        var rule;
        var value;

        if (o.propertyBlackList.indexOf(decl.prop) !== -1) {
            return;
        }

        if (o.propertyWhiteList.length > 0 &&
            o.propertyWhiteList.indexOf(decl.prop) === -1) {
            return;
        }

        rule = decl.parent;
        value = decl.value;

        if (value.indexOf('px') !== -1) {
            value = value.replace(pxRegExp, pxReplace);

            if (equals(rule.nodes, decl.prop, value)) {
                return;
            }

            if (o.replace) {
                decl.value = value;
            } else {
                rule.insertAfter(i, decl.clone({
                    value: value
                }));
            }
        }
    });

    if (o.mediaQuery) {
        css.each(function(rule) {
            if (rule.type !== 'atrule' && rule.name !== 'media') {
                return;
            }

            if (rule.params.indexOf('px') !== -1) {
                rule.params = rule.params.replace(pxRegExp, pxReplace);
            }
        });
    }
};

px2rem = function(options) {
    return new Px2Rem(options);
};

px2rem.process = function(css, options, postCSSOptions) {
    return new Px2Rem(options).process(css, postCSSOptions);
};

module.exports = px2rem;
