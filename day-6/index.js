const fs = require('fs');

const data = fs.readFileSync('./input.txt',
  { encoding: 'utf8', flag: 'r' });

const fish = data.split(',').map(n => +n)
const days = Array(9).fill(0)

function sumFish() {
  return days.reduce((acc, curr) => (acc += curr))
}

function part1(iterations) {
  // Count fish for each day left
  fish.forEach((f) => days[f]++)

  for (let i = 0; i < iterations; i++) {
    const newFish = days.shift()
    days.push(newFish)
    // reset fish to day 6
    days[6] += newFish
  }
  return sumFish()
}

console.log(part1(80));
console.log(part1(256));
