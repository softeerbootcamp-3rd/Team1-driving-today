export interface DateState {
  year: number
  month: number
}

export type DateAction =
  | {type: 'NEXT_MONTH'}
  | {type: 'PREV_MONTH'}
  | {type: 'SET_DATE'; payload: DateState}
  | {type: 'SET_DATE_STR'; payload: string}

export function dateReducer(state: DateState, action: DateAction) {
  if (action.type === 'NEXT_MONTH') {
    const newMonth = state.month + 1
    return {
      year: newMonth > 12 ? state.year + 1 : state.year,
      month: newMonth > 12 ? 1 : newMonth,
    }
  } else if (action.type === 'PREV_MONTH') {
    const newMonth = state.month - 1
    return {
      year: newMonth < 1 ? state.year - 1 : state.year,
      month: newMonth < 1 ? 12 : newMonth,
    }
  } else if (action.type === 'SET_DATE') {
    return action.payload
  } else if (action.type === 'SET_DATE_STR') {
    const date = new Date(action.payload)
    return {year: date.getFullYear(), month: date.getMonth() + 1}
  }
  return state
}
