function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export class Level {
	constructor(width = 5, height = 5, sectorCount = 8) {
    this.width = width;
    this.height = height;
    this.gridCount = width * height;
		this.sectorCount = sectorCount;
    this.activeSectors = [];
    this.sectorIDs = [];
    this.grid = [];
	}

  // Init method 
	generate() {
    this.createGrid();
    this.playZone();
	}

  // Genrates a grid based on width and height
  createGrid() {
    const grid = [];

    for (var i = 0; i < this.height; i++) {

      const columns = [];

      for (var j = 0; j < this.width; j++) {
        columns.push({
          name: 'column_'+j,
          number: (this.width*i) + (j+1)
        })
      }

      grid.push({
        name: 'row_'+i,
        columns: columns
      });
    }

    this.grid = grid;

    return grid;
  }

  playZone() {
    const startTile = Random(1, this.gridCount);
    const startPos = this.getPosition(startTile);
    this.addSector(1, startTile, startPos);
    this.grid[startPos.rowIndex].columns[startPos.colIndex].start = true;
    
    console.log(this.getAdjacentSector(32));

    for (var i = 0; i < (this.sectorCount - 1); i++) {
      /* TODO  -  add logic to handle already existing sectors */
      const previous = this.activeSectors[i];
      const newSector = this.getAdjacentSector(previous.sectorNumber);
      this.addSector((i+2), newSector.sectorNumber, newSector.sectorPos);
    }
  }

  addSector(index, sectorNumber, sectorPos) {
    this.activeSectors.push({
      index,
      sectorNumber,
      sectorPos
    });
    this.sectorIDs.push(sectorNumber);
    this.grid[sectorPos.rowIndex].columns[sectorPos.colIndex].playable = true;
  }

  // Returns co-ordinates of a selected tile
  getPosition(int) {
    const rowIndex = Math.ceil(int/this.width) - 1;
    let colIndex = Number;
    this.grid[rowIndex].columns.forEach((col, ind) => {
      if (col.number == int) {
        colIndex = ind;
      }
    });
    return {
      rowIndex,
      colIndex
    }
  }

  checkExisting(id) {
    console.log(id);
    return this.sectorIDs.indexOf(id) > -1;
  }

  // Randomly selects and returns the co-ordinates of an adjacent tile
  getAdjacentSector(int) {
    const pos = this.getPosition(int);
    const options = [];
    const n = int - this.width;
    const s = int + this.width;
    const e = int + 1;
    const w = int - 1;
    let rowIndex, colIndex;

    if (pos.rowIndex > 0) {
      if (this.checkExisting(n)) {
        options.push({
          sectorNumber: n,
          sectorPos: {
            rowIndex: pos.rowIndex - 1,
            colIndex: pos.colIndex,
          }      
        });
      }
    }

    if (pos.rowIndex < (this.height - 1)) {
      options.push({
        sectorNumber: s,
        sectorPos: {
          rowIndex: pos.rowIndex + 1,
          colIndex: pos.colIndex,
        }      
      });
    }

    if (pos.colIndex < (this.width - 1)) {
      options.push({
        sectorNumber: e,
        sectorPos: {
          rowIndex: pos.rowIndex,
          colIndex: pos.colIndex + 1,
        }      
      });
    }

    if (pos.colIndex > 0) {
      options.push({
        sectorNumber: w,
        sectorPos: {
          rowIndex: pos.rowIndex,
          colIndex: pos.colIndex - 1,
        }      
      });
    }

    const choice = options[Random(1, options.length) - 1];

    return choice;
  }

};
