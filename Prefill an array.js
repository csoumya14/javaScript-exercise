const prefill = (n, v) => {
  const l = parseInt(n)
  const a = Array.from(Array(l).keys())
  a.fill(v, 0, a.length)
  console.log(typeof v)
}
prefill(3, prefill(2, 3))
