export const linear = (x) => x

export const inSine = (x) => 1 - Math.cos((x * Math.PI) / 2)

export const outSine = (x) => Math.sin((x * Math.PI) / 2)

export const inOutSine = (x) => -(Math.cos(Math.PI * x) - 1) / 2

export const inQuad = (x) => x * x

export const outQuad = (x) => 1 - (1 - x) * (1 - x)

export const outInQuad = (x) => x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2

export const inCubic = (x) => x * x * x

export const outCubic = (x) => 1 - Math.pow(1 - x, 3)

export const inOutCubic = (x) => x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2

export const inQuart = (x) => x * x * x * x

export const outQuart = (x) => 1 - Math.pow(1 - x, 4)

export const inOutQuart = (x) => x < 0.5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2

export const inQuint = (x) => x * x * x * x * x

export const outQuint = (x) => 1 - Math.pow(1 - x, 5)

export const inOutQuint = (x) => x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2

export const inExpo = (x) => x === 0 ? 0 : Math.pow(2, 10 * x - 10)

export const outExpo = (x) => x === 1 ? 1 : 1 - Math.pow(2, -10 * x)

export const inOutExpo = (x) => x === 0 ? 0 : x === 1 ? 1 : x < 0.5 ? Math.pow(2, 20 * x - 10) / 2 : (2 - Math.pow(2, -20 * x + 10)) / 2

export const inCir = (x) => 1 - Math.sqrt(1 - Math.pow(x, 2))

export const outCir = (x) => Math.sqrt(1 - Math.pow(x - 1, 2))

export const inOutCir = (x) => x < 0.5 ? (1 - Math.sqrt(1 - Math.pow(2 * x, 2))) / 2 : (Math.sqrt(1 - Math.pow(-2 * x + 2, 2)) + 1) / 2

export const inBack = (x) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return c3 * x * x * x - c1 * x * x
}

export const outBack = (x) => {
  const c1 = 1.70158
  const c3 = c1 + 1
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2)
}

export const inOutBack = (x) => {
  const c1 = 1.70158
  const c2 = c1 * 1.525

  return x < 0.5
    ? (Math.pow(2 * x, 2) * ((c2 + 1) * 2 * x - c2)) / 2
    : (Math.pow(2 * x - 2, 2) * ((c2 + 1) * (x * 2 - 2) + c2) + 2) / 2
}

export const inElastic = (x) => {
  const c4 = (2 * Math.PI) / 3
  return x === 0 ? 0 : x === 1 ? 1 : -Math.pow(2, 10 * x - 10) * Math.sin((x * 10 - 10.75) * c4)
}

export const outElastic = (x) => {
  const c4 = (2 * Math.PI) / 3
  return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1
}

export const inOutElastic = (x) => {
  const c4 = (2 * Math.PI) / 3
  return x === 0 ? 0 : x === 1 ? 1 : Math.pow(2, -10 * x) * Math.sin((x * 10 - 0.75) * c4) + 1
}

export const inBounce = (x) => {
  return 1 - outBounce(1 - x)
}

export const outBounce = (x) => {
  const n1 = 7.5625
  const d1 = 2.75

  if (x < 1 / d1) {
    return n1 * x * x
  } else if (x < 2 / d1) {
    return n1 * (x -= 1.5 / d1) * x + 0.75
  } else if (x < 2.5 / d1) {
    return n1 * (x -= 2.25 / d1) * x + 0.9375
  } else {
    return n1 * (x -= 2.625 / d1) * x + 0.984375
  }
}

export const inOutBounce = (x) => {
  return x < 0.5
    ? (1 - outBounce(1 - 2 * x)) / 2
    : (1 + outBounce(2 * x - 1)) / 2
}

export default {
  linear,
  inSine,
  outSine,
  inOutSine,
  inQuad,
  outQuad,
  outInQuad,
  inCubic,
  outCubic,
  inOutCubic,
  inQuart,
  outQuart,
  inOutQuart,
  inQuint,
  outQuint,
  inOutQuint,
  inExpo,
  outExpo,
  inOutExpo,
  inCir,
  outCir,
  inOutCir,
  inBack,
  outBack,
  inOutBack,
  inElastic,
  outElastic,
  inOutElastic,
  inBounce,
  outBounce,
  inOutBounce
}