import NepaliDate from 'nepali-datetime'
import { MAX_NEPALI_YEAR, MIN_NEPALI_YEAR, NP_MONTHS_DATA } from '../constants'

const WEEK_COUNT = 7

export interface ICalendarDate {
  index: number
  active: boolean
  year: number
  month0: number
  date: number | null
}

const getMonthData = (year: number, month0: number) => {
  if (year < MIN_NEPALI_YEAR || year > MAX_NEPALI_YEAR) {
    return null
  }
  return NP_MONTHS_DATA[year - MIN_NEPALI_YEAR][0][month0]
}

export const getCalendarTableArray = (
  year: number,
  month0: number
): ICalendarDate[] => {
  const currentMonthDays = getMonthData(year, month0)
  if (!currentMonthDays) {
    return []
  }

  const startWeekDay = new NepaliDate(year, month0, 1).getDay()

  const [prevMonthYear, prevMonth0] = month0 === 0 ? [year - 1, 11] : [year, month0 - 1]
  const prevMonthDays = getMonthData(prevMonthYear, prevMonth0)

  const [nextMonthYear, nextMonth0] = month0 === 11 ? [year + 1, 0] : [year, month0 + 1]

  const totalCalendarDays =
    Math.ceil((startWeekDay + currentMonthDays) / WEEK_COUNT) * WEEK_COUNT

  const calendar: ICalendarDate[] = Array(totalCalendarDays)
    .fill(null)
    .map((_, index) => {
      let dt, mon0, yr, active

      if (index < startWeekDay) {
        // Previous month
        dt = prevMonthDays ? prevMonthDays - (startWeekDay - index - 1) : null
        mon0 = prevMonth0
        yr = prevMonthYear
        active = false
      } else if (index < startWeekDay + currentMonthDays) {
        // Current month
        dt = index - startWeekDay + 1
        mon0 = month0
        yr = year
        active = true
      } else {
        // Next month
        dt = index - (startWeekDay + currentMonthDays) + 1
        mon0 = nextMonth0
        yr = nextMonthYear
        active = false
      }

      return { index, active, year: yr, month0: mon0, date: dt }
    })

  return calendar
}
