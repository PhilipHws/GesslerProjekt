let lange = 50;

function setup() {
  createCanvas(720, 1002);
}

function draw() {
  background(220);
  fill(145, 145, 145)
  for(let x = 0; x < 10; x++){
    for(let y = 0; y < 20; y++){
        square(x*lange+1, y*lange+1, lange)
    }
  }
}