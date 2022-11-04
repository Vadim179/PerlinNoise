const canvas = document.querySelector("canvas")
const context = canvas.getContext("2d")

canvas.width = innerWidth
canvas.height = innerHeight

const perlin = new Perlin()

const chunkSize = 10
const resolution = 8

const pixelSize = canvas.width / resolution
const pixelCount = chunkSize / resolution

for (let y = 0; y < chunkSize; y += pixelCount / chunkSize) {
  for (let x = 0; x < chunkSize; x += pixelCount / chunkSize) {
    context.fillStyle = getColorByPerlinValue(perlin.get(x, y))

    context.fillRect(
      (x / chunkSize) * canvas.width,
      (y / chunkSize) * canvas.width,
      pixelSize,
      pixelSize,
    )
  }
}

function getColorByPerlinValue(perlinValue) {
  if (perlinValue > 0.7) {
    return "#73A9AD"
  }

  if (perlinValue > 0.6) {
    return "#90C8AC"
  }

  if (perlinValue > 0.5) {
    return "#F2D388"
  }

  if (perlinValue > 0.4) {
    return "#424582"
  }

  if (perlinValue > 0.3) {
    return "#362f63"
  }

  return "#320f3b"
}
