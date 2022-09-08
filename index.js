const grid = document.querySelector('.grid')
const blockWidth = 100
const blockHeight = 20
const userStart = [230, 10]
let currentPosition = userStart

const BoardWidth = 560
const BoardHeight = 300

const ballStart = [270, 40]
let ballCurrentPosition = ballStart

let timerId
const ballDiameter = 20
let xDirection = 2
let yDirection = 2
let score = 0 

const scoreDisplay = document.querySelector('#score')

// create Block
class Block {
    constructor(xAxis, yAxis) {
        this.bottomLeft = [xAxis, yAxis]
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis + blockWidth, yAxis + blockHeight]
    }
}

const blocks = [
    new Block(10, 270),
    new Block(120, 270),
    new Block(230, 270),
    new Block(340, 270),
    new Block(450, 270),

    new Block(10, 240),
    new Block(120, 240),
    new Block(230, 240),
    new Block(340, 240),
    new Block(450, 240),
  
    
] 