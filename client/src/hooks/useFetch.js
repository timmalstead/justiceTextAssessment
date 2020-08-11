import { useEffect, useState } from "react"
import { STACK_PARAGRAPHS, FETCHING_PARAGRAPHS } from "../reducerTypes"

const useFetch = (DATA_SIZE, dispatch, counter) => {
  const [isFirstCall, setIsFirstCall] = useState(true)
  const [savedListOfPromises, setSavedListOfPromises] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: FETCHING_PARAGRAPHS, fetching: true })
        if (isFirstCall) {
          const response = await fetch(`/api/dataIdList?datasize=${DATA_SIZE}`)
          const list = await response.json()
          const listOfPromises = list.map((id) =>
            fetch(`/api/dataItem/${id}`).then((data) => data.json())
          )
          const paragraphs = await Promise.all(
            listOfPromises.slice(0, counter + 1)
          )
          setIsFirstCall(false)
          dispatch({ type: STACK_PARAGRAPHS, paragraphs })
          dispatch({ type: FETCHING_PARAGRAPHS, fetching: false })
          setSavedListOfPromises(listOfPromises)
          console.log("first call")
        } else {
          if (savedListOfPromises.length) {
            const paragraphs = await Promise.all(savedListOfPromises[counter])
            dispatch({ type: STACK_PARAGRAPHS, paragraphs })
            dispatch({ type: FETCHING_PARAGRAPHS, fetching: false })
            console.log("after call", counter)
          }
        }
      } catch (err) {
        dispatch({ type: FETCHING_PARAGRAPHS, fetching: false })
        return err
      }
    }

    fetchData()
  }, [
    DATA_SIZE,
    dispatch,
    counter,
    isFirstCall,
    setIsFirstCall,
    savedListOfPromises,
    setSavedListOfPromises,
  ])
}

export default useFetch
