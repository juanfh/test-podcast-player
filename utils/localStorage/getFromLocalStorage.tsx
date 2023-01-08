import { getAllFromLocalStorage } from "./getAllFromLocalStorage"
import { removeFromLocalStorage } from "./removeFromLocalStorage"

export const getFromLocalStorage = (name: string) => {
  const now = new Date()
  const params = getAllFromLocalStorage()
  if (params && params[name]?.value) {
    if (now.getTime() > params[name].expiry) {
      removeFromLocalStorage(name)
      return false
    }
    return params[name].value
  }
  return false
}
