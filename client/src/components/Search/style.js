import styled from "styled-components"

export const SearchHolder = styled.div`
  background-color: #6320ee;
  width: 10.5em;
  padding: 0.5em 1em;
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 0 0 3em 0;
  color: white;
  > * {
    margin: 0 0 0.5em 0;
  }
`

SearchHolder.displayName = "SearchHolder"

export const Input = styled.input`
  width: 10em;
  border-radius: 0.5em;
  padding: 0.5em;
  outline: none;
  border: none;
  transition: transform 0.25s linear;
  color: #6320ee;

  :focus {
    transform: scale(1.1);
  }

  ::placeholder {
    color: #6320ee;
  }
`

Input.displayName = "Input"
