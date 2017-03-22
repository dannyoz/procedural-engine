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
    var width = arguments.length <= 0 || arguments[0] === undefined ? 15 : arguments[0];
    var height = arguments.length <= 1 || arguments[1] === undefined ? 15 : arguments[1];
    var fillPercentage = arguments.length <= 2 || arguments[2] === undefined ? 40 : arguments[2];

    _classCallCheck(this, map);

    this.width = width;
    this.height = height;
    this.fillPercentage = fillPercentage;
    this.grid = [];
  }

  _createClass(map, [{
    key: 'generate',
    value: function generate() {
      this.createGrid();
      this.smoothMap();
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
          if (neighbourWallTiles > 4) this.grid[x][y] = 1;else if (neighbourWallTiles < 4) this.grid[x][y] = 0;
        }
      }
    }
  }, {
    key: 'getSurroundingWallCount',
    value: function getSurroundingWallCount(x, y) {
      var wallCount = 0;
      for (var neighbourX = x - 1; neighbourX <= x + 1; neighbourX++) {
        for (var neighbourY = y - 1; neighbourY <= y + 1; neighbourY++) {
          if (neighbourX >= 0 && neighbourX < this.width && neighbourY >= 0 && neighbourY < this.height) {
            if (neighbourX != x || neighbourY != y) {
              wallCount += this.grid[neighbourX][neighbourY];
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYW5pZWwub3Nib3JuZS9yZXBvcy9wcm9jZWR1cmFsLWVuZ2luZS9hcHAvZmFrZV9lNWI5YmFjMy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUN4QixLQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixLQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QixTQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUEsQUFBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0NBQ3RELENBQUM7O0lBRVcsTUFBTTtBQUNOLFdBREEsTUFBTSxHQUNZO1FBQWpCLFdBQVcseURBQUcsQ0FBQzs7MEJBRGhCLE1BQU07O0FBRWYsUUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFDL0IsUUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDbEIsUUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7QUFDcEIsUUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7R0FDaEI7O2VBTlUsTUFBTTs7V0FRVCxvQkFBRztBQUNULFVBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0FBQ3pCLFVBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQixVQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7S0FDdkI7Ozs7O1dBR2dCLDZCQUFHO0FBQ2xCLFVBQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3pDLFVBQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3hDLFVBQU0sVUFBVSxHQUFHLFVBQVUsR0FBRyxV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LGlDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUU7QUFDM0IsVUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLFdBQUssSUFBSSxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFVLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFVLEVBQUcsRUFBRTtBQUMvRCxhQUFLLElBQUksVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFHLEVBQUU7QUFDL0QsY0FBSSxVQUFVLElBQUksQ0FBQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFVBQVUsSUFBSSxDQUFDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDN0YsZ0JBQUksVUFBVSxJQUFJLENBQUMsSUFBSSxVQUFVLElBQUksQ0FBQyxFQUFFO0FBQ3RDLHVCQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoRDtXQUNGLE1BQ0k7QUFDSCxxQkFBUyxFQUFHLENBQUM7V0FDZDtTQUNGO09BQ0Y7QUFDRCxhQUFPLFNBQVMsQ0FBQztLQUNsQjs7O1NBNURVLEdBQUciLCJmaWxlIjoiL1VzZXJzL2RhbmllbC5vc2Jvcm5lL3JlcG9zL3Byb2NlZHVyYWwtZW5naW5lL2FwcC9mYWtlX2U1YjliYWMzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gUmFuZG9tKG1pbiwgbWF4KSB7XG4gIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG59O1xuXG5leHBvcnQgY2xhc3MgTGV2ZWwyIHtcbiAgY29uc3RydWN0b3Ioc2VjdG9yQ291bnQgPSA5KSB7XG4gICAgdGhpcy5zZWN0b3JDb3VudCA9IHNlY3RvckNvdW50O1xuICAgIHRoaXMuc2VjdG9ycyA9IFtdO1xuICAgIHRoaXMuc2VjdG9ySURzID0gW107XG4gICAgdGhpcy5ncmlkID0gW107XG4gIH1cblxuICBnZW5lcmF0ZSgpIHtcbiAgICB0aGlzLmNhbGN1bGF0ZUdyaWRTaXplKCk7XG4gICAgdGhpcy5jcmVhdGVHcmlkKCk7XG4gICAgdGhpcy5jcmVhdGVQbGF5Wm9uZSgpO1xuICB9XG5cbiAgLy8gQ2FsY3VsYXRlcyB0aGUgaWRlYWwgbWFwIHNpemUgYmFzZWQgb24gc2VjdG9yIGNvdW50XG4gIGNhbGN1bGF0ZUdyaWRTaXplKCkge1xuICAgIGNvbnN0IHNxcnQgPSBNYXRoLnNxcnQodGhpcy5zZWN0b3JDb3VudCk7XG4gICAgY29uc3QgaWRlYWxXaWR0aCA9IE1hdGguZmxvb3Ioc3FydCkgKyAyO1xuICAgIGNvbnN0IGlkZWFsQ291bnQgPSBpZGVhbFdpZHRoICogaWRlYWxXaWR0aDtcbiAgICBjb25zdCB3aWR0aCA9IFJhbmRvbSgyLCAoaWRlYWxDb3VudCAvIDIpIC0gMik7XG4gICAgY29uc3QgaGVpZ2h0ID0gTWF0aC5yb3VuZChpZGVhbENvdW50IC8gd2lkdGgpO1xuICAgIGNvbnN0IGNvdW50ID0gaGVpZ2h0ICogd2lkdGg7XG5cbiAgICB0aGlzLmlkZWFsID0gaWRlYWxDb3VudDtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy50b3RhbENvdW50ID0gY291bnQ7XG4gIH1cblxuICAvLyBHZW5yYXRlcyBhIGdyaWQgYmFzZWQgb24gd2lkdGggYW5kIGhlaWdodFxuICBjcmVhdGVHcmlkKCkge1xuICAgIGNvbnN0IGdyaWQgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5oZWlnaHQ7IGkrKykge1xuXG4gICAgICBjb25zdCBjb2x1bW5zID0gW107XG5cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy53aWR0aDsgaisrKSB7XG4gICAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgICAgbmFtZTogJ2NvbHVtbl8nK2osXG4gICAgICAgICAgbnVtYmVyOiAodGhpcy53aWR0aCppKSArIChqKzEpXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGdyaWQucHVzaCh7XG4gICAgICAgIG5hbWU6ICdyb3dfJytpLFxuICAgICAgICBjb2x1bW5zOiBjb2x1bW5zXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmdyaWQgPSBncmlkO1xuICB9XG5cbiAgY3JlYXRlUGxheVpvbmUoKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnNlY3RvckNvdW50OyBpKyspIHtcblxuICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICBjb25zdCBzdGFydFRpbGUgPSBSYW5kb20oMSwgdGhpcy50b3RhbENvdW50KTtcbiAgICAgICAgY29uc3Qgc3RhcnRQb3MgPSB0aGlzLmdldFBvc2l0aW9uKHN0YXJ0VGlsZSk7XG4gICAgICAgIHRoaXMuYWRkU2VjdG9yKDEsIHN0YXJ0VGlsZSwgc3RhcnRQb3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXMgPSB0aGlzLnNlY3RvcnNbKGktMSldO1xuICAgICAgICBjb25zdCBuZXdTZWN0b3IgPSB0aGlzLmdldEFkamFjZW50U2VjdG9yKHByZXZpb3VzLnNlY3Rvck51bWJlcik7XG4gICAgICAgIHRoaXMuYWRkU2VjdG9yKChpKzEpLCBuZXdTZWN0b3Iuc2VjdG9yTnVtYmVyLCBuZXdTZWN0b3Iuc2VjdG9yUG9zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBSZXR1cm5zIGNvLW9yZGluYXRlcyBvZiBhIHNlbGVjdGVkIHRpbGVcbiAgZ2V0UG9zaXRpb24oaW50KSB7XG4gICAgY29uc3Qgcm93SW5kZXggPSBNYXRoLmNlaWwoaW50L3RoaXMud2lkdGgpIC0gMTtcbiAgICBsZXQgY29sSW5kZXggPSBOdW1iZXI7XG4gICAgdGhpcy5ncmlkW3Jvd0luZGV4XS5jb2x1bW5zLmZvckVhY2goKGNvbCwgaW5kKSA9PiB7XG4gICAgICBpZiAoY29sLm51bWJlciA9PSBpbnQpIHtcbiAgICAgICAgY29sSW5kZXggPSBpbmQ7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJvd0luZGV4LFxuICAgICAgY29sSW5kZXhcbiAgICB9XG4gIH1cblxuICAvLyBBZGQgc2VjdG9yIHRvIHRoZSBsaXN0XG4gIGFkZFNlY3RvcihpbmRleCwgc2VjdG9yTnVtYmVyLCBzZWN0b3JQb3MpIHtcbiAgICB0aGlzLnNlY3RvcnMucHVzaCh7XG4gICAgICBpbmRleCxcbiAgICAgIHNlY3Rvck51bWJlcixcbiAgICAgIHNlY3RvclBvc1xuICAgIH0pO1xuICAgIHRoaXMuc2VjdG9ySURzLnB1c2goc2VjdG9yTnVtYmVyKTtcbiAgICB0aGlzLmdyaWRbc2VjdG9yUG9zLnJvd0luZGV4XS5jb2x1bW5zW3NlY3RvclBvcy5jb2xJbmRleF0ucGxheWFibGUgPSB0cnVlO1xuICB9XG5cbiAgY2hlY2tFeGlzdGluZyhpZCkge1xuICAgIHJldHVybiB0aGlzLnNlY3RvcklEcy5pbmRleE9mKGlkKSA+IC0xO1xuICB9XG5cbiAgLy8gUmFuZG9tbHkgc2VsZWN0cyBhbmQgcmV0dXJucyB0aGUgY28tb3JkaW5hdGVzIG9mIGFuIGFkamFjZW50IHRpbGVcbiAgZ2V0QWRqYWNlbnRTZWN0b3IoaW50KSB7XG4gICAgY29uc3QgcG9zID0gdGhpcy5nZXRQb3NpdGlvbihpbnQpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBbXTtcbiAgICBjb25zdCBuID0gaW50IC0gdGhpcy53aWR0aDtcbiAgICBjb25zdCBzID0gaW50ICsgdGhpcy53aWR0aDtcbiAgICBjb25zdCBlID0gaW50ICsgMTtcbiAgICBjb25zdCB3ID0gaW50IC0gMTtcbiAgICBsZXQgcm93SW5kZXgsIGNvbEluZGV4O1xuXG4gICAgaWYgKHBvcy5yb3dJbmRleCA+IDApIHtcbiAgICAgIGlmICghdGhpcy5jaGVja0V4aXN0aW5nKG4pKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgc2VjdG9yTnVtYmVyOiBuLFxuICAgICAgICAgIHNlY3RvclBvczoge1xuICAgICAgICAgICAgcm93SW5kZXg6IHBvcy5yb3dJbmRleCAtIDEsXG4gICAgICAgICAgICBjb2xJbmRleDogcG9zLmNvbEluZGV4LFxuICAgICAgICAgIH0gICAgICBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvcy5yb3dJbmRleCA8ICh0aGlzLmhlaWdodCAtIDEpKSB7XG4gICAgICBpZiAoIXRoaXMuY2hlY2tFeGlzdGluZyhzKSkge1xuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgIHNlY3Rvck51bWJlcjogcyxcbiAgICAgICAgICBzZWN0b3JQb3M6IHtcbiAgICAgICAgICAgIHJvd0luZGV4OiBwb3Mucm93SW5kZXggKyAxLFxuICAgICAgICAgICAgY29sSW5kZXg6IHBvcy5jb2xJbmRleCxcbiAgICAgICAgICB9ICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3MuY29sSW5kZXggPCAodGhpcy53aWR0aCAtIDEpKSB7XG4gICAgICBpZiAoIXRoaXMuY2hlY2tFeGlzdGluZyhlKSkge1xuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgIHNlY3Rvck51bWJlcjogZSxcbiAgICAgICAgICBzZWN0b3JQb3M6IHtcbiAgICAgICAgICAgIHJvd0luZGV4OiBwb3Mucm93SW5kZXgsXG4gICAgICAgICAgICBjb2xJbmRleDogcG9zLmNvbEluZGV4ICsgMSxcbiAgICAgICAgICB9ICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3MuY29sSW5kZXggPiAwKSB7XG4gICAgICBpZiAoIXRoaXMuY2hlY2tFeGlzdGluZyh3KSkge1xuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgIHNlY3Rvck51bWJlcjogdyxcbiAgICAgICAgICBzZWN0b3JQb3M6IHtcbiAgICAgICAgICAgIHJvd0luZGV4OiBwb3Mucm93SW5kZXgsXG4gICAgICAgICAgICBjb2xJbmRleDogcG9zLmNvbEluZGV4IC0gMSxcbiAgICAgICAgICB9ICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcHRpb25zLmxlbmd0aCA9PSAwKSB7XG4gICAgICBjb25zb2xlLmxvZygncE5PSUMnKTtcbiAgICAgIHRoaXMuZ2VuZXJhdGUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3B0aW9uc1tSYW5kb20oMSwgb3B0aW9ucy5sZW5ndGgpIC0gMV07XG4gIH1cblxufTtcblxuZXhwb3J0IGNsYXNzIG1hcCB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoID0gMTUsIGhlaWdodCA9IDE1LCBmaWxsUGVyY2VudGFnZSA9IDQwKSB7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuZmlsbFBlcmNlbnRhZ2UgPSBmaWxsUGVyY2VudGFnZTtcbiAgICB0aGlzLmdyaWQgPSBbXTtcbiAgfVxuXG4gIGdlbmVyYXRlKCkge1xuICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xuICAgIHRoaXMuc21vb3RoTWFwKCk7XG4gIH1cblxuICBwc2V1ZG9SYW5kb21TZWVkKCkge1xuICAgIHJldHVybiAoUmFuZG9tKDEsMTAwKSA8IHRoaXMuZmlsbFBlcmNlbnRhZ2UpID8gMTogMDtcbiAgfVxuXG4gIGNyZWF0ZUdyaWQoKSB7XG4gICAgY29uc3QgZ3JpZCA9IFtdO1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgY29uc3QgY29sdW1ucyA9IFtdO1xuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgaWYgKHggPT0gMCB8fCB4ID09IHRoaXMud2lkdGgtMSB8fCB5ID09IDAgfHwgeSA9PSB0aGlzLmhlaWdodCAtMSkge1xuICAgICAgICAgIGNvbHVtbnMucHVzaCgxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2x1bW5zLnB1c2godGhpcy5wc2V1ZG9SYW5kb21TZWVkKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBncmlkLnB1c2goY29sdW1ucyk7XG4gICAgfVxuICAgIHRoaXMuZ3JpZCA9IGdyaWQ7XG4gIH1cblxuICBzbW9vdGhNYXAoKSB7XG4gICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgY29uc3QgbmVpZ2hib3VyV2FsbFRpbGVzID0gdGhpcy5nZXRTdXJyb3VuZGluZ1dhbGxDb3VudCh4LHkpO1xuICAgICAgICBpZiAobmVpZ2hib3VyV2FsbFRpbGVzID4gNClcbiAgICAgICAgICB0aGlzLmdyaWRbeF1beV0gPSAxO1xuICAgICAgICBlbHNlIGlmIChuZWlnaGJvdXJXYWxsVGlsZXMgPCA0KVxuICAgICAgICAgIHRoaXMuZ3JpZFt4XVt5XSA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0U3Vycm91bmRpbmdXYWxsQ291bnQoeCx5KSB7XG4gICAgbGV0IHdhbGxDb3VudCA9IDA7XG4gICAgZm9yIChsZXQgbmVpZ2hib3VyWCA9IHggLSAxOyBuZWlnaGJvdXJYIDw9IHggKyAxOyBuZWlnaGJvdXJYICsrKSB7XG4gICAgICBmb3IgKGxldCBuZWlnaGJvdXJZID0geSAtIDE7IG5laWdoYm91clkgPD0geSArIDE7IG5laWdoYm91clkgKyspIHtcbiAgICAgICAgaWYgKG5laWdoYm91clggPj0gMCAmJiBuZWlnaGJvdXJYIDwgdGhpcy53aWR0aCAmJiBuZWlnaGJvdXJZID49IDAgJiYgbmVpZ2hib3VyWSA8IHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgaWYgKG5laWdoYm91clggIT0geCB8fCBuZWlnaGJvdXJZICE9IHkpIHtcbiAgICAgICAgICAgIHdhbGxDb3VudCArPSB0aGlzLmdyaWRbbmVpZ2hib3VyWF1bbmVpZ2hib3VyWV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHdhbGxDb3VudCArKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gd2FsbENvdW50O1xuICB9XG59Il19
},{}]},{},[1])