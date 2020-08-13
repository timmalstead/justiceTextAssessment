import styled from "styled-components"

//CSS styling for fetched paragraph elements. To lessen amount of calculations needed, I supplied a fixed height in pixels. Styling info also includes infor for :hover, :focus and :focus-within states
const Article = styled.p`
  width: 65%;
  margin: 0.5em auto;
  overflow-wrap: break-word;
  height: 370px;
  font-family: Georgia, Times, serif;
  font-size: 15px;
  font-weight: 300;
  box-sizing: border-box;
  padding: 0.6em 0.55em 0 0.55em;
  box-shadow: 0 0 0.25em #6320ee88;
  border-radius: 1em;
  transition: transform 0.15s linear;
  background-color: white;

  :hover,
  :focus,
  :focus-within {
    transform: scale(1.02);
  }
`

Article.displayName = "Article"

export default Article
