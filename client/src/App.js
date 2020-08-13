// Static imports. This app is small enough that I didn't see an advantage to be gained by introducing dynamic imports and enforcing code splitting
// React Imports
import React, { useEffect, useState, useReducer, useRef } from "react"
// custom hook imports
import { useFetch, useLazyLoad, useVisibleParagraphs } from "./hooks"
// reducer and type file import
import { fetchReducer } from "./reducerAndTypes"
// local styled component imports
import { AppContainer, Loader } from "./globalStyle"
// functional component imports
import Search from "./components/Search"
import Paragraph from "./components/Paragraph"

const INTERVAL_TIME = 2000

const App = () => {
  // useReducer hook used to manage the state both the fetch api and the data returned from it
  const [paragraphData, paragraphDispatch] = useReducer(fetchReducer, {
    paragraphs: [],
    fetching: true,
  })
  // value returned from Math.random function in setInterval->setValue function below
  const [value, setValue] = useState(0)
  // state to manage search bar
  const [searchInput, setSearchInput] = useState("")
  // state used to count what paragraphs have been called by useFetch and which are still to be balled
  const [paragraphCounter, setParagraphCounter] = useState(1)
  // state used to keep track of which paragraphs are intersecting with the viewport, and are thus visible to the user
  const [visibleParagraphs, setVisibleParagraphs] = useState([])
  // ref to attach to bottom of page, used to call a fetch function from useFetch when ref intersects with viewport, called paging
  const bottomBoundaryRef = useRef(null)

  /** DO NOT CHANGE THE FUNCTION BELOW */
  useEffect(() => {
    setInterval(() => {
      // Find random bucket of words to highlight
      setValue(Math.floor(Math.random() * 10))
    }, INTERVAL_TIME)
  }, [])
  /** DO NOT CHANGE THE FUNCTION ABOVE */

  // custom hook managing calls to the express api
  useFetch(paragraphDispatch, paragraphCounter)
  // custom hook managing ref that manages paging and
  useLazyLoad(bottomBoundaryRef, setParagraphCounter)
  // custom hook managing which paragraphs to render
  useVisibleParagraphs(".full-paragraph", paragraphData, setVisibleParagraphs)

  return (
    <AppContainer>
      {/* search functional component */}
      <Search searchInput={searchInput} setSearchInput={setSearchInput} />
      <div>
        {/* Map of paragraphData fetched using useFetch. A paragraph component is constructed for each piece of data returned.*/}
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
      {/* When viewport intersects with below component, a new call to the backend is made. This allows the user uninterrupted scrolling, without the need to call all the data in the api upon first loading the app.*/}
      <Loader ref={bottomBoundaryRef} />
    </AppContainer>
  )
}

export default App
