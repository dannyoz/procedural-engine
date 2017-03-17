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
    this.playTiles();
	}

  // Genrates a grid based on width and height
  createGrid() {
    const grid = [];

    for (var i = 0; i < this.height; i++) {

      const columns = [];

      for (var j = 0; j < this.width; j++) {
        columns.push({
          name: 'column_'+j,
          number: (i+1)*(j+1)
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

  playTiles() {
    var tile = 9;
    for (var i = 0; i < this.sectorCount; i++) {
      console.log(Random(1, this.gridCount));
    }
  }

};

