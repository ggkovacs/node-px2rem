'use strict';

/**
 * Requires
 */
var postcss = require('postcss');
var extend = require('extend');

/**
 * Px regular expression
 * @type {RegExp}
 */
var pxRegEx = /(\d*\.?\d+)px/ig;

/**
 * Defaults
 * @type {Object}
 */
var defaults = {
    /**
     * Root value
     * @type {Number}
     */
    rootValue: 16,

    /**
     * Unit precision
     * @type {Number}
     */
    unitPrecision: 5,

    /**
     * Property black list
     * @type {Array}
     */
    propertyBlackList: [],

    /**
     * Replace
     * @type {Boolean}
     */
    replace: false,

    /**
     * Media query
     * @type {Boolean}
     */
    mediaQuery: false,

    /**
     * Min pixel
     * @type {Number}
     */
    minPx: 1
};

/**
 * To pixel
 * @param  {String} value
 * @return {Number|Boolean}
 */
function toPx(value) {
    var parts = /^(\d+\.?\d*)([a-zA-Z%]*)$/.exec(value);
    var number = parts[1];
    var unit = parts[2];

    if (unit === 'px' || unit === '') {
        return parseFloat(number);
    }
    else if (unit === 'em' || unit === 'rem') {
        return parseFloat(number) * 16;
    }
    else if (unit === '%') {
        return (parseFloat(number) / 100) * 16;
    }

    return false;
}

/**
 * To fixed
 * @param  {Number} number
 * @param  {Integer} precision
 * @return {Number}
 */
function toFixed(number, precision) {
    var multiplier = Math.pow(10, precision + 1);
    var wholeNumber = Math.floor(number * multiplier);

    return Math.round(wholeNumber / 10) * 10 / multiplier;
}

/**
 * Pixel to rem
 * @param {Object} options
 */
function PxToRem(options) {
    if (options) {
        defaults = extend(true, {}, defaults, options);
    }
}

/**
 * Process
 * @param {String} css
 * @param {Object} options
 */
PxToRem.prototype.process = function(css, options) {
    return postcss(this.postCss).process(css, options).css;
};

/**
 * Post css
 * @param {String} css
 */
PxToRem.prototype.postCss = function(css) {
    css.eachDecl(function(decl, i) {
        if (defaults.propertyBlackList.indexOf(decl.prop) !== -1) {
            return;
        }

        var rule = decl.parent;
        var value = decl.value;

        if (value.indexOf('px') !== -1) {
            value = value.replace(pxRegEx, function($1) {
                $1 = parseFloat($1);
                if (defaults.minPx >= $1) {
                    return $1 + 'px';
                }
                return toFixed($1 / toPx(defaults.rootValue), defaults.unitPrecision) + 'rem';
            });
        }

        if (!defaults.replace && decl.value !== value) {
            rule.insertAfter(i, decl.clone({
                value: value
            }));
        } else {
            decl.value = value;
        }
    });
};

/**
 * Pixel to rem
 * @param {Object} options
 */
var pxtorem = function(options) {
    return new PxToRem(options);
};

/**
 * Process
 * @param {String} css
 * @param {Object} options
 * @param {Object} postCssOptions
 */
pxtorem.process = function(css, options, postCssOptions) {
    return new PxToRem(options).process(css, postCssOptions);
};

module.exports = pxtorem;
