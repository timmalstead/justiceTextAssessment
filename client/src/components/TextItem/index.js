import React from "react"
import "./TextItem.css"

const TextItem = ({ data, value, visible }) => {
  const getHighlight = () =>
    Math.floor(data.info.start / 2000) % value === 0 ? "highlight" : null

  return (
    <span
      style={{ display: visible ? "initial" : "none" }}
      className={visible ? getHighlight() : null}
      contentEditable={true}
      suppressContentEditableWarning={true}
    >
      {`${data.text} `}
    </span>
  )
}

export default TextItem
