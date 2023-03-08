import observe from "./observe"
const data = {
  a: {
    m: {
      n: 11
    }
  },
  b: 22,
  c: [1, 2, 3, 4, 5]
}

observe(data)
data.a.m.n++
data.c.push(6)
// console.log(data.c)
// data.c.splice(5, 1, 88, 99, [33, 44])
// console.log(data.c)

