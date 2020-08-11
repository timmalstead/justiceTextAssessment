import React, { useRef } from "react"
import TextItem from "../TextItem"
import { v4 } from "uuid"

const Paragraph = ({ i, row, value, searchInput, visibleParagraphs }) => {
  const idRef = useRef(v4()).current

  const visible = visibleParagraphs.includes(idRef) ? true : false

  const paragraphStyle = {
    visibility: searchInput.length > 0 && !visible ? "hidden" : "visible",
  }

  return (
    <p className={"full-paragraph"} id={idRef} style={paragraphStyle}>
      {row.length
        ? row.map((textitem, j) => {
            if (
              searchInput.length > 0 &&
              textitem.text.search(searchInput) === -1
            ) {
              return null
            }

            return (
              <TextItem
                key={`${i}${j}`}
                value={value}
                data={textitem}
                visible={visible}
              />
            )
          })
        : null}
    </p>
  )
}

export default Paragraph
