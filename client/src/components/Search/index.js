import React from "react"
import { SearchHolder, Input, Button } from "./style"

const Search = ({ searchInput, setSearchInput }) => {
  const handleChange = ({ target }) => setSearchInput(target.value)

  const handleScroll = ({ target }) => {
    const top = target.innerText === "UP" ? -400 : 400

    window.scrollBy({
      top,
      behavior: "smooth",
    })
  }

  return (
    <SearchHolder>
      <h2>JT Online Book</h2>
      <Input
        type="text"
        placeholder="Search Text"
        value={searchInput}
        onChange={handleChange}
      />
      {/* <Button type="button" onClick={handleScroll}>
        UP
      </Button>
      <Button type="button" onClick={handleScroll}>
        DOWN
      </Button> */}
    </SearchHolder>
  )
}

export default Search
