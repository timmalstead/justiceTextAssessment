import { useEffect, useState } from "react"
import { STACK_PARAGRAPHS, FETCHING_PARAGRAPHS } from "../reducerAndTypes"

// hook that accepts two arguments
//  1) A dispatch function used to send objects and data back to the reducer managing the state of fetched data
//  2) A counter managed by the useLazyLoad hook to inform this hook which paragraphs to fetch
const useFetch = (dispatch, counter) => {
  // a boolean used to differentiate between the initial api call and all call afterwards
  const [isFirstCall, setIsFirstCall] = useState(true)
  // an array that will be used to call fetch promises before they are called
  const [savedListOfPromises, setSavedListOfPromises] = useState([])
  useEffect(() => {
    //data fetching function to be called each time a property in the useEffect dependency array is changed
    const fetchData = async () => {
      try {
        //sets fetching paragraphs boolean in reducer to true
        dispatch({ type: FETCHING_PARAGRAPHS, fetching: true })
        //if isFirstCall is true. i.e. if app is loading
        if (isFirstCall) {
          //sets isFirstCall to false so this block of code will only execute on the first call
          setIsFirstCall(false)
          // executes initial call to api to fetch list of data to be called in subsequent requests. With all requests to the api, I chose to fill in the full url despite their being a proxy already set up. I did this so the backend can serve a dev or served mock production environment.
          const response = await fetch(`http://localhost:8080/api/dataIdList`)
          //parses above promise object into JSON
          const list = await response.json()
          //changes each id in the fetched list to an unfulfilled promise that may be called later
          const listOfPromises = list.map((id) =>
            // promise object containing a fetch call for one id that will be turned into JSON upon reciept
            fetch(`http://localhost:8080/api/dataItem/${id}`).then((data) =>
              data.json()
            )
          )
          // sets above list of promises into local state
          setSavedListOfPromises(listOfPromises)
          // calls list of first paragraphs to return.
          // Note that it does not call these from state, but rather from the variable we inserted into state. This is done this way purposefully, as the state setting function operates asynchronously and we cannot be certain it will have completed by the time the following expression begins execution
          const paragraphs = await Promise.all(
            listOfPromises.slice(0, counter + 1)
          )
          // sends returned data back to reducers. Because we constructed the promises to resolve to JSON, we do not need to do it here
          dispatch({ type: STACK_PARAGRAPHS, paragraphs })
          //if isFirstCall is false
        } else {
          if (savedListOfPromises.length) {
            // calls two additional promises based on the current value of the counter. this is triggered by the bottom ref intersecting with the browser's viewport
            const paragraphs = await Promise.all(
              savedListOfPromises.slice(counter - 1, counter + 1)
            )
            // returns fetched data to reducer
            dispatch({ type: STACK_PARAGRAPHS, paragraphs })
          }
        }
        // sets fetch indicator in reducer to false
        dispatch({ type: FETCHING_PARAGRAPHS, fetching: false })
      } catch (err) {
        //if an error is thrown at any point in the try block, the dispatch will set to false and the error will be returned
        dispatch({ type: FETCHING_PARAGRAPHS, fetching: false })
        return err
      }
    }
    //calls above async function each time anything in the below array changes
    fetchData()
  }, [
    dispatch,
    counter,
    isFirstCall,
    setIsFirstCall,
    savedListOfPromises,
    setSavedListOfPromises,
  ])
}

export default useFetch
