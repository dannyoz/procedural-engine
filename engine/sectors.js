function Random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
};

export class sectors {
  constructor(width = 5, height = 5, restrict = 1) {
    this.width = width;
    this.height = height;
    this.restrict = restrict;
    this.grid = new grid(this.width, this.height);
    this.path = [];
    this.definePath();
    this.refinePaths();
    // this.fillEmptyAreas();
  };

  definePath(x, y) {
    const startX = (x) ? x : Random(0, this.width);
    const startY = (y) ? y : Random(0, this.height);
    this.playableZone(startX, startY);

    let i = 0;
    let sect = this.availableAdjacent(this.path[i].x, this.path[i].y);
    while (sect.count > this.restrict && i < (this.width*this.height)) {
      this.playableZone(sect.choice.x, sect.choice.y);
      i ++ ;
      sect = this.availableAdjacent(this.path[i].x, this.path[i].y);
    };

    this.emptyColumns = this.findEmptyAreas().emptyColumns;
    this.emptyRows = this.findEmptyAreas().emptyRows;
  };

  playableZone(x, y) {
    this.path.push({x,y});
    this.grid[y][x].playable = true;
  };

  availableAdjacent(x, y) {
    let available = [];
    let choice = {};
    if (y > 0) {
      if (!this.grid[y - 1][x].playable) {
        available.push('n');
      }
    };
    if (y < (this.height - 1)) {
      if (!this.grid[y + 1][x].playable) {
        available.push('s');
      }
    };
    if (x < (this.width - 1)) {
      if (!this.grid[y][x + 1].playable) {
        available.push('e');
      }
    };
    if (x > 0) {
      if (!this.grid[y][x - 1].playable) {
        available.push('w');
      }
    };

    const rand = available[Random(0, available.length)];

    if (rand == 'n') {choice.x = x; choice.y = y -1};
    if (rand == 's') {choice.x = x; choice.y = y +1};
    if (rand == 'e') {choice.x = x +1; choice.y = y};
    if (rand == 'w') {choice.x = x -1; choice.y = y};

    return {
      choice,
      available,
      count : available.length
    };
  };

  fillEmptyAreas() {
    const emptyAreas = this.findEmptyAreas();
    if(emptyAreas.emptyColumns.length) {
      const randomRow = Random(0, (this.height - 1));
      emptyAreas.emptyColumns.forEach((colIndex) => {
        this.playableZone(colIndex, randomRow);
      });
    }

    if(emptyAreas.emptyRows.length) {
      const randomCol = Random(0, (this.width - 1));
      emptyAreas.emptyRows.forEach((rowIndex) => {
        this.playableZone(randomCol, rowIndex);
      });
    }
  };

  findEmptyAreas() {
    const rows = {};
    const cols = {};
    const emptyRows = [];
    const emptyColumns = [];

    this.grid.forEach((row, y) => {
      row.forEach((col, x) => {
        if(!this.grid[y][x].playable){

          if (!rows[y]) {
            rows[y] = 1;
          } else {
            rows[y] += 1;
          }

          if (rows[y] === this.width) {
            emptyRows.push(y);
          }

          if (!cols[x]) {
            cols[x] = 1;
          } else {
            cols[x] += 1;
          }

          if (cols[x] === this.height) {
            emptyColumns.push(x);
          }

        }
      });
    });

    return {
      emptyRows,
      emptyColumns,
    }
  };

  refinePaths() {
    let i = 0;
    while (this.emptyColumns.length || this.emptyRows.length && i < 3) {
      this.definePath();
      i ++;
    };
  };

}

export function grid(width, height) {
  const grid = [];
  for (let y = 0; y < height; y++) {
    const columns = [];
    for (let x = 0; x < width; x++) {
        columns.push({
          position: {x,y},
          playable: false
        });
    }
    grid.push(columns);
  }
  return grid;
};
