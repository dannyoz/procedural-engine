function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export class map {
  constructor(width = 25, height = 25, fillPercentage = 40, smoothing = 4, smoothCycles = 3) {
    this.width = width;
    this.height = height;
    this.fillPercentage = fillPercentage;
    this.grid = [];
    this.smoothing = smoothing;
    this.smoothCycles = smoothCycles;
  }

  generate() {
    this.createGrid();
    for (let i = 0; i < this.smoothCycles; i++) {
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
        if (neighbourWallTiles > this.smoothing)
          this.grid[y][x] = 1;
        else if (neighbourWallTiles < this.smoothing)
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

export class sectors {
  constructor(width = 5, height = 5) {
    this.width = width;
    this.height = height;
    this.grid = new grid(this.width, this.height);
  }
}

export function grid(width,height) {
  const grid = [];
    for (let y = 0; y < height; y++) {
      const columns = [];
      for (let x = 0; x < width; x++) {
          columns.push({
            postition: `${x}-${y}`, 
          });
      }
      grid.push(columns);
    }
    return grid;
};
