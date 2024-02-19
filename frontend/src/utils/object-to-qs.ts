// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function objectToQS(obj: Record<string, any>) {
  const params = new URLSearchParams()
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      params.append(key, obj[key])
    }
  }
  return params.toString()
}
