import { getAllFromLocalStorage } from "./getAllFromLocalStorage"

export const saveToLocalStorage = (name, value) => {
  const now = new Date()
  const prevParams = getAllFromLocalStorage()
  const newParams = {
    ...prevParams,
    [name]: value,
    expiry: now.getTime() + 5000 //86400000 // 1 day
  }
  localStorage.setItem('WebLocalParams', JSON.stringify(newParams))
}