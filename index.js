const print = (s) => {
  let frame = document.getElementById("screen")
  if (frame) {
    frame.innerHTML += "\n" + s
  }
}

const clear = () => {
    let frame = document.getElementById("screen")
    if (frame) {
        frame.innerHTML = ""
    }
}

let snake = [{x : 10 , y : 10}]
let food = {x : 5 , y : 5}
let direction = 'up'
let nextDirection = 'up'
let score = 0
let gameOver = false

document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' && direction !== 'down') {
        nextDirection = 'up'
    }
    if (e.key === 'ArrowDown' && direction !== 'up') {
        nextDirection = 'down'
    }
    if (e.key === 'ArrowRight' && direction !== 'left') {
        nextDirection = 'right'
    }
    if (e.key === 'ArrowLeft' && direction !== 'right') {
        nextDirection = 'left'
    }
})

const mainLoop = () => {
  try {
    direction = nextDirection

    const head = {x: snake[0].x, y: snake[0].y}
    if (direction === 'up') {
        head.y--
    }
    if (direction === 'down') {
        head.y++
    }
    if (direction === 'left') {
        head.x--
    }
    if (direction === 'right') {
        head.x++
    }

    if (head.x <= 0 || head.x >= 40 || head.y <= 0 || head.y >= 18) {
        gameOver = true
    }

    for (let i = 0; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            gameOver = true
            break
        }
    }

    if(!gameOver) {
        snake.unshift(head)
        if (head.x === food.x && head.y === food.y) {
            score += 1;
            let validPosition = false
            while (!validPosition) {
                food = { 
                    y: Math.floor(Math.random() * 17) + 1,
                    x: Math.floor(Math.random() * 39) + 1
                }
                validPosition = true
                for (let i = 0; i < snake.length; i++) {
                    if (snake[i].x === food.x && snake[i].y === food.y) {
                        validPosition = false
                        break
                    }
                }
            }
        } else {
            snake.pop()
        }
    }
                    
    clear()
    print(" _________              __           ")
    print(" /   _____/ ____ _____  |  | __ ____  ")
    print(" \\_____  \\ /    \\\\__  \\ |  |/ // __ \\ ")
    print(" /        \\   |  \\/ __ \\|    <\\  ___/ ")
    print("/_______  /___|  (____  /__|_ \\\\___  >")
    print("        \\/     \\/     \\/     \\/    \\/ ")
    print("Score: " + score)
    print('-'.repeat(40))
    for (let y = 1; y <= 17; y++) {
      let line = "|"
      for (let x = 1; x <= 38; x++) {
        let char = ' '
        for (let i = 0; i < snake.length; i++) {
          if (snake[i].x === x && snake[i].y === y) {
            char = i === 0 ? '@' : 'O'
            break
          }
        }
        if (food.x === x && food.y === y) char = '*'
        line += char
      }
      line += "|"
      print(line)
    }
    print("-".repeat(40))

    if (gameOver) {
        print("GAME OVER!")
        return
    }

  } finally {
    setTimeout(mainLoop, 150)
  }
}

mainLoop()
