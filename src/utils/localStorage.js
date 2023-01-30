export default class LocalStorage {
  static getItem(key) {
    const value = localStorage.getItem(key)
    return JSON.parse(value)
  }
  static setItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  }

  static clear() {
    localStorage.clear()
  }
}
