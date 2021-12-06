const fs = require('fs');

const data = fs.readFileSync('./input.txt',
  { encoding: 'utf8', flag: 'r' });

const lines = data.split('\n')

const numbers = lines[0].split(',').map(num => +num)
const grids = {}

let currentGridIndex = 0
let currentGrid = []
let gridXSize = 0
let gridYSize = 0

function generateGridMap(gridArray) {
  let map = {
    win: false,
  }
  let sum = 0
  gridArray.forEach((row, xIndex) => {
    row.forEach((number, yIndex) => {
      sum+=number
      map[number] = {
        x: xIndex,
        y: yIndex,
        drawn: false,
        value: number,
      }
    })
  })
  map.sum = sum
  return map
}

for (let i = 2; i < lines.length; i++) {
  const line = lines[i]
  if (line === '') {
    if (!gridYSize) {
      gridYSize = currentGrid.length
      gridXSize = currentGrid[0].length
    }
    grids[currentGridIndex] = generateGridMap(currentGrid)
    currentGridIndex++
    currentGrid = []
  } else {
    const gridRow = line.split(' ').filter(i => i !== '').map(num => +num)
    currentGrid.push(gridRow)
  }
}

function drawNumbers(numberCount) {
  let foundWinner = false
  let sequence = numbers.slice(0, numberCount)
  let sequenceSum = sequence.reduce((a, b) => a + b)
  for(let gridKey in grids) {
    let grid = grids[gridKey]
    let cols = {}
    let rows = {}

    for (let i = 0; i < numberCount; i++) {

      let gridCell = grid[numbers[i]]
      if (!gridCell) {
        continue
      }
      const { x, y } = gridCell
      if (cols[y]) {
        cols[y]++
      } else {
        cols[y] = 1
      }
      if (rows[x]) {
        rows[x]++
      } else {
        rows[x] = 1
      }
    }

    Object.values(rows).forEach(xCount => {
      if (xCount === gridXSize) {
        foundWinner = true
      }
    })
    Object.values(cols).forEach(yCount => {
      if (yCount === gridYSize) {
        foundWinner = true
      }
    })

    if (foundWinner) {
      let boardWinCount = 0
      Object.values(grids).forEach(grid => {
        if (grid.win) {
          boardWinCount++;
        }
      })
      let isLastBoard = Object.values(grids).length - boardWinCount === 1 && !grid.win
      grids[gridKey].win = true
      let lastNumber = numbers[numberCount - 1]
      let undrawnNumbersSum = 0
      Object.keys(grid).forEach(number => {
        let n = +number
        if (isNaN(n)) {
          return
        }
        if (!sequence.includes(n)) {
          undrawnNumbersSum += n
        }
      })
      if (isLastBoard) {
        console.log(`Winner: ${sequence}`)
        console.log(lastNumber * undrawnNumbersSum, gridKey)
      }
    }
    foundWinner = false
  }
  return foundWinner
}

function part1() {
  let numberCount = 5
  let winner = false
  while (numberCount < numbers.length) {
    drawNumbers(numberCount)
    numberCount++
  }
}


part1()
