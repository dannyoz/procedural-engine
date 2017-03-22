(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

var Level2 = (function () {
  function Level2() {
    var sectorCount = arguments.length <= 0 || arguments[0] === undefined ? 9 : arguments[0];

    _classCallCheck(this, Level2);

    this.sectorCount = sectorCount;
    this.sectors = [];
    this.sectorIDs = [];
    this.grid = [];
  }

  _createClass(Level2, [{
    key: 'generate',
    value: function generate() {
      this.calculateGridSize();
      this.createGrid();
      this.createPlayZone();
    }

    // Calculates the ideal map size based on sector count
  }, {
    key: 'calculateGridSize',
    value: function calculateGridSize() {
      var sqrt = Math.sqrt(this.sectorCount);
      var idealWidth = Math.floor(sqrt) + 2;
      var idealCount = idealWidth * idealWidth;
      var width = Random(2, idealCount / 2 - 2);
      var height = Math.round(idealCount / width);
      var count = height * width;

      this.ideal = idealCount;
      this.width = width;
      this.height = height;
      this.totalCount = count;
    }

    // Genrates a grid based on width and height
  }, {
    key: 'createGrid',
    value: function createGrid() {
      var grid = [];

      for (var i = 0; i < this.height; i++) {

        var columns = [];

        for (var j = 0; j < this.width; j++) {
          columns.push({
            name: 'column_' + j,
            number: this.width * i + (j + 1)
          });
        }

        grid.push({
          name: 'row_' + i,
          columns: columns
        });
      }

      this.grid = grid;
    }
  }, {
    key: 'createPlayZone',
    value: function createPlayZone() {
      for (var i = 0; i < this.sectorCount; i++) {

        if (i == 0) {
          var startTile = Random(1, this.totalCount);
          var startPos = this.getPosition(startTile);
          this.addSector(1, startTile, startPos);
        } else {
          var previous = this.sectors[i - 1];
          var newSector = this.getAdjacentSector(previous.sectorNumber);
          this.addSector(i + 1, newSector.sectorNumber, newSector.sectorPos);
        }
      }
    }

    // Returns co-ordinates of a selected tile
  }, {
    key: 'getPosition',
    value: function getPosition(int) {
      var rowIndex = Math.ceil(int / this.width) - 1;
      var colIndex = Number;
      this.grid[rowIndex].columns.forEach(function (col, ind) {
        if (col.number == int) {
          colIndex = ind;
        }
      });
      return {
        rowIndex: rowIndex,
        colIndex: colIndex
      };
    }

    // Add sector to the list
  }, {
    key: 'addSector',
    value: function addSector(index, sectorNumber, sectorPos) {
      this.sectors.push({
        index: index,
        sectorNumber: sectorNumber,
        sectorPos: sectorPos
      });
      this.sectorIDs.push(sectorNumber);
      this.grid[sectorPos.rowIndex].columns[sectorPos.colIndex].playable = true;
    }
  }, {
    key: 'checkExisting',
    value: function checkExisting(id) {
      return this.sectorIDs.indexOf(id) > -1;
    }

    // Randomly selects and returns the co-ordinates of an adjacent tile
  }, {
    key: 'getAdjacentSector',
    value: function getAdjacentSector(int) {
      var pos = this.getPosition(int);
      var options = [];
      var n = int - this.width;
      var s = int + this.width;
      var e = int + 1;
      var w = int - 1;
      var rowIndex = undefined,
          colIndex = undefined;

      if (pos.rowIndex > 0) {
        if (!this.checkExisting(n)) {
          options.push({
            sectorNumber: n,
            sectorPos: {
              rowIndex: pos.rowIndex - 1,
              colIndex: pos.colIndex
            }
          });
        }
      }

      if (pos.rowIndex < this.height - 1) {
        if (!this.checkExisting(s)) {
          options.push({
            sectorNumber: s,
            sectorPos: {
              rowIndex: pos.rowIndex + 1,
              colIndex: pos.colIndex
            }
          });
        }
      }

      if (pos.colIndex < this.width - 1) {
        if (!this.checkExisting(e)) {
          options.push({
            sectorNumber: e,
            sectorPos: {
              rowIndex: pos.rowIndex,
              colIndex: pos.colIndex + 1
            }
          });
        }
      }

      if (pos.colIndex > 0) {
        if (!this.checkExisting(w)) {
          options.push({
            sectorNumber: w,
            sectorPos: {
              rowIndex: pos.rowIndex,
              colIndex: pos.colIndex - 1
            }
          });
        }
      }

      if (options.length == 0) {
        console.log('pNOIC');
        this.generate();
      }

      return options[Random(1, options.length) - 1];
    }
  }]);

  return Level2;
})();

exports.Level2 = Level2;
;

var map = (function () {
  function map() {
    var width = arguments.length <= 0 || arguments[0] === undefined ? 25 : arguments[0];
    var height = arguments.length <= 1 || arguments[1] === undefined ? 25 : arguments[1];
    var fillPercentage = arguments.length <= 2 || arguments[2] === undefined ? 40 : arguments[2];
    var smoothing = arguments.length <= 3 || arguments[3] === undefined ? 2 : arguments[3];

    _classCallCheck(this, map);

    this.width = width;
    this.height = height;
    this.fillPercentage = fillPercentage;
    this.grid = [];
    this.smoothing = smoothing;
  }

  _createClass(map, [{
    key: 'generate',
    value: function generate() {
      this.createGrid();
      for (var i = 0; i < this.smoothing; i++) {
        this.smoothMap();
      }
    }
  }, {
    key: 'pseudoRandomSeed',
    value: function pseudoRandomSeed() {
      return Random(1, 100) < this.fillPercentage ? 1 : 0;
    }
  }, {
    key: 'createGrid',
    value: function createGrid() {
      var grid = [];
      for (var y = 0; y < this.height; y++) {
        var columns = [];
        for (var x = 0; x < this.width; x++) {
          if (x == 0 || x == this.width - 1 || y == 0 || y == this.height - 1) {
            columns.push(1);
          } else {
            columns.push(this.pseudoRandomSeed());
          }
        }
        grid.push(columns);
      }
      this.grid = grid;
    }
  }, {
    key: 'smoothMap',
    value: function smoothMap() {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var neighbourWallTiles = this.getSurroundingWallCount(x, y);
          if (neighbourWallTiles > 4) this.grid[y][x] = 1;else if (neighbourWallTiles < 4) this.grid[y][x] = 0;
        }
      }
    }
  }, {
    key: 'getSurroundingWallCount',
    value: function getSurroundingWallCount(x, y) {
      var wallCount = 0;
      for (var neighbourY = y - 1; neighbourY <= y + 1; neighbourY++) {
        for (var neighbourX = x - 1; neighbourX <= x + 1; neighbourX++) {
          if (neighbourX >= 0 && neighbourX < this.width && neighbourY >= 0 && neighbourY < this.height) {
            if (neighbourX != x || neighbourY != y) {
              wallCount += this.grid[neighbourY][neighbourX];
            }
          } else {
            wallCount++;
          }
        }
      }
      return wallCount;
    }
  }]);

  return map;
})();

