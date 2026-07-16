class gameGrid {

  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.grid = this.createGrid();
  }

  createGrid() { //erstellt das Grid entsprechend der Übergebenen variblen im constructer und füllt sie mit nullen die eine leere zelle symboliseren
    let grid = [];
    for (let y = 0; y < this.rows; y++) {
      grid[y] = [];
      for (let x = 0; x < this.cols; x++) {
        grid[y][x] = 0;
      }
    }
    return grid;
  }


  drawGrid() {   //zeichnet das Grid anhand der in ihm stehenden Werte und des Arrays der RGB werte
    for (let y = 0; y < this.rows; y++) {
      for (let x = 0; x < this.cols; x++) {
        fill(farbenArray[this.grid[y][x]]);
        square(x * lange + 1, y * lange + 1, lange);
      }
    }
  }

  checkCollision(x, y, form, ability) {  //guckt für jeden teil des übergeben blocks ob er mit dem rand boden oder einem anderen block kollidiert und gibt true or falls zurück
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
              return true; // Collision with existing piece
            }
          }
        }
      }
    }
    return false; // No collision
  }

  points(points) {  // checkt alle reihen ob sie voll sind und speichert welche voll sind in ein array das an deleteRows weitergeben wird, dann berechnet es den Score anhand wie viele linien gleichzeitig gecleared wurden,
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
      line.play();
      this.deleteRows(clearRows);
      score += floor(punkte[clearRows.length - 1] / verzoegerung);//score += floor(punkte[clearRows.length - 1] / verzoegerung * (48 / startInterval));
      linien += clearRows.length;
      //if (dropInterval >= 10) {
      verzoegerung = (0.9 ** ((linien - 1) * 3)) ** (1 / 4); //verzoegerung = 1.0 - (floor(linien / 3) * 0.1);
      //}
      //else {
      //startInterval = 48 - (floor(linien / 2) * 0.6);
      //}
    }
  }

  deleteRows(rows) {  //Löscht Die reihen die Übergeben wurden und fügt neue mit 0 gefüllte reihen an den anfang des grids ein 
    for (let i = 0; i < rows.length; i++) {
      let rowIndex = rows[i];
      this.grid.splice(rowIndex, 1); // Remove the filled row
      this.grid.unshift(new Array(this.cols).fill(0)); // Add a new empty row at the top
    }
  }


}
