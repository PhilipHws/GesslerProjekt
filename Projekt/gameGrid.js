class gameGrid {

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = this.createGrid();
  }

    createGrid() {
      let grid = [];
      for (let y = 0; y < this.rows; y++) {
        grid[y] = [];
        for (let x = 0; x < this.cols; x++) {
          grid[y][x] = 0; // 0 represents an empty cell
        }
      }
      return grid;
    }


    drawGrid() {
      for (let y = 0; y < this.rows; y++) {
        for (let x = 0; x < this.cols; x++) {
            fill(farbenArray[this.grid[y][x]]);
            square(x * lange + 1, y * lange + 1, lange);
        }
      }
    }

    checkCollision(x, y) {
      if (x < 0 || x >= this.cols || y >= this.rows) {
        return false; // Out of bounds
      }
      if (this.grid[y][x] !== 0) {
        return false; // Collision with existing piece
      }
      return true; // No collision
    }
}