

import { useState } from 'react'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')


// add person function:
  const addPerson = (event) => {
  event.preventDefault()  // stop the page from reloading


  //- DUPLICATE CHECK:
  if (persons.some(person => person.name.toLowerCase()=== newName.toLowerCase())) {
    alert(`${newName} is already added to the phonebook!`)
    return
  }


  const personObject = { 
    name: newName,
    number: newNumber
  }

  setPersons(persons.concat(personObject)) // update the list
  setNewName('') // clear the input after adding
  setNewNumber('')// clear the number input after adding
}




return (
    <div>
      <h2>Phonebook</h2>

      <form onSubmit={addPerson}>
        <div>
          Name:<input 
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        <div>
          Number:<input
          value={newNumber}
          onChange={(e) => setNewNumber(e.target.value)}
          />
        </div>

        <div>
          <button type="submit">Add</button>
        </div>

      </form>


      <h2>Numbers</h2>
        <ul>
          {persons.map((person, index) => (
            <li key={index}>{person.name} {person.number}</li>
          ))}
        </ul>
    </div>
  )
};

export default App