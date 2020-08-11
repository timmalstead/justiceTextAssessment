import React, { useEffect, useState, useReducer, useRef } from "react"
import { STACK_PARAGRAPHS, FETCHING_PARAGRAPHS } from "./reducerTypes"
import useFetch from "./hooks/useFetch"
import useLazyLoad from "./hooks/useLazyLoad"
import TextItem from "./TextItem"
import "./App.css"

// const DATA_SIZE_HALF = "half"
const DATA_SIZE_FULL = "full"
const INTERVAL_TIME = 2000

const fetchReducer = (state, action) => {
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

/** Application entry point */
function App() {
  const [paragraphData, paragraphDispatch] = useReducer(fetchReducer, {
    paragraphs: [],
    fetching: true,
  })
  const [value, setValue] = useState(0)
  const [searchInput, setSearchInput] = useState("")
  const [paragraphCounter, setParagraphCounter] = useState(1)
  const [visibleParagraphs, setVisibleParagraphs] = useState([])
  const bottomBoundaryRef = useRef(null)

  /** DO NOT CHANGE THE FUNCTION BELOW */
  useEffect(() => {
    setInterval(() => {
      // Find random bucket of words to highlight
      setValue(Math.floor(Math.random() * 10))
    }, INTERVAL_TIME)
  }, [])
  /** DO NOT CHANGE THE FUNCTION ABOVE */

  useFetch(DATA_SIZE_FULL, paragraphDispatch, paragraphCounter)
  useLazyLoad(bottomBoundaryRef, setParagraphCounter)

  const handleChange = (e) => {
    setSearchInput(e.target.value)
  }

  return (
    <div className="App">
      <div
        style={{ width: "100%", position: "fixed", backgroundColor: "#FFF" }}
      >
        <h2>JT Online Book</h2>
        <input
          type="text"
          placeholder="Search text"
          value={searchInput}
          onChange={handleChange}
        />
      </div>
      <div style={{ paddingTop: "5em" }}>
        {paragraphData.paragraphs.length
          ? paragraphData.paragraphs.map((row, i) => {
              return (
                <p key={`p${i}`}>
                  {row.length
                    ? row.map((textitem, j) => {
                        if (
                          searchInput.length > 0 &&
                          textitem.text.search(searchInput) === -1
                        ) {
                          return null
                        }

                        return (
                          <>
                            <TextItem
                              key={`${i}${j}`}
                              value={value}
                              data={textitem}
                            />
                          </>
                        )
                      })
                    : null}
                </p>
              )
            })
          : null}
        <div ref={bottomBoundaryRef} />
      </div>
    </div>
  )
}

export default App
