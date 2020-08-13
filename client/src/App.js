import React, { useEffect, useState, useReducer, useRef } from "react"
import { useFetch, useLazyLoad, useVisibleParagraphs } from "./hooks"
import { fetchReducer } from "./reducerAndTypes"
import { AppContainer, Loader } from "./globalStyle"
import Search from "./components/Search"
import Paragraph from "./components/Paragraph"

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

  return (
    <AppContainer>
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
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
      </div>
      <Loader ref={bottomBoundaryRef} />
    </AppContainer>
  )
}

export default App
