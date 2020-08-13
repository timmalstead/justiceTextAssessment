import React from "react"
import Text from "./style"
// import "./TextItem.css"

const TextItem = ({ data, value, visible }) => {
  const highlight = Math.floor(data.info.start / 2000) % value === 0

  return (
    <Text
      visible={visible}
      highlight={highlight}
      contentEditable={true}
      suppressContentEditableWarning={true}
    >
      {`${data.text} `}
    </Text>
  )
}

export default TextItem
