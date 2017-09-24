export default function createMatrix(maxX, maxY) {
  return new Array(maxY)
    .fill(null)
    .map(row => new Array(maxX).fill(null))
}