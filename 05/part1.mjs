import input from './input.mjs';

// const input = `seeds: 79 14 55 13

// seed-to-soil map:
// 50 98 2
// 52 50 48

// soil-to-fertilizer map:
// 0 15 37
// 37 52 2
// 39 0 15

// fertilizer-to-water map:
// 49 53 8
// 0 11 42
// 42 0 7
// 57 7 4

// water-to-light map:
// 88 18 7
// 18 25 70

// light-to-temperature map:
// 45 77 23
// 81 45 19
// 68 64 13

// temperature-to-humidity map:
// 0 69 1
// 1 0 69

// humidity-to-location map:
// 60 56 37
// 56 93 4`;

(async function main() {
  try {

    const sections = input.split('\n\n');
    const seeds = sections[0]
      .replace(/seeds: /, '')
      .split(' ')
      .map(numberString => Number.parseInt(numberString));

    console.log(`Seeds: ${seeds.join(', ')}`);
    console.log('\n');

    const mapsBySection = [];

    for (let i = 1; i < sections.length; i++) {
      const section = sections[i];
      const maps = section
        .split('\n')
        .filter(line => line.match(/\d/g));

      console.log('Map:')
      console.log(maps.join('\n'));
      console.log('---');

      mapsBySection.push(
        maps.map(map => {
          const [destinationRangeStart, sourceRangeStart, rangeLength] = map
            .split(' ')
            .map(numberString => Number.parseInt(numberString));
          return {
            destinationRangeStart,
            sourceRangeStart,
            rangeLength
          }
        })
      );


      console.log(seeds);
      console.log('\n');
    }

    let lowestLocationNumber = Number.POSITIVE_INFINITY;

    for (const seed of seeds) {
      let destination = seed;
      console.log(`Seed: ${seed}`);

      for (const section of mapsBySection) {
        // console.log(destination);
        console.log(section);

        for (const { destinationRangeStart, sourceRangeStart, rangeLength } of section) {
          if (
            destination >= sourceRangeStart &&
            destination <= sourceRangeStart + rangeLength
          ) {
            console.log(`Input: ${destination}`);
            destination = destinationRangeStart + (destination - sourceRangeStart);
            console.log(`Output: ${destination}`);
            break;
          } else {
            console.log(`Stays at: ${destination}`);
          }
        }
      }

      console.log('\n')

      if (destination < lowestLocationNumber) {
        lowestLocationNumber = destination;
      }
    }

    console.log(`Lowest Location Number: ${lowestLocationNumber}`);

  } catch (err) {
    console.error(err);
  }
})();