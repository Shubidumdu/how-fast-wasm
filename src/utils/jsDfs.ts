const makeVisited = ([row, col]: [number, number]): boolean[][] =>
  [...new Array(row)].map(() => new Array(col).fill(false));

const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];

export type DfsInput = {
  start: [number, number],
  size: [number, number],
  target: [number, number],
  onSearch: (row: number, col: number) => void,
  onFinish: (row: number, col: number) => void,
};

export const jsDfs =
({ start, size, target, onFinish, onSearch }: DfsInput) => {
  const stacks = [start];
  const visited = makeVisited(size);

  while (stacks.length) {
    const [row, col] = stacks.pop();
    const [targetRow, targetCol] = target;
    if (row === targetRow && col === targetCol) {
      console.log('JS target found!: ', `(${row}, ${col})`);
      onSearch(row, col);
      onFinish(row, col);
      break;
    }
    console.log(row, col);
    visited[row][col] = true;
    onSearch(row, col);
    directions.forEach(([_row, _col]) => {
      const [nextRow, nextCol] = [row + _row, col + _col];
      const hasVisited = visited?.[nextRow]?.[nextCol];
      if (hasVisited === undefined || hasVisited === true) return;
      stacks.push([nextRow, nextCol]);
    });
  }
};
