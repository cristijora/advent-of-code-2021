const fs = require('fs');

const data = fs.readFileSync('./input.txt',
  { encoding: 'utf8', flag: 'r' });

const lines = data.split('\n').filter(l => l !== '')
let bitCols = {}
lines.forEach(line => {
  for (let i = 0; i < line.length; i++) {
    if (!bitCols[i]) {
      bitCols[i] = []
    }
    bitCols[i].push(+line[i])
  }
})

function part1() {
  let gama = ''
  let epsilon = ''
  for (let key in bitCols) {
    let oneCount = 0
    let zeroCount = 0
    bitCols[key].forEach(bit => {
      if (bit === 1) {
        oneCount++
      } else {
        zeroCount++
      }
    })
    if (oneCount > zeroCount) {
      gama += '1'
      epsilon += '0'
    } else {
      gama += '0'
      epsilon += '1'
    }
  }
  const gamaInt = parseInt(gama, 2)
  const epsilonInt = parseInt(epsilon, 2)
  return gamaInt * epsilonInt
}

function getOxygenRating() {
  const bitColsCopy = JSON.parse(JSON.stringify(bitCols))
  let oxygenRating = ''
  for (let key in bitColsCopy) {
    let oneCount = 0
    let zeroCount = 0
    let oneCountIndexes = []
    let zeroCountIndexes = []
    bitColsCopy[key].forEach((bit, index) => {
      if (bit === 1) {
        oneCount++
        oneCountIndexes.push(index)
      } else {
        zeroCount++
        zeroCountIndexes.push(index)
      }
    })
    if (oneCount >= zeroCount) {
      removeBits(zeroCountIndexes, bitColsCopy)
    } else {
      removeBits(oneCountIndexes, bitColsCopy)
    }
  }
  Object.values(bitColsCopy).forEach(col => {
    col.forEach(bit => {
      oxygenRating+=bit
    })
  })
  return oxygenRating
}

function getScrubberRating() {
  const bitColsCopy = JSON.parse(JSON.stringify(bitCols))
  let scrubberRating = ''
  for (let key in bitColsCopy) {
    let oneCount = 0
    let zeroCount = 0
    let oneCountIndexes = []
    let zeroCountIndexes = []
    bitColsCopy[key].forEach((bit, index) => {
      if (bit === 1) {
        oneCount++
        oneCountIndexes.push(index)
      } else {
        zeroCount++
        zeroCountIndexes.push(index)
      }
    })
    if (oneCount < zeroCount) {
      removeBits(zeroCountIndexes, bitColsCopy)
    } else {
      removeBits(oneCountIndexes, bitColsCopy)
    }
    if (bitColsCopy[key].length === 1) {
      break;
    }
  }
  Object.values(bitColsCopy).forEach(col => {
    col.forEach(bit => {
      scrubberRating+=bit
    })
  })
  return scrubberRating
}

function part2() {
  let oxygenRating = getOxygenRating()
  let scrubberRating = getScrubberRating()
  const oxygenRatingInt = parseInt(oxygenRating, 2)
  const scrubberRatingInt = parseInt(scrubberRating, 2)
  return oxygenRatingInt * scrubberRatingInt
}

function removeBits(indexes, bitColumns) {
  for (let key in bitColumns) {
    indexes.forEach(index => {
      bitColumns[key][index] = -1
    })
    bitColumns[key] = bitColumns[key].filter(v => v !== -1)
  }
}

console.log(part1())
console.log(part2())
