function GameSnake() {
    this.areaRowsLengthX = 10
    this.areaColumnsLengthY = 10

    this.container = document.body
    this.gameContainer = null
    this.scoreContainer = null

    this.area = this.createEmptyArea()

    this.snakeBody = [
        { x: 3, y: 3 },
        { x: 4, y: 3 },
        { x: 5, y: 3 }
    ]
    this.foodPosition = { x: 6, y: 6 }
    
    this.score = null
    this.gameInterval = null
    
    this.init()
}

GameSnake.prototype.createEmptyArea = function () {
    return Array(this.areaRowsLengthX).fill(1).map(() => {
        return Array(this.areaColumnsLengthY).fill(1)
    })
}

GameSnake.prototype.init = function () {
    this.prepareLayout()
    this.render()
    this.attachEventListeners()

    // alert('PRESS "enter" TO START!')
}

GameSnake.prototype.prepareLayout = function () {
    function makeGameContainer() {
        gameContainer = document.createElement('div')
        gameContainer.classList.add('game')
        return gameContainer
    }
    this.gameContainer = makeGameContainer()
    this.scoreContainer = document.createElement('div')
    this.container.appendChild(this.scoreContainer)
    this.container.appendChild(this.gameContainer)
}

GameSnake.prototype.render = function () {
    this.gameContainer.innerHTML = ''

    this.area = this.createEmptyArea()
    this.placeFood()
    // this.placeSnake()

    this.area.forEach(areaRow => {
        const row = this.makeRows()

        areaRow.forEach(element => {
            const cell = this.makeCell(element)
            row.appendChild(cell)
        })

        this.gameContainer.appendChild(row)
    })
}

GameSnake.prototype.makeRows = () => {
    const row = document.createElement('div')
    row.classList.add('row')
    row.style.display = 'flex'
    return row
}

GameSnake.prototype.makeCell = (element) => {
    const gameSnakeElement = (creating) => () => {
        const element = document.createElement('div')
        element.classList.add('cell-' + creating)
        return element
    }

    const cellHeadSnake = gameSnakeElement('snake-head')
    const cellBodySnake = gameSnakeElement('snake-body')
    const cellFood = gameSnakeElement('food')
    const cellZero = gameSnakeElement('zero')

    if (element === 1) {
        return cellZero()
    } else if (element === 'H') {
        return cellHeadSnake()
    } else if (element === 0) {
        return cellBodySnake()
    } else if (element === 'F') {
        return cellFood()
    }

}

GameSnake.prototype.attachEventListeners = function () {
    this.container.addEventListener(
        'keydown',
        event => {
            event.preventDefault()

            switch (event.key) {
                case 'ArrowLeft':
                    this.checkIfMoveIsAvailable(0, -1)
                    break
                case 'ArrowUp':
                    this.checkIfMoveIsAvailable(-1, 0)
                    break
                case 'ArrowRight':
                    this.checkIfMoveIsAvailable(1, 0)
                    break
                case 'ArrowDown':
                    this.checkIfMoveIsAvailable(0, 1)
                    break
            }
        }
    )

    this.render()
}

GameSnake.prototype.endGame = function () {
    window.location = ''
    alert('GAME OVER\n' + 'You completed the game with: ')
}

const game1 = new GameSnake()

