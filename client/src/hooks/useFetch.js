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
          setIsFirstCall(false)
          const response = await fetch(`/api/dataIdList?datasize=${DATA_SIZE}`)
          const list = await response.json()
          const listOfPromises = list.map((id) =>
            fetch(`/api/dataItem/${id}`).then((data) => data.json())
          )
          setSavedListOfPromises(listOfPromises)
          const paragraphs = await Promise.all(
            listOfPromises.slice(0, counter + 1)
          )
          // console.log(alt, paragraphs)
          dispatch({ type: STACK_PARAGRAPHS, paragraphs })
        } else {
          if (savedListOfPromises.length) {
            const paragraphs = [
              await Promise.resolve(savedListOfPromises[counter]),
            ]
            dispatch({ type: STACK_PARAGRAPHS, paragraphs })
          }
        }
        dispatch({ type: FETCHING_PARAGRAPHS, fetching: false })
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
