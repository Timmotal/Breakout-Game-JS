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

// all my blocks // these are mere spacings
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
    
    new Block(10, 210),
    new Block(120, 210),
    new Block(230, 210),
    new Block(340, 210),
    new Block(450, 210)
    
] 

// Draw All My Blocks
function addBlocks() {
    for (let i = 0; i < blocks.length; i++) {
        const block = document.createElement('div')
        block.classList.add('block')
        // block.style.left = '100px'
        block.style.left = blocks[i].bottomLeft[0] + 'px'
        block.style.bottom = blocks[i].bottomLeft[1] + 'px'
        //block.style.bottom = '50px'
        grid.appendChild(block)
    }
}

addBlocks() 

const user = document.createElement('div')
user.classList.add('user')
// user.style.left = currentPosition[0] + 'px'
// user.style.bottom = currentPosition[1] + 'px'   since we will reuse this, we made it into a function
drawUser()
