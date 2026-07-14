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
        fill(farbenArray[this.grid[y][x]][0], farbenArray[this.grid[y][x]][1], farbenArray[this.grid[y][x]][2]);
        square(x * lange + 1, y * lange + 1, lange);
      }
    }
  }

  checkCollision(x, y, form, ability) {
    for (let i = 0; i < form.length; i++) {
      for (let j = 0; j < form[i].length; j++) {
        if (form[i][j] === 1) {
          let newX = x + j;
          let newY = y + i;
          if (newX < 0 || newX >= this.cols || newY >= this.rows) {
            return true; // Out of bounds
          }
          if (this.grid[newY][newX] !== 0) {
            if (ability !== 4) {
              if (newY <= 1) {
                gameOver = 2;
              }
              return true; // Collision with existing piece
            }
          }
        }
      }
    }
    return false; // No collision
  }

  points(points) {
    let clearRows = []
    for (let y = 0; y < this.rows; y++) {
      let test = 0;
      for (let x = 0; x < this.cols; x++) {
        if (this.grid[y][x] !== 0) {
          test++;
        }
      }
      if (test === this.cols) {
        clearRows.push(y);
      }
    }
    if (clearRows.length > 0) {
      this.deleteRows(clearRows);
      score += floor(punkte[clearRows.length-1] / verzoegerung);
      linien += clearRows.length;
      verzoegerung = 1.0 - (floor(linien / 3) * 0.1);
      console.log(dropInterval);
    }
  }

  deleteRows(rows) {
    for (let i = 0; i < rows.length; i++) {
      let rowIndex = rows[i];
      this.grid.splice(rowIndex, 1); // Remove the filled row
      this.grid.unshift(new Array(this.cols).fill(0)); // Add a new empty row at the top
    }
  }


}
