import input from './input.mjs';

// const input = `???.### 1,1,3
// .??..??...?##. 1,1,3
// ?#?#?#?#?#?#?#? 1,3,1,6
// ????.#...#... 4,1,1
// ????.######..#####. 1,6,5
// ?###???????? 3,2,1`;

const enableLogs = false;

(function main() {
  try {

    const rows = parseInput(input);
    log(rows);

    const sum = rows
      .map(({springs, sequence}) => countPossibilities(springs, sequence))
      .reduce((accumulator, value) => accumulator += value);

    console.log(sum);

  } catch (err) {
    console.error(err);
  }
})();

function countPossibilities(springs, sequence) {
  log(`🔍 Checking: ${springs} against ${sequence}`);
  if (
    (springs.length === 0 && sequence.length === 0) ||
    (sequence.length === 0 && !springs.includes('#'))
  ) {
    log('✅ Possibility found!');
    return 1
  } else if (springs.length === 0 && sequence.length > 0) {
    log('❌ Not enough springs for sequences');
    return 0;
  } else if (sequence.length > 0 && !springs.includes('#') && !springs.includes('?')) {
    log('❌ Remaining sequences are not possible');
    return 0;
  } else if (sequence.length === 0 && springs.includes('#')) {
    log('❌ Springs left with no sequences');
    return 0;
  }
  if (springs.length < sequence.reduce((a, b) => a + b) + sequence.length - 1) {
    log('❌ Remaining sequences not possible with string length');
    return 0;
  }

  switch (springs[0]) {
    case '?': {
      log('🤔 Unknown encountered');
      log('👍 Checking operational');
      const operational = countPossibilities(`.${springs.slice(1)}`, sequence);
      log('👎 Checking damaged');
      const damaged = countPossibilities(`#${springs.slice(1)}`, sequence);
      return operational + damaged;
    }
    case '.': {
      return countPossibilities(springs.slice(1), sequence);
    }
    case '#': {
      if (springs.length < sequence[0]) {
        log('❌ Not enough springs for current sequence');
        return 0;
      }
      for (let i = 1; i < sequence[0]; i++) {
        if (springs[i] === '.') {
          log('❌ Not enough springs for current sequence');
          return 0;
        }
      }
      if (springs[sequence[0]] === '#') {
        log('❌ Too many springs for current sequence');
        return 0;
      }
      log(`🔧 Removed ${sequence[0]} from sequence`);
      return countPossibilities(springs.slice(sequence[0] + 1), sequence.slice(1));
    }
    
    default: {
      throw new Error(`Unexpected spring encountered: ${springs[0]}`);
    }
  }
}

function log(string) {
  if (!enableLogs) return;
  console.log(string)
}

function parseInput(input) {
  return input
    .split('\n')
    .map(row => {
      const [springs, sequence] = row.split(' ')
      return {
        springs: springs,
        sequence: sequence
          .split(',')
          .map(numberString => Number.parseInt(numberString))
      }
    });
}