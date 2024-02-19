export function formatDate(year: number, month: number, day: number) {
  return `${('0000' + year).slice(-4)}-${('00' + month).slice(-2)}-${('00' + day).slice(-2)}`
}

export function getWeeks(year: number, month: number) {
  const date = new Date(year, month, 0)
  const daysCount = date.getDate()
  date.setDate(1)
  const offset = date.getDay() - 1
  const weeks = Array.from({length: 6}, (_, w) =>
    Array.from({length: 7}, (_v, i) => {
      const day = w * 7 + i - offset
      return day < 1 || day > daysCount ? null : day
    }),
  )
  return {weeks}
}

export function parseDateString(dateStr: string) {
  const date = new Date(dateStr)
  return {year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate(), date}
}

export function isDateInRange(date: Date, minDate?: Date, maxDate?: Date) {
  if (minDate && date < minDate) return false
  if (maxDate && date > maxDate) return false
  return true
}
