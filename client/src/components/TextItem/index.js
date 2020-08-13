import React, { memo } from "react"
import Text from "./style"

const TextItem = ({ data, value, visible }) => (
  <Text
    highlight={visible ? ((data.info.start / 2000) | 0) % value === 0 : null}
    contentEditable
    suppressContentEditableWarning
  >
    {`${data.text} `}
  </Text>
)

export default memo(TextItem)
