import { useEffect } from "react"
import { STACK_PARAGRAPHS, FETCHING_PARAGRAPHS } from "./reducerTypes"

const useFetch = (DATA_SIZE, dispatch) => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: FETCHING_PARAGRAPHS, fetching: true })

        const response = await fetch(`/api/dataIdList?datasize=${DATA_SIZE}`)
        const list = await response.json()

        const arrOfPromises = list.map((id) =>
          fetch(`/api/dataItem/${id}`).then((data) => data.json())
        )

        const paragraphs = await Promise.all(arrOfPromises)

        dispatch({ type: STACK_PARAGRAPHS, paragraphs })
        dispatch({ type: FETCHING_PARAGRAPHS, fetching: false })
      } catch (err) {
        dispatch({ type: FETCHING_PARAGRAPHS, fetching: false })
        return err
      }
    }

    fetchData()
  }, [DATA_SIZE, dispatch])
}

export default useFetch
