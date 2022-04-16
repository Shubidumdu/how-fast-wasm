import { greet, dfs as rustDfs } from 'my-wasm';
import '../style/index.scss';

const visited: boolean[][] = [...new Array(6)].map(() => Array(6).fill(false));

const target = [5, 5];

const start = [0, 0];

const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];

const dfs = () => {
  const stacks = [start];

  while (stacks.length) {
    const [row, col] = stacks.pop();
    const [targetRow, targetCol] = target;
    if (row === targetRow && col === targetCol) {
      console.log('JS target found!: ', `(${row}, ${col})`);
      break;
    }
    console.log(row, col);
    visited[row][col] = true;
    directions.forEach(([_row, _col]) => {
      const [nextRow, nextCol] = [row + _row, col + _col];
      const hasVisited = visited?.[nextRow]?.[nextCol];
      if (hasVisited === undefined || hasVisited === true) return;
      stacks.push([nextRow, nextCol]);
    });
  }
};

greet();
dfs();
rustDfs();
