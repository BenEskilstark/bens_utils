'use strict';

function setQueryParam(key, value) {
  var url = new URL(window.location.href);
  var searchParams = url.searchParams;
  searchParams.set(key, value);
  url.search = searchParams.toString();
  window.history.pushState({ path: url.toString() }, '', url.toString());
}

function getQueryParam(key) {
  var url = new URL(window.location.href);
  var searchParams = url.searchParams;
  return searchParams.get(key);
}

function deleteQueryParam(key) {
  var url = new URL(window.location.href);
  var searchParams = url.searchParams;
  searchParams.delete(key);
  url.search = searchParams.toString();
  window.history.pushState({ path: url.toString() }, '', url.toString());
}

window.setQueryParam = setQueryParam;
window.getQueryParam = getQueryParam;

module.exports = {
  setQueryParam: setQueryParam,
  getQueryParam: getQueryParam
};