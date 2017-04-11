(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.grid = grid;

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
    var smoothing = arguments.length <= 3 || arguments[3] === undefined ? 4 : arguments[3];
    var smoothCycles = arguments.length <= 4 || arguments[4] === undefined ? 3 : arguments[4];

    _classCallCheck(this, map);

    this.width = width;
    this.height = height;
    this.fillPercentage = fillPercentage;
    this.grid = [];
    this.smoothing = smoothing;
    this.smoothCycles = smoothCycles;
  }

  _createClass(map, [{
    key: "generate",
    value: function generate() {
      this.createGrid();
      for (var i = 0; i < this.smoothCycles; i++) {
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
          if (neighbourWallTiles > this.smoothing) this.grid[y][x] = 1;else if (neighbourWallTiles < this.smoothing) this.grid[y][x] = 0;
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

var sectors = function sectors() {
  var width = arguments.length <= 0 || arguments[0] === undefined ? 5 : arguments[0];
  var height = arguments.length <= 1 || arguments[1] === undefined ? 5 : arguments[1];

  _classCallCheck(this, sectors);

  this.width = width;
  this.height = height;
  this.grid = new grid(this.width, this.height);
};

exports.sectors = sectors;

function grid(width, height) {
  var grid = [];
  for (var y = 0; y < height; y++) {
    var columns = [];
    for (var x = 0; x < width; x++) {
      columns.push({
        postition: x + "-" + y
      });
    }
    grid.push(columns);
  }
  return grid;
}

;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYW5pZWwub3Nib3JuZS9yZXBvcy9wcm9jZWR1cmFsLWVuZ2luZS9hcHAvZmFrZV8zNjNhNjhkZC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ3hCLEtBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLEtBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLFNBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQSxBQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7Q0FDdEQsQ0FBQzs7SUFFVyxHQUFHO0FBQ0gsV0FEQSxHQUFHLEdBQzZFO1FBQS9FLEtBQUsseURBQUcsRUFBRTtRQUFFLE1BQU0seURBQUcsRUFBRTtRQUFFLGNBQWMseURBQUcsRUFBRTtRQUFFLFNBQVMseURBQUcsQ0FBQztRQUFFLFlBQVkseURBQUcsQ0FBQzs7MEJBRDlFLEdBQUc7O0FBRVosUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsUUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDckMsUUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZixRQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztBQUMzQixRQUFJLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQztHQUNsQzs7ZUFSVSxHQUFHOztXQVVOLG9CQUFHO0FBQ1QsVUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ2xCLFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzFDLFlBQUks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eURBQUcsQ0FBQztNQUFFLE1BQU0seURBQUcsQ0FBQzs7d0JBRHRCLE9BQU87O0FBRWhCLE1BQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLE1BQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLE1BQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7Q0FDL0M7Ozs7QUFHSSxTQUFTLElBQUksQ0FBQyxLQUFLLEVBQUMsTUFBTSxFQUFFO0FBQ2pDLE1BQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQztBQUNkLE9BQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDL0IsUUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO0FBQ25CLFNBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDNUIsYUFBTyxDQUFDLElBQUksQ0FBQztBQUNYLGlCQUFTLEVBQUssQ0FBQyxTQUFJLENBQUMsQUFBRTtPQUN2QixDQUFDLENBQUM7S0FDTjtBQUNELFFBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7R0FDcEI7QUFDRCxTQUFPLElBQUksQ0FBQztDQUNmOztBQUFBLENBQUMiLCJmaWxlIjoiL1VzZXJzL2RhbmllbC5vc2Jvcm5lL3JlcG9zL3Byb2NlZHVyYWwtZW5naW5lL2FwcC9mYWtlXzM2M2E2OGRkLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gUmFuZG9tKG1pbiwgbWF4KSB7XG4gIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG59O1xuXG5leHBvcnQgY2xhc3MgbWFwIHtcbiAgY29uc3RydWN0b3Iod2lkdGggPSAyNSwgaGVpZ2h0ID0gMjUsIGZpbGxQZXJjZW50YWdlID0gNDAsIHNtb290aGluZyA9IDQsIHNtb290aEN5Y2xlcyA9IDMpIHtcbiAgICB0aGlzLndpZHRoID0gd2lkdGg7XG4gICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgdGhpcy5maWxsUGVyY2VudGFnZSA9IGZpbGxQZXJjZW50YWdlO1xuICAgIHRoaXMuZ3JpZCA9IFtdO1xuICAgIHRoaXMuc21vb3RoaW5nID0gc21vb3RoaW5nO1xuICAgIHRoaXMuc21vb3RoQ3ljbGVzID0gc21vb3RoQ3ljbGVzO1xuICB9XG5cbiAgZ2VuZXJhdGUoKSB7XG4gICAgdGhpcy5jcmVhdGVHcmlkKCk7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLnNtb290aEN5Y2xlczsgaSsrKSB7XG4gICAgICB0aGlzLnNtb290aE1hcCgpO1xuICAgIH1cbiAgfVxuXG4gIHBzZXVkb1JhbmRvbVNlZWQoKSB7XG4gICAgcmV0dXJuIChSYW5kb20oMSwxMDApIDwgdGhpcy5maWxsUGVyY2VudGFnZSkgPyAxOiAwO1xuICB9XG5cbiAgY3JlYXRlR3JpZCgpIHtcbiAgICBjb25zdCBncmlkID0gW107XG4gICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICBpZiAoeCA9PSAwIHx8IHggPT0gdGhpcy53aWR0aC0xIHx8IHkgPT0gMCB8fCB5ID09IHRoaXMuaGVpZ2h0IC0xKSB7XG4gICAgICAgICAgY29sdW1ucy5wdXNoKDEpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbHVtbnMucHVzaCh0aGlzLnBzZXVkb1JhbmRvbVNlZWQoKSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGdyaWQucHVzaChjb2x1bW5zKTtcbiAgICB9XG4gICAgdGhpcy5ncmlkID0gZ3JpZDtcbiAgfVxuXG4gIHNtb290aE1hcCgpIHtcbiAgICAgZm9yIChsZXQgeSA9IDA7IHkgPCB0aGlzLmhlaWdodDsgeSsrKSB7XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHRoaXMud2lkdGg7IHgrKykge1xuICAgICAgICBjb25zdCBuZWlnaGJvdXJXYWxsVGlsZXMgPSB0aGlzLmdldFN1cnJvdW5kaW5nV2FsbENvdW50KHgseSk7XG4gICAgICAgIGlmIChuZWlnaGJvdXJXYWxsVGlsZXMgPiB0aGlzLnNtb290aGluZylcbiAgICAgICAgICB0aGlzLmdyaWRbeV1beF0gPSAxO1xuICAgICAgICBlbHNlIGlmIChuZWlnaGJvdXJXYWxsVGlsZXMgPCB0aGlzLnNtb290aGluZylcbiAgICAgICAgICB0aGlzLmdyaWRbeV1beF0gPSAwO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldFN1cnJvdW5kaW5nV2FsbENvdW50KHgseSkge1xuICAgIGxldCB3YWxsQ291bnQgPSAwO1xuICAgIGZvciAobGV0IG5laWdoYm91clkgPSB5IC0gMTsgbmVpZ2hib3VyWSA8PSB5ICsgMTsgbmVpZ2hib3VyWSArKykge1xuICAgICAgZm9yIChsZXQgbmVpZ2hib3VyWCA9IHggLSAxOyBuZWlnaGJvdXJYIDw9IHggKyAxOyBuZWlnaGJvdXJYICsrKSB7XG4gICAgICAgIGlmIChuZWlnaGJvdXJYID49IDAgJiYgbmVpZ2hib3VyWCA8IHRoaXMud2lkdGggJiYgbmVpZ2hib3VyWSA+PSAwICYmIG5laWdoYm91clkgPCB0aGlzLmhlaWdodCkge1xuICAgICAgICAgIGlmIChuZWlnaGJvdXJYICE9IHggfHwgbmVpZ2hib3VyWSAhPSB5KSB7XG4gICAgICAgICAgICB3YWxsQ291bnQgKz0gdGhpcy5ncmlkW25laWdoYm91clldW25laWdoYm91clhdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICB3YWxsQ291bnQgKys7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHdhbGxDb3VudDtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3Mgc2VjdG9ycyB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoID0gNSwgaGVpZ2h0ID0gNSkge1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmdyaWQgPSBuZXcgZ3JpZCh0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdyaWQod2lkdGgsaGVpZ2h0KSB7XG4gIGNvbnN0IGdyaWQgPSBbXTtcbiAgICBmb3IgKGxldCB5ID0gMDsgeSA8IGhlaWdodDsgeSsrKSB7XG4gICAgICBjb25zdCBjb2x1bW5zID0gW107XG4gICAgICBmb3IgKGxldCB4ID0gMDsgeCA8IHdpZHRoOyB4KyspIHtcbiAgICAgICAgICBjb2x1bW5zLnB1c2goe1xuICAgICAgICAgICAgcG9zdGl0aW9uOiBgJHt4fS0ke3l9YCwgXG4gICAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICBncmlkLnB1c2goY29sdW1ucyk7XG4gICAgfVxuICAgIHJldHVybiBncmlkO1xufTtcbiJdfQ==
},{}]},{},[1])