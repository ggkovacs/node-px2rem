import test from 'ava';
import fs from 'fs';
import px2rem from '../';

let css;

test.before('setup', t => {
    css = fs.readFileSync('./data/styles.css', 'utf8');
});

test('processed #1', t => {
    const validProcessedCSS = fs.readFileSync('./valid/styles.css', 'utf8');
    const processedCSS = px2rem.process(css);

    t.is(processedCSS, validProcessedCSS);
});

test('processed #2', t => {
    const validProcessedCSS = fs.readFileSync('./valid/styles.css', 'utf8');
    const pxToRem = px2rem();
    const processedCSS = pxToRem.process(css);

    t.is(processedCSS, validProcessedCSS);
});

test('processed with `mediaQuery`', t => {
    const validProcessedCSS = fs.readFileSync('./valid/media-query.css', 'utf8');
    const processedCSS = px2rem.process(css, {
        mediaQuery: true
    });

    t.is(processedCSS, validProcessedCSS);
});

test('processed with `rootValue`', t => {
    const validProcessedCSS = fs.readFileSync('./valid/root-value.css', 'utf8');
    const processedCSS = px2rem.process(css, {
        rootValue: 12
    });

    t.is(processedCSS, validProcessedCSS);
});

test('processed with percent `rootValue`', t => {
    const validProcessedCSS = fs.readFileSync('./valid/root-value-percent.css', 'utf8');
    const processedCSS = px2rem.process(css, {
        rootValue: '10%'
    });

    t.is(processedCSS, validProcessedCSS);
});

test('processed with rem `rootValue`', t => {
    const validProcessedCSS = fs.readFileSync('./valid/root-value-rem.css', 'utf8');
    const processedCSS = px2rem.process(css, {
        rootValue: '10rem'
    });

    t.is(processedCSS, validProcessedCSS);
});

test('processed with pt `rootValue`', t => {
    const validProcessedCSS = fs.readFileSync('./valid/root-value-pt.css', 'utf8');
    const processedCSS = px2rem.process(css, {
        rootValue: '1pt'
    });

    t.is(processedCSS, validProcessedCSS);
});

test('processed with `unitPrecision`', t => {
    const validProcessedCSS = fs.readFileSync('./valid/unit-precision.css', 'utf8');
    const processedCSS = px2rem.process(css, {
        unitPrecision: 2
    });

    t.is(processedCSS, validProcessedCSS);
});

test('processed with `propertyBlackList`', t => {
    const validProcessedCSS = fs.readFileSync('./valid/property-blacklist.css', 'utf8');
    const processedCSS = px2rem.process(css, {
        propertyBlackList: [
            'font-size'
        ]
    });

    t.is(processedCSS, validProcessedCSS);
});

test('processed with `propertyWhiteList`', t => {
    const validProcessedCSS = fs.readFileSync('./valid/property-whitelist.css', 'utf8');
    const processedCSS = px2rem.process(css, {
        propertyWhiteList: [
            'font-size'
        ]
    });

    t.is(processedCSS, validProcessedCSS);
});

test('processed with `replace`', t => {
    const validProcessedCSS = fs.readFileSync('./valid/replace.css', 'utf8');
    const processedCSS = px2rem.process(css, {
        replace: true
    });

    t.is(processedCSS, validProcessedCSS);
});
