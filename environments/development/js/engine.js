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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9kYW5pZWwub3Nib3JuZS9yZXBvcy9wcm9jZWR1cmFsLWVuZ2luZS9hcHAvZmFrZV9lM2Q1MzAwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSxTQUFTLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO0FBQ3hCLEtBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLEtBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLFNBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQSxBQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7Q0FDdEQsQ0FBQzs7SUFFVyxNQUFNO0FBQ04sV0FEQSxNQUFNLEdBQ1k7UUFBakIsV0FBVyx5REFBRyxDQUFDOzswQkFEaEIsTUFBTTs7QUFFZixRQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztBQUMvQixRQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztBQUNsQixRQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQztBQUNwQixRQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztHQUNoQjs7ZUFOVSxNQUFNOztXQVFULG9CQUFHO0FBQ1QsVUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7QUFDekIsVUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFDO0FBQ2xCLFVBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUN2Qjs7Ozs7V0FHZ0IsNkJBQUc7QUFDbEIsVUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDekMsVUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDeEMsVUFBTSxVQUFVLEdBQUcsVUFBVSxHQUFHLFVB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UTtBQUN0QixzQkFBUSxFQUFFLEdBQUcsQ0FBQyxRQUFRLEdBQUcsQ0FBQzthQUMzQjtXQUNGLENBQUMsQ0FBQztTQUNKO09BQ0Y7O0FBRUQsVUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLENBQUMsRUFBRTtBQUN2QixlQUFPLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3JCLFlBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztPQUNqQjs7QUFFRCxhQUFPLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUMvQzs7O1NBbEtVLE1BQU07Ozs7QUFvS2xCLENBQUMiLCJmaWxlIjoiL1VzZXJzL2RhbmllbC5vc2Jvcm5lL3JlcG9zL3Byb2NlZHVyYWwtZW5naW5lL2FwcC9mYWtlX2UzZDUzMDAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBSYW5kb20obWluLCBtYXgpIHtcbiAgbWluID0gTWF0aC5jZWlsKG1pbik7XG4gIG1heCA9IE1hdGguZmxvb3IobWF4KTtcbiAgcmV0dXJuIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChtYXggLSBtaW4pKSArIG1pbjtcbn07XG5cbmV4cG9ydCBjbGFzcyBMZXZlbDIge1xuICBjb25zdHJ1Y3RvcihzZWN0b3JDb3VudCA9IDkpIHtcbiAgICB0aGlzLnNlY3RvckNvdW50ID0gc2VjdG9yQ291bnQ7XG4gICAgdGhpcy5zZWN0b3JzID0gW107XG4gICAgdGhpcy5zZWN0b3JJRHMgPSBbXTtcbiAgICB0aGlzLmdyaWQgPSBbXTtcbiAgfVxuXG4gIGdlbmVyYXRlKCkge1xuICAgIHRoaXMuY2FsY3VsYXRlR3JpZFNpemUoKTtcbiAgICB0aGlzLmNyZWF0ZUdyaWQoKTtcbiAgICB0aGlzLmNyZWF0ZVBsYXlab25lKCk7XG4gIH1cblxuICAvLyBDYWxjdWxhdGVzIHRoZSBpZGVhbCBtYXAgc2l6ZSBiYXNlZCBvbiBzZWN0b3IgY291bnRcbiAgY2FsY3VsYXRlR3JpZFNpemUoKSB7XG4gICAgY29uc3Qgc3FydCA9IE1hdGguc3FydCh0aGlzLnNlY3RvckNvdW50KTtcbiAgICBjb25zdCBpZGVhbFdpZHRoID0gTWF0aC5mbG9vcihzcXJ0KSArIDI7XG4gICAgY29uc3QgaWRlYWxDb3VudCA9IGlkZWFsV2lkdGggKiBpZGVhbFdpZHRoO1xuICAgIGNvbnN0IHdpZHRoID0gUmFuZG9tKDIsIChpZGVhbENvdW50IC8gMikgLSAyKTtcbiAgICBjb25zdCBoZWlnaHQgPSBNYXRoLnJvdW5kKGlkZWFsQ291bnQgLyB3aWR0aCk7XG4gICAgY29uc3QgY291bnQgPSBoZWlnaHQgKiB3aWR0aDtcblxuICAgIHRoaXMuaWRlYWwgPSBpZGVhbENvdW50O1xuICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICB0aGlzLmhlaWdodCA9IGhlaWdodDtcbiAgICB0aGlzLnRvdGFsQ291bnQgPSBjb3VudDtcbiAgfVxuXG4gIC8vIEdlbnJhdGVzIGEgZ3JpZCBiYXNlZCBvbiB3aWR0aCBhbmQgaGVpZ2h0XG4gIGNyZWF0ZUdyaWQoKSB7XG4gICAgY29uc3QgZ3JpZCA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmhlaWdodDsgaSsrKSB7XG5cbiAgICAgIGNvbnN0IGNvbHVtbnMgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCB0aGlzLndpZHRoOyBqKyspIHtcbiAgICAgICAgY29sdW1ucy5wdXNoKHtcbiAgICAgICAgICBuYW1lOiAnY29sdW1uXycraixcbiAgICAgICAgICBudW1iZXI6ICh0aGlzLndpZHRoKmkpICsgKGorMSlcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgZ3JpZC5wdXNoKHtcbiAgICAgICAgbmFtZTogJ3Jvd18nK2ksXG4gICAgICAgIGNvbHVtbnM6IGNvbHVtbnNcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuZ3JpZCA9IGdyaWQ7XG4gIH1cblxuICBjcmVhdGVQbGF5Wm9uZSgpIHtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuc2VjdG9yQ291bnQ7IGkrKykge1xuXG4gICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0VGlsZSA9IFJhbmRvbSgxLCB0aGlzLnRvdGFsQ291bnQpO1xuICAgICAgICBjb25zdCBzdGFydFBvcyA9IHRoaXMuZ2V0UG9zaXRpb24oc3RhcnRUaWxlKTtcbiAgICAgICAgdGhpcy5hZGRTZWN0b3IoMSwgc3RhcnRUaWxlLCBzdGFydFBvcyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwcmV2aW91cyA9IHRoaXMuc2VjdG9yc1soaS0xKV07XG4gICAgICAgIGNvbnN0IG5ld1NlY3RvciA9IHRoaXMuZ2V0QWRqYWNlbnRTZWN0b3IocHJldmlvdXMuc2VjdG9yTnVtYmVyKTtcbiAgICAgICAgdGhpcy5hZGRTZWN0b3IoKGkrMSksIG5ld1NlY3Rvci5zZWN0b3JOdW1iZXIsIG5ld1NlY3Rvci5zZWN0b3JQb3MpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIFJldHVybnMgY28tb3JkaW5hdGVzIG9mIGEgc2VsZWN0ZWQgdGlsZVxuICBnZXRQb3NpdGlvbihpbnQpIHtcbiAgICBjb25zdCByb3dJbmRleCA9IE1hdGguY2VpbChpbnQvdGhpcy53aWR0aCkgLSAxO1xuICAgIGxldCBjb2xJbmRleCA9IE51bWJlcjtcbiAgICB0aGlzLmdyaWRbcm93SW5kZXhdLmNvbHVtbnMuZm9yRWFjaCgoY29sLCBpbmQpID0+IHtcbiAgICAgIGlmIChjb2wubnVtYmVyID09IGludCkge1xuICAgICAgICBjb2xJbmRleCA9IGluZDtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4ge1xuICAgICAgcm93SW5kZXgsXG4gICAgICBjb2xJbmRleFxuICAgIH1cbiAgfVxuXG4gIC8vIEFkZCBzZWN0b3IgdG8gdGhlIGxpc3RcbiAgYWRkU2VjdG9yKGluZGV4LCBzZWN0b3JOdW1iZXIsIHNlY3RvclBvcykge1xuICAgIHRoaXMuc2VjdG9ycy5wdXNoKHtcbiAgICAgIGluZGV4LFxuICAgICAgc2VjdG9yTnVtYmVyLFxuICAgICAgc2VjdG9yUG9zXG4gICAgfSk7XG4gICAgdGhpcy5zZWN0b3JJRHMucHVzaChzZWN0b3JOdW1iZXIpO1xuICAgIHRoaXMuZ3JpZFtzZWN0b3JQb3Mucm93SW5kZXhdLmNvbHVtbnNbc2VjdG9yUG9zLmNvbEluZGV4XS5wbGF5YWJsZSA9IHRydWU7XG4gIH1cblxuICBjaGVja0V4aXN0aW5nKGlkKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VjdG9ySURzLmluZGV4T2YoaWQpID4gLTE7XG4gIH1cblxuICAvLyBSYW5kb21seSBzZWxlY3RzIGFuZCByZXR1cm5zIHRoZSBjby1vcmRpbmF0ZXMgb2YgYW4gYWRqYWNlbnQgdGlsZVxuICBnZXRBZGphY2VudFNlY3RvcihpbnQpIHtcbiAgICBjb25zdCBwb3MgPSB0aGlzLmdldFBvc2l0aW9uKGludCk7XG4gICAgY29uc3Qgb3B0aW9ucyA9IFtdO1xuICAgIGNvbnN0IG4gPSBpbnQgLSB0aGlzLndpZHRoO1xuICAgIGNvbnN0IHMgPSBpbnQgKyB0aGlzLndpZHRoO1xuICAgIGNvbnN0IGUgPSBpbnQgKyAxO1xuICAgIGNvbnN0IHcgPSBpbnQgLSAxO1xuICAgIGxldCByb3dJbmRleCwgY29sSW5kZXg7XG5cbiAgICBpZiAocG9zLnJvd0luZGV4ID4gMCkge1xuICAgICAgaWYgKCF0aGlzLmNoZWNrRXhpc3RpbmcobikpIHtcbiAgICAgICAgb3B0aW9ucy5wdXNoKHtcbiAgICAgICAgICBzZWN0b3JOdW1iZXI6IG4sXG4gICAgICAgICAgc2VjdG9yUG9zOiB7XG4gICAgICAgICAgICByb3dJbmRleDogcG9zLnJvd0luZGV4IC0gMSxcbiAgICAgICAgICAgIGNvbEluZGV4OiBwb3MuY29sSW5kZXgsXG4gICAgICAgICAgfSAgICAgIFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zLnJvd0luZGV4IDwgKHRoaXMuaGVpZ2h0IC0gMSkpIHtcbiAgICAgIGlmICghdGhpcy5jaGVja0V4aXN0aW5nKHMpKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgc2VjdG9yTnVtYmVyOiBzLFxuICAgICAgICAgIHNlY3RvclBvczoge1xuICAgICAgICAgICAgcm93SW5kZXg6IHBvcy5yb3dJbmRleCArIDEsXG4gICAgICAgICAgICBjb2xJbmRleDogcG9zLmNvbEluZGV4LFxuICAgICAgICAgIH0gICAgICBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvcy5jb2xJbmRleCA8ICh0aGlzLndpZHRoIC0gMSkpIHtcbiAgICAgIGlmICghdGhpcy5jaGVja0V4aXN0aW5nKGUpKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgc2VjdG9yTnVtYmVyOiBlLFxuICAgICAgICAgIHNlY3RvclBvczoge1xuICAgICAgICAgICAgcm93SW5kZXg6IHBvcy5yb3dJbmRleCxcbiAgICAgICAgICAgIGNvbEluZGV4OiBwb3MuY29sSW5kZXggKyAxLFxuICAgICAgICAgIH0gICAgICBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHBvcy5jb2xJbmRleCA+IDApIHtcbiAgICAgIGlmICghdGhpcy5jaGVja0V4aXN0aW5nKHcpKSB7XG4gICAgICAgIG9wdGlvbnMucHVzaCh7XG4gICAgICAgICAgc2VjdG9yTnVtYmVyOiB3LFxuICAgICAgICAgIHNlY3RvclBvczoge1xuICAgICAgICAgICAgcm93SW5kZXg6IHBvcy5yb3dJbmRleCxcbiAgICAgICAgICAgIGNvbEluZGV4OiBwb3MuY29sSW5kZXggLSAxLFxuICAgICAgICAgIH0gICAgICBcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9wdGlvbnMubGVuZ3RoID09IDApIHtcbiAgICAgIGNvbnNvbGUubG9nKCdwTk9JQycpO1xuICAgICAgdGhpcy5nZW5lcmF0ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zW1JhbmRvbSgxLCBvcHRpb25zLmxlbmd0aCkgLSAxXTtcbiAgfVxuXG59O1xuIl19
},{}]},{},[1])