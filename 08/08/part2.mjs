import input from './input.mjs';

// const input = `LR

// 11A = (11B, XXX)
// 11B = (XXX, 11Z)
// 11Z = (11B, XXX)
// 22A = (22B, XXX)
// 22B = (22C, 22C)
// 22C = (22Z, 22Z)
// 22Z = (22B, 22B)
// XXX = (XXX, XXX)`;

(async function main() {
  try {

    const { instructions, nodes, startingNodes } = parseInput(input);
    console.log(instructions);
    console.log(nodes);
    const fullCycles = new Array(6);

    for (let i = 0; i < startingNodes.length; i++) {
      let reachedEnd = false;
      let steps = 0;

      let currentNode = nodes.get(startingNodes[i]);
      console.log(startingNodes[i]);
      console.log(currentNode);

      while (!reachedEnd) {
        const currentInstruction = instructions[steps % instructions.length];
        const nodeName = currentNode[currentInstruction];
        currentNode = nodes.get(nodeName);
        
        console.log(currentInstruction);
        console.log(nodeName);
        console.log(currentNode);
        
        steps++;
        if (nodeName.endsWith('Z')) {
          reachedEnd = true;
        }
      }

      console.log(`Total steps: ${steps}`);
      fullCycles.push(steps);
    }

    console.log(`Total steps ${fullCycles.reduce(getLowestCommonMultiplier)}`);

  } catch (err) {
    console.error(err);
  }
})();

function parseInput(input) {
  const [instructions, emptyLine, ...nodes] = input.split('\n');
  const nodeMap = new Map();
  const startingNodes = [];

  for (const node of nodes) {
    const key = node.split(' ')[0];
    const [L, R] = node
      .match(/\(([^)]+)\)/)[1]
      .split(', ');
    nodeMap.set(key, { L, R });
    if (key.endsWith('A')) {
      startingNodes.push(key);
    }
  }

  return {
    instructions,
    nodes: nodeMap,
    startingNodes
  }
}

function getGreatestCommonDivisor(a, b) {
  return a
    ? getGreatestCommonDivisor(b % a, a)
    : b;
}

function getLowestCommonMultiplier(a, b) {
  return a * b / getGreatestCommonDivisor(a, b);
}