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
    this.setStart(47);
    // for (var i = 0; i < this.sectorCount; i++) {
    //   console.log(Random(1, this.gridCount));
    // }
  }

  setStart(int) {
    const rowIndex = Math.ceil(int/this.width) - 1;
    let colIndex = Number;
    this.grid[rowIndex].columns.forEach((col, ind) => {
      if (col.number == int) {
        colIndex = ind;
      }
    });
    this.grid[rowIndex].columns[colIndex].start = true;
  }  

};
