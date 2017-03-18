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
      this.playZone();
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

      return grid;
    }
  }, {
    key: 'playZone',
    value: function playZone() {
      var startTile = Random(1, this.gridCount);
      this.setStart(47);
      // for (var i = 0; i < this.sectorCount; i++) {
      //   console.log(Random(1, this.gridCount));
      // }
    }
  }, {
    key: 'setStart',
    value: function setStart(int) {
      var rowIndex = Math.ceil(int / this.width) - 1;
      var colIndex = Number;
      this.grid[rowIndex].columns.forEach(function (col, ind) {
        if (col.number == int) {
          colIndex = ind;
        }
      });
      this.grid[rowIndex].columns[colIndex].start = true;
    }
  }]);

  return Level;
})();

exports.Level = Level;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYW4vcmVwb3MvcHJvY2VkdXJhbC1lbmdpbmUvYXBwL2Zha2VfM2Y3ODM2ZTkuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLFNBQVMsTUFBTSxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7QUFDeEIsS0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDckIsS0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdEIsU0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFBLEFBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztDQUN0RCxDQUFDOztJQUVXLEtBQUs7QUFDTixXQURDLEtBQUssR0FDbUM7UUFBeEMsS0FBSyx5REFBRyxDQUFDO1FBQUUsTUFBTSx5REFBRyxDQUFDO1FBQUUsV0FBVyx5REFBRyxDQUFDOzswQkFEdEMsS0FBSzs7QUFFZCxRQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztBQUNuQixRQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztBQUNyQixRQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssR0FBRyxNQUFNLENBQUM7QUFDbEMsUUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7QUFDN0IsUUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7R0FDakI7Ozs7ZUFQVyxLQUFLOztXQVVULG9CQUFHO0FBQ1IsVUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ2xCLFVBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUNsQjs7Ozs7V0FHVSxzQkFBRztBQUNYLFVBQU0sSUFBSSxHQUFHLEVBQUUsQ0FBQzs7QUFFaEIsV0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7O0FBRXBDLFlBQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQzs7QUFFbkIsYUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDbkMsaUJBQU8sQ0FBQyxJQUFJLENBQUM7QUFDWCxnQkFBSSxFQUFFLFNBQVMsR0FBQyxDQUFDO0FBQ2pCLGtCQUFNLEVBQUUsQUFBQyxJQUFJLENBQUMsS0FBSyxHQUFDLENBQUMsSUFBSyxDQUFDLEdBQUMsQ0FBQyxDQUFBLEFBQUM7V0FDL0IsQ0FBQyxDQUFBO1NBQ0g7O0FBRUQsWUFBSSxDQUFDLElBQUksQ0FBQztBQUNSLGNBQUksRUFBRSxNQUFNLEdBQUMsQ0FBQztBQUNkLGlCQUFPLEVBQUUsT0FBTztTQUNqQixDQUFDLENBQUM7T0FDSjs7QUFFRCxVQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQzs7QUFFakIsYUFBTyxJQUFJLENBQUM7S0FDYjs7O1dBRU8sb0JBQUc7QUFDVCxVQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM1QyxVQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzs7O0tBSW5COzs7V0FFTyxrQkFBQyxHQUFHLEVBQUU7QUFDWixVQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQy9DLFVBQUksUUFBUSxHQUFHLE1BQU0sQ0FBQztBQUN0QixVQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFLO0FBQ2hELFlBQUksR0FBRyxDQUFDLE1BQU0sSUFBSSxHQUFHLEVBQUU7QUFDckIsa0JBQVEsR0FBRyxHQUFHLENBQUM7U0FDaEI7T0FDRixDQUFDLENBQUM7QUFDSCxVQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQ3BEOzs7U0ExRFUsS0FBSzs7OztBQTREakIsQ0FBQyIsImZpbGUiOiIvVXNlcnMvZGFuL3JlcG9zL3Byb2NlZHVyYWwtZW5naW5lL2FwcC9mYWtlXzNmNzgzNmU5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gUmFuZG9tKG1pbiwgbWF4KSB7XG4gIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG59O1xuXG5leHBvcnQgY2xhc3MgTGV2ZWwge1xuXHRjb25zdHJ1Y3Rvcih3aWR0aCA9IDUsIGhlaWdodCA9IDUsIHNlY3RvckNvdW50ID0gOCkge1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmdyaWRDb3VudCA9IHdpZHRoICogaGVpZ2h0O1xuXHRcdHRoaXMuc2VjdG9yQ291bnQgPSBzZWN0b3JDb3VudDtcbiAgICB0aGlzLmdyaWQgPSBbXTtcblx0fVxuXG4gIC8vIEluaXQgbWV0aG9kIFxuXHRnZW5lcmF0ZSgpIHtcbiAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcbiAgICB0aGlzLnBsYXlab25lKCk7XG5cdH1cblxuICAvLyBHZW5yYXRlcyBhIGdyaWQgYmFzZWQgb24gd2lkdGggYW5kIGhlaWdodFxuICBjcmVhdGVHcmlkKCkge1xuICAgIGNvbnN0IGdyaWQgPSBbXTtcblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5oZWlnaHQ7IGkrKykge1xuXG4gICAgICBjb25zdCBjb2x1bW5zID0gW107XG5cbiAgICAgIGZvciAodmFyIGogPSAwOyBqIDwgdGhpcy53aWR0aDsgaisrKSB7XG4gICAgICAgIGNvbHVtbnMucHVzaCh7XG4gICAgICAgICAgbmFtZTogJ2NvbHVtbl8nK2osXG4gICAgICAgICAgbnVtYmVyOiAodGhpcy53aWR0aCppKSArIChqKzEpXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIGdyaWQucHVzaCh7XG4gICAgICAgIG5hbWU6ICdyb3dfJytpLFxuICAgICAgICBjb2x1bW5zOiBjb2x1bW5zXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLmdyaWQgPSBncmlkO1xuXG4gICAgcmV0dXJuIGdyaWQ7XG4gIH1cblxuICBwbGF5Wm9uZSgpIHtcbiAgICBjb25zdCBzdGFydFRpbGUgPSBSYW5kb20oMSwgdGhpcy5ncmlkQ291bnQpO1xuICAgIHRoaXMuc2V0U3RhcnQoNDcpO1xuICAgIC8vIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5zZWN0b3JDb3VudDsgaSsrKSB7XG4gICAgLy8gICBjb25zb2xlLmxvZyhSYW5kb20oMSwgdGhpcy5ncmlkQ291bnQpKTtcbiAgICAvLyB9XG4gIH1cblxuICBzZXRTdGFydChpbnQpIHtcbiAgICBjb25zdCByb3dJbmRleCA9IE1hdGguY2VpbChpbnQvdGhpcy53aWR0aCkgLSAxO1xuICAgIGxldCBjb2xJbmRleCA9IE51bWJlcjtcbiAgICB0aGlzLmdyaWRbcm93SW5kZXhdLmNvbHVtbnMuZm9yRWFjaCgoY29sLCBpbmQpID0+IHtcbiAgICAgIGlmIChjb2wubnVtYmVyID09IGludCkge1xuICAgICAgICBjb2xJbmRleCA9IGluZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLmdyaWRbcm93SW5kZXhdLmNvbHVtbnNbY29sSW5kZXhdLnN0YXJ0ID0gdHJ1ZTtcbiAgfSAgXG5cbn07XG4iXX0=
},{}]},{},[1])