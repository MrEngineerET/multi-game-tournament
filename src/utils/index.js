export function sleep(ms) {
  if (ms == 0) return Promise.resolve()
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

export function shuffle(arr) {
  if (arr.length < 2) return arr

  const shuffledArr = [...arr] // create a copy of the array
  for (let i = shuffledArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)) //generate a random index
    ;[shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]] // swap elements
  }

  return shuffledArr
}
