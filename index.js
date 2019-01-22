'use strict';

const postCSS = require('postcss');
const extend = require('extend');

const pxRegExp = /(\d*\.?\d+)px/ig;

const defaults = {
  rootValue: 16,
  unitPrecision: 5,
  propertyBlackList: [],
  propertyWhiteList: [],
  replace: false,
  mediaQuery: false,
  minPx: 1
};

let o;

function toPx(value) {
  const parts = /^(\d+\.?\d*)([a-zA-Z%]*)$/.exec(value);
  const [, number, unit] = parts;

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
  const multiplier = Math.pow(10, precision + 1);
  const wholeNumber = Math.floor(number * multiplier);

  return Math.round(wholeNumber / 10) * 10 / multiplier;
}

function pxReplace(strArg) {
  const str = parseFloat(strArg);

  if (o.minPx >= str) {
    return `${str}px`;
  }

  return `${toFixed(str / toPx(o.rootValue), o.unitPrecision)}rem`;
}

function equals(decls, prop, value) {
  return decls.some(decl => (decl.prop === prop && decl.value === value));
}

function Px2Rem(options) {
  o = extend(true, {}, defaults, options);
}

Px2Rem.prototype.process = function(css, options) {
  return postCSS(this.postCSS).process(css, options).css;
};

Px2Rem.prototype.postCSS = function(css) {
  css.walkDecls((decl, i) => {
    if (o.propertyBlackList.indexOf(decl.prop) !== -1) {
      return;
    }

    if (o.propertyWhiteList.length > 0 && o.propertyWhiteList.indexOf(decl.prop) === -1) {
      return;
    }

    const rule = decl.parent;
    let { value } = decl;

    if (value.indexOf('px') !== -1) {
      value = value.replace(pxRegExp, pxReplace);

      if (equals(rule.nodes, decl.prop, value)) {
        return;
      }

      if (o.replace) {
        decl.value = value;
      } else {
        rule.insertAfter(i, decl.clone({
          value
        }));
      }
    }
  });

  if (o.mediaQuery) {
    css.each((rule) => {
      if (rule.type !== 'atrule' && rule.name !== 'media') {
        return;
      }

      if (rule.params.indexOf('px') !== -1) {
        rule.params = rule.params.replace(pxRegExp, pxReplace);
      }
    });
  }
};

const px2rem = function(options) {
  return new Px2Rem(options);
};

px2rem.process = function(css, options, postCSSOptions) {
  return new Px2Rem(options).process(css, postCSSOptions);
};

module.exports = px2rem;
