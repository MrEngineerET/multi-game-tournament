/* eslint-disable no-unused-vars */
export const auth = {
  isAuthenticated: false,
  // send username and password to the auth server and get back credentials
  async signin(user) {
    auth.isAuthenticated = true
    return user
  },
  // remove local credentials and notify the auth server that the user logged out
  async signout() {
    auth.isAuthenticated = false
  },
  // when the user navigates, make sure that their credentials are still valid
  async checkAuth(user) {
    return Promise.resolve()
  },
  // get the user's profile
  async getIdentity() {
    return Promise.resolve
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
