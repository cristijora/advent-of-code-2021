const fs = require('fs');
const { uniqBy } = require("lodash");

const data = fs.readFileSync('./input.txt',
  { encoding: 'utf8', flag: 'r' });

let lines = data.split('\n').filter(l => l !== '');


function parseLine(line) {
  const last = [];

  let startChars = {
    '(': ')',
    '[': ']',
    '{': '}',
    '<': '>'
  }

  let endChars = {
    ')': '(',
    ']': '[',
    '}': '{',
    '>': '<'
  }

  let countMap = {
    '(': 0,
    '[': 0,
    '{': 0,
    '<': 0
  }


  for (let char of line) {

    if (startChars[char]) {
      countMap[char] += 1;
      last.push(char);
    }

    if (endChars[char]) {
      const lastStartChar = last.pop();

      if (char === startChars[lastStartChar]) {
        countMap[lastStartChar] += -1;
      } else {
        return { error: char };
      }
    }
  }

  return { ending: last.reverse().map((char) => startChars[char]) }
}

const points = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137,
}

const points2 = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4,
}


function part1(lines) {
  return lines.map(parseLine)
    .filter(value => value.error)
    .reduce((sum, value) => sum + points[value.error], 0);
}


function part2(lines) {
  let values = lines.map(parseLine)
    .filter(value => value.ending)

  values = values.map(v => {
    let sum = 0
    v.ending.forEach(char => {
      sum = sum * 5 + points2[char]
    })
    return sum
  }).sort((a, b) => a - b)
  const middle = Math.floor(values.length / 2)
  return values[middle]
}

console.log(part1(lines))
console.log(part2(lines))
