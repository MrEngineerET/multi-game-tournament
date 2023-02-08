import pureAxios from "axios"
import localStorage from "./localStorage"

const token = localStorage.getItem("token")
export const axios = pureAxios.create({
  // eslint-disable-next-line no-undef
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    common: {
      "x-auth": token,
    },
  },
})