exports.map = map;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYW5pZWwub3Nib3JuZS9yZXBvcy9wcm9jZWR1cmFsLWVuZ2luZS9hcHAvZmFrZV9mMjJkOWVlNS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUN4QixLQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixLQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QixTQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUEsQUFBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0NBQ3RELENBQUM7O0lBRVcsTUFBTTtBQUNOLFdBREEsTUFBTSxHQUNZO1FBQWpCLFdBQVcseURBQUcsQ0FBQzs7MEJBRGhCLE1BQU07O0FBRWYsUUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFDL0IsUUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDbEIsUUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDcEIsUUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7R0FDaEI7O2VBTlUsTUFBTTs7V0FRVCxvQkFBRztBQUNULFVBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0FBQ3pCLFVBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQixVQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7Ozs7O1dBR2dCLDZCQUFHO0FBQ2xCLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3pDLFVBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLFVBQU0sVUFBVSxHQUFHLFVBQVUsR0FBRyxV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Q0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQ2pCLElBQUksa0JBQWtCLEdBQUcsQ0FBQyxFQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN2QjtPQUNGO0tBQ0Y7OztXQUVzQixpQ0FBQyxDQUFDLEVBQUMsQ0FBQyxFQUFFO0FBQzNCLFVBQUksU0FBUyxHQUFHLENBQUMsQ0FBQztBQUNsQixXQUFLLElBQUksVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFHLEVBQUU7QUFDL0QsYUFBSyxJQUFJLFVBQVUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLFVBQVUsRUFBRyxFQUFFO0FBQy9ELGNBQUksVUFBVSxJQUFJLENBQUMsSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssSUFBSSxVQUFVLElBQUksQ0FBQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFO0FBQzdGLGdCQUFJLFVBQVUsSUFBSSxDQUFDLElBQUksVUFBVSxJQUFJLENBQUMsRUFBRTtBQUN0Qyx1QkFBUyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDaEQ7V0FDRixNQUNJO0FBQ0gscUJBQVMsRUFBRyxDQUFDO1dBQ2Q7U0FDRjtPQUNGO0FBQ0QsYUFBTyxTQUFTLENBQUM7S0FDbEI7OztTQS9EVSxHQUFHIiwiZmlsZSI6Ii9Vc2Vycy9kYW5pZWwub3Nib3JuZS9yZXBvcy9wcm9jZWR1cmFsLWVuZ2luZS9hcHAvZmFrZV9mMjJkOWVlNS5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIFJhbmRvbShtaW4sIG1heCkge1xuICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xufTtcblxuZXhwb3J0IGNsYXNzIExldmVsMiB7XG4gIGNvbnN0cnVjdG9yKHNlY3RvckNvdW50ID0gOSkge1xuICAgIHRoaXMuc2VjdG9yQ291bnQgPSBzZWN0b3JDb3VudDtcbiAgICB0aGlzLnNlY3RvcnMgPSBbXTtcbiAgICB0aGlzLnNlY3RvcklEcyA9IFtdO1xuICAgIHRoaXMuZ3JpZCA9IFtdO1xuICB9XG5cbiAgZ2VuZXJhdGUoKSB7XG4gICAgdGhpcy5jYWxjdWxhdGVHcmlkU2l6ZSgpO1xuICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xuICAgIHRoaXMuY3JlYXRlUGxheVpvbmUoKTtcbiAgfVxuXG4gIC8vIENhbGN1bGF0ZXMgdGhlIGlkZWFsIG1hcCBzaXplIGJhc2VkIG9uIHNlY3RvciBjb3VudFxuICBjYWxjdWxhdGVHcmlkU2l6ZSgpIHtcbiAgICBjb25zdCBzcXJ0ID0gTWF0aC5zcXJ0KHRoaXMuc2VjdG9yQ291bnQpO1xuICAgIGNvbnN0IGlkZWFsV2lkdGggPSBNYXRoLmZsb29yKHNxcnQpICsgMjtcbiAgICBjb25zdCBpZGVhbENvdW50ID0gaWRlYWxXaWR0aCAqIGlkZWFsV2lkdGg7XG4gICAgY29uc3Qgd2lkdGggPSBSYW5kb20oMiwgKGlkZWFsQ291bnQgLyAyKSAtIDIpO1xuICAgIGNvbnN0IGhlaWdodCA9IE1hdGgucm91bmQoaWRlYWxDb3VudCAvIHdpZHRoKTtcbiAgICBjb25zdCBjb3VudCA9IGhlaWdodCAqIHdpZHRoO1xuXG4gICAgdGhpcy5pZGVhbCA9IGlkZWFsQ291bnQ7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMudG90YWxDb3VudCA9IGNvdW50O1xuICB9XG5cbiAgLy8gR2VucmF0ZXMgYSBncmlkIGJhc2VkIG9uIHdpZHRoIGFuZCBoZWlnaHRcbiAgY3JlYXRlR3JpZCgpIHtcbiAgICBjb25zdCBncmlkID0gW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaGVpZ2h0OyBpKyspIHtcblxuICAgICAgY29uc3QgY29sdW1ucyA9IFtdO1xuXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHRoaXMud2lkdGg7IGorKykge1xuICAgICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICAgIG5hbWU6ICdjb2x1bW5fJytqLFxuICAgICAgICAgIG51bWJlcjogKHRoaXMud2lkdGgqaSkgKyAoaisxKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBncmlkLnB1c2goe1xuICAgICAgICBuYW1lOiAncm93XycraSxcbiAgICAgICAgY29sdW1uczogY29sdW1uc1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5ncmlkID0gZ3JpZDtcbiAgfVxuXG4gIGNyZWF0ZVBsYXlab25lKCkge1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZWN0b3JDb3VudDsgaSsrKSB7XG5cbiAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgY29uc3Qgc3RhcnRUaWxlID0gUmFuZG9tKDEsIHRoaXMudG90YWxDb3VudCk7XG4gICAgICAgIGNvbnN0IHN0YXJ0UG9zID0gdGhpcy5nZXRQb3NpdGlvbihzdGFydFRpbGUpO1xuICAgICAgICB0aGlzLmFkZFNlY3RvcigxLCBzdGFydFRpbGUsIHN0YXJ0UG9zKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHByZXZpb3VzID0gdGhpcy5zZWN0b3JzWyhpLTEpXTtcbiAgICAgICAgY29uc3QgbmV3U2VjdG9yID0gdGhpcy5nZXRBZGphY2VudFNlY3RvcihwcmV2aW91cy5zZWN0b3JOdW1iZXIpO1xuICAgICAgICB0aGlzLmFkZFNlY3RvcigoaSsxKSwgbmV3U2VjdG9yLnNlY3Rvck51bWJlciwgbmV3U2VjdG9yLnNlY3RvclBvcyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJucyBjby1vcmRpbmF0ZXMgb2YgYSBzZWxlY3RlZCB0aWxlXG4gIGdldFBvc2l0aW9uKGludCkge1xuICAgIGNvbnN0IHJvd0luZGV4ID0gTWF0aC5jZWlsKGludC90aGlzLndpZHRoKSAtIDE7XG4gICAgbGV0IGNvbEluZGV4ID0gTnVtYmVyO1xuICAgIHRoaXMuZ3JpZFtyb3dJbmRleF0uY29sdW1ucy5mb3JFYWNoKChjb2wsIGluZCkgPT4ge1xuICAgICAgaWYgKGNvbC5udW1iZXIgPT0gaW50KSB7XG4gICAgICAgIGNvbEluZGV4ID0gaW5kO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiB7XG4gICAgICByb3dJbmRleCxcbiAgICAgIGNvbEluZGV4XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHNlY3RvciB0byB0aGUgbGlzdFxuICBhZGRTZWN0b3IoaW5kZXgsIHNlY3Rvck51bWJlciwgc2VjdG9yUG9zKSB7XG4gICAgdGhpcy5zZWN0b3JzLnB1c2goe1xuICAgICAgaW5kZXgsXG4gICAgICBzZWN0b3JOdW1iZXIsXG4gICAgICBzZWN0b3JQb3NcbiAgICB9KTtcbiAgICB0aGlzLnNlY3RvcklEcy5wdXNoKHNlY3Rvck51bWJlcik7XG4gICAgdGhpcy5ncmlkW3NlY3RvclBvcy5yb3dJbmRleF0uY29sdW1uc1tzZWN0b3JQb3MuY29sSW5kZXhdLnBsYXlhYmxlID0gdHJ1ZTtcbiAgfVxuXG4gIGNoZWNrRXhpc3RpbmcoaWQpIHtcbiAgICByZXR1cm4gdGhpcy5zZWN0b3JJRHMuaW5kZXhPZihpZCkgPiAtMTtcbiAgfVxuXG4gIC8vIFJhbmRvbWx5IHNlbGVjdHMgYW5kIHJldHVybnMgdGhlIGNvLW9yZGluYXRlcyBvZiBhbiBhZGphY2VudCB0aWxlXG4gIGdldEFkamFjZW50U2VjdG9yKGludCkge1xuICAgIGNvbnN0IHBvcyA9IHRoaXMuZ2V0UG9zaXRpb24oaW50KTtcbiAgICBjb25zdCBvcHRpb25zID0gW107XG4gICAgY29uc3QgbiA9IGludCAtIHRoaXMud2lkdGg7XG4gICAgY29uc3QgcyA9IGludCArIHRoaXMud2lkdGg7XG4gICAgY29uc3QgZSA9IGludCArIDE7XG4gICAgY29uc3QgdyA9IGludCAtIDE7XG4gICAgbGV0IHJvd0luZGV4LCBjb2xJbmRleDtcblxuICAgIGlmIChwb3Mucm93SW5kZXggPiAwKSB7XG4gICAgICBpZiAoIXRoaXMuY2hlY2tFeGlzdGluZyhuKSkge1xuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgIHNlY3Rvck51bWJlcjogbixcbiAgICAgICAgICBzZWN0b3JQb3M6IHtcbiAgICAgICAgICAgIHJvd0luZGV4OiBwb3Mucm93SW5kZXggLSAxLFxuICAgICAgICAgICAgY29sSW5kZXg6IHBvcy5jb2xJbmRleCxcbiAgICAgICAgICB9ICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3Mucm93SW5kZXggPCAodGhpcy5oZWlnaHQgLSAxKSkge1xuICAgICAgaWYgKCF0aGlzLmNoZWNrRXhpc3RpbmcocykpIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICBzZWN0b3JOdW1iZXI6IHMsXG4gICAgICAgICAgc2VjdG9yUG9zOiB7XG4gICAgICAgICAgICByb3dJbmRleDogcG9zLnJvd0luZGV4ICsgMSxcbiAgICAgICAgICAgIGNvbEluZGV4OiBwb3MuY29sSW5kZXgsXG4gICAgICAgICAgfSAgICAgIFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zLmNvbEluZGV4IDwgKHRoaXMud2lkdGggLSAxKSkge1xuICAgICAgaWYgKCF0aGlzLmNoZWNrRXhpc3RpbmcoZSkpIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICBzZWN0b3JOdW1iZXI6IGUsXG4gICAgICAgICAgc2VjdG9yUG9zOiB7XG4gICAgICAgICAgICByb3dJbmRleDogcG9zLnJvd0luZGV4LFxuICAgICAgICAgICAgY29sSW5kZXg6IHBvcy5jb2xJbmRleCArIDEsXG4gICAgICAgICAgfSAgICAgIFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zLmNvbEluZGV4ID4gMCkge1xuICAgICAgaWYgKCF0aGlzLmNoZWNrRXhpc3RpbmcodykpIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICBzZWN0b3JOdW1iZXI6IHcsXG4gICAgICAgICAgc2VjdG9yUG9zOiB7XG4gICAgICAgICAgICByb3dJbmRleDogcG9zLnJvd0luZGV4LFxuICAgICAgICAgICAgY29sSW5kZXg6IHBvcy5jb2xJbmRleCAtIDEsXG4gICAgICAgICAgfSAgICAgIFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAob3B0aW9ucy5sZW5ndGggPT0gMCkge1xuICAgICAgY29uc29sZS5sb2coJ3BOT0lDJyk7XG4gICAgICB0aGlzLmdlbmVyYXRlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG9wdGlvbnNbUmFuZG9tKDEsIG9wdGlvbnMubGVuZ3RoKSAtIDFdO1xuICB9XG5cbn07XG5cbmV4cG9ydCBjbGFzcyBtYXAge1xuICBjb25zdHJ1Y3Rvcih3aWR0aCA9IDI1LCBoZWlnaHQgPSAyNSwgZmlsbFBlcmNlbnRhZ2UgPSA0MCwgc21vb3RoaW5nID0gMikge1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmZpbGxQZXJjZW50YWdlID0gZmlsbFBlcmNlbnRhZ2U7XG4gICAgdGhpcy5ncmlkID0gW107XG4gICAgdGhpcy5zbW9vdGhpbmcgPSBzbW9vdGhpbmc7XG4gIH1cblxuICBnZW5lcmF0ZSgpIHtcbiAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMuc21vb3RoaW5nOyBpKyspIHtcbiAgICAgIHRoaXMuc21vb3RoTWFwKCk7XG4gICAgfVxuICB9XG5cbiAgcHNldWRvUmFuZG9tU2VlZCgpIHtcbiAgICByZXR1cm4gKFJhbmRvbSgxLDEwMCkgPCB0aGlzLmZpbGxQZXJjZW50YWdlKSA/IDE6IDA7XG4gIH1cblxuICBjcmVhdGVHcmlkKCkge1xuICAgIGNvbnN0IGdyaWQgPSBbXTtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbnMgPSBbXTtcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53aWR0aDsgeCsrKSB7XG4gICAgICAgIGlmICh4ID09IDAgfHwgeCA9PSB0aGlzLndpZHRoLTEgfHwgeSA9PSAwIHx8IHkgPT0gdGhpcy5oZWlnaHQgLTEpIHtcbiAgICAgICAgICBjb2x1bW5zLnB1c2goMSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29sdW1ucy5wdXNoKHRoaXMucHNldWRvUmFuZG9tU2VlZCgpKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZ3JpZC5wdXNoKGNvbHVtbnMpO1xuICAgIH1cbiAgICB0aGlzLmdyaWQgPSBncmlkO1xuICB9XG5cbiAgc21vb3RoTWFwKCkge1xuICAgICBmb3IgKGxldCB5ID0gMDsgeSA8IHRoaXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgdGhpcy53aWR0aDsgeCsrKSB7XG4gICAgICAgIGNvbnN0IG5laWdoYm91cldhbGxUaWxlcyA9IHRoaXMuZ2V0U3Vycm91bmRpbmdXYWxsQ291bnQoeCx5KTtcbiAgICAgICAgaWYgKG5laWdoYm91cldhbGxUaWxlcyA+IDQpXG4gICAgICAgICAgdGhpcy5ncmlkW3ldW3hdID0gMTtcbiAgICAgICAgZWxzZSBpZiAobmVpZ2hib3VyV2FsbFRpbGVzIDwgNClcbiAgICAgICAgICB0aGlzLmdyaWRbeV1beF0gPSAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFN1cnJvdW5kaW5nV2FsbENvdW50KHgseSkge1xuICAgIGxldCB3YWxsQ291bnQgPSAwO1xuICAgIGZvciAobGV0IG5laWdoYm91clkgPSB5IC0gMTsgbmVpZ2hib3VyWSA8PSB5ICsgMTsgbmVpZ2hib3VyWSArKykge1xuICAgICAgZm9yIChsZXQgbmVpZ2hib3VyWCA9IHggLSAxOyBuZWlnaGJvdXJYIDw9IHggKyAxOyBuZWlnaGJvdXJYICsrKSB7XG4gICAgICAgIGlmIChuZWlnaGJvdXJYID49IDAgJiYgbmVpZ2hib3VyWCA8IHRoaXMud2lkdGggJiYgbmVpZ2hib3VyWSA+PSAwICYmIG5laWdoYm91clkgPCB0aGlzLmhlaWdodCkge1xuICAgICAgICAgIGlmIChuZWlnaGJvdXJYICE9IHggfHwgbmVpZ2hib3VyWSAhPSB5KSB7XG4gICAgICAgICAgICB3YWxsQ291bnQgKz0gdGhpcy5ncmlkW25laWdoYm91clldW25laWdoYm91clhdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB3YWxsQ291bnQgKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHdhbGxDb3VudDtcbiAgfVxufSJdfQ==
},{}]},{},[1])