export default class LocalStorage {
  static getItem(key) {
    try {
      const value = localStorage.getItem(key)
      return value ? JSON.parse(value) : null
    } catch (error) {
      console.error(`Error getting "${key}" from localStorage: ${error}`)
      return null
    }
  }

  static setItem(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value))
    } catch (error) {
      console.error(`Error setting "${key}" in localStorage: ${error}`)
    }
  }

  static clear() {
    try {
      localStorage.clear()
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`)
    }
  }

  static removeItem(key) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Error removing "${key}" from localStorage: ${error}`)
    }
  }

  static getKeys() {
    try {
      const keys = []
      for (let i = 0; i < localStorage.length; i++) {
        keys.push(localStorage.key(i))
      }
      return keys
    } catch (error) {
      console.error(`Error getting keys from localStorage: ${error}`)
      return []
    }
  }
}
