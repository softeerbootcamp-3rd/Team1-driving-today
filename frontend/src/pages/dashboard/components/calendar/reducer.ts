export interface DateState {
  year: number
  month: number
}

type DateAction =
  | {type: 'NEXT_MONTH'}
  | {type: 'PREV_MONTH'}
  | {type: 'SET_DATE'; payload: DateState}

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
  }
  return state
}
