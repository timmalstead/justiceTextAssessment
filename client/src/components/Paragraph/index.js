import React, { useRef } from "react"
import TextItem from "../TextItem"
import Article from "./style"
import { v4 } from "uuid"

const Paragraph = ({ i, row, value, searchInput, visibleParagraphs }) => {
  const idRef = useRef(v4()).current

  const visible = visibleParagraphs.includes(idRef) ? true : false

  return (
    <Article className={"full-paragraph"} id={idRef} visible={visible} i={i}>
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
    </Article>
  )
}

export default Paragraph
