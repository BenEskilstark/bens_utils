"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var cos = Math.cos,
    sin = Math.sin;


var add = function add() {
  for (var _len = arguments.length, vectors = Array(_len), _key = 0; _key < _len; _key++) {
    vectors[_key] = arguments[_key];
  }

  var resultVec = { x: 0, y: 0 };
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = vectors[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var v = _step.value;

      resultVec.x += v.x;
      resultVec.y += v.y;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return resultVec;
};

var equals = function equals(a, b) {
  return a.x == b.x && a.y == b.y;
};

// NOTE: see vectorTheta note if subtracting vectors to find the angle between them
var subtract = function subtract() {
  for (var _len2 = arguments.length, vectors = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    vectors[_key2] = arguments[_key2];
  }

  var resultVec = _extends({}, vectors[0]);
  for (var i = 1; i < vectors.length; i++) {
    resultVec.x -= vectors[i].x;
    resultVec.y -= vectors[i].y;
  }
  return resultVec;
};

var makeVector = function makeVector(theta, magnitude) {
  var x = magnitude * cos(theta);
  var y = magnitude * sin(theta);
  return { x: x, y: y };
};

var dist = function dist(vecA, vecB) {
  return magnitude(subtract(vecA, vecB));
};

var scale = function scale(vec, scalar) {
  return { x: vec.x * scalar, y: vec.y * scalar };
};

var magnitude = function magnitude(vector) {
  var x = vector.x,
      y = vector.y;

  return Math.sqrt(x * x + y * y);
};

// what is the angle of this vector
// NOTE: that when subtracting two vectors in order to compute the theta
// between them, the target should be the first argument
var vectorTheta = function vectorTheta(vector) {
  // shift domain from [-Math.PI, Math.PI] to [0, 2 * Math.PI]
  return (2 * Math.PI + Math.atan2(vector.y, vector.x)) % (2 * Math.PI);
};

var multiply = function multiply() {
  for (var _len3 = arguments.length, vectors = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    vectors[_key3] = arguments[_key3];
  }

  var resultVec = { x: 1, y: 1 };
  for (var i = 0; i < vectors.length; i++) {
    resultVec.x *= vectors[i].x;
    resultVec.y *= vectors[i].y;
  }
  return resultVec;
};

var floor = function floor(vector) {
  return {
    x: Math.floor(vector.x),
    y: Math.floor(vector.y)
  };
};

var round = function round(vector) {
  return {
    x: Math.round(vector.x),
    y: Math.round(vector.y)
  };
};

var ceil = function ceil(vector) {
  return {
    x: Math.ceil(vector.x),
    y: Math.ceil(vector.y)
  };
};

var containsVector = function containsVector(array, vec) {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = array[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var vector = _step2.value;

      if (equals(vector, vec)) return true;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return false;
};

var abs = function abs(vector) {
  return {
    x: Math.abs(vector.x),
    y: Math.abs(vector.y)
  };
};

// given two positions, return a rectangle with the positions at opposite corners
var toRect = function toRect(posA, posB) {
  var rect = {
    position: { x: Math.min(posA.x, posB.x), y: Math.min(posA.y, posB.y) },
    width: Math.abs(posA.x - posB.x) + 1,
    height: Math.abs(posA.y - posB.y) + 1
  };
  return rect;
};

var rotate = function rotate(vector, theta) {
  var x = vector.x,
      y = vector.y;

  return {
    x: cos(theta) * x - sin(theta) * y,
    y: sin(theta) * x + cos(theta) * y
  };
};

module.exports = {
  add: add,
  subtract: subtract,
  equals: equals,
  makeVector: makeVector,
  scale: scale,
  dist: dist,
  magnitude: magnitude,
  vectorTheta: vectorTheta,
  multiply: multiply,
  floor: floor,
  round: round,
  ceil: ceil,
  containsVector: containsVector,
  toRect: toRect,
  rotate: rotate,
  abs: abs
};