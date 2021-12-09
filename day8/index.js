const fs = require('fs');

const data = fs.readFileSync('./input.txt',
  { encoding: 'utf8', flag: 'r' });

let lines = data.split('\n').filter(l => l !== '');

let outputLines = lines.map(l => {
  const parts = l.split('| ')
  return parts[1].split(' ')
})

lines = lines.map(l => {
  const parts = l.split(' | ')
  return {
    left: parts[0].split(' '),
    right: parts[1].split(' '),
  }
})

const digitsLength = [2, 4, 3, 7]

const digits = {
  9: {
    length: 6,
    includes: [1, 4, 7]
  },
  6: {
    length: 6,
    includes: []
  },
  5: {
    length: 5,
    includes: []
  },
  3: {
    length: 5,
    includes: [1, 7]
  },
  2: {
    length: 5,
    includes: []
  },
  0: {
    length: 6,
    includes: [1, 7]
  },
}

function part1() {
  let sum = 0
  outputLines.forEach(line => {
    line.forEach(word => {
      let length = word.length
      if (digitsLength.includes(length)) {
        sum++
      }
    })
  })
  return sum
}

function part2() {
  let sum = 0
  lines.forEach(line => {
    let lineOutput = ''
    let foundWords = parseLine(line.left)
    line.right.forEach(word => {
      for (let key in foundWords) {
        let current = foundWords[key].split('').sort().join('')
        let match = word.split('').sort().join('')
        if (current === match) {
          lineOutput += key
        }
      }
    })
    sum += +lineOutput
  })
  return sum
}

function parseLine(line) {
  // 1 -> 2
  // 4 -> 4
  // 7 -> 3
  // 8 -> 7
  const unique = [1, 4, 7, 8]
  const rest = [2, 3, 5, 6, 9, 0]
  let foundWords = {}
  let remainingWords = []

  line.forEach(word => {
    if (word.length === 2) {
      foundWords[1] = word
    } else if (word.length === 4) {
      foundWords[4] = word
    } else if (word.length === 3) {
      foundWords[7] = word
    } else if (word.length === 7) {
      foundWords[8] = word
    } else {
      remainingWords.push(word)
    }
  })

  let w = foundWords
  let wordsL5 = []
  let wordsL6 = []
  remainingWords.forEach(word => {
    if (word.length === 5) {
      // can be 2, 3 or 5
      // 3 includes 1 and 7
      if (includesWords(word, [w[1], w[7]])) {
        foundWords[3] = word
      } else {
        wordsL5.push(word)
      }
    } else if (word.length === 6) {
      // can be 0, 6, 9

      // 9 includes 1, 4 and 7
      if (includesWords(word, [w[1], w[7], w[4]])) {
        foundWords[9] = word
      } else {
        wordsL6.push(word)
      }
    }
  })

  wordsL6.forEach(word => {
    wordsL5.forEach(word2 => {
      if (includesWords(word, [word2])) {
        foundWords[6] = word
        foundWords[5] = word2
      }
    })
  })

  wordsL6.forEach(w => {
    if (foundWords[6] !== w) {
      foundWords[0] = w
    }
  })

  wordsL5.forEach(w => {
    if (foundWords[5] !== w) {
      foundWords[2] = w
    }
  })

  return foundWords
}

function includesWords(word, words) {
  let sorted = [...word].sort().join('')
  let includesWord = true
  words.forEach(w => {
    let sortedW = [...w].sort()
    let matching = sortedW.every(char => {
      return sorted.includes(char)
    })
    if (!matching) {
      includesWord = false
    }
  })
  return includesWord
}

console.log(`Part 1: ${part1()}`)
console.log(`Part 2: ${part2()}`)
