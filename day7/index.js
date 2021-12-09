const fs = require('fs');

const data = fs.readFileSync('./input.txt',
  { encoding: 'utf8', flag: 'r' });

const positions = data.split(',').map(n => +n)

function getFuel(position, currentPosition) {
  return Math.abs(position - currentPosition)
}

function getFuelPart2(position, currentPosition) {
  let fuel = 0
  let steps = getFuel(position, currentPosition)
  for (let i = 1; i <= steps; i++) {
    fuel += i
  }
  return fuel
}

function solution(isPart2 = false) {
  let minFuel = Number.MAX_SAFE_INTEGER
  let currentPosition = -1
  let currentFuel = 0
  let minPosition = Number.MAX_SAFE_INTEGER
  let maxPosition = 0
  positions.forEach(position => {
    if (position >= maxPosition) {
      maxPosition = position
    }
  })

  for (let i = 0; i <= maxPosition; i++) {
    currentPosition = i
    currentFuel = 0
    positions.forEach(position => {
      if (isPart2) {
        currentFuel += getFuelPart2(position, currentPosition)
      } else {
        currentFuel += getFuel(position, currentPosition)
      }
    })

    if (currentFuel < minFuel) {
      minFuel = currentFuel
      minPosition = currentPosition
    }
  }
  console.log(`Position: ${minPosition} Fuel: ${minFuel}`)
}

solution()
solution(true)
