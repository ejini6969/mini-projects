// https://www.codewars.com/kata/59896b4de4769bea02000019/discuss

function solvePolynomial(p, r) {
  let letter = (p.match(/[a-z]/g) || [])[0]
  return eval(p.replace(/\s/g, "")                                              // remove unnecessary spaces
              .replace(/([a-z])(\d+)/g, (_, a, b) => a)                         // remove trailing number behind letter
              .replace(/([a-z])\^(\d+)/g, (_, a, b) => `Math.pow(${r},${b})`)   // ** will result in error due to existence of `-`, so use `Math.pow`
              .replace(/(-?\d+\.?\d*)([a-z])/ig, "$1*$2")                       // 2x --> 2 * x
              .replace(new RegExp(`${letter}`, "g"), r)                         // 2 * x --> 2 * number given (r)
              .replace(/--/g, "+")                                              // remove double negative sign
             ).toFixed(2).replace(/^\-0/, "0")                                  // rounded to 2 decimal places and convert `-0` to `0`
}

var assert = require('chai').assert;

describe('solvePolynomial() -- Test Cases', function() {
  describe('Author provided test cases', function() {
    it('constant terms', function() {
      assert.strictEqual(solvePolynomial('0', 0), '0.00', "solvePolynomial('0', 0) should return '0.00'");
      assert.strictEqual(solvePolynomial('0.000001', 0), '0.00', "solvePolynomial('0.000001', 0) should return '0.00'");
      assert.strictEqual(solvePolynomial('0.000001', Math.sqrt(9)), '0.00', "solvePolynomial('0.000001', Math.sqrt(9)) should return '0.00'");
      assert.strictEqual(solvePolynomial('-0.000001', Math.sqrt(9)), '0.00', "solvePolynomial('-0.000001', Math.sqrt(9)) should return '0.00'");
      assert.strictEqual(solvePolynomial('-0. 00  000 1', Math.sqrt(9)), '0.00', "solvePolynomial('-0. 00  000 1', Math.sqrt(9)) should return '0.00'");
      assert.strictEqual(solvePolynomial('1', 0), '1.00', "solvePolynomial('1', 0) should return '1.00'");
      assert.strictEqual(solvePolynomial('1.36489', 0), '1.36', "solvePolynomial('1.36489', 0) should return '1.36'");
      assert.strictEqual(solvePolynomial('-1.36489', 0), '-1.36', "solvePolynomial('-1.36489', 0) should return '-1.36'");
      assert.strictEqual(solvePolynomial(Math.sqrt(2).toString(), 0), Math.sqrt(2).toFixed(2).toString(), "solvePolynomial(Math.sqrt(2).toString(), 0) should return '1.41'");
    });

    it('first-degree polynomials', function() {
      assert.strictEqual(solvePolynomial('x', 0), '0.00', "solvePolynomial('x', 0) should return '0.00'");
      assert.strictEqual(solvePolynomial('x', 3), '3.00', "solvePolynomial('x', 3) should return '3.00'");
      assert.strictEqual(solvePolynomial('x', -0.0003), '0.00', "solvePolynomial('x', -0.0003) should return '0.00'");
      assert.strictEqual(solvePolynomial('x', -3), '-3.00', "solvePolynomial('x', -3) should return '-3.00'");
      assert.strictEqual(solvePolynomial('x', Math.sin(32)), Math.sin(32).toFixed(2).toString(), "solvePolynomial('x', Math.sin(32)) should return '0.55'");
      assert.strictEqual(solvePolynomial('-x', 0), '0.00', "solvePolynomial('-x', 0) should return '0.00'");
      assert.strictEqual(solvePolynomial('-x', 0.00001), '0.00', "solvePolynomial('-x', 0.00001) should return '0.00'");
      assert.strictEqual(solvePolynomial('-x', 3), '-3.00', "solvePolynomial('-x', 3) should return '-3.00'");
      assert.strictEqual(solvePolynomial('-x', -0.00001), '0.00', "solvePolynomial('-x', -0.00001) should return '0.00'");
      assert.strictEqual(solvePolynomial('-x', -3), '3.00', "solvePolynomial('-x', 3) should return '3.00'");
      assert.strictEqual(solvePolynomial(' -  x ', -3), '3.00', "solvePolynomial(' -  x ', -3) should return '3.00'");
      assert.strictEqual(solvePolynomial('y', 10), '10.00', "solvePolynomial('y', 10) should return '10.00'");
      assert.strictEqual(solvePolynomial('-y', Math.sqrt(2)), (-Math.sqrt(2).toFixed(2)).toString(), "solvePolynomial('-y', Math.sqrt(2)) should return '-1.41'");
      assert.strictEqual(solvePolynomial('y1', 1), '1.00', "solvePolynomial('y1', 1) should return '1.00'");
      assert.strictEqual(solvePolynomial('-y198854887455565', 1), '-1.00', "solvePolynomial('-y198854887455565', 1) should return '-1.00'");
      assert.strictEqual(solvePolynomial('-y 19 885488 74 555 65', 1), '-1.00', "solvePolynomial('-y 19 885488 74 555 65', 1) should return '-1.00'");
      assert.strictEqual(solvePolynomial('y+1', 12), '13.00', '-1.00', "solvePolynomial('y+1', 12) should return '13.00'");
      assert.strictEqual(solvePolynomial('y+1.32', 12), '13.32', '-1.00', "solvePolynomial('y+1.32', 12) should return '13.32'");
      assert.strictEqual(solvePolynomial('y+1.3325', 12.0), '13.33', '-1.00', "solvePolynomial('y+1.3325', 12.0) should return '13.33'");
      assert.strictEqual(solvePolynomial('y-1', 12.0), '11.00', '-1.00', "solvePolynomial('y-1', 12) should return '11.00'");
      assert.strictEqual(solvePolynomial('y-1.32', 12), '10.68', '-1.00', "solvePolynomial('y-1.32', 12) should return '10.68'");
      assert.strictEqual(solvePolynomial('y-1.3365448', 12), '10.66', '-1.00', "solvePolynomial('y-1.3365448', 12) should return '10.66'");
      assert.strictEqual(solvePolynomial('1+y', 12), '13.00', "solvePolynomial('1+y', 12) should return '13.00'");
      assert.strictEqual(solvePolynomial('1.32+y', 12), '13.32', "solvePolynomial('1.32+y', 12) should return '13.32'");
      assert.strictEqual(solvePolynomial('1.3325+y', 12), '13.33', "solvePolynomial('1.3325+y', 12) should return '13.33'");
      assert.strictEqual(solvePolynomial('1-y', 12), '-11.00', "solvePolynomial('1-y', 12) should return '-11.00'");
      assert.strictEqual(solvePolynomial('1.32-y', 12), '-10.68', "solvePolynomial('1.32-y', 12) should return '-10.68'");
      assert.strictEqual(solvePolynomial('1.32-y3 21', 12), '-10.68', "solvePolynomial('1.32-y3 21', 12) should return '-10.68'");
      assert.strictEqual(solvePolynomial('1.3365448-y', 12), '-10.66', "solvePolynomial('1.3365448-y', 12) should return '-10.66'");
      assert.strictEqual(solvePolynomial('1.3365448-z987', 12), '-10.66', "solvePolynomial('1.3365448-z987', 12) should return '-10.66'");
    });

    it('second-degree polynomials', function() {
      assert.strictEqual(solvePolynomial('x^2', 2), '4.00', "solvePolynomial('x^2', 2) should return '4.00'");
      assert.strictEqual(solvePolynomial('x^2+10.3', Math.sqrt(2)), '12.30', "solvePolynomial('x^2+10.3', Math.sqrt(2)) should return '12.30'");
      assert.strictEqual(solvePolynomial('x^2-1', 0), '-1.00', "solvePolynomial('x^2-1', 0) should return '-1.00'");
      assert.strictEqual(solvePolynomial('x33225^2-1', 12), '143.00', "solvePolynomial('x33225^2-1', 12) should return '143.00'");
      assert.strictEqual(solvePolynomial('-u^2', 12), '-144.00', "solvePolynomial('-u^2', 12) should return '-144.00'");
      assert.strictEqual(solvePolynomial('-u^2-1', 12), '-145.00', "solvePolynomial('-u^2-1', 12) should return '-145.00'");
      assert.strictEqual(solvePolynomial('-u98542^2-1', 12), '-145.00', "solvePolynomial('-u98542^2-1', 12) should return '-145.00'");
      assert.strictEqual(solvePolynomial('10.3+x^2', 12), '154.30', "solvePolynomial('10.3+x^2', 12) should return '154.30'");
      assert.strictEqual(solvePolynomial('-1+x^2', 12), '143.00', "solvePolynomial('-1+x^2', 12) should return '143.00'");
      assert.strictEqual(solvePolynomial('-1+x33225^2', 12), '143.00', "solvePolynomial('-1+x33225^2', 12) should return '143.00'");
      assert.strictEqual(solvePolynomial('-1-u^2', 12), '-145.00', "solvePolynomial('-1+u^2', 12) should return '-145.00'");
      assert.strictEqual(solvePolynomial('-1-u98542^2', 12), '-145.00', "solvePolynomial('-1-u98542^2', 12) should return '-145.00'");
      assert.strictEqual(solvePolynomial('x^2+x+1', 0), '1.00', "solvePolynomial('x^2+x+1', 0) should return '1.00'");
      assert.strictEqual(solvePolynomial('x+x^2+1', 0), '1.00', "solvePolynomial('x+x^2+1', 0) should return '1.00'");
      assert.strictEqual(solvePolynomial('x+x^2+1', Math.sqrt(2)), '4.41', "solvePolynomial('x+x^2+1', Math.sqrt(2)) should return '4.41'");
      assert.strictEqual(solvePolynomial('x1^2+x1+1', 1), '3.00', "solvePolynomial('x1^2+x1+1', 1) should return '3.00'");
      assert.strictEqual(solvePolynomial('x1^2+x1', 10.3), '116.39', "solvePolynomial('x1^2+x1', 10.3) should return '116.39'");
    });

    it('polynomials with larger degrees', function() {
      assert.strictEqual(solvePolynomial('x1^5+x1', 10), '100010.00', "solvePolynomial('x1^5+x1', 10) should return '100010.00'");
      assert.strictEqual(solvePolynomial('x1^5+x1', Math.sqrt(3)), '17.32', "solvePolynomial('x1^5+x1', Math.sqrt(3)) should return '17.32'");
    });
  });

  describe('Random test cases', function() {
    function solve(a,h){a=a.replace(/\s+/gi,"");var c=a.match(/[a-z]+(\d+)?/)?a.match(/[a-z]+(\d+)?/)[0]:null;if(!c)return normalizeNegativeZero(Number(a));for(var g=a.match(/(\+|\-)?[a-z0-9.^]+/gi),d={},e=0;e<g.length;++e){var b=g[e].split(c);var k=""===b[0]||"+"===b[0]?1:"-"===b[0]?-1:Number(b[0]);b=void 0===b[1]?0:""===b[1]?1:Number(b[1].substr(1));d[b]=k}var c=0,f;for(f in d)c+=Math.pow(h,f)*d[f];return normalizeNegativeZero(c)}
    function normalizeNegativeZero(a){return"-0.00"===a.toFixed(2)?"0.00":a.toFixed(2)};

    it('testing "10.8x+32x^3+2x^2+30.546" with random numbers', function() {
      var p = '10.8x+32x^3+2x^2+30.546';

      for (var i = 0; i < 60; ++i) {
        var r = Math.random() * 10 + 10;
        var solution = solve(p, r);
        assert.strictEqual(solvePolynomial(p, r), solution, "solvePolynomial('" + p + "', " + r +") should return '" + solution + "'");
      }
    });

    it('testing "5y^5+30y+96" with random numbers', function() {
      var p = '5y^5+30y+96';

      for (var i = 0; i < 60; ++i) {
        var r = Math.random() * 10 + 10;
        var solution = solve(p, r);
        assert.strictEqual(solvePolynomial(p, r), solution, "solvePolynomial('" + p + "', " + r +") should return '" + solution + "'");
      }
    });

    it('testing "-x^6-3x^3+2" with random numbers', function() {
      var p = '-x^6-3x^3+2';

      for (var i = 0; i < 60; ++i) {
        var r = Math.random() * 10 + 10;
        var solution = solve(p, r);
        assert.strictEqual(solvePolynomial(p, r), solution, "solvePolynomial('" + p + "', " + r +") should return '" + solution + "'");
      }
    });
  });
});
