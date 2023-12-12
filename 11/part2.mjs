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

    const [rowsWithoutGalaxies, columnsWithoutGalaxies] = getRowsAndColumnsWithoutGalaxies(space);
    console.log(rowsWithoutGalaxies);
    console.log(columnsWithoutGalaxies);

    const galaxyCoordinates = getHashCoordinates(space);
    log(galaxyCoordinates);

    const galaxyDistance = getGridDistance(galaxyCoordinates[4], galaxyCoordinates[8], rowsWithoutGalaxies, columnsWithoutGalaxies);
    log(galaxyDistance);
    
    let sum = 0;
    for (let i = 0; i < galaxyCoordinates.length; i++) {
      for (let j = i + 1; j < galaxyCoordinates.length; j++) {
        const value = getGridDistance(galaxyCoordinates[i], galaxyCoordinates[j], rowsWithoutGalaxies, columnsWithoutGalaxies);
        console.log(galaxyCoordinates[i], galaxyCoordinates[j]);
        console.log(value);
        sum += value;
      }
    }
    console.log(sum);
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

function getRowsAndColumnsWithoutGalaxies(space) {
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
    .map((_, i) => !rowsWithGalaxies.has(i)
      ? i
      : null
    ).filter(row => row != null);
  
  const columnsWithoutGalaxies = new Array(space[0].length)
    .fill(false)
    .map((_, i) => !columnsWithGalaxies.has(i)
      ? i
      : null
    ).filter(row => row != null);

  return [rowsWithoutGalaxies, columnsWithoutGalaxies];
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

function getGridDistance(coordinateA, coordinateB, rowsWithoutGalaxies, columnsWithoutGalaxies) {
  const xDistance = getDifference(coordinateA.x, coordinateB.x);
  const yDistance = getDifference(coordinateA.y, coordinateB.y);

  const min = {
    x: Math.min(coordinateA.x, coordinateB.x),
    y: Math.min(coordinateA.y, coordinateB.y)
  }
  const max = {
    x: Math.max(coordinateA.x, coordinateB.x),
    y: Math.max(coordinateA.y, coordinateB.y)
  }

  let xOffset = 0;
  for (let i = min.x + 1; i < max.x; i++) {
    if (columnsWithoutGalaxies.includes(i)) {
      xOffset++;
    }
  }

  let yOffset = 0;
  for (let i = min.y + 1; i < max.y; i++) {
    if (rowsWithoutGalaxies.includes(i)) {
      yOffset++;
    }
  }

  return xDistance + yDistance + ((xOffset + yOffset) * (1e6 - 1));
}

function getDifference(a, b) {
   return Math.max(a, b) - Math.min(a, b);
}

function log(string) {
  if (!enableLogs) return;
  console.log(string);
}