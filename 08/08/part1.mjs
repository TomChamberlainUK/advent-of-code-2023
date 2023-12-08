import input from './input.mjs';

// const input = `RL

// AAA = (BBB, CCC)
// BBB = (DDD, EEE)
// CCC = (ZZZ, GGG)
// DDD = (DDD, DDD)
// EEE = (EEE, EEE)
// GGG = (GGG, GGG)
// ZZZ = (ZZZ, ZZZ)`;

// const input = `LLR

// AAA = (BBB, BBB)
// BBB = (AAA, ZZZ)
// ZZZ = (ZZZ, ZZZ)`;

(async function main() {
  try {

    const { instructions, nodes } = parseInput(input);
    console.log(instructions);
    console.log(nodes);

    let reachedEnd = false;
    let steps = 0;

    let currentNode = nodes.get('AAA');
    console.log('AAA');
    console.log(currentNode);

    while (!reachedEnd) {
      const currentInstruction = instructions[steps % instructions.length];
      const nodeName = currentNode[currentInstruction];
      currentNode = nodes.get(nodeName);
      
      console.log(currentInstruction);
      console.log(nodeName);
      console.log(currentNode);
      
      steps++;
      if (nodeName === 'ZZZ') {
        reachedEnd = true;
      }
    }

    console.log(`Total steps: ${steps}`);

  } catch (err) {
    console.error(err);
  }
})();

function parseInput(input) {
  const [instructions, emptyLine, ...nodes] = input.split('\n');

  const nodeMap = new Map();

  for (const node of nodes) {
    const key = node.split(' ')[0];
    const [L, R] = node
      .match(/\(([^)]+)\)/)[1]
      .split(', ');
    nodeMap.set(key, { L, R });
  }

  return {
    instructions,
    nodes: nodeMap
  }
}
