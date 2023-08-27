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
      withCredentials: true,
    })
  }

  getAxios = () => {
    const sleepTime = 2000
    if (process.env.NODE_ENV === "development") {
      return {
        ...this.axios,
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
    this.axios.defaults.headers.common.Authorization = `Bearer ${token}`
  }
  clearToken = () => {
    this.token = null
    this.axios.defaults.headers.common.Authorization = ""
  }
}

const axiosObj = new MyAxios()
export const axios = axiosObj.getAxios()
export const setToken = axiosObj.setToken
export const clearToken = axiosObj.clearToken
