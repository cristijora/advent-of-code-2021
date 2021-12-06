const fs = require('fs');

const data = fs.readFileSync('./input.txt',
  { encoding: 'utf8', flag: 'r' });

const lines = data.split('\n').filter(l => l !== '')

const commands = {
  Forward: 'forward',
  Down: 'down',
  Up: 'up',
}
const allCommands = []

lines.forEach(line => {
  const parts = line.split(' ')
  allCommands.push({
    command: parts[0],
    value: +parts[1]
  })
})

console.log(allCommands)

function parseCommand(command, position) {
  if (command.command === commands.Forward) {
    position.x += command.value
    position.y += command.value * position.aim
  }
  if (command.command === commands.Down) {
    position.aim+= command.value
  }
  if (command.command === commands.Up) {
    position.aim-= command.value
  }
  return position
}

function part1() {
  let position = {
    x: 0,
    y: 0,
    aim: 0,
  }
  allCommands.forEach(command => {
    position = parseCommand(command, position)
  })
  return position.x * position.y
}

function part2() {
  let position = {
    x: 0,
    y: 0,
    aim: 0,
  }
  allCommands.forEach(command => {
    position = parseCommand(command, position)
  })
  return position.x * position.y
}


console.log(part2())
