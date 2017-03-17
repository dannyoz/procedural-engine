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

var Level = (function () {
  function Level() {
    var width = arguments.length <= 0 || arguments[0] === undefined ? 5 : arguments[0];
    var height = arguments.length <= 1 || arguments[1] === undefined ? 5 : arguments[1];
    var sectorCount = arguments.length <= 2 || arguments[2] === undefined ? 8 : arguments[2];

    _classCallCheck(this, Level);

    this.width = width;
    this.height = height;
    this.gridCount = width * height;
    this.sectorCount = sectorCount;
    this.grid = [];
  }

  // Init method

  _createClass(Level, [{
    key: 'generate',
    value: function generate() {
      this.createGrid();
      this.playTiles();
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
            number: (i + 1) * (j + 1)
          });
        }

        grid.push({
          name: 'row_' + i,
          columns: columns
        });
      }

      this.grid = grid;

      return grid;
    }
  }, {
    key: 'playTiles',
    value: function playTiles() {
      var tile = 9;
      for (var i = 0; i < this.sectorCount; i++) {
        console.log(Random(1, this.gridCount));
      }
    }
  }]);

  return Level;
})();

exports.Level = Level;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYW4vcmVwb3MvcHJvY2VkdXJhbC1lbmdpbmUvYXBwL2Zha2VfZTc3ZWQ5YTkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDeEIsS0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsS0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEIsU0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFBLEFBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztDQUN0RCxDQUFDOztJQUVXLEtBQUs7QUFDTixXQURDLEtBQUssR0FDbUM7UUFBeEMsS0FBSyx5REFBRyxDQUFDO1FBQUUsTUFBTSx5REFBRyxDQUFDO1FBQUUsV0FBVyx5REFBRyxDQUFDOzswQkFEdEMsS0FBSzs7QUFFZCxRQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixRQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDbEMsUUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFDN0IsUUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7R0FDakI7Ozs7ZUFQVyxLQUFLOztXQVVULG9CQUFHO0FBQ1IsVUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ2xCLFVBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUNuQjs7Ozs7V0FHVSxzQkFBRztBQUNYLFVBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQzs7QUFFaEIsV0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O0FBRXBDLFlBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFbkIsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkMsaUJBQU8sQ0FBQyxJQUFJLENBQUM7QUFDWCxnQkFBSSxFQUFFLFNBQVMsR0FBQyxDQUFDO0FBQ2pCLGtCQUFNLEVBQUUsQ0FBQyxDQUFDLEdBQUMsQ0FBQyxDQUFBLElBQUcsQ0FBQyxHQUFDLENBQUMsQ0FBQSxBQUFDO1dBQ3BCLENBQUMsQ0FBQTtTQUNIOztBQUVELFlBQUksQ0FBQyxJQUFJLENBQUM7QUFDUixjQUFJLEVBQUUsTUFBTSxHQUFDLENBQUM7QUFDZCxpQkFBTyxFQUFFLE9BQU87U0FDakIsQ0FBQyxDQUFDO09BQ0o7O0FBRUQsVUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7O0FBRWpCLGFBQU8sSUFBSSxDQUFDO0tBQ2I7OztXQUVRLHFCQUFHO0FBQ1YsVUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDO0FBQ2IsV0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDekMsZUFBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO09BQ3hDO0tBQ0Y7OztTQTlDVSxLQUFLOzs7O0FBZ0RqQixDQUFDIiwiZmlsZSI6Ii9Vc2Vycy9kYW4vcmVwb3MvcHJvY2VkdXJhbC1lbmdpbmUvYXBwL2Zha2VfZTc3ZWQ5YTkuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBSYW5kb20obWluLCBtYXgpIHtcbiAgbWluID0gTWF0aC5jZWlsKG1pbik7XG4gIG1heCA9IE1hdGguZmxvb3IobWF4KTtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcbn07XG5cbmV4cG9ydCBjbGFzcyBMZXZlbCB7XG5cdGNvbnN0cnVjdG9yKHdpZHRoID0gNSwgaGVpZ2h0ID0gNSwgc2VjdG9yQ291bnQgPSA4KSB7XG4gICAgdGhpcy53aWR0aCA9IHdpZHRoO1xuICAgIHRoaXMuaGVpZ2h0ID0gaGVpZ2h0O1xuICAgIHRoaXMuZ3JpZENvdW50ID0gd2lkdGggKiBoZWlnaHQ7XG5cdFx0dGhpcy5zZWN0b3JDb3VudCA9IHNlY3RvckNvdW50O1xuICAgIHRoaXMuZ3JpZCA9IFtdO1xuXHR9XG5cbiAgLy8gSW5pdCBtZXRob2QgXG5cdGdlbmVyYXRlKCkge1xuICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xuICAgIHRoaXMucGxheVRpbGVzKCk7XG5cdH1cblxuICAvLyBHZW5yYXRlcyBhIGdyaWQgYmFzZWQgb24gd2lkdGggYW5kIGhlaWdodFxuICBjcmVhdGVHcmlkKCkge1xuICAgIGNvbnN0IGdyaWQgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5oZWlnaHQ7IGkrKykge1xuXG4gICAgICBjb25zdCBjb2x1bW5zID0gW107XG5cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy53aWR0aDsgaisrKSB7XG4gICAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgICAgbmFtZTogJ2NvbHVtbl8nK2osXG4gICAgICAgICAgbnVtYmVyOiAoaSsxKSooaisxKVxuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBncmlkLnB1c2goe1xuICAgICAgICBuYW1lOiAncm93XycraSxcbiAgICAgICAgY29sdW1uczogY29sdW1uc1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5ncmlkID0gZ3JpZDtcblxuICAgIHJldHVybiBncmlkO1xuICB9XG5cbiAgcGxheVRpbGVzKCkge1xuICAgIHZhciB0aWxlID0gOTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2VjdG9yQ291bnQ7IGkrKykge1xuICAgICAgY29uc29sZS5sb2coUmFuZG9tKDEsIHRoaXMuZ3JpZENvdW50KSk7XG4gICAgfVxuICB9XG5cbn07XG5cbiJdfQ==
},{}]},{},[1])