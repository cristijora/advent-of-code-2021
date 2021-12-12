const fs = require('fs');

const data = fs.readFileSync('./input.txt',
  { encoding: 'utf8', flag: 'r' });

const inputData = data
  .split('\n')
  .filter(l => l !== '')
  .map(a => a.split('').map(b => parseInt(b)));

function increment(grid) {
  return grid.map(a => a.map(b => b + 1));
}

function flash(postBaseTurnArray) {
  let arr = postBaseTurnArray.map(a => a.filter(b => true));
  let score = 0;
  let flashed = true;
  while (flashed === true) {
    flashed = false;
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].length; j++) {
        if (arr[i][j] > 9) {
          arr[i][j] = 0;
          score += 1;
          flashed = true;
          let up = i - 1 >= 0;
          let down = i + 1 < arr.length;
          let right = j + 1 < arr[i].length;
          let left = j - 1 >= 0;
          if (up && arr[i - 1][j] !== 0) {
            arr[i - 1][j] += 1
          }
          if (down && arr[i + 1][j] !== 0) {
            arr[i + 1][j] += 1
          }
          if (left && arr[i][j - 1] !== 0) {
            arr[i][j - 1] += 1
          }
          if (right && arr[i][j + 1] !== 0) {
            arr[i][j + 1] += 1
          }
          if (up && left && arr[i - 1][j - 1] !== 0) {
            arr[i - 1][j - 1] += 1;
          }
          if (up && right && arr[i - 1][j + 1] !== 0) {
            arr[i - 1][j + 1] += 1;
          }
          if (down && left && arr[i + 1][j - 1] !== 0) {
            arr[i + 1][j - 1] += 1;
          }
          if (down && right && arr[i + 1][j + 1] !== 0) {
            arr[i + 1][j + 1] += 1;
          }
        }
      }
    }
  }
  return [score, arr];
}

function part1(array, steps, partTwo = false) {
  let score = 0;
  let tempArr = array.map(a => a.filter(b => true));
  for (let i = 0; i < steps; i++) {
    let turnData = flash(increment(tempArr));
    score += turnData[0];
    tempArr = turnData[1];
  }
  return `Part, steps: ${steps} , total: ${score}.`;
}

function part2(array) {
  let score = 0;
  let tempArr = array.map(a => a.filter(b => true));
  let i = 0
  while (true) {
    let turnData = flash(increment(tempArr));
    let allFlashed = turnData[0] === array.reduce((a, b) => a + b.length, 0);
    if (allFlashed) {
      return `Part 2 step: ${i + 1}.`;
    }
    score += turnData[0];
    tempArr = turnData[1];
    i++
  }
}

console.log(part1(inputData, 100));
console.log(part2(inputData));
