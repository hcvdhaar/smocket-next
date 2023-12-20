export function sleep(ms: number = 1000) {
  return new Promise((res) => {
    setTimeout(() => {
      res(null);
    }, ms);
  });
}
