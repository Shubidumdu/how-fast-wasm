export type DfsInput = {
  start: [number, number],
  size: [number, number],
  target: [number, number],
  onSearch: (row: number, col: number) => void,
  onFinish: (row: number, col: number) => void,
};

export type RequestEventData = {
  start: [number, number],
  size: [number, number],
  target: [number, number],
}

export type ResponseEventData = {
  type: 'search',
  position: [number, number],
} | {
  type: 'finish',
  performance: number,
  position: [number, number],
}

addEventListener('message', ({ data }: MessageEvent<RequestEventData>) => {
  const startTime = performance.now();
  const { start, size, target } = data;
  const makeVisited = ([row, col]: [number, number]): boolean[][] =>
    [...new Array(row)].map(() => new Array(col).fill(false));

  const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]];

  const stacks = [start];
  const visited = makeVisited(size);

  while (stacks.length) {
    const [row, col] = stacks.pop();
    const [targetRow, targetCol] = target;
    if (row === targetRow && col === targetCol) {
      postMessage({
        type: 'finish',
        performance: performance.now() - startTime,
        position: [row, col],
      });
      break;
    }
    visited[row][col] = true;
    postMessage({
      type: 'search',
      position: [row, col],
    });
    directions.forEach(([_row, _col]) => {
      const [nextRow, nextCol] = [row + _row, col + _col];
      const hasVisited = visited?.[nextRow]?.[nextCol];
      if (hasVisited === undefined || hasVisited === true) return;
      stacks.push([nextRow, nextCol]);
    });
  }
});

