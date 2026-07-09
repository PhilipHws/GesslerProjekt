class piece {

    constructor(x, color) {
        this.x = x;
        this.y = 0;
        this.color = color;
    }

    show() {
        fill(this.color);
        square(this.x * lange + 1, this.y * lange + 1, lange);
    }

    slowdrop() {
        dropTimer = 0;
        if(theGrid.checkCollision(this.x, this.y + 1)){
            this.lock();
            newPiece();
        }
        else{
            this.y++;
        }
    }

    move(direction){
        if(theGrid.checkCollision(this.x + direction, this.y)){
        }
        else{
            this.x += direction;
        }
    }

    lock() {
        theGrid.grid[this.y][this.x] = randomColorIndex;
        theGrid.points();
    }
}