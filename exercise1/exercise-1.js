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

let shipName = prompt("Введите имя корабля:")
let length = +prompt("Введите длину корабля:")
let position = +prompt("Введите расположение (0 - горизонтальное,  1 - вертикальное):")
let shipTest = new Ship(shipName, length, position)

shipTest.hit(0)
shipTest.hit(1)
console.log(shipTest.name, shipTest.len, shipTest.vertical, shipTest.isSunk());