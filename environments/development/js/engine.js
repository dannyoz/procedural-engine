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
    this.activeSectors = [];
    this.sectorIDs = [];
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
      var startPos = this.getPosition(startTile);
      this.addSector(1, startTile, startPos);
      this.grid[startPos.rowIndex].columns[startPos.colIndex].start = true;

      console.log(this.getAdjacentSector(32));

      for (var i = 0; i < this.sectorCount - 1; i++) {
        /* TODO  -  add logic to handle already existing sectors */
        var previous = this.activeSectors[i];
        var newSector = this.getAdjacentSector(previous.sectorNumber);
        this.addSector(i + 2, newSector.sectorNumber, newSector.sectorPos);
      }
    }
  }, {
    key: 'addSector',
    value: function addSector(index, sectorNumber, sectorPos) {
      this.activeSectors.push({
        index: index,
        sectorNumber: sectorNumber,
        sectorPos: sectorPos
      });
      this.sectorIDs.push(sectorNumber);
      this.grid[sectorPos.rowIndex].columns[sectorPos.colIndex].playable = true;
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
  }, {
    key: 'checkExisting',
    value: function checkExisting(id) {
      console.log(id);
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
        if (this.checkExisting(n)) {
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
        options.push({
          sectorNumber: s,
          sectorPos: {
            rowIndex: pos.rowIndex + 1,
            colIndex: pos.colIndex
          }
        });
      }

      if (pos.colIndex < this.width - 1) {
        options.push({
          sectorNumber: e,
          sectorPos: {
            rowIndex: pos.rowIndex,
            colIndex: pos.colIndex + 1
          }
        });
      }

      if (pos.colIndex > 0) {
        options.push({
          sectorNumber: w,
          sectorPos: {
            rowIndex: pos.rowIndex,
            colIndex: pos.colIndex - 1
          }
        });
      }

      var choice = options[Random(1, options.length) - 1];

      return choice;
    }
  }]);

  return Level;
})();

