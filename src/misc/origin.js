const Origin = {
  TOP_LEFT: [0, 0],
  TOP_RIGHT: [1, 0],
  BOTTOM_LEFT: [0, 1],
  BOTTOM_RIGHT: [1, 1],
  MIDDLE: [0.5, 0.5]
}

export const getOriginKey = (value) => {
  return Object.keys(Origin).find((key) => {
    const objValue = Origin[key]
    return objValue[0] === value[0] && objValue[1] === value[1]
  })
}

export default Origin
