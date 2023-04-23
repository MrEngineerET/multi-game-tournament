import pureAxios from "axios"
import LocalStorage from "./localStorage"
import { sleep } from "."

export class MyAxios {
  constructor() {
    this.token = LocalStorage.getItem("token")
    this.axios = pureAxios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        common: {
          Authorization: this.token ? `Bearer ${this.token}` : "",
        },
      },
    })
  }

  getAxios = () => {
    const sleepTime = 1000
    if (process.env.NODE_ENV === "development") {
      return {
        get: async (...rest) => {
          await sleep(sleepTime)
          return this.axios.get(...rest)
        },
        post: async (...rest) => {
          await sleep(sleepTime)
          return this.axios.post(...rest)
        },
        delete: async (...rest) => {
          await sleep(sleepTime)
          return this.axios.delete(...rest)
        },
        patch: async (...rest) => {
          await sleep(sleepTime)
          return this.axios.patch(...rest)
        },
        put: async (...rest) => {
          await sleep(sleepTime)
          return this.axios.put(...rest)
        },
      }
    } else {
      return this.axios
    }
  }
  setToken = (token) => {
    if (!token) throw new Error("no token")
    this.token = token
    this.axios = pureAxios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        common: {
          Authorization: this.token ? `Bearer ${this.token}` : "",
        },
      },
    })
  }
  clearToken = () => {
    this.token = null
    this.axios = pureAxios.create({
      baseURL: process.env.REACT_APP_API_URL,
      headers: {
        common: {
          Authorization: this.token ? `Bearer ${this.token}` : "",
        },
      },
    })
  }
}

const axiosObj = new MyAxios()
export const axios = axiosObj.getAxios()
export const setToken = axiosObj.setToken
export const clearToken = axiosObj.clearToken
