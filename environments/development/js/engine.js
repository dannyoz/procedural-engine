(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

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
    key: "generate",
    value: function generate() {
      this.createGrid();
      for (var i = 0; i < this.smoothing; i++) {
        this.smoothMap();
      }
    }
  }, {
    key: "pseudoRandomSeed",
    value: function pseudoRandomSeed() {
      return Random(1, 100) < this.fillPercentage ? 1 : 0;
    }
  }, {
    key: "createGrid",
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
    key: "smoothMap",
    value: function smoothMap() {
      for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
          var neighbourWallTiles = this.getSurroundingWallCount(x, y);
          if (neighbourWallTiles > 4) this.grid[y][x] = 1;else if (neighbourWallTiles < 4) this.grid[y][x] = 0;
        }
      }
    }
  }, {
    key: "getSurroundingWallCount",
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYW5pZWwub3Nib3JuZS9yZXBvcy9wcm9jZWR1cmFsLWVuZ2luZS9hcHAvZmFrZV9iMzczZGUwMi5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUN4QixLQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixLQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QixTQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUEsQUFBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0NBQ3RELENBQUM7O0lBRVcsR0FBRztBQUNILFdBREEsR0FBRyxHQUMyRDtRQUE3RCxLQUFLLHlEQUFHLEVBQUU7UUFBRSxNQUFNLHlEQUFHLEVBQUU7UUFBRSxjQUFjLHlEQUFHLEVBQUU7UUFBRSxTQUFTLHlEQUFHLENBQUM7OzBCQUQ1RCxHQUFHOztBQUVaLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0FBQ3JDLFFBQUksQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDO0FBQ2YsUUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7R0FDNUI7O2VBUFUsR0FBRzs7V0FTTixvQkFBRztBQUNULFVBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUNsQixXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUN2QyxZQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7T0FDbEI7S0FDRjs7O1dBRWUsNEJBQUc7QUFDakIsYUFBTyxBQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsR0FBSSxDQUFDLEdBQUUsQ0FBQyxDQUFDO0tBQ3JEOzs7V0FFUyxzQkFBRztBQUNYLFVBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNoQixXQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNwQyxZQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7QUFDbkIsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkMsY0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFFLENBQUMsRUFBRTtBQUNoRSxtQkFBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztXQUNqQixNQUFNO0FBQ0wsbUJBQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQztXQUN2QztTQUNGO0FBQ0QsWUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztPQUNwQjtBQUNELFVBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO0tBQ2xCOzs7V0FFUSxxQkFBRztBQUNULFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3JDLGFBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ25DLGNBQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQztBQUM3RCxjQUFJLGtCQUFrQixHQUFHLENBQUMsRUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FDakIsSUFBSSxrQkFBa0IsR0FBRyxDQUFDLEVBQzdCLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3ZCO09BQ0Y7S0FDRjs7O1dBRXNCLGlDQUFDLENBQUMsRUFBQyxDQUFDLEVBQUU7QUFDM0IsVUFBSSxTQUFTLEdBQUcsQ0FBQyxDQUFDO0FBQ2xCLFdBQUssSUFBSSxVQUFVLEdBQUcsQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFVLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxVQUFVLEVBQUcsRUFBRTtBQUMvRCxhQUFLLElBQUksVUFBVSxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsVUFBVSxFQUFHLEVBQUU7QUFDL0QsY0FBSSxVQUFVLElBQUksQ0FBQyxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxJQUFJLFVBQVUsSUFBSSxDQUFDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUU7QUFDN0YsZ0JBQUksVUFBVSxJQUFJLENBQUMsSUFBSSxVQUFVLElBQUksQ0FBQyxFQUFFO0FBQ3RDLHVCQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNoRDtXQUNGLE1BQ0k7QUFDSCxxQkFBUyxFQUFHLENBQUM7V0FDZDtTQUNGO09BQ0Y7QUFDRCxhQUFPLFNBQVMsQ0FBQztLQUNsQjs7O1NBL0RVLEdBQUciLCJmaWxlIjoiL1VzZXJzL2RhbmllbC5vc2Jvcm5lL3JlcG9zL3Byb2NlZHVyYWwtZW5naW5lL2FwcC9mYWtlX2IzNzNkZTAyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gUmFuZG9tKG1pbiwgbWF4KSB7XG4gIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG59O1xuXG5leHBvcnQgY2xhc3MgbWFwIHtcbiAgY29uc3RydWN0b3Iod2lkdGggPSAyNSwgaGVpZ2h0ID0gMjUsIGZpbGxQZXJjZW50YWdlID0gNDAsIHNtb290aGluZyA9IDIpIHtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5maWxsUGVyY2VudGFnZSA9IGZpbGxQZXJjZW50YWdlO1xuICAgIHRoaXMuZ3JpZCA9IFtdO1xuICAgIHRoaXMuc21vb3RoaW5nID0gc21vb3RoaW5nO1xuICB9XG5cbiAgZ2VuZXJhdGUoKSB7XG4gICAgdGhpcy5jcmVhdGVHcmlkKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNtb290aGluZzsgaSsrKSB7XG4gICAgICB0aGlzLnNtb290aE1hcCgpO1xuICAgIH1cbiAgfVxuXG4gIHBzZXVkb1JhbmRvbVNlZWQoKSB7XG4gICAgcmV0dXJuIChSYW5kb20oMSwxMDApIDwgdGhpcy5maWxsUGVyY2VudGFnZSkgPyAxOiAwO1xuICB9XG5cbiAgY3JlYXRlR3JpZCgpIHtcbiAgICBjb25zdCBncmlkID0gW107XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICBpZiAoeCA9PSAwIHx8IHggPT0gdGhpcy53aWR0aC0xIHx8IHkgPT0gMCB8fCB5ID09IHRoaXMuaGVpZ2h0IC0xKSB7XG4gICAgICAgICAgY29sdW1ucy5wdXNoKDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbHVtbnMucHVzaCh0aGlzLnBzZXVkb1JhbmRvbVNlZWQoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGdyaWQucHVzaChjb2x1bW5zKTtcbiAgICB9XG4gICAgdGhpcy5ncmlkID0gZ3JpZDtcbiAgfVxuXG4gIHNtb290aE1hcCgpIHtcbiAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICBjb25zdCBuZWlnaGJvdXJXYWxsVGlsZXMgPSB0aGlzLmdldFN1cnJvdW5kaW5nV2FsbENvdW50KHgseSk7XG4gICAgICAgIGlmIChuZWlnaGJvdXJXYWxsVGlsZXMgPiA0KVxuICAgICAgICAgIHRoaXMuZ3JpZFt5XVt4XSA9IDE7XG4gICAgICAgIGVsc2UgaWYgKG5laWdoYm91cldhbGxUaWxlcyA8IDQpXG4gICAgICAgICAgdGhpcy5ncmlkW3ldW3hdID0gMDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBnZXRTdXJyb3VuZGluZ1dhbGxDb3VudCh4LHkpIHtcbiAgICBsZXQgd2FsbENvdW50ID0gMDtcbiAgICBmb3IgKGxldCBuZWlnaGJvdXJZID0geSAtIDE7IG5laWdoYm91clkgPD0geSArIDE7IG5laWdoYm91clkgKyspIHtcbiAgICAgIGZvciAobGV0IG5laWdoYm91clggPSB4IC0gMTsgbmVpZ2hib3VyWCA8PSB4ICsgMTsgbmVpZ2hib3VyWCArKykge1xuICAgICAgICBpZiAobmVpZ2hib3VyWCA+PSAwICYmIG5laWdoYm91clggPCB0aGlzLndpZHRoICYmIG5laWdoYm91clkgPj0gMCAmJiBuZWlnaGJvdXJZIDwgdGhpcy5oZWlnaHQpIHtcbiAgICAgICAgICBpZiAobmVpZ2hib3VyWCAhPSB4IHx8IG5laWdoYm91clkgIT0geSkge1xuICAgICAgICAgICAgd2FsbENvdW50ICs9IHRoaXMuZ3JpZFtuZWlnaGJvdXJZXVtuZWlnaGJvdXJYXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgd2FsbENvdW50ICsrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB3YWxsQ291bnQ7XG4gIH1cbn0iXX0=
},{}]},{},[1])