//static imports
//importing react and React.memo higher order component
import React, { memo } from "react"
import Text from "./style"

//Text functional component
const TextItem = ({ data, value, visible }) => (
  <Text
    // If visible prop is true, executes calculation function
    // I changed the calculation function from using Math.floor() to a bitwise OR operator. This provides the same functionality but with a marked performance boost
    // If visible prop is true and calculation evalutes to true, the prop will send infor the Text styled component to change the background and text colors of component
    highlight={visible ? ((data.info.start / 2000) | 0) % value === 0 : null}
    // Allows user to edit content. Note that edits are only on the client side, and will not be persitent
    contentEditable
    suppressContentEditableWarning
  >
    {`${data.text} `}
  </Text>
)

// Exports component wrapped in react memoization function. This allows us save data and avoid rerenders if exact combinations of props are reused. As the value can only resolve to ten values, this will save us quite a bit performance wise
export default memo(TextItem)
