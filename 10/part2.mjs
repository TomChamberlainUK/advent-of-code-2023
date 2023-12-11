import input from './input.mjs';

// const input = `.....
// .S-7.
// .|.|.
// .L-J.
// .....`;

// const input = `...........
// .S-------7.
// .|F-----7|.
// .||.....||.
// .||.....||.
// .|L-7.F-J|.
// .|..|.|..|.
// .L--J.L--J.
// ...........`;

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

    const pipe = getPipeCoordinates(grid, start);
    const enclosedArea = getEnclosedArea(grid, pipe);
    console.log(`Enclosed Area Count: ${enclosedArea}`);

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

function getPipeCoordinates(grid, coordinates, previousCoordinates = { x: null, y: null }, history = []) {
  const currentValue = grid[coordinates.y][coordinates.x];

  if (currentValue === 'S' && history.length !== 0) {
    log('Arrived at start');
    return history;
  }

  history.push(coordinates);
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
      // log('Going north');
      history[history.length - 1].north = true;
      return getPipeCoordinates(grid, north.coordinates, coordinates, history);
  }
  if (
    ['-', 'L', 'F', 'S'].includes(west.value) &&
    ['-', 'J', '7', 'S'].includes(currentValue) &&
    !(
      west.coordinates.x === previousCoordinates.x &&
      west.coordinates.y === previousCoordinates.y
    )
  ) {
      // log('Going west');
      return getPipeCoordinates(grid, west.coordinates, coordinates, history);
  }  
  if (
    ['-', 'J', '7', 'S'].includes(east.value) &&
    ['-', 'L', 'F', 'S'].includes(currentValue) &&
    !(
      east.coordinates.x === previousCoordinates.x &&
      east.coordinates.y === previousCoordinates.y
    )
  ) {
      // log('Going east');
      return getPipeCoordinates(grid, east.coordinates, coordinates, history);
  }
  if (
    ['|', 'L', 'J', 'S'].includes(south.value) &&
    ['|', '7', 'F', 'S'].includes(currentValue) &&
    !(
      south.coordinates.x === previousCoordinates.x &&
      south.coordinates.y === previousCoordinates.y
    )
  ) {
      // log('Going south');
      return getPipeCoordinates(grid, south.coordinates, coordinates, history);
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

function getEnclosedArea(grid, pipe) {
  let enclosedCount = 0;

  for (let y = 0; y < grid.length; y++) {
    let isEnclosed = false;

    for (let x = 0; x < grid[y].length; x++) {
      let isPipe = checkIsPipe(pipe, { x, y });
      if (isPipe && ['|', 'L', 'J'].includes(grid[y][x])) {
        isEnclosed = !isEnclosed;
        log(`Flipping to ${isEnclosed} because detected: ${grid[y][x]} at x: ${x}, y: ${y}`);
      } else if (!isPipe && isEnclosed) {
        enclosedCount++;
        log(`Enclosed detected: ${grid[y][x]} at x: ${x}, y: ${y}`);
      }
    }
  }

  return enclosedCount;
}

function checkIsPipe(pipe, { x, y }) {
  for (const coordinates of pipe) {
    if (
      x === coordinates.x &&
      y === coordinates.y
    ) {
      return true;
    }
  }
  return false;
}

function log(string) {
  if (!enableLogs) return;
  console.log(string);
}
