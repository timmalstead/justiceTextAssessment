// static imports
// React import, including ref import
import React, { useRef } from "react"
// styled-components imports
import TextItem from "../TextItem"
import Article from "./style"
// imprt of v4 algorithm from uuid, which will be used to make my unique identifiers to denote visible elements
import { v4 } from "uuid"

// paragraph functional component, with number data from map function in App.js, row from fetched data, interval generated value, searchInput and list of visible paragraphs elements all passed down
const Paragraph = ({ i, row, value, searchInput, visibleParagraphs }) => {
  // ref created with fresh unique identifier attached to .current property
  const idRef = useRef(v4()).current

  // boolean indicating whether visibleParagraphs array includes the unique id
  const visible = visibleParagraphs.includes(idRef) ? true : false

  // Created Article component containing a map of data generated from row prop
  return (
    <Article className={"full-paragraph"} id={idRef}>
      {row.length
        ? // if row prop contains data, a TextItem component will be created from each piece of data.
          // if searchInput is present, the TextItem component that contains that same data will be rendered and will not be if no data matches
          row.map((textitem, j) => {
            if (
              searchInput.length > 0 &&
              textitem.text.search(searchInput) === -1
            ) {
              return null
            }
            return (
              <TextItem
                //props passed down to TextItem component including fetched value and data, and visible boolean data created above
                key={`${i}${j}`}
                value={value}
                data={textitem}
                visible={visible}
              />
            )
          })
        : null}
    </Article>
  )
}

export default Paragraph
