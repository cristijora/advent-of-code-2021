const fs = require('fs');
const { uniqBy } = require("lodash");

const data = fs.readFileSync('./input.txt',
  { encoding: 'utf8', flag: 'r' });

let lines = data.split('\n').filter(l => l !== '');

const grid = lines.map(line => {
  return line.split('').map(n => +n)
})

function part1() {
  const lowPoints = []
  grid.forEach((line, i) => {
    line.forEach((n, j) => {
      let top = Number.MAX_SAFE_INTEGER
      let down = Number.MAX_SAFE_INTEGER
      if (grid[i - 1]) {
        top = grid[i - 1][j]
      }
      if (grid[i + 1]) {
        down = grid[i + 1][j]
      }
      let right = grid[i][j + 1]
      let left = grid[i][j - 1]
      if (right === undefined) {
        right = Number.MAX_SAFE_INTEGER
      }
      if (left === undefined) {
        left = Number.MAX_SAFE_INTEGER
      }
      let current = grid[i][j]
      if (current < top && current < down && current < right && current < left) {
        lowPoints.push({
          x: j,
          y: i,
          value: current
        })
      }
    })
  })
  let sum = 0
  lowPoints.forEach(n => {
    sum += n.value + 1
  })
  console.log(`Part 1: ${sum}`)
  return lowPoints
}

function getHigherNeighbours(grid, i, j) {
  let current = grid[i][j]
  if (current === 8) {
    return []
  }
  let top = Number.MIN_SAFE_INTEGER
  let down = Number.MIN_SAFE_INTEGER
  if (grid[i - 1]) {
    top = grid[i - 1][j]
  }
  if (grid[i + 1]) {
    down = grid[i + 1][j]
  }
  let right = grid[i][j + 1]
  let left = grid[i][j - 1]
  if (right === undefined) {
    right = Number.MIN_SAFE_INTEGER
  }
  if (left === undefined) {
    left = Number.MIN_SAFE_INTEGER
  }

  let points = []
  if (top > current) {
    points.push({
      value: top,
      x: j,
      y: i - 1,
    })
  }
  if (down > current) {
    points.push({
      value: down,
      x: j,
      y: i + 1,
    })
  }
  if (right > current) {
    points.push({
      value: right,
      x: j + 1,
      y: i,
    })
  }
  if (left > current) {
    points.push({
      value: left,
      x: j - 1,
      y: i,
    })
  }
  return points
}

function getPoints(points, grid) {
  let newPoints = JSON.parse(JSON.stringify(points))
  points.forEach(n => {
    let neighbours = getHigherNeighbours(grid, n.y, n.x)
    let allNeighbourPoints = getPoints(neighbours, grid)
    newPoints = newPoints.concat(...allNeighbourPoints)
  })
  return newPoints
}

function calculateBasin(point) {
  let points = getPoints([point], grid)
  return uniqBy(points, p => {
    return p.x.toString() + p.y.toString() + p.value.toString()
  })
}

// get 3 largest numbers from array
function getLargest(arr) {
  let largest = []
  arr.forEach(n => {
    if (largest.length < 3) {
      largest.push(n)
    } else {
      let index = largest.findIndex(l => l <= n)
      if (index !== -1) {
        largest.splice(index, 1, n)
      }
    }
  })
  return largest
}

function part2() {
  let lowPoints = part1()
  let basins = []
  lowPoints.forEach(point => {
    let points = calculateBasin(point)
    basins.push(points.length)
  })
  let largestBasins = getLargest(basins)
  let result = 1
  largestBasins.forEach(n => {
    result *= n
  })
  console.log(result)
  return result
}


part1()
part2()
