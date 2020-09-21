
const square = (x) => x * x

const callFunc100 = (func) => {
  let sum = 0
  for (let i = 0; i < 1000000; i++) {
    sum += func(2)
  }
  return sum
}

const square100 = (x) => {
  let sum = 0
  for (let i = 0; i < 1000000; i++) {
    sum += x * x
  }
  return sum
}

test('test inlining v8', () => {
  console.time('0')
  const v = callFunc100(square)
  console.log(v)
  console.timeEnd('0')

  console.time('1')
  const v1 = square100(2)
  console.log(v1)
  console.timeEnd('1')
})
