import moment from "moment"
import "moment/locale/es"

export const formatDate = (date: string, locale: string = "es") => {
  moment.locale(locale)
  return moment(date).format("DD MMM YYYY")
}
