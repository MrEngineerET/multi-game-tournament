import { axios, setToken, clearToken } from "./axios"
import LocalStorage from "./localStorage"
export const auth = {
  isAuthenticated: false,
  // send username and password to the auth server and get back credentials
  async logInWithEmailAndPassword(email, password) {
    auth.isAuthenticated = true
    const res = (await axios.post("/user/login", { email, password })).data
    LocalStorage.setItem("token", res.token)
    setToken(res.token)
    return res.data.user
  },
  async signup(email, password, firstName, lastName) {
    const res = (
      await axios.post("/user/signup", {
        email,
        password,
        firstName,
        lastName,
      })
    ).data
    LocalStorage.setItem("token", res.token)
    setToken(res.token)
    return res
  },
  // remove local credentials and notify the auth server that the user logged out
  async logout() {
    auth.isAuthenticated = false
    await axios.get("/user/logout")
    LocalStorage.removeItem("token")
    clearToken()
  },
  // when the user navigates, make sure that their credentials are still valid
  async checkAuth() {
    return Promise.resolve()
  },
  // get the user's profile
  async getIdentity() {
    const token = LocalStorage.getItem("token")
    if (!token) return null
    const res = (await axios.get("/user/me")).data
    const user = res.data.data
    return user
  },
}
