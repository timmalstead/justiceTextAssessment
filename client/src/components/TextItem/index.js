import React from "react"
import Text from "./style"

const TextItem = ({ data, value }) => {
  const highlight = Math.floor(data.info.start / 2000) % value === 0

  return (
    <Text
      highlight={highlight}
      contentEditable={true}
      suppressContentEditableWarning={true}
    >
      {`${data.text} `}
    </Text>
  )
}

export default TextItem
