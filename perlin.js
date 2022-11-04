class Perlin {
  gradients = {}
  memory = {}

  #getRandomPosition() {
    const theta = Math.random() * 2 * Math.PI
    return { x: Math.cos(theta), y: Math.sin(theta) }
  }

  #getProductBetweenPositions(x, y, tx, ty) {
    const distance = { x: x - tx, y: y - ty }
    let gradientPosition

    if (this.gradients[[tx, ty]]) {
      gradientPosition = this.gradients[[tx, ty]]
    } else {
      gradientPosition = this.#getRandomPosition()
      this.gradients[[tx, ty]] = gradientPosition
    }

    return distance.x * gradientPosition.x + distance.y * gradientPosition.y
  }

  #interpolate(x, a, b) {
    x = 6 * x ** 5 - 15 * x ** 4 + 10 * x ** 3
    return a + x * (b - a)
  }

  get(x, y) {
    if (this.memory.hasOwnProperty([x, y])) {
      return this.memory[[x, y]]
    }

    const fx = Math.floor(x)
    const fy = Math.floor(y)

    let topLeft = this.#getProductBetweenPositions(x, y, fx, fy)
    let topRight = this.#getProductBetweenPositions(x, y, fx + 1, fy)

    let bottomLeft = this.#getProductBetweenPositions(x, y, fx, fy + 1)
    let bottomRight = this.#getProductBetweenPositions(x, y, fx + 1, fy + 1)

    let xTop = this.#interpolate(x - fx, topLeft, topRight)
    let xBottom = this.#interpolate(x - fx, bottomLeft, bottomRight)

    const value = this.#interpolate(y - fy, xTop, xBottom)
    this.memory[[x, y]] = value
    return (value + 1) / 2
  }
}
