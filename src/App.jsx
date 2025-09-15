

import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')



// add person function:
  const addPerson = (event) => {
  event.preventDefault()  // stop the page from reloading


  //- DUPLICATE CHECK:
  if (persons.some(person => person.name.toLowerCase()=== newName.toLowerCase())) {
    alert(`${newName} is already added to the phonebook!`)
    return
  }


  const personObject = { name: newName }

  setPersons(persons.concat(personObject)) // update the list
  setNewName('') // clear the input after adding
}




return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          name:<input 
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">add</button>
        </div>

      </form>


      <h2>Numbers</h2>
        <ul>
          {persons.map((person, index) => (
            <li key={index}>{person.name}</li>
          ))}
        </ul>
    </div>
  )
};

export default App