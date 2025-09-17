//This only shows the search input. 
// It receives the current searchTerm and a handler via props.//

// src/components/Filter.js
const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      Search: <input value={searchTerm} onChange={handleSearchChange} />
    </div>
  )
}

export default Filter


