class piece {

    constructor(x, ability, form) {
        this.x = x;
        this.y = 0;
        this.ability = ability;
        this.color = farbenArray[ability];
        this.form = form;
    }

    show() {
        fill(this.color);
        for(let i = 0; i < this.form.length; i++){
            for(let j = 0; j < this.form[i].length; j++){
                if(this.form[i][j] === 1){
                    square((this.x + j) * lange + 1, (this.y + i) * lange + 1, lange);
                }
            }
        }
    }

    slowdrop() {
        dropTimer = 0;
        if(theGrid.checkCollision(this.x, this.y + 1, this.form)){
            this.lock();
        }
        else{
            this.y++;
        }
    }

    fullDrop() {
        while (!theGrid.checkCollision(this.x, this.y + 1)) {
            this.y++;
        }
        this.lock();
    }

    move(direction){
        if(theGrid.checkCollision(this.x + direction, this.y, this.form)){
        }
        else{
            this.x += direction;
        }
    }

    lock() {
        for(let i = 0; i < this.form.length; i++){
            for(let j = 0; j < this.form[i].length; j++){
                if(this.form[i][j] === 1){
                    theGrid.grid[this.y + i][this.x + j] = this.ability;
                }
            }
        } 
        theGrid.points();
        newPiece();
    }

    rotate(richtung) {
        let newForm = [];
        if(richtung === 1){
            for(let i = 0; i < this.form[0].length; i++){
                newForm[i] = [];
                for(let j = 0; j < this.form.length; j++){
                    newForm[i][j] = this.form[this.form.length - 1 - j][i];
                    }
            }
        }   
        else{
            for(let i = 0; i < this.form[0].length; i++){
                newForm[i] = [];
                for(let j = 0; j < this.form.length; j++){
                    newForm[i][j] = this.form[j][this.form[0].length - 1 - i];
                }
            }
        }
        this.form = newForm;
    }
}