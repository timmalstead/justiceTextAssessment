import React, { useEffect, useState, useReducer } from "react"
import { STACK_PARAGRAPHS, FETCHING_PARAGRAPHS } from "./reducerTypes"
import useFetch from "./useFetch"
import TextItem from "./TextItem"
import "./App.css"

// const DATA_SIZE_HALF = "half"
const DATA_SIZE_FULL = "full"
const INTERVAL_TIME = 2000

const fetchReducer = (state, action) => {
  switch (action.type) {
    case STACK_PARAGRAPHS:
      return { ...state, images: state.images.concat(action.images) }
    case FETCHING_PARAGRAPHS:
      return { ...state, fetching: action.fetching }
    default:
      return state
  }
}

/** Application entry point */
function App() {
  const [paragraphData, paragraphDispatch] = useReducer(fetchReducer, {
    paragraphs: [],
    fetching: true,
  })

  const [data, setData] = useState([])
  const [value, setValue] = useState(0)
  const [searchInput, setSearchInput] = useState("")

  /** DO NOT CHANGE THE FUNCTION BELOW */
  useEffect(() => {
    setInterval(() => {
      // Find random bucket of words to highlight
      setValue(Math.floor(Math.random() * 10))
    }, INTERVAL_TIME)
  }, [])
  /** DO NOT CHANGE THE FUNCTION ABOVE */

  useFetch(DATA_SIZE_FULL, paragraphDispatch)

  useEffect(() => {
    const fetchData = async () => {
      let response = await fetch("/api/dataIdList?datasize=" + DATA_SIZE_FULL)
      let list = await response.json()

      let dataItems = await Promise.all(
        list.map(async (id) => {
          return (await fetch("/api/dataItem/" + id)).json()
        })
      )
      setData(dataItems)
    }

    fetchData()
  }, [])

  const handleChange = (e) => {
    setSearchInput(e.target.value)
  }

  return (
    <div className="App">
      <h2>JT Online Book</h2>
      <div>
        <input
          type="text"
          placeholder="Search text"
          value={searchInput}
          onChange={handleChange}
        />
      </div>
      {data.map((row, i) => {
        return (
          <p key={`p${i}`}>
            {row.map((textitem, j) => {
              if (
                searchInput.length > 0 &&
                textitem.text.search(searchInput) === -1
              ) {
                return null
              }

              return (
                <>
                  <TextItem key={`${i}${j}`} value={value} data={textitem} />
                </>
              )
            })}
          </p>
        )
      })}
    </div>
  )
}

export default App
