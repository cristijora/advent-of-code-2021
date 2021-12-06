const fs = require('fs');

const data = fs.readFileSync('./input.txt',
  { encoding: 'utf8', flag: 'r' });

const lines = data.split('\n').filter(l => l !== '').map(l => +l);

function part1() {
  let increaseCount = 0
  for (let i = 0; i < lines.length; i++) {
    let prevValue = lines[i - 1];
    let currentValue = lines[i]
    if (prevValue && currentValue > prevValue) {
      increaseCount++
    }
  }
  return increaseCount
}

function part2() {
  let increaseCount = 0
  let lastSum = 0
  for (let i = 2; i < lines.length; i++) {
    let first = lines[i - 2];
    let second = lines[i - 1];
    let third = lines[i]
    let currentSum = first + second + third
    if (lastSum !== 0 && currentSum > lastSum) {
      increaseCount++
    }
    lastSum = currentSum
  }
  return increaseCount
}


console.log(part1())
console.log(part2())
