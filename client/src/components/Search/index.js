import React from "react"
import { SearchHolder, Input } from "./style"

const Search = ({ searchInput, setSearchInput }) => {
  const handleChange = ({ target }) => setSearchInput(target.value)

  return (
    <SearchHolder>
      <h2>JT Online Book</h2>
      <Input
        type="text"
        placeholder="Search Text"
        value={searchInput}
        onChange={handleChange}
      />
    </SearchHolder>
  )
}

export default Search
