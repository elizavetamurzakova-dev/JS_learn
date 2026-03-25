class Ship{
    constructor(name, len, vertical){
        this._name = name;
        this._len = len;
        this._hits = new Array(len).fill(false);
        this._vertical = vertical;
        this._startvertical = {x: 0, y:0};
    }

    get name() {
        return this._name;
    }

    get len() {
        return this._len;
    }

    get hits() {
        return this._hits;
    }

    get vertical() {
        return this._vertical;
    }

    get startvertical() {
        return this._startvertical;
    }

    get position_x() {
        return this._startvertical.x;
    }

    get position_y() {
        return this._startvertical.y;
    }



    set name(value) {
        this._name=value;
    }

    set len(value) {
        this._len=value;
    }

    set hits(value) {
        this._hits=value;
    }

    set vertical(value) {
        this._vertical=value;
    }

    set startvertical(value) {
        this._startvertical=value;
    }

    set position_x(value) {
        this._startvertical.x=value;
    }

    set position_y(value) {
        this._startvertical.y=value;
    }

    hit(index){
        if(index < this._len){
            this._hits[index] = true
        }
        else{
            console.log("Мимо");
        }
    }

    isSunk() {
        if(!this._hits.includes(false)) return true
        else return false
    }
}

class Board {
    constructor(size){
        this._size = size;
        this._grid = Array.from({length: size}, () => new Array(size).fill(null));
        this._ships = [];
    }

    get size(){
        return this._size;
    }

    get grid(){
        return this._grid;
    }

    get ships(){
        return this._ships;
    }


    set size(value){
        this._size = value;
    }

    set grid(value){
        this._grid = value;
    }

    set ships(value){
        this._ships = value;
    }

    placeShip(ship, x, y) {
        if (ship.vertical == 0 && (x + ship.len) <= this._size) {
            for (let i = 0; i < ship.len; i++) {
                if (this._grid[y][x + i] !== null) return console.log("Мест нет");  
            }
            for (let i = 0; i < ship.len; i++) {
                this._grid[y][x + i] = ship;  
            }
            this._ships.push(ship);
            ship.position_x = x;
            ship.position_y = y;  
        } else if (ship.vertical == 1 && (y + ship.len) <= this._size) {
            for (let i = 0; i < ship.len; i++) {
                if (this._grid[y + i][x] !== null) return console.log("Мест нет");  
            }
            for (let i = 0; i < ship.len; i++) {
                this._grid[y + i][x] = ship;
            }
            this._ships.push(ship);
            ship.position_x = x; 
            ship.position_y = y;
        } else {
            console.log("Корабль не помещается");
        }
    }

    findAvailableCells() {
        const availableCells = [];

        for (let y = 0; y < this.size; y++) {
            for (let x = 0; x < this.size; x++) {
                if (this._grid[y][x] === null) {
                    availableCells.push({ x, y });
                }
            }
        }
        return availableCells;
    }

    receiveAttack(x, y) {
        const ship = this._grid[y][x];

        if (ship !== null) {
            if (ship.vertical === 0) {
                let index = x - ship.position_x;
                ship.hit(index);
            } else if (ship.vertical === 1) {
                let index = y - ship.position_y;
                ship.hit(index);
            }
            return true;
        }
        return false;
    }

    display() {
        for (let y = 0; y < this._size; y++) {
            let row = '';
            for (let x = 0; x < this._size; x++) { 
                if (this._grid[y][x] === null) {
                    row += 'O';
                } else {
                    const ship = this._grid[y][x];
                    let isHit = false;
                
                    if (ship.vertical === 0) {
                        let index = x - ship.position_x;
                        if (ship.hits[index] === true) {
                            isHit = true;
                        }
                    } else if (ship.vertical === 1) {
                        let index = y - ship.position_y;
                        if (ship.hits[index] === true) {
                            isHit = true;
                        }
                    }
                    
                    row += isHit ? 'X' : 'S';
                }
            }
            console.log(row);
        }
    }
}

let boardSize = prompt('Введите размер поля:');
let shipTest = new Ship('ShipTest', 3, 1);
let board = new Board(parseInt(boardSize));
board.placeShip(shipTest, 0, 0);
console.log(board.size, board.receiveAttack(0, 1));