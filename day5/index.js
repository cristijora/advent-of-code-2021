const fs = require('fs');

const data = fs.readFileSync('./input.txt',
  { encoding: 'utf8', flag: 'r' });

let lines = data.split('\n').filter(l => l !== '');

let maxX = 0
let maxY = 0
lines = lines.map(line => {
  let parts = line.split(' -> ');
  const [left, right] = parts
  let leftParts = left.split(',');
  let rightParts = right.split(',');
  const lineResult = {
    x1: +leftParts[0],
    y1: +leftParts[1],
    x2: +rightParts[0],
    y2: +rightParts[1],
  }
  let localMaxX = Math.max(lineResult.x1, lineResult.x2)
  let localMaxY = Math.max(lineResult.y1, lineResult.y2)
  maxX = Math.max(localMaxX, maxX)
  maxY = Math.max(localMaxY, maxY)
  return lineResult
})

let grid = new Array(maxY + 1).fill(0).map(() => new Array(maxX + 1).fill(0))


function countNumberInGrid(number = 2) {
  let count = 0
  grid.forEach(row => {
    row.forEach(cell => {
      if (cell >= number) {
        count++
      }
    })
  })
  return count
}


function part1() {
  lines.forEach(line => {
    if (line.x1 === line.x2) {
      let from = Math.min(line.y1, line.y2)
      let to = Math.max(line.y1, line.y2)
      for (let i = from; i <= to; i++) {
        grid[i][line.x1]++
      }
    } else if (line.y1 === line.y2) {
      let from = Math.min(line.x1, line.x2)
      let to = Math.max(line.x1, line.x2)
      for (let i = from; i <= to; i++) {
        grid[line.y1][i]++
      }
    } else {
      let fromRow = Math.min(line.y1, line.y2)
      let toRow = Math.max(line.y1, line.y2)

      let fromCol = Math.min(line.x1, line.x2)
      let toCol = Math.max(line.x1, line.x2)

      for (let i = fromRow; i <= toRow; i++) {
        let col = fromCol + (i - fromRow)
        if (line.x2 > line.x1) {
          col = toCol - (i - fromRow)
        } else {
          col = fromCol + (i - fromRow)
        }
        grid[i][col]++
      }
    }
  })

  let strGrid = printGrid()
  console.log(strGrid)

  console.log(countNumberInGrid(2))
}

function printGrid() {
  let mappedGrid = grid.map(row => {
    let newRow = row.map(n => {
      if (n === 0) {
        return '.'
      } else {
        return n
      }
    })
    return newRow.join(' ')
  })
  let toPrint = mappedGrid.join('\n')
  // console.log(toPrint)
  // console.log('-----------------')
  return toPrint
}

console.log(part1())
