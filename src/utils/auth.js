/* eslint-disable no-unused-vars */
import { axios } from "./axios"
import LocalStorage from "./localStorage"
export const auth = {
  isAuthenticated: false,
  // send username and password to the auth server and get back credentials
  async login(email, password) {
    auth.isAuthenticated = true
    const res = (await axios.post("/user/login", { email, password })).data
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
    return res
  },
  // remove local credentials and notify the auth server that the user logged out
  async logout() {
    auth.isAuthenticated = false
    await axios.get("/user/logout")
    LocalStorage.removeItem("token")
  },
  // when the user navigates, make sure that their credentials are still valid
  async checkAuth(user) {
    return Promise.resolve()
  },
  // get the user's profile
  async getIdentity() {
    const res = (await axios.get("/user/me")).data
    const user = res.data.data
    return user
  },
  // get the user permissions (optional)
  async getPermissions() {
    return Promise.resolve()
  },
  // when the dataProvider returns an error, check if this is an authentication error
  async checkError(error) {
    return Promise.resolve()
  },
}
