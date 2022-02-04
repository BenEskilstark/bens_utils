'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var _require = require('./helpers'),
    thetaToDir = _require.thetaToDir;

var _require2 = require('./math'),
    clamp = _require2.clamp;

var _require3 = require('./vectors'),
    add = _require3.add,
    multiply = _require3.multiply,
    subtract = _require3.subtract,
    equals = _require3.equals,
    floor = _require3.floor,
    containsVector = _require3.containsVector;

var initGrid = function initGrid(gridWidth, gridHeight, numPlayers) {
  var grid = [];
  for (var x = 0; x < gridWidth; x++) {
    var col = [];
    for (var y = 0; y < gridHeight; y++) {
      var cell = {
        entities: []
      };
      for (var i = 0; i < numPlayers; i++) {
        cell[i + 1] = {};
        // pheromones:
        // for (const pheromoneType of config.pheromoneTypes) {
        //   cell[i+1][pheromoneType] = 0;
        // }
      }
      col.push(cell);
    }
    grid.push(col);
  }
  return grid;
};

var insideGrid = function insideGrid(grid, position) {
  if (position == null) return false;
  var x = position.x,
      y = position.y;

  return grid[x] != null && x >= 0 && y >= 0 && x < grid.length && y < grid[x].length;
};
var entityInsideGrid = function entityInsideGrid(game, entity) {
  var gridWidth = game.gridWidth,
      gridHeight = game.gridHeight;
  var position = entity.position,
      width = entity.width,
      height = entity.height;

  if (position == null) return false;
  var x = position.x,
      y = position.y;


  return x >= 0 && y >= 0 && x + width <= gridWidth && y + height <= gridHeight;
};

var lookupInGrid = function lookupInGrid(grid, position) {
  if (!insideGrid(grid, position)) return [];
  return grid[position.x][position.y].entities;
};

var getPheromonesInCell = function getPheromonesInCell(grid, position, playerID) {
  if (!insideGrid(grid, position)) return [];
  return grid[position.x][position.y][playerID];
};

var insertInCell = function insertInCell(grid, position, entityID) {
  if (!insideGrid(grid, position)) return false;

  grid[position.x][position.y].entities.push(entityID);
  return true;
};

var deleteFromCell = function deleteFromCell(grid, position, entityID) {
  if (!insideGrid(grid, position)) return true;

  var x = position.x,
      y = position.y;

  var oldLength = grid[x][y].entities.length;
  grid[x][y].entities = grid[x][y].entities.filter(function (id) {
    return id != entityID;
  });

  return oldLength != grid[x][y].entities.length;
};

var canvasToGrid = function canvasToGrid(game, canvasPos, canvasSize) {
  var canvasWidth = canvasSize.width,
      canvasHeight = canvasSize.height;
  var viewPos = game.viewPos,
      viewWidth = game.viewWidth,
      viewHeight = game.viewHeight;

  // HACK: this is copypasta from the render/render.js function for maxMinimap

  if (game.maxMinimap) {
    var nextViewPos = {
      x: game.viewPos.x - game.viewWidth * 3 / 2,
      y: game.viewPos.y - game.viewHeight * 3 / 2
    };
    viewWidth *= 3;
    viewHeight *= 3;
    viewPos = {
      x: clamp(nextViewPos.x, 0, game.gridWidth - game.viewWidth * 3),
      y: clamp(nextViewPos.y, 0, game.gridHeight - game.viewHeight * 3)
    };
    if (viewWidth > game.gridWidth) {
      viewPos.x = game.gridWidth / 2 - viewWidth / 2;
    }
    if (viewHeight > game.gridHeight) {
      viewPos.y = game.gridHeight / 2 - viewHeight / 2;
    }
  }

  var scaleVec = {
    x: viewWidth / canvasWidth,
    y: viewHeight / canvasHeight
  };

  var gridCoord = floor(add({ x: viewPos.x, y: viewPos.y }, multiply(canvasPos, scaleVec)));
  return floor(gridCoord);
};

var getEntityPositions = function getEntityPositions(game, entity) {
  if (entity.segmented) {
    return [entity.position].concat(_toConsumableArray(entity.segments.map(function (s) {
      return s.position;
    })));
  }
  var width = entity.width != null ? entity.width : 1;
  var height = entity.height != null ? entity.height : 1;
  var dir = thetaToDir(entity.theta);
  var positions = [];
  for (var x = 0; x < entity.width; x++) {
    for (var y = 0; y < entity.height; y++) {
      var pos = { x: x, y: y };
      if (dir == 'left' || dir == 'right') {
        pos = { x: y, y: x };
      }
      positions.push(add(entity.position, pos));
    }
  }
  return positions;
};

module.exports = {
  initGrid: initGrid, // TODO: move gridHelpers out of utils/
  insideGrid: insideGrid,
  lookupInGrid: lookupInGrid,
  insertInCell: insertInCell,
  deleteFromCell: deleteFromCell,
  getPheromonesInCell: getPheromonesInCell,
  canvasToGrid: canvasToGrid,
  getEntityPositions: getEntityPositions,
  entityInsideGrid: entityInsideGrid
};