import { dfs } from 'my-wasm';

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
  const onSearch = (row: number, col: number) => postMessage({
    type: 'search',
    performance: performance.now() - startTime,
    position: [row, col],
  });
  const onFinish = (row: number, col: number) => postMessage({
    type: 'finish',
    performance: performance.now() - startTime,
    position: [row, col],
  });
  dfs({ start, size, target }, onSearch, onFinish);
});
