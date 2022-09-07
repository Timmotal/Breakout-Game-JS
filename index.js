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

