import styled from "styled-components"

import { main, contrast } from "../../colors"

export const SearchHolder = styled.div`
  width: 12em;
  padding: 0.5em 0;
  position: fixed;
  left: 0;
  top: 0;
  background-color: ${main};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  border-radius: 0 0 20px 0;
  color: white;

  > * {
    margin: 0 0 0.5em 0;
    color: white;
  }
`

export const Input = styled.input`
  border-radius: 0.5em;
  padding: 0.5em;
  outline: none;
  border: none;
  transition: transform 0.25s linear;

  :focus {
    transform: scale(1.1);
  }
`

export const Button = styled.button`
  font-size: 1.1em;
  font-weight: bold;
  background-color: ${contrast};
  width: 5em;
  border-radius: 1em;
  padding: 0.5em;
  margin: 0.5em 0;
  outline: none;
  border: none;
  cursor: pointer;
  transition: all 0.25s linear;

  :hover,
  :focus {
    color: ${main};
    background-color: white;
  }
`
