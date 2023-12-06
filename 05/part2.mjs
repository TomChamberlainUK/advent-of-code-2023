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

    let lowestLocationNumber = Number.POSITIVE_INFINITY;

    const [seedSection, ...numberMapSections] = input.split('\n\n');

    const seedRanges = parseSeedRanges(seedSection);
    const numberMapsBySection = parseNumberMapsBySection(numberMapSections);

    for (const [startingPoint, rangeLength] of seedRanges) {
      console.log(`Starting Point: ${startingPoint}`);
      console.log(`Range Length: ${rangeLength}`);

      for (let i = startingPoint; i < startingPoint + rangeLength; i++) {
        let input = i;
        // console.log(`Testing: ${i}`);
        for (const numberMapSection of numberMapsBySection) {
          // console.log(numberMapSection);
          for (const { destinationRangeStart, sourceRangeStart, rangeLength } of numberMapSection) {
            if (
              input >= sourceRangeStart &&
              input < sourceRangeStart + rangeLength
            ) {
              input = destinationRangeStart + (input - sourceRangeStart);
              break;
            }
          }
        }

        if (input < lowestLocationNumber) {
          lowestLocationNumber = input;
        }
      }
    }

    console.log(`Lowest Location Number: ${lowestLocationNumber}`);

  } catch (err) {
    console.error(err);
  }
})();




function parseSeedRanges(seedSectionString) {
  const seedNumbers = seedSectionString
    .replace(/seeds: /, '')
    .split(' ')
    .map(numberString => Number.parseInt(numberString));

  const seedRanges = [];
  
  for (let i = 0; i < seedNumbers.length; i += 2) {
    seedRanges.push([seedNumbers[i], seedNumbers[i + 1]]);
  }

  return seedRanges;
}

function parseNumberMapsBySection(numberMapSections) {
  const mapsBySection = [];

  for (let i = 0; i < numberMapSections.length; i++) {
    const section = numberMapSections[i];
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
  }

  return mapsBySection;
}