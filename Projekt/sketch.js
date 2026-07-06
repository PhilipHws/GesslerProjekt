let lange = 50;
const farbe = {
    red:[255, 48, 48]
}


const SHAPES = {
  I:[[0,0,0,0],[1,1,1,1],[0,0,0,0],[0,0,0,0]],
  O:[[1,1],[1,1]],
  T:[[0,1,0],[1,1,1],[0,0,0]],
  S:[[0,1,1],[1,1,0],[0,0,0]],
  Z:[[1,1,0],[0,1,1],[0,0,0]],
  J:[[1,0,0],[1,1,1],[0,0,0]],
  L:[[0,0,1],[1,1,1],[0,0,0]],
};
const TYPES = Object.keys(SHAPES);

function setup() {
  createCanvas(720, 1002);
}

function bloecke(){
    square()
}

function draw() { // Kordinatensystem
  background(220);
  fill(145, 145, 145)
  for(let x = 0; x < 10; x++){
    for(let y = 0; y < 20; y++){
        square(x*lange+1, y*lange+1, lange)
    }
  }
 
function grid(){
    
}
}