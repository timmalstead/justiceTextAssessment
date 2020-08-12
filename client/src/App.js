import React, { useEffect, useState, useReducer, useRef } from "react"
import { useFetch, useLazyLoad, useVisibleParagraphs } from "./hooks"
import { fetchReducer } from "./reducerAndTypes"
import Paragraph from "./components/Paragraph"
import "./App.css"

const INTERVAL_TIME = 2000

const App = () => {
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

  useFetch(paragraphDispatch, paragraphCounter)
  useLazyLoad(bottomBoundaryRef, setParagraphCounter)
  useVisibleParagraphs(".full-paragraph", paragraphData, setVisibleParagraphs)

  const handleChange = (e) => {
    setSearchInput(e.target.value)
  }

  return (
    <div className="App">
      <div
        style={{
          height: "6em",
          position: "fixed",
          left: 0,
          top: 0,
          backgroundColor: "#FFF",
        }}
      >
        <h2>JT Online Book</h2>
        <input
          type="text"
          placeholder="Search text"
          value={searchInput}
          onChange={handleChange}
        />
        <button
          type="button"
          onClick={() =>
            window.scrollBy({
              left: 0,
              top: -400,
              behavior: "smooth",
            })
          }
        >
          Up
        </button>
        <button
          type="button"
          onClick={(e) =>
            window.scrollBy({
              left: 0,
              top: 400,
              behavior: "smooth",
            })
          }
        >
          Down
        </button>
      </div>
      <div>
        {paragraphData.paragraphs.length
          ? paragraphData.paragraphs.map((row, i) => (
              <Paragraph
                key={`p${i}`}
                i={i}
                row={row}
                value={value}
                searchInput={searchInput}
                visibleParagraphs={visibleParagraphs}
              />
            ))
          : null}
        <div
          ref={bottomBoundaryRef}
          style={{ height: "1000px", visibility: "hidden" }}
        />
      </div>
    </div>
  )
}

export default App
