

import { useState } from 'react'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Aada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 14 },
  ]) 

  //adding states:
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')


// add person function:
  const addPerson = (event) => {
  event.preventDefault()  // stop the page from reloading


  //- DUPLICATE CHECK:
  if (persons.some(person => person.name.toLowerCase()=== newName.toLowerCase())) {
    alert(`${newName} is already added to the phonebook!`)
    return
  }


  const personObject = { 
    id: person.length + 1,
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

      {/* Search field */}
        <div>
          Search : <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
                  />
        </div>

      <form onSubmit={addPerson}>
        <div>
          Name :<input 
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          />
        </div>

        <div>
          Number :<input
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
        {persons
        .filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .map((person) => (
            <li key={person.id}>{person.name} {person.number}</li>
          ))}
        </ul>
    </div>
  )
};

export default App