exports.Level = Level;
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYW5pZWwub3Nib3JuZS9yZXBvcy9wcm9jZWR1cmFsLWVuZ2luZS9hcHAvZmFrZV82NTQwZjcxZS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsU0FBUyxNQUFNLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRTtBQUN4QixLQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUNyQixLQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUN0QixTQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUEsQUFBQyxDQUFDLEdBQUcsR0FBRyxDQUFDO0NBQ3RELENBQUM7O0lBRVcsS0FBSztBQUNOLFdBREMsS0FBSyxHQUNtQztRQUF4QyxLQUFLLHlEQUFHLENBQUM7UUFBRSxNQUFNLHlEQUFHLENBQUM7UUFBRSxXQUFXLHlEQUFHLENBQUM7OzBCQUR0QyxLQUFLOztBQUVkLFFBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0FBQ25CLFFBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO0FBQ3JCLFFBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxHQUFHLE1BQU0sQ0FBQztBQUNsQyxRQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUM3QixRQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQztBQUN4QixRQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNwQixRQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztHQUNqQjs7OztlQVRXLEtBQUs7O1dBWVQsb0JBQUc7QUFDUixVQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7QUFDbEIsVUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQ2xCOzs7OztXQUdVLHNCQUFHO0FBQ1gsVUFBTSxJQUFJLEdBQUcsRUFBRSxDQUFDOztBQUVo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RUFBRTtBQUNwQyxlQUFPLENBQUMsSUFBSSxDQUFDO0FBQ1gsc0JBQVksRUFBRSxDQUFDO0FBQ2YsbUJBQVMsRUFBRTtBQUNULG9CQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVEsR0FBRyxDQUFDO0FBQzFCLG9CQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7V0FDdkI7U0FDRixDQUFDLENBQUM7T0FDSjs7QUFFRCxVQUFJLEdBQUcsQ0FBQyxRQUFRLEdBQUksSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLEFBQUMsRUFBRTtBQUNuQyxlQUFPLENBQUMsSUFBSSxDQUFDO0FBQ1gsc0JBQVksRUFBRSxDQUFDO0FBQ2YsbUJBQVMsRUFBRTtBQUNULG9CQUFRLEVBQUUsR0FBRyxDQUFDLFFBQVE7QUFDdEIsb0JBQVEsRUFBRSxHQUFHLENBQUMsUUFBUSxHQUFHLENBQUM7V0FDM0I7U0FDRixDQUFDLENBQUM7T0FDSjs7QUFFRCxVQUFJLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFFO0FBQ3BCLGVBQU8sQ0FBQyxJQUFJLENBQUM7QUFDWCxzQkFBWSxFQUFFLENBQUM7QUFDZixtQkFBUyxFQUFFO0FBQ1Qsb0JBQVEsRUFBRSxHQUFHLENBQUMsUUFBUTtBQUN0QixvQkFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQztXQUMzQjtTQUNGLENBQUMsQ0FBQztPQUNKOztBQUVELFVBQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzs7QUFFdEQsYUFBTyxNQUFNLENBQUM7S0FDZjs7O1NBaEpVLEtBQUs7Ozs7QUFrSmpCLENBQUMiLCJmaWxlIjoiL1VzZXJzL2RhbmllbC5vc2Jvcm5lL3JlcG9zL3Byb2NlZHVyYWwtZW5naW5lL2FwcC9mYWtlXzY1NDBmNzFlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gUmFuZG9tKG1pbiwgbWF4KSB7XG4gIG1pbiA9IE1hdGguY2VpbChtaW4pO1xuICBtYXggPSBNYXRoLmZsb29yKG1heCk7XG4gIHJldHVybiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAobWF4IC0gbWluKSkgKyBtaW47XG59O1xuXG5leHBvcnQgY2xhc3MgTGV2ZWwge1xuXHRjb25zdHJ1Y3Rvcih3aWR0aCA9IDUsIGhlaWdodCA9IDUsIHNlY3RvckNvdW50ID0gOCkge1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLmdyaWRDb3VudCA9IHdpZHRoICogaGVpZ2h0O1xuXHRcdHRoaXMuc2VjdG9yQ291bnQgPSBzZWN0b3JDb3VudDtcbiAgICB0aGlzLmFjdGl2ZVNlY3RvcnMgPSBbXTtcbiAgICB0aGlzLnNlY3RvcklEcyA9IFtdO1xuICAgIHRoaXMuZ3JpZCA9IFtdO1xuXHR9XG5cbiAgLy8gSW5pdCBtZXRob2QgXG5cdGdlbmVyYXRlKCkge1xuICAgIHRoaXMuY3JlYXRlR3JpZCgpO1xuICAgIHRoaXMucGxheVpvbmUoKTtcblx0fVxuXG4gIC8vIEdlbnJhdGVzIGEgZ3JpZCBiYXNlZCBvbiB3aWR0aCBhbmQgaGVpZ2h0XG4gIGNyZWF0ZUdyaWQoKSB7XG4gICAgY29uc3QgZ3JpZCA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmhlaWdodDsgaSsrKSB7XG5cbiAgICAgIGNvbnN0IGNvbHVtbnMgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLndpZHRoOyBqKyspIHtcbiAgICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiAnY29sdW1uXycraixcbiAgICAgICAgICBudW1iZXI6ICh0aGlzLndpZHRoKmkpICsgKGorMSlcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgZ3JpZC5wdXNoKHtcbiAgICAgICAgbmFtZTogJ3Jvd18nK2ksXG4gICAgICAgIGNvbHVtbnM6IGNvbHVtbnNcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuZ3JpZCA9IGdyaWQ7XG5cbiAgICByZXR1cm4gZ3JpZDtcbiAgfVxuXG4gIHBsYXlab25lKCkge1xuICAgIGNvbnN0IHN0YXJ0VGlsZSA9IFJhbmRvbSgxLCB0aGlzLmdyaWRDb3VudCk7XG4gICAgY29uc3Qgc3RhcnRQb3MgPSB0aGlzLmdldFBvc2l0aW9uKHN0YXJ0VGlsZSk7XG4gICAgdGhpcy5hZGRTZWN0b3IoMSwgc3RhcnRUaWxlLCBzdGFydFBvcyk7XG4gICAgdGhpcy5ncmlkW3N0YXJ0UG9zLnJvd0luZGV4XS5jb2x1bW5zW3N0YXJ0UG9zLmNvbEluZGV4XS5zdGFydCA9IHRydWU7XG4gICAgXG4gICAgY29uc29sZS5sb2codGhpcy5nZXRBZGphY2VudFNlY3RvcigzMikpO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAodGhpcy5zZWN0b3JDb3VudCAtIDEpOyBpKyspIHtcbiAgICAgIC8qIFRPRE8gIC0gIGFkZCBsb2dpYyB0byBoYW5kbGUgYWxyZWFkeSBleGlzdGluZyBzZWN0b3JzICovXG4gICAgICBjb25zdCBwcmV2aW91cyA9IHRoaXMuYWN0aXZlU2VjdG9yc1tpXTtcbiAgICAgIGNvbnN0IG5ld1NlY3RvciA9IHRoaXMuZ2V0QWRqYWNlbnRTZWN0b3IocHJldmlvdXMuc2VjdG9yTnVtYmVyKTtcbiAgICAgIHRoaXMuYWRkU2VjdG9yKChpKzIpLCBuZXdTZWN0b3Iuc2VjdG9yTnVtYmVyLCBuZXdTZWN0b3Iuc2VjdG9yUG9zKTtcbiAgICB9XG4gIH1cblxuICBhZGRTZWN0b3IoaW5kZXgsIHNlY3Rvck51bWJlciwgc2VjdG9yUG9zKSB7XG4gICAgdGhpcy5hY3RpdmVTZWN0b3JzLnB1c2goe1xuICAgICAgaW5kZXgsXG4gICAgICBzZWN0b3JOdW1iZXIsXG4gICAgICBzZWN0b3JQb3NcbiAgICB9KTtcbiAgICB0aGlzLnNlY3RvcklEcy5wdXNoKHNlY3Rvck51bWJlcik7XG4gICAgdGhpcy5ncmlkW3NlY3RvclBvcy5yb3dJbmRleF0uY29sdW1uc1tzZWN0b3JQb3MuY29sSW5kZXhdLnBsYXlhYmxlID0gdHJ1ZTtcbiAgfVxuXG4gIC8vIFJldHVybnMgY28tb3JkaW5hdGVzIG9mIGEgc2VsZWN0ZWQgdGlsZVxuICBnZXRQb3NpdGlvbihpbnQpIHtcbiAgICBjb25zdCByb3dJbmRleCA9IE1hdGguY2VpbChpbnQvdGhpcy53aWR0aCkgLSAxO1xuICAgIGxldCBjb2xJbmRleCA9IE51bWJlcjtcbiAgICB0aGlzLmdyaWRbcm93SW5kZXhdLmNvbHVtbnMuZm9yRWFjaCgoY29sLCBpbmQpID0+IHtcbiAgICAgIGlmIChjb2wubnVtYmVyID09IGludCkge1xuICAgICAgICBjb2xJbmRleCA9IGluZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgcm93SW5kZXgsXG4gICAgICBjb2xJbmRleFxuICAgIH1cbiAgfVxuXG4gIGNoZWNrRXhpc3RpbmcoaWQpIHtcbiAgICBjb25zb2xlLmxvZyhpZCk7XG4gICAgcmV0dXJuIHRoaXMuc2VjdG9ySURzLmluZGV4T2YoaWQpID4gLTE7XG4gIH1cblxuICAvLyBSYW5kb21seSBzZWxlY3RzIGFuZCByZXR1cm5zIHRoZSBjby1vcmRpbmF0ZXMgb2YgYW4gYWRqYWNlbnQgdGlsZVxuICBnZXRBZGphY2VudFNlY3RvcihpbnQpIHtcbiAgICBjb25zdCBwb3MgPSB0aGlzLmdldFBvc2l0aW9uKGludCk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgIGNvbnN0IG4gPSBpbnQgLSB0aGlzLndpZHRoO1xuICAgIGNvbnN0IHMgPSBpbnQgKyB0aGlzLndpZHRoO1xuICAgIGNvbnN0IGUgPSBpbnQgKyAxO1xuICAgIGNvbnN0IHcgPSBpbnQgLSAxO1xuICAgIGxldCByb3dJbmRleCwgY29sSW5kZXg7XG5cbiAgICBpZiAocG9zLnJvd0luZGV4ID4gMCkge1xuICAgICAgaWYgKHRoaXMuY2hlY2tFeGlzdGluZyhuKSkge1xuICAgICAgICBvcHRpb25zLnB1c2goe1xuICAgICAgICAgIHNlY3Rvck51bWJlcjogbixcbiAgICAgICAgICBzZWN0b3JQb3M6IHtcbiAgICAgICAgICAgIHJvd0luZGV4OiBwb3Mucm93SW5kZXggLSAxLFxuICAgICAgICAgICAgY29sSW5kZXg6IHBvcy5jb2xJbmRleCxcbiAgICAgICAgICB9ICAgICAgXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3Mucm93SW5kZXggPCAodGhpcy5oZWlnaHQgLSAxKSkge1xuICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgc2VjdG9yTnVtYmVyOiBzLFxuICAgICAgICBzZWN0b3JQb3M6IHtcbiAgICAgICAgICByb3dJbmRleDogcG9zLnJvd0luZGV4ICsgMSxcbiAgICAgICAgICBjb2xJbmRleDogcG9zLmNvbEluZGV4LFxuICAgICAgICB9ICAgICAgXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocG9zLmNvbEluZGV4IDwgKHRoaXMud2lkdGggLSAxKSkge1xuICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgc2VjdG9yTnVtYmVyOiBlLFxuICAgICAgICBzZWN0b3JQb3M6IHtcbiAgICAgICAgICByb3dJbmRleDogcG9zLnJvd0luZGV4LFxuICAgICAgICAgIGNvbEluZGV4OiBwb3MuY29sSW5kZXggKyAxLFxuICAgICAgICB9ICAgICAgXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocG9zLmNvbEluZGV4ID4gMCkge1xuICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgc2VjdG9yTnVtYmVyOiB3LFxuICAgICAgICBzZWN0b3JQb3M6IHtcbiAgICAgICAgICByb3dJbmRleDogcG9zLnJvd0luZGV4LFxuICAgICAgICAgIGNvbEluZGV4OiBwb3MuY29sSW5kZXggLSAxLFxuICAgICAgICB9ICAgICAgXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBjaG9pY2UgPSBvcHRpb25zW1JhbmRvbSgxLCBvcHRpb25zLmxlbmd0aCkgLSAxXTtcblxuICAgIHJldHVybiBjaG9pY2U7XG4gIH1cblxufTtcbiJdfQ==
},{}]},{},[1])