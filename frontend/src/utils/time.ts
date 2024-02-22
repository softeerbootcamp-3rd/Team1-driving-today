const DAY = 86400000
const HOUR = 3600000
const MINUTE = 60000

export function timestampToString(millis: number) {
  const diff = new Date().getTime() - millis
  if (diff >= DAY) return `${Math.floor(diff / DAY)}일 전`
  if (diff >= HOUR) return `${Math.floor(diff / HOUR)}시간 전`
  if (diff >= MINUTE) return `${Math.floor(diff / MINUTE)}분 전`
  return `방금전`
}
