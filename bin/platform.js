'use strict';

function isIpad() {
  return navigator.platform == 'MacIntel' && navigator.maxTouchPoints > 0 && !navigator.userAgent.match(/iPhone/i);
}

function isMobile() {
  var toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i];

  return toMatch.some(function (toMatchItem) {
    return navigator.userAgent.match(toMatchItem);
  }) || isIpad();
}

// HACK: when we're in electron window.require is a function
function isElectron() {
  // return true;
  return window.require != null;
}

module.exports = {
  isElectron: isElectron,
  isIpad: isIpad,
  isMobile: isMobile
};