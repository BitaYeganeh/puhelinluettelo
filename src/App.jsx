import { useState, useEffect } from 'react'
import './App.css'
import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Notification from './components/Notification.jsx'
import PersonServices from './services/persons.js'

const App = () => {
  //const [persons, setPersons] = useState([
    //{ name: 'Arto Hellas', number: '040-123456', id: 1 },
    //{ name: 'Aada Lovelace', number: '39-44-5323523', id: 2 },
    //{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    //{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 },
  //]) 


  //WE FETCH FROM THE BACKEND
  const [persons, setPersons] = useState([])


  // states
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState({ message: null, type: '' })
 
  // Load initial persons from backend
  useEffect(() => {
  PersonServices.getAll().then(initialPersons => setPersons(initialPersons))
       }, [])

  // add person function
  const addPerson = (event) => {
    event.preventDefault()

    // duplicate check
    if (persons.some(p => p.name.toLowerCase() === newName.trim().toLowerCase())) {
      setNotification({ message: `${newName} is already added to the Phonebook`, type: 'error' })
      setTimeout(() => {
        setNotification({ message: null, type: '' })
      }, 3000)
      return
    }

    const personObject = {
      name: newName.trim(),
      number: newNumber.trim()
        }
    //const personObject = {
      //id: Date.now(),
      //name: newName.trim(),
      //number: newNumber.trim()
    //}

    //setPersons(persons.concat(personObject))
   // setNewName('')
   // setNewNumber('')

    //setNotification({ message: `Added ${newName}`, type: 'success' })
    //setTimeout(() => {
      //setNotification({ message: null, type: '' })
    //}, 3000)
  //}


  // Send to backend and update state

  PersonServices.create(personObject).then(returnedPerson => {
  setPersons(persons.concat(returnedPerson))  // add backend response to state
  setNewName('')
  setNewNumber('')
  setNotification({ message: `Added ${returnedPerson.name}`, type: 'success' })
  setTimeout(() => setNotification({ message: null, type: '' }), 3000)
})
  }

  // filter list
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} type={notification.type} />

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
