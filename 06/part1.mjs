import input from './input.mjs';

// const input = `Time:      7  15   30
// Distance:  9  40  200`;

(async function main() {
  try {
    const [times, distances] = parseInput(input);
    console.log(`Times: ${times.join(', ')}`);
    console.log(`Distances: ${distances.join(', ')}`);
    console.log('\n');

    const successfulTimes = [];

    for (let i = 0; i < times.length; i++) {
      const time = times[i];
      const distance = distances[i];
      let successCount = 0;
      console.log(time, distance);

      for (let timeElapsed = 1; timeElapsed < time; timeElapsed++) {
        const speed = timeElapsed;
        const distanceTravelled = (time - timeElapsed) * speed;
        console.log(`Distance Travelled: ${distanceTravelled}`);

        if (distanceTravelled >= distance) {
          console.log('Success!');
          successCount++;
        }
      }

      successfulTimes.push(successCount);
      console.log(`Success Count: ${successCount}`);
      console.log('---')
    }

    const successfulTimesProduct = successfulTimes.reduce((accumulator, value) => accumulator *= value);
    console.log(successfulTimesProduct);
  } catch (err) {
    console.error(err);
  }
})();

function parseInput(input) {
  return input
    .replace(/ +/g, ' ')
    .split('\n')
    .map(line => line
      .split(' ')
      .slice(1)
      .map(numberString => Number.parseInt(numberString))
    );
}
