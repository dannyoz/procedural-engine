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
    console.log(this.findEmptyAreas());
  }

  definePath() {
    const startX = Random(0, this.width);
    const startY = Random(0, this.height);
    this.playableZone(startX, startY);

    let i = 0;
    let sect = this.availableAdjacent(this.path[i].x, this.path[i].y);
    while (sect.count > this.restrict && i < (this.width*this.height)) {
      this.playableZone(sect.choice.x, sect.choice.y);
      i ++ ;
      sect = this.availableAdjacent(this.path[i].x, this.path[i].y);
    };
  };

  playableZone(x, y) {
    this.path.push({x,y});
    this.grid[y][x].playable = true;
  };

  availableAdjacent(x, y) {
    let available = [];
    let choice = {};
    if (y > 0) {available.push('n')};
    if (y < (this.height - 1)) {available.push('s')};
    if (x < (this.width - 1)) {available.push('e')};
    if (x > 0) {available.push('w')};

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

  findEmptyAreas() {
    const emptyCells = [];
    const emptyRows = [];
    const emptyColumns = [];

    this.grid.forEach((row, y) => {
      row.forEach((col, x) => {
        if(!this.grid[y][x].playable){
          emptyCells.push({x, y});
          emptyRows.push(y);
          emptyColumns.push(x);
          emptyColumns.sort();
          console.log(emptyRows.indexOf(y));
        }
      });
    });

    return {
      emptyRows,
      emptyColumns,
    }
  };

}

export function grid(width,height) {
  const grid = [];
    for (let y = 0; y < height; y++) {
      const columns = [];
      for (let x = 0; x < width; x++) {
          columns.push({
            postition: {x,y},
            playable: false
          });
      }
      grid.push(columns);
    }
    return grid;
};
