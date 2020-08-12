export const STACK_PARAGRAPHS = "STACK_PARAGRAPHS"

export const FETCHING_PARAGRAPHS = "FETCHING_PARAGRAPHS"

export const fetchReducer = (state, action) => {
  switch (action.type) {
    case STACK_PARAGRAPHS:
      return {
        ...state,
        paragraphs: state.paragraphs.concat(action.paragraphs),
      }
    case FETCHING_PARAGRAPHS:
      return { ...state, fetching: action.fetching }
    default:
      return state
  }
}
