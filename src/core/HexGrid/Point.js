export default class Point {
  constructor(x, y) {
    this.x = x
    this.y = y
  }
  add(b) {
    return new Point(
      this.x + b.x,
      this.y + b.y
    )
  }
  subtract(b) {
    return new Point(
      this.x - b.x,
      this.y - b.y
    )
  }
  multi(b) {
    const a = this
    return new Point(
      a.x * b.x,
      a.y * b.y
    )
  }
  scale(n) {
    return new Point(
      this.x * n,
      this.y * n
    )
  }
}