import input from './input.mjs';

// const input = `.....
// .S-7.
// .|.|.
// .L-J.
// .....`;

// const input = `..F7.
// .FJ|.
// SJ.L7
// |F--J
// LJ...`;

const enableLogs = true;

(async function main() {
  try {

    log(input);
    log('\n');

    const grid = parseInput(input);
    log(grid);
    log('\n');

    const start = {
      x: null,
      y: null
    };

    for (let y = 0; y < grid.length; y++) {
      for (let x = 0; x < grid[y].length; x++) {
        if (grid[y][x] === 'S') {
          start.x = x;
          start.y = y;
          log(`Starts at x: ${x}, y: ${y}`);
        }
      }
    }

    const totalIterations = getNextPipe(grid, start);
    log(`Total length: ${totalIterations}`);

    const furthestPipe = totalIterations / 2;
    log(`Furthest Pipe: ${furthestPipe}`);

  } catch (err) {
    console.error(err);
  }
})();

function parseInput(input) {
  return input
    .split('\n')
    .map(cell => (
      cell.split('')
    ));
}

function getNextPipe(grid, coordinates, previousCoordinates = { x: null, y: null }, iteration = 0) {
  const currentValue = grid[coordinates.y][coordinates.x];

  if (currentValue === 'S' && iteration !== 0) {
    log('Arrived at start');
    return iteration;
  }

  iteration++;

  const { north, west, east, south } = getNeighbours(grid, coordinates);

  log('---');
  log(`Currently at x:${coordinates.x}, y ${coordinates.y}`)
  log([
    ` ${north.value}`,
    `${west.value}${currentValue}${east.value}`,
    ` ${south.value}`
  ].join('\n'));


  if (
    ['|', '7', 'F', 'S'].includes(north.value) &&
    ['|', 'L', 'J', 'S'].includes(currentValue) &&
    !(
      north.coordinates.x === previousCoordinates.x &&
      north.coordinates.y === previousCoordinates.y
    )
  ) {
      log('Going north');
      return getNextPipe(grid, north.coordinates, coordinates, iteration);
  }
  if (
    ['-', 'L', 'F', 'S'].includes(west.value) &&
    ['-', 'J', '7', 'S'].includes(currentValue) &&
    !(
      west.coordinates.x === previousCoordinates.x &&
      west.coordinates.y === previousCoordinates.y
    )
  ) {
      log('Going west');
      return getNextPipe(grid, west.coordinates, coordinates, iteration);
  }  
  if (
    ['-', 'J', '7', 'S'].includes(east.value) &&
    ['-', 'L', 'F', 'S'].includes(currentValue) &&
    !(
      east.coordinates.x === previousCoordinates.x &&
      east.coordinates.y === previousCoordinates.y
    )
  ) {
      log('Going east');
      return getNextPipe(grid, east.coordinates, coordinates, iteration);
  }
  if (
    ['|', 'L', 'J', 'S'].includes(south.value) &&
    ['|', '7', 'F', 'S'].includes(currentValue) &&
    !(
      south.coordinates.x === previousCoordinates.x &&
      south.coordinates.y === previousCoordinates.y
    )
  ) {
      log('Going south');
      return getNextPipe(grid, south.coordinates, coordinates, iteration);
  }

  throw new Error(JSON.stringify(coordinates));
}

function getNeighbours(grid, { x, y }) {
  return {
    north: {
      value: grid[y - 1]?.[x] ?? null,
      coordinates: {
        x,
        y: y - 1
      }
    },
    west: {
      value: grid[y]?.[x - 1] ?? null,
      coordinates: {
        x: x - 1,
        y
      }
    },
    east: {
      value: grid[y]?.[x + 1] ?? null,
      coordinates: {
        x: x + 1,
        y
      }
    },
    south: {
      value: grid[y + 1]?.[x] ?? null,
      coordinates: {
        x,
        y: y + 1
      }
    },
  }
}

function log(string) {
  if (!enableLogs) return;
  console.log(string);
}
