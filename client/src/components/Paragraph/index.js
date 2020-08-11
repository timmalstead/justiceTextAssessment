import React from "react"
import TextItem from "../TextItem"

const Paragraph = ({ i, row, value, searchInput }) => (
  <p>
    {row.length
      ? row.map((textitem, j) => {
          if (
            searchInput.length > 0 &&
            textitem.text.search(searchInput) === -1
          ) {
            return null
          }

          return <TextItem key={`${i}${j}`} value={value} data={textitem} />
        })
      : null}
  </p>
)

export default Paragraph
