import { getAllFromLocalStorage } from "./getAllFromLocalStorage"

export const getFromLocalStorage = (name: string) => {
  const now = new Date()
  const params = getAllFromLocalStorage()
  if (params && params[name]?.value) {
    if (now.getTime() > params[name].expiry) {
      localStorage.removeItem('WebLocalParams')
      return false
    }
    return params[name].value
  }
  return false
}
