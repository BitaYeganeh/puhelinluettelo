

import { useState } from 'react'
import './App.css'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Aada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  ]) 

  //adding states:
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')


// add person function:
  const addPerson = (event) => {
  event.preventDefault()  // stop the page from reloading


  // duplicate check (case-insensitive)
    if (persons.some(p => p.name.toLowerCase() === newName.trim().toLowerCase())) {
      alert(`${newName} is already added to the phonebook!`)
      return
    }


      const personObject = {
      id: Date.now(), // simple unique id
      name: newName.trim(),
      number: newNumber.trim()
    }


  setPersons(persons.concat(personObject)) // update the list
  setNewName('') // clear the input after adding
  setNewNumber('')// clear the number input after adding
}

 // create the filtered list once and pass it to <Persons />
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )



return (
    <div>
      <h2>Phonebook</h2>

      {/* Search field */}
       <Filter
        searchTerm={searchTerm}
        handleSearchChange={(e) => setSearchTerm(e.target.value)}
      />
        <hr />

           <h2>Add:</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        handleNumberChange={(e) => setNewNumber(e.target.value)}
      />
      <hr />

        <h2>Numbers</h2>
      <Persons persons={personsToShow} />
    
    </div>
  )
}

export default App