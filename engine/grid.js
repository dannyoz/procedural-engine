export default function(width,height) {
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
