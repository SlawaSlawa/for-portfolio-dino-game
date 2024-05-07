'use strict'

const dinoEl = document.getElementById('dino')
const cactusEl = document.getElementById('cactus')
const scoreEl = document.getElementById('score')
const overlayInfoEl = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

let intervalId = 0
let score = 0

const checkEndGame = () => {
    const cactusPositionLeft = cactusEl.getBoundingClientRect().left
    const cactusHeight = cactusEl.getBoundingClientRect().top

    const dinoPositionLeft = dinoEl.getBoundingClientRect().left
    const dinoPositionHeight = dinoEl.getBoundingClientRect().top + dinoEl.getBoundingClientRect().height

    getScore()

    if ( cactusPositionLeft < dinoPositionLeft  && dinoPositionHeight > cactusHeight) {
        renderScore()
        score = 0
    }
}

const jumpDino = (evt) => {
    if (evt.code === 'Space' && !dinoEl.classList.contains('dino--active')) {
        dinoEl.classList.add('dino--active')

        const timer = setTimeout(() => {
            dinoEl.classList.remove('dino--active')
            clearTimeout(timer)
        }, 990)
    }
}

const renderScore = () => {
    const scoreEl = document.getElementById('resultNum')
    scoreEl.textContent = score
    overlayInfoEl.classList.add('overlay--active')
    cactusEl.classList.remove('cactus--active')
    clearInterval(intervalId)
}

const getScore = () => {
    score++
    scoreEl.textContent = score
}

const restart = () => {
    overlayInfoEl.classList.remove('overlay--active')
    cactusEl.classList.add ('cactus--active')
    score = 0
    start()
}

const start = () => {
    intervalId = setInterval(() => {
        checkEndGame()
    }, 10)
}

window.addEventListener('keydown', (evt) => {
    evt.preventDefault()
    jumpDino(evt)
})  

restartBtn.addEventListener('click', (evt) => {
    evt.preventDefault()
    restart()
})

start()