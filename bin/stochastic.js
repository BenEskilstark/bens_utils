"use strict";

var floor = Math.floor,
    sqrt = Math.sqrt,
    random = Math.random,
    round = Math.round;


var rand = function rand() {
  return random();
};

// return an integer between min and max, inclusive
var randomIn = function randomIn(min, max) {
  return floor(min + rand() * (max - min + 1));
};

var shamefulGaussian = function shamefulGaussian() {
  return (rand() + rand() + rand() + rand() + rand() + rand() - 3) / 3;
};
var normalIn = function normalIn(min, max) {
  var gaussian = (shamefulGaussian() + 1) / 2;
  return floor(min + gaussian * (max - min + 1));
};

var oneOf = function oneOf(options) {
  if (options.length === 0) return null;
  return options[floor(rand() * options.length)];
};

// weights must be positive
var weightedOneOf = function weightedOneOf(options, weights) {
  var cumulativeWeights = [];
  var sum = 0;

  for (var i = 0; i < options.length; i++) {
    sum += weights[i];
    cumulativeWeights.push(sum);
  }

  var randomVal = randomIn(0, sum - 1) + 1;

  var index = 0;
  for (; randomVal > cumulativeWeights[index]; index++) {}

  return options[index];
};

module.exports = {
  randomIn: randomIn,
  normalIn: normalIn,
  oneOf: oneOf,
  weightedOneOf: weightedOneOf
};