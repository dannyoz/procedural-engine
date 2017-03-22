function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export class Level2 {
  constructor(sectorCount = 9) {
    this.sectorCount = sectorCount;
    this.sectors = [];
    this.sectorIDs = [];
    this.grid = [];
  }

  generate() {
    this.calculateGridSize();
    this.createGrid();
    this.createPlayZone();
  }

  // Calculates the ideal map size based on sector count
  calculateGridSize() {
    const sqrt = Math.sqrt(this.sectorCount);
    const idealWidth = Math.floor(sqrt) + 2;
    const idealCount = idealWidth * idealWidth;
    const width = Random(2, (idealCount / 2) - 2);
    const height = Math.round(idealCount / width);
    const count = height * width;

    this.ideal = idealCount;
    this.width = width;
    this.height = height;
    this.totalCount = count;
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
  }

  createPlayZone() {
    for (var i = 0; i < this.sectorCount; i++) {

      if (i == 0) {
        const startTile = Random(1, this.totalCount);
        const startPos = this.getPosition(startTile);
        this.addSector(1, startTile, startPos);
      } else {
        const previous = this.sectors[(i-1)];
        const newSector = this.getAdjacentSector(previous.sectorNumber);
        this.addSector((i+1), newSector.sectorNumber, newSector.sectorPos);
      }
    }
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

  // Add sector to the list
  addSector(index, sectorNumber, sectorPos) {
    this.sectors.push({
      index,
      sectorNumber,
      sectorPos
    });
    this.sectorIDs.push(sectorNumber);
    this.grid[sectorPos.rowIndex].columns[sectorPos.colIndex].playable = true;
  }

  checkExisting(id) {
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
      if (!this.checkExisting(n)) {
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
      if (!this.checkExisting(s)) {
        options.push({
          sectorNumber: s,
          sectorPos: {
            rowIndex: pos.rowIndex + 1,
            colIndex: pos.colIndex,
          }      
        });
      }
    }

    if (pos.colIndex < (this.width - 1)) {
      if (!this.checkExisting(e)) {
        options.push({
          sectorNumber: e,
          sectorPos: {
            rowIndex: pos.rowIndex,
            colIndex: pos.colIndex + 1,
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
            colIndex: pos.colIndex - 1,
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

};

export class map {
  constructor(width = 25, height = 25, fillPercentage = 40, smoothing = 2) {
    this.width = width;
    this.height = height;
    this.fillPercentage = fillPercentage;
    this.grid = [];
    this.smoothing = smoothing;
  }

  generate() {
    this.createGrid();
    for (let i = 0; i < this.smoothing; i++) {
      this.smoothMap();
    }
  }

  pseudoRandomSeed() {
    return (Random(1,100) < this.fillPercentage) ? 1: 0;
  }

  createGrid() {
    const grid = [];
    for (let y = 0; y < this.height; y++) {
      const columns = [];
      for (let x = 0; x < this.width; x++) {
        if (x == 0 || x == this.width-1 || y == 0 || y == this.height -1) {
          columns.push(1);
        } else {
          columns.push(this.pseudoRandomSeed());
        }
      }
      grid.push(columns);
    }
    this.grid = grid;
  }

  smoothMap() {
     for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const neighbourWallTiles = this.getSurroundingWallCount(x,y);
        if (neighbourWallTiles > 4)
          this.grid[y][x] = 1;
        else if (neighbourWallTiles < 4)
          this.grid[y][x] = 0;
      }
    }
  }

  getSurroundingWallCount(x,y) {
    let wallCount = 0;
    for (let neighbourY = y - 1; neighbourY <= y + 1; neighbourY ++) {
      for (let neighbourX = x - 1; neighbourX <= x + 1; neighbourX ++) {
        if (neighbourX >= 0 && neighbourX < this.width && neighbourY >= 0 && neighbourY < this.height) {
          if (neighbourX != x || neighbourY != y) {
            wallCount += this.grid[neighbourY][neighbourX];
          }
        }
        else {
          wallCount ++;
        }
      }
    }
    return wallCount;
  }
}