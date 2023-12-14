import input from './input.mjs';

// const input = `#.##..##.
// ..#.##.#.
// ##......#
// ##......#
// ..#.##.#.
// ..##..##.
// #.#.##.#.

// #...##..#
// #....#..#
// ..##..###
// #####.##.
// #####.##.
// ..##..###
// #....#..#`;

const enableLogs = false;

(function main() {
  try {

    const patterns = parseInput(input);

    let sum = 0;

    for (const pattern of patterns) {
      console.log(stringifyGrid(pattern));
      
      for (let y = 0; y < pattern.length; y++) {
        const isMirror = checkIsMirror(pattern, y);
        if (isMirror) {
          console.log(`There's a row mirror between ${y} & ${y + 1}`);
          sum += 100 * (y + 1);
          break;
        }
        log('---');
      }

      const columns = getColumns(pattern);
      for (let x = 0; x < columns.length; x++) {
        const isMirror = checkIsMirror(columns, x);
        if (isMirror) {
          console.log(`There's a column mirror between ${x} & ${x + 1}`);
          sum += (x + 1);
          break;
        }
        log('---');
      }

      console.log('\n');
    }

    console.log(`Sum is: ${sum}`);

  } catch (err) {
    console.error(err);
  }
})();

function parseInput(input) {
  return input
    .split('\n\n')
    .map(pattern => pattern
      .split('\n')
      .map(sequenceString => sequenceString
        .split('')
      )
    );
}

function stringifyGrid(grid) {
  return grid
    .map(row => (
      row.join('')
    ))
    .join('\n');
}

function checkIsMirror(rows, i, offset = 0) {
  const a = rows[i - offset];
  const b = rows[i + offset + 1];
  log(`🔍 Checking arrays ${i - offset} and ${i + offset + 1}`);
  if (offset === 0 && (!b)) {
    log(`❌ Array index ${i + offset + 1} doesn't exist!`);
    return false;
  }
  if (!a || !b) {
    log('✅ Reached edge!');
    return true;
  }
  const rowsAreEqual = checkArraysAreEqual(a, b);
  if (rowsAreEqual) {
    log('😎 Arrays are equal')
    return checkIsMirror(rows, i, offset += 1);
  } else {
    log('❌ These arrays aren\'t equal!');
    return false;
  }
}

function checkArraysAreEqual(a, b) {
  return a.every((value, i) => value === b[i]);
}

function getColumns(grid) {
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

function log(string) {
  if (!enableLogs) return;
  console.log(string)
}