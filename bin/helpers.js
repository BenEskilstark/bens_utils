'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('./vectors'),
    subtract = _require.subtract,
    vectorTheta = _require.vectorTheta;

// NOTE: for angles in radians being close to each other!
var closeTo = function closeTo(a, b) {
  var normalizedA = a % (2 * Math.PI);
  var epsilon = 0.00001;
  return Math.abs(normalizedA - b) < epsilon;
};

var sameArray = function sameArray(arrayA, arrayB) {
  if (arrayA.length != arrayB.length) return false;
  for (var i = 0; i < arrayA.length; i++) {
    if (arrayA[i] != arrayB[i]) {
      return false;
    }
  }
  return true;
};

var thetaToDir = function thetaToDir(theta, noDiagonal) {
  // 90 degree only:
  if (noDiagonal) {
    var _directions = ['left', 'down', 'right', 'up'];
    var _deg = Math.round(theta * 180 / Math.PI);
    if (Math.round(_deg / 45) % 2 != 0) return null;
    return _directions[Math.round(_deg / 90) % 4];
  }

  // including 45 degree:
  var directions = ['left', 'leftup', 'up', 'rightup', 'right', 'rightdown', 'down', 'leftdown'];
  var deg = Math.round(theta * 180 / Math.PI);
  if (Math.round(deg / 45) != deg / 45) return null;
  return directions[Math.round(deg / 45) % 8];
};

var isDiagonalTheta = function isDiagonalTheta(theta) {
  var dir = thetaToDir(theta);
  return dir == 'leftdown' || dir == 'rightdown' || dir == 'rightup' || dir == 'leftup';
};

var isDiagonalMove = function isDiagonalMove(vecA, vecB) {
  if (vecA == null || vecB == null) return false;
  return isDiagonalTheta(vectorTheta(subtract(vecA, vecB)));
};

var encodePosition = function encodePosition(pos) {
  return "" + pos.x + "," + pos.y;
};

var decodePosition = function decodePosition(pos) {
  var _pos$split = pos.split(','),
      _pos$split2 = _slicedToArray(_pos$split, 2),
      x = _pos$split2[0],
      y = _pos$split2[1];

  return { x: x, y: y };
};

var getDisplayTime = function getDisplayTime(millis) {
  var seconds = Math.floor(millis / 1000);
  var minutes = Math.floor(seconds / 60);
  var leftOverSeconds = seconds - minutes * 60;
  var leftOverSecondsStr = leftOverSeconds == 0 ? '00' : '' + leftOverSeconds;
  if (leftOverSeconds < 10 && leftOverSeconds != 0) {
    leftOverSecondsStr = '0' + leftOverSecondsStr;
  }

  return minutes + ':' + leftOverSecondsStr;
};

var throttle = function throttle(func, args, wait) {
  var inThrottle = false;
  return function (ev) {
    if (inThrottle) {
      return;
    }
    func.apply(undefined, _toConsumableArray(args).concat([ev]));
    inThrottle = true;
    setTimeout(function () {
      inThrottle = false;
    }, wait);
  };
};

var debounce = function debounce(func) {
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 300;

  var timerID = null;
  return function () {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (timerID) {
      clearTimeout(timerID);
    }
    timerID = setTimeout(function () {
      func.apply(undefined, args);
      timerID = null;
    }, delay);
  };
};

function deepCopy(obj) {
  if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) !== 'object' || obj == null) {
    return obj;
  }

  var copy = {};
  for (var key in obj) {
    if (_typeof(obj[key]) === 'object' && obj[key] != null) {
      if (Array.isArray(obj[key])) {
        copy[key] = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = obj[key][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var elem = _step.value;

            copy[key].push(deepCopy(elem));
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
      } else {
        copy[key] = deepCopy(obj[key]);
      }
    } else {
      copy[key] = obj[key];
    }
  }
  return copy;
}

module.exports = {
  closeTo: closeTo, sameArray: sameArray, thetaToDir: thetaToDir,
  isDiagonalTheta: isDiagonalTheta, isDiagonalMove: isDiagonalMove,
  encodePosition: encodePosition, decodePosition: decodePosition,
  getDisplayTime: getDisplayTime,
  deepCopy: deepCopy,
  throttle: throttle, debounce: debounce
};