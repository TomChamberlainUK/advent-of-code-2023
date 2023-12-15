import input from './input.mjs';

// const input = `O....#....
// O.OO#....#
// .....##...
// OO.#O....O
// .O.....O#.
// O.#..O.#.#
// ..O..#O..O
// .......O..
// #....###..
// #OO..#....`;

const enableLogs = true;

const tiltCache = {
  up: {},
  left: {},
  right: {},
  down: {}
};

class Grid {
  static parse(string) {
    return string
      .split('\n')
      .map(sequenceString => sequenceString
        .split('')
      );
  }

  static stringify(grid) {
    return grid
      .map(row => (
        row.join('')
      ))
      .join('\n');
  }

  static transpose(grid) {
    const columns = [];

    for (let x = 0; x < grid[0].length; x++) {
      const column = getColumn(grid, x);
      columns.push(column);
    }
  
    return columns;
  }

  static flipHorizontal(grid) {
    return grid.map(row => row.reverse());
  }

  static flipVertical(grid) {
    return grid.reverse();
  }
}

(function main() {
  try {

    log(input);
    log('\n');

    let count = 0;
    let output = input;

    while (count < 1000000000) {
      output = cycleTilts(output);
      count++;
    }

    const totalLoad = getTotalLoad(output);
    log(totalLoad);
    log(`Executed in ${performance.now().toFixed() / 1000} seconds`)

  } catch (err) {
    console.error(err);
  }
})();

function getTotalLoad(string) {
  const grid = Grid.parse(string);
  let totalLoad = 0;

  for (let i = 0; i < grid.length; i++) {
    const row = grid[i];
    const loadFactor = grid.length - i;

    for (const cell of row) {
      if (cell !== 'O') continue;
      totalLoad += loadFactor;
    }
  }

  return totalLoad;
}

function cycleTilts(string) {
  let output = string;
  output = tilt(output, 'up');
  output = tilt(output, 'left');
  output = tilt(output, 'down');
  output = tilt(output, 'right');
  return output;
}

function tilt(string, direction, finished = false) {
  const cached = getCached(string, direction);
  if (cached) {
    return cached;
  }

  let grid = Grid.parse(string);
  switch (direction) {
    case 'up': {
      grid = Grid.transpose(grid);
      grid = tiltToLeft(grid);
      grid = Grid.transpose(grid);
      break;
    }
    case 'right': {
      grid = Grid.flipHorizontal(grid);
      grid = tiltToLeft(grid);
      grid = Grid.flipHorizontal(grid);
      break;
    }
    case 'left': {
      grid = tiltToLeft(grid);
      break;
    }
    case 'down': {
      grid = Grid.transpose(grid);
      grid = Grid.flipHorizontal(grid);
      grid = tiltToLeft(grid);
      grid = Grid.flipHorizontal(grid);
      grid = Grid.transpose(grid);
      break;
    }
    default: {
      throw new Error(`Tilt direction not supported: ${direction}`);
    }
  }

  const output = Grid.stringify(grid);
  setCached(string, direction, output);
  
  return output;
}

function getCached(string, direction) {
  const cached = tiltCache[direction][string];
  return cached;
}

function setCached(string, direction, result) {
  tiltCache[direction][string] = result;
}

function tiltToLeft(grid) {
  return grid
    .map(row => row
    .join('')
    .split('#')
    .map(path => new Array(path.length)
      .fill('.')
      .fill('O', 0, (path.match(/O/g) ?? []).length)
      .join('')
    )
    .join('#')
    .split('')
  )
}

function getColumn(grid, columnIndex) {
  return grid.map(row => row[columnIndex]);
}

function log(string) {
  if (!enableLogs) return;
  console.log(string)
}