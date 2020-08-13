//static imports
import React from "react"
//style imports from styled-components
import { SearchHolder, Input } from "./style"

//functional component for title and search bar
const Search = ({ searchInput, setSearchInput }) => {
  //function to lift user input to App component
  const handleChange = ({ target }) => setSearchInput(target.value)

  return (
    <SearchHolder>
      <h2>JT Online Book</h2>
      <Input
        //props denoting type of input, placeholder pseudo element, controlled value and onChange synthetic event
        type="text"
        placeholder="Search Text"
        value={searchInput}
        onChange={handleChange}
      />
    </SearchHolder>
  )
}

export default Search
