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

    const mapsBySection = [];

    for (let i = 1; i < sections.length; i++) {
      const section = sections[i];
      const maps = section
        .split('\n')
        .filter(line => line.match(/\d/g));

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

    for (let i = 0; i < seeds.length; i += 2) {
      const seedStart = seeds[i];
      const seedEnd = seedStart + seeds[i + 1];

      console.log(`Input: ${seedStart} - ${seedEnd}`);

      for (const section of mapsBySection) {
        console.log(section);

        const inputs = [];
        let firstRun = true;

        for (const { destinationRangeStart, sourceRangeStart, rangeLength } of section) {
          if (firstRun) {
            if (
              seedStart < sourceRangeStart + rangeLength &&
              seedEnd > sourceRangeStart
            ) {
              const searchMin = Math.max(seedStart, sourceRangeStart);
              const searchMax = Math.min(seedEnd, sourceRangeStart + rangeLength);
  
              console.log('yep');
              for (let j = searchMin; j <= searchMax; j++) {
                inputs.push(
                  j >= sourceRangeStart &&
                  j <= sourceRangeStart + rangeLength
                    ? destinationRangeStart + (j - sourceRangeStart)
                    : j
                );
              }
              console.log('true!');
            }
          }
          console.log(inputs.length);
        }
        firstRun = false;
        break;
      }

      console.log('\n')

      // if (destination < lowestLocationNumber) {
      //   lowestLocationNumber = destination;
      // }
    }

    console.log(`Lowest Location Number: ${lowestLocationNumber}`);

  } catch (err) {
    console.error(err);
  }
})();