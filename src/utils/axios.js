import pureAxios from "axios"
import localStorage from "./localStorage"

const token = localStorage.getItem("token")

const axioss = pureAxios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    common: {
      "x-auth": token,
    },
  },
})

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, ms)
  })
}

export const getAxios = () => {
  if (process.env.NODE_ENV === "development") {
    return {
      get: async (...rest) => {
        await sleep(1000)
        return axioss.get(...rest)
      },
      post: async (...rest) => {
        await sleep(1000)
        return axioss.post(...rest)
      },
      delete: async (...rest) => {
        await sleep(1000)
        return axioss.delete(...rest)
      },
      patch: async (...rest) => {
        await sleep(1000)
        return axioss.patch(...rest)
      },
      put: async (...rest) => {
        await sleep(1000)
        return axioss.put(...rest)
      },
    }
  } else {
    return axioss
  }
}

export const axios = getAxios()
