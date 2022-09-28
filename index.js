const grid = document.querySelector('.grid')
const blockWidth = 100
const blockHeight = 20

// grid.fillStyle = "#ffcd05";
// grid.fill();

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

//console.log(blocks[0])

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
// 2019 hours, march 14th, 2022
// can you see why the for loop didnt display your blocks, because you set "i" equals to 10 and the items in the array is just 1 = "0"

// add user, " i would say 'player' imo"
const user = document.createElement('div')
user.classList.add('user')
// user.style.left = currentPosition[0] + 'px'
// user.style.bottom = currentPosition[1] + 'px'   since we will reuse this, we made it into a function
drawUser()
grid.appendChild(user)

// draw the user
function drawUser() {
    user.style.left = currentPosition[0] + 'px'
    user.style.bottom = currentPosition[1] + 'px'
}

// draw the ball -- March 15th, 1307 hours
function drawBall() {
    ball.style.left = ballCurrentPosition[0] + 'px'
    ball.style.bottom = ballCurrentPosition[1] + 'px'
}

// move user 
function moveUser(e) {
    switch(e.key) {
        case 'ArrowLeft':
            if (currentPosition[0] > 0 ) {
                currentPosition[0] -= 10
                drawUser()
            }
            break;
    }
    switch(e.key) {
        case 'ArrowRight':
            if (currentPosition[0] < BoardWidth - blockWidth ) {
                currentPosition[0] += 10
                drawUser()
            }
            break;
    }
}

document.addEventListener('keydown', moveUser)

// add the ball
const ball = document.createElement('div')
ball.classList.add('ball')
// ball.style.left = ballCurrentPosition[0] + 'px'
// ball.style.bottom = ballCurrentPosition[1] + 'px'
drawBall()
grid.appendChild(ball)

// move ball
function moveBall() {
    
    ballCurrentPosition[0] += xDirection // adding 2px per set time in "x-axis" left to right, Horizontal
    ballCurrentPosition[1] += yDirection // adding 2px per set time in "y-axis"  bottom to up, Vertical
    drawBall()
    checkForCollisions()
    // i wonder why it does not matter whether i put the function before modifying or after modifying
}
timerId = setInterval(moveBall, 20) // this is where all the magic happens, moving the ball by constant repetition of the function

// check for collisions
function checkForCollisions() {
    // check for block collisions
    for (let i = 0; i < blocks.length; i++) {
        if ( //                     > 
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0] ) &&
           ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1])
           // if all conditions stipulated above meet, we know the ball is still in the game area
        ) {
            const allBlocks = Array.from(document.querySelectorAll('.block'))
            console.log(allBlocks)
            allBlocks[i].classList.remove('block')
            //blocks.splice(i, 1) // splice is giving me headache
            changeDirection()
            score++
            scoreDisplay.innerHTML = score

            // check for win
            if (blocks.length === 0) {
                scoreDisplay.innerHTML = score
                clearInterval(timerId)
                document.removeEventListener('keydown', moveUser)
            }
        }

        // check for user collisions
        if ( // this is simply the space between the wall and user's space to the left and no more than the block width
            (ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth) &&
            (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
        ) { 
            console.log("one hunnit")
            changeDirection()
            console.log("yyyy")
        }
    }

    // check for wall collisions
    if (                            // 560    -         20  = 540
        ballCurrentPosition[0] >= (BoardWidth - ballDiameter ) ||  // if total added pixels is more than BoardWidth - ballDiameter in "X-axis"
        ballCurrentPosition[1] >= (BoardHeight - ballDiameter ) || // if total added pixels is more than BoardHeight - ballDiameter "Y-axis"
        ballCurrentPosition[0] <= 0 //if total added pixels of ball in "X-Axis" is less than 0
    ) { 
        changeDirection()
    }

    // ballCurrentPosition[0] is set to 270 default in the x-axis which is Horizontal
    // ballCurrentPosition[0] is set to 30.5 default in the y-axis which is Vertical 

    // check for game over
    if (ballCurrentPosition[1] <= 10) {
        clearInterval(timerId)
        scoreDisplay.textContent = 'Sorry Chunchumaru aka Anunya '
        document.removeEventListener('keydown', moveUser)
    }
}

function changeDirection() {
    if (xDirection === 2 && yDirection === 2) {
        yDirection = -2
        return
    }
    if (xDirection === 2 && yDirection === -2) { 
        xDirection = -2
        return 
    }
    if (xDirection === -2 && yDirection === -2) {
        yDirection = 2
        return
    }
    if (xDirection === -2 && yDirection === 2) {
        xDirection = 2
        return
    } // return takes you out of the function execution
    
}




