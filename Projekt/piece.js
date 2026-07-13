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
        for (let i = 0; i < this.form.length; i++) {
            for (let j = 0; j < this.form[i].length; j++) {
                if (this.form[i][j] === 1) {
                    square((this.x + j) * lange + 1, (this.y + i) * lange + 1, lange);
                }
            }
        }
        if (this.ability === 1) {
            dropTimer++;
        }
        else if (this.ability === 3) {
            dropTimer -= 0.5;
        }
        this.whereDrop();
    }

    whereDrop() {
        let dropY = this.y;
        while (!theGrid.checkCollision(this.x, dropY + 1, this.form, this.ability)) {
            dropY++;
        }
        fill(this.color[0], this.color[1], this.color[2], 50);
        for (let i = 0; i < this.form.length; i++) {
            for (let j = 0; j < this.form[i].length; j++) {
                if (this.form[i][j] === 1) {
                    square((this.x + j) * lange + 1, (dropY + i) * lange + 1, lange);
                }
            }
        }
    }

    slowdrop() {
        dropTimer = 0;
        if (theGrid.checkCollision(this.x, this.y + 1, this.form, this.ability)) {
            this.lock();
        }
        else {
            this.y++;
        }
    }

    fullDrop() {
        while (!theGrid.checkCollision(this.x, this.y + 1, this.form, this.ability)) {
            this.y++;
        }
        this.lock();
    }

    move(direction) {
        if (theGrid.checkCollision(this.x + direction, this.y, this.form, this.ability)) {
        }
        else {
            this.x += direction;
        }
    }

    lock() {
        for (let i = 0; i < this.form.length; i++) {
            for (let j = 0; j < this.form[i].length; j++) {
                if (this.form[i][j] === 1) {
                    theGrid.grid[this.y + i][this.x + j] = this.ability;
                }
            }
        }
        theGrid.points();
        newPiece();
    }

    rotate() {
        let newForm = [];
        for (let i = 0; i < this.form[0].length; i++) {
            newForm[i] = [];
            for (let j = 0; j < this.form.length; j++) {
                newForm[i][j] = this.form[this.form.length - 1 - j][i];
            }
        }
        for (let k = 0; k < this.form.length; k++) {
            if (!theGrid.checkCollision(this.x - k, this.y, newForm, this.ability)) {
                this.x -= k;
                this.form = newForm;
                break;
            }
            else if (!theGrid.checkCollision(this.x + k, this.y, newForm, this.ability)) {
                this.x += k;
                this.form = newForm;
                break;
            }
        }
    }
}