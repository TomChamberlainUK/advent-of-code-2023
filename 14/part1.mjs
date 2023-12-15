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

(function main() {
  try {

    const grid = parseInput(input);
    logGrid(grid);
    log('\n');

    const tiltedGrid = tiltUp(grid);
    logGrid(tiltedGrid);
    log('\n');

    const totalLoad = getTotalLoad(tiltedGrid);
    log(totalLoad);

  } catch (err) {
    console.error(err);
  }
})();

function getTotalLoad(grid) {
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

function tiltUp(grid) {
  return transposeGrid(
    transposeGrid(grid)
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
  ));
}

function transposeGrid(grid) {
  const columns = [];

  for (let x = 0; x < grid[0].length; x++) {
    const column = getColumn(grid, x);
    columns.push(column);
  }

  return columns;
}

function getColumn(grid, columnIndex) {
  return grid.map(row => row[columnIndex]);
}

function parseInput(input) {
  return input
    .split('\n')
    .map(sequenceString => sequenceString
      .split('')
    );
}

function logGrid(grid) {
  const stringifiedGrid = grid
    .map(row => (
      row.join('')
    ))
    .join('\n');
  log(stringifiedGrid);
}

function log(string) {
  if (!enableLogs) return;
  console.log(string)
}