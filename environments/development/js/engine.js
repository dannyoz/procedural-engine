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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYW5pZWwub3Nib3JuZS9yZXBvcy9wcm9jZWR1cmFsLWVuZ2luZS9hcHAvZmFrZV8yNzEyNTBjOC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ3hCLEtBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLEtBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLFNBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQSxBQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7Q0FDdEQsQ0FBQzs7SUFFVyxHQUFHO0FBQ0gsV0FEQSxHQUFHLEdBQzJEO1FBQTdELEtBQUsseURBQUcsRUFBRTtRQUFFLE1BQU0seURBQUcsRUFBRTtRQUFFLGNBQWMseURBQUcsRUFBRTtRQUFFLFNBQVMseURBQUcsQ0FBQzs7MEJBRDVELEdBQUc7O0FBRVosUUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7QUFDbkIsUUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7QUFDckIsUUFBSSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7QUFDckMsUUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZixRQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztHQUM1Qjs7ZUFQVSxHQUFHOztXQVNOLG9CQUFHO0FBQ1QsVUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ2xCLFdBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQ3ZDLFlBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztPQUNsQjtLQUNGOzs7V0FFZSw0QkFBRztBQUNqQixhQUFPLEFB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Q0FBQztBQUNuQixNQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixNQUFJLENBQUMsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0NBQy9DOzs7O0FBR0ksU0FBUyxJQUFJLENBQUMsS0FBSyxFQUFDLE1BQU0sRUFBRTtBQUNqQyxNQUFNLElBQUksR0FBRyxFQUFFLENBQUM7QUFDZCxPQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQy9CLFFBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNuQixTQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxFQUFFLENBQUMsRUFBRSxFQUFFO0FBQzVCLGFBQU8sQ0FBQyxJQUFJLENBQUM7QUFDWCxpQkFBUyxFQUFLLENBQUMsU0FBSSxDQUFDLEFBQUU7T0FDdkIsQ0FBQyxDQUFDO0tBQ047QUFDRCxRQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0dBQ3BCO0FBQ0QsU0FBTyxJQUFJLENBQUM7Q0FDZjs7QUFBQSxDQUFDIiwiZmlsZSI6Ii9Vc2Vycy9kYW5pZWwub3Nib3JuZS9yZXBvcy9wcm9jZWR1cmFsLWVuZ2luZS9hcHAvZmFrZV8yNzEyNTBjOC5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIFJhbmRvbShtaW4sIG1heCkge1xuICBtaW4gPSBNYXRoLmNlaWwobWluKTtcbiAgbWF4ID0gTWF0aC5mbG9vcihtYXgpO1xuICByZXR1cm4gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbikpICsgbWluO1xufTtcblxuZXhwb3J0IGNsYXNzIG1hcCB7XG4gIGNvbnN0cnVjdG9yKHdpZHRoID0gMjUsIGhlaWdodCA9IDI1LCBmaWxsUGVyY2VudGFnZSA9IDQwLCBzbW9vdGhpbmcgPSAyKSB7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuZmlsbFBlcmNlbnRhZ2UgPSBmaWxsUGVyY2VudGFnZTtcbiAgICB0aGlzLmdyaWQgPSBbXTtcbiAgICB0aGlzLnNtb290aGluZyA9IHNtb290aGluZztcbiAgfVxuXG4gIGdlbmVyYXRlKCkge1xuICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5zbW9vdGhpbmc7IGkrKykge1xuICAgICAgdGhpcy5zbW9vdGhNYXAoKTtcbiAgICB9XG4gIH1cblxuICBwc2V1ZG9SYW5kb21TZWVkKCkge1xuICAgIHJldHVybiAoUmFuZG9tKDEsMTAwKSA8IHRoaXMuZmlsbFBlcmNlbnRhZ2UpID8gMTogMDtcbiAgfVxuXG4gIGNyZWF0ZUdyaWQoKSB7XG4gICAgY29uc3QgZ3JpZCA9IFtdO1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgY29uc3QgY29sdW1ucyA9IFtdO1xuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgaWYgKHggPT0gMCB8fCB4ID09IHRoaXMud2lkdGgtMSB8fCB5ID09IDAgfHwgeSA9PSB0aGlzLmhlaWdodCAtMSkge1xuICAgICAgICAgIGNvbHVtbnMucHVzaCgxKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb2x1bW5zLnB1c2godGhpcy5wc2V1ZG9SYW5kb21TZWVkKCkpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBncmlkLnB1c2goY29sdW1ucyk7XG4gICAgfVxuICAgIHRoaXMuZ3JpZCA9IGdyaWQ7XG4gIH1cblxuICBzbW9vdGhNYXAoKSB7XG4gICAgIGZvciAobGV0IHkgPSAwOyB5IDwgdGhpcy5oZWlnaHQ7IHkrKykge1xuICAgICAgZm9yIChsZXQgeCA9IDA7IHggPCB0aGlzLndpZHRoOyB4KyspIHtcbiAgICAgICAgY29uc3QgbmVpZ2hib3VyV2FsbFRpbGVzID0gdGhpcy5nZXRTdXJyb3VuZGluZ1dhbGxDb3VudCh4LHkpO1xuICAgICAgICBpZiAobmVpZ2hib3VyV2FsbFRpbGVzID4gNClcbiAgICAgICAgICB0aGlzLmdyaWRbeV1beF0gPSAxO1xuICAgICAgICBlbHNlIGlmIChuZWlnaGJvdXJXYWxsVGlsZXMgPCA0KVxuICAgICAgICAgIHRoaXMuZ3JpZFt5XVt4XSA9IDA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZ2V0U3Vycm91bmRpbmdXYWxsQ291bnQoeCx5KSB7XG4gICAgbGV0IHdhbGxDb3VudCA9IDA7XG4gICAgZm9yIChsZXQgbmVpZ2hib3VyWSA9IHkgLSAxOyBuZWlnaGJvdXJZIDw9IHkgKyAxOyBuZWlnaGJvdXJZICsrKSB7XG4gICAgICBmb3IgKGxldCBuZWlnaGJvdXJYID0geCAtIDE7IG5laWdoYm91clggPD0geCArIDE7IG5laWdoYm91clggKyspIHtcbiAgICAgICAgaWYgKG5laWdoYm91clggPj0gMCAmJiBuZWlnaGJvdXJYIDwgdGhpcy53aWR0aCAmJiBuZWlnaGJvdXJZID49IDAgJiYgbmVpZ2hib3VyWSA8IHRoaXMuaGVpZ2h0KSB7XG4gICAgICAgICAgaWYgKG5laWdoYm91clggIT0geCB8fCBuZWlnaGJvdXJZICE9IHkpIHtcbiAgICAgICAgICAgIHdhbGxDb3VudCArPSB0aGlzLmdyaWRbbmVpZ2hib3VyWV1bbmVpZ2hib3VyWF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgIHdhbGxDb3VudCArKztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gd2FsbENvdW50O1xuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBzZWN0b3JzIHtcbiAgY29uc3RydWN0b3Iod2lkdGggPSA1LCBoZWlnaHQgPSA1KSB7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuZ3JpZCA9IG5ldyBncmlkKHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZ3JpZCh3aWR0aCxoZWlnaHQpIHtcbiAgY29uc3QgZ3JpZCA9IFtdO1xuICAgIGZvciAobGV0IHkgPSAwOyB5IDwgaGVpZ2h0OyB5KyspIHtcbiAgICAgIGNvbnN0IGNvbHVtbnMgPSBbXTtcbiAgICAgIGZvciAobGV0IHggPSAwOyB4IDwgd2lkdGg7IHgrKykge1xuICAgICAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgICAgICBwb3N0aXRpb246IGAke3h9LSR7eX1gLCBcbiAgICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGdyaWQucHVzaChjb2x1bW5zKTtcbiAgICB9XG4gICAgcmV0dXJuIGdyaWQ7XG59O1xuIl19
},{}]},{},[1])