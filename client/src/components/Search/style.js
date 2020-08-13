import styled from "styled-components"
import { main } from "../../colors"

export const SearchHolder = styled.div`
  background-color: ${main};
  width: 12em;
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

export const Input = styled.input`
  width: 10em;
  border-radius: 0.5em;
  padding: 0.5em;
  outline: none;
  border: none;
  transition: transform 0.25s linear;
  color: ${main};

  :focus {
    transform: scale(1.1);
  }

  ::placeholder {
    color: ${main};
  }
`
