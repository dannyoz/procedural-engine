function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
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