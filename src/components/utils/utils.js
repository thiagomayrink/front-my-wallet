export function transformToDecimal(value) {
  return Number(value / 100)
    .toFixed(2)
    .replace(".", ",");
}
