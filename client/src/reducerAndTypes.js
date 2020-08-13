// Strings assigned to constant variables that will be used as reducer objects in the useFetch hook
export const STACK_PARAGRAPHS = "STACK_PARAGRAPHS"

export const FETCHING_PARAGRAPHS = "FETCHING_PARAGRAPHS"

// Reducer used in useFetch hook to interact with fetch api. Returns state regarding current stage of fetching process and paragraphs fetched from api and held in state
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
