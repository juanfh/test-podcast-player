import { getAllFromLocalStorage } from "./getAllFromLocalStorage"

export const saveToLocalStorage = (name, value) => {
  const now = new Date()
  const prevParams = getAllFromLocalStorage()
  const newParams = {
    ...prevParams,
    [name]: value,
    expiry: now.getTime() + 86400000
  }
  localStorage.setItem('WebLocalParams', JSON.stringify(newParams))
}