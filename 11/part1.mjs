import input from './input.mjs';

// const input = `...#......
// .......#..
// #.........
// ..........
// ......#...
// .#........
// .........#
// ..........
// .......#..
// #...#.....`;

let enableLogs = true;

(async function main() {
  try {

    const space = parseInput(input);
    log(stringifyGrid(space));
    log('\n');

    const expandedSpace = expandSpace(space);
    log(stringifyGrid(expandedSpace));

    const galaxyCoordinates = getHashCoordinates(expandedSpace);
    log(galaxyCoordinates);

    const galaxyDistance = getGridDistance(galaxyCoordinates[0], galaxyCoordinates[1]);
    log(galaxyDistance);

    let sum = 0;
    for (let i = 0; i < galaxyCoordinates.length; i++) {
      for (let j = i + 1; j < galaxyCoordinates.length; j++) {
        sum += getGridDistance(galaxyCoordinates[i], galaxyCoordinates[j]);
      }
    }
    console.log(sum);

    // const shortestDistance = getShortestGridDistance(galaxyCoordinates[0], galaxyCoordinates);
    // log(shortestDistance);

    // const sumOfShortestDistances = getSumOfShortestGridDistances(galaxyCoordinates);
    // log(sumOfShortestDistances);

  } catch (err) {
    console.error(err);
  }
})();

function parseInput(input) {
  return input
    .split('\n')
    .map(sequenceString => sequenceString
      .split('')
    );
}

function stringifyGrid(grid) {
  return grid
    .map(row => (
      row.join('')
    ))
    .join('\n');
}

function expandSpace(space) {
  const rowsWithGalaxies = new Set();
  const columnsWithGalaxies = new Set();

  for (let y = 0; y < space.length; y++) {
    for (let x = 0; x < space[y].length; x++) {
      if (space[y][x] === '#') {
        rowsWithGalaxies.add(y);
        columnsWithGalaxies.add(x);
      }
    }
  }

  const rowsWithoutGalaxies = new Array(space.length)
    .fill(false)
    .map((_, i) => rowsWithGalaxies.has(i));
  
  const columnsWithoutGalaxies = new Array(space[0].length)
    .fill(false)
    .map((_, i) => columnsWithGalaxies.has(i));

  let rowOffset = 0;
  rowsWithoutGalaxies.forEach((hasGalaxy, i) => {
    if (hasGalaxy) return;
    space.splice(
      i + rowOffset,
      0,
      new Array(space[0].length).fill('.')
    );
    rowOffset++;
  });

  let columnOffset = 0;
  columnsWithoutGalaxies.forEach((hasGalaxy, i) => {
    if (hasGalaxy) return;
    for (const row of space) {
      row.splice(
        i + columnOffset,
        0,
        '.'
      )
    }
    columnOffset++;
  });

  return space;
}

function getHashCoordinates(grid) {
  const coordinates = [];

  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const cell = grid[y][x];
      if (cell !== '#') continue;
      coordinates.push({ x, y });
    }
  }

  return coordinates;
}

function getSumOfShortestGridDistances(coordinates) {
  let sum = 0;
  for (const coordinate of coordinates) {
    const shortestDistance = getShortestGridDistance(coordinate, coordinates);
    sum += shortestDistance;
  }
  return sum;
}

function getShortestGridDistance({ x, y }, coordinates) {
  let shortestDistance = Number.POSITIVE_INFINITY;
  for (const coordinate of coordinates) {
    const distance = getGridDistance({ x, y }, coordinate);
    if (distance === 0) continue;
    shortestDistance = Math.min(shortestDistance, distance);
  }
  return shortestDistance;
}

function getGridDistance(coordinateA, coordinateB) {
  const xDistance = getDifference(coordinateA.x, coordinateB.x);
  const yDistance = getDifference(coordinateA.y, coordinateB.y);
  return xDistance + yDistance;
}

function getDifference(a, b) {
   return Math.max(a, b) - Math.min(a, b);
}

function log(string) {
  if (!enableLogs) return;
  console.log(string);
}