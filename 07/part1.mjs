import input from './input.mjs';

// const input = `32T3K 765
// T55J5 684
// KK677 28
// KTJJT 220
// QQQJA 483`;

(async function main() {
  try {

    const players = parseInput(input);
    console.log(players);

    const cardBuckets = getCardBuckets(players);
    console.log(cardBuckets);

    const rankedPlayers = getRankedPlayers(cardBuckets);
    console.log(rankedPlayers);

    const betWinnings = rankedPlayers.map(({ bet }, i) => bet * (i + 1));
    console.log(betWinnings);

    const totalWinnings = betWinnings.reduce((accumulator, value) => accumulator += value);
    console.log(totalWinnings);

  } catch (err) {
    console.error(err);
  }
})();

function parseInput(input) {
  return input
    .split('\n')
    .map(player => {
      const [hand, bet] = player.split(' ')
      return {
        hand,
        cards: parseCards(hand),
        bet: Number.parseInt(bet)
      }
    })
    .sort(sortByCards);
}

function parseCards(hand) {
  return hand
    .split('')
    .map(card => Number.parseInt(card
      .replace(/T/, '10')
      .replace(/J/, '11')
      .replace(/Q/, '12')
      .replace(/K/, '13')
      .replace(/A/, '14')
    ))
}

function getCardFrequencies(cards) {
  const cardFrequencyMap = new Map();
  for (const card of cards) {
    const value = cardFrequencyMap.get(card)
    if (value) {
      cardFrequencyMap.set(card, value + 1);
    } else {
      cardFrequencyMap.set(card, 1);
    }
  }
  return [...cardFrequencyMap.values()].sort((a, b) => b - a);
}

function getCardBuckets(players) {
  const cardBuckets = {
    fiveOfAKind: [],
    fourOfAKind: [],
    fullHouse: [],
    threeOfAKind: [],
    twoPairs: [],
    onePair: [],
    highCard: []
  }

  for (const player of players) {
    const cardFrequencies = getCardFrequencies(player.cards);
    switch (cardFrequencies[0]) {
      case (5): {
        cardBuckets.fiveOfAKind.push(player);
        break;
      }
      case (4): {
        cardBuckets.fourOfAKind.push(player);
        break;
      }
      case (3): {
        cardFrequencies[1] === 2
          ? cardBuckets.fullHouse.push(player)
          : cardBuckets.threeOfAKind.push(player);
        break;
      }
      case (2): {
        cardFrequencies[1] === 2
          ? cardBuckets.twoPairs.push(player)
          : cardBuckets.onePair.push(player);
        break;
      }
      case (1): {
        cardBuckets.highCard.push(player);
        break;
      }
    }
  }
  
  return cardBuckets;
}

function sortByCards({ cards: a }, { cards: b }) {
  return (
    a[0] - b[0] ||
    a[1] - b[1] ||
    a[2] - b[2] ||
    a[3] - b[3] ||
    a[4] - b[4]
  );
}

function getRankedPlayers(cardBuckets) {
  const rankedPlayers = [];

  cardBuckets.highCard.forEach(player => rankedPlayers.push(player));
  cardBuckets.onePair.forEach(player => rankedPlayers.push(player));
  cardBuckets.twoPairs.forEach(player => rankedPlayers.push(player));
  cardBuckets.threeOfAKind.forEach(player => rankedPlayers.push(player));
  cardBuckets.fullHouse.forEach(player => rankedPlayers.push(player));
  cardBuckets.fourOfAKind.forEach(player => rankedPlayers.push(player));
  cardBuckets.fiveOfAKind.forEach(player => rankedPlayers.push(player));

  return rankedPlayers;
}