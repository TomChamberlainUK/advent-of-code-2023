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

const enableLogs = true;

(function main() {
  try {

    const patterns = parseInput(input);

    let sum = 0;

    for (const pattern of patterns) {
      console.log(stringifyGrid(pattern));
      console.log('\n\n');

      const rowMirrorPosition = getMirrorPosition(pattern);
      if (rowMirrorPosition) {
        sum += 100 * rowMirrorPosition;
      }

      const columns = getColumns(pattern);
      const columnMirrorPosition = getMirrorPosition(columns);
      if (columnMirrorPosition) {
        sum += columnMirrorPosition;
      }

      // console.log('No matches');
      // console.log('---');
      // console.log('\n');
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

function getMirrorPosition(grid) {
  for (let i = 0; i < grid.length; i++) {
    const isMirror = checkIsMirror(grid, i);
    if (isMirror) {
      return i + 1;
    }
  }
}

function checkIsMirror(rows, i, offset = 0, differences = 0) {
  const a = rows[i - offset];
  const b = rows[i + offset + 1];
  log(`🔍 Checking arrays ${i - offset} and ${i + offset + 1}`);
  if (offset === 0 && (!b)) {
    log(`❌ Array index ${i + offset + 1} doesn't exist!`);
    return false;
  }
  if (!a || !b) {
    if (differences === 1) {
      log('✅ Reached edge!');
      return true;
    } else {
      log('❌ Reached edge without differences');
      return false;
    }
  }
  differences += getDifference(a, b);
  if (differences <= 1) {
    log('😎 Arrays are equal')
    return checkIsMirror(rows, i, offset += 1, differences);
  } else {
    log('❌ These arrays aren\'t equal!');
    return false;
  }
}

function getDifference(a, b) {
  let differences = 0;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      differences++;
    }
  }
  return differences;
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