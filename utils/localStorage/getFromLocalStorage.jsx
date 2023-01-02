import { getAllFromLocalStorage } from "./getAllFromLocalStorage"

export const getFromLocalStorage = (name) => {
  const now = new Date()
  const params = getAllFromLocalStorage()
  if (params && params[name]) {
    console.log(`getFromLocalStorage: ${now.getTime()} - ${params.expiry}`)
    if (now.getTime() > params.expiry) {
      console.log('getFromLocalStorage: expired')
      // Remove the item from storage
      localStorage.removeItem('WebLocalParams')
      return false
    } else {
      return params[name]
    }

    return params[name]
  }
  return false
}
