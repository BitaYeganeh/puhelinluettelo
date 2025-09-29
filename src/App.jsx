import { useState, useEffect } from 'react'
import './App.css'

import Filter from './components/Filter.jsx'
import PersonForm from './components/PersonForm.jsx'
import Persons from './components/Persons.jsx'
import Notification from './components/Notification.jsx'
import PersonServices from './services/persons.js'

const App = () => {
  const [persons, setPersons] = useState([])//WE FETCH FROM THE BACKEND
  const [newName, setNewName] = useState('') // states
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notification, setNotification] = useState({ message: null, type: '' })
 
      //HELPER FOR NOTIFICATIONS

    const showNotification = (message, type='success', duration=3000)=>{
      setNotification({message, type})
      setTimeout(()=> setNotification({message:null, type:''}), duration)

    }

  // Load initial persons from backend
  useEffect(() => {
  PersonServices.getAll().then(initialPersons => setPersons(initialPersons))
       }, [])

  // ADD OR UPDATE PERSON
  const addPerson = (event) => {
    event.preventDefault()

  const existingPerson = persons.find(
    p => p.name.toLowerCase() === newName.trim().toLowerCase()
  )

    if (existingPerson){
      if(window.confirm(
        `${existingPerson.name} is already in the Phonebook! Replace the old number with the new one?`
      )){

        const updatedPerson = { ...existingPerson, number: newNumber.trim()}

        PersonServices.update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(p =>
            p.id !== existingPerson.id ? p:returnedPerson
          ))

          setNewName('')
          setNewNumber('')
          showNotification(`Updated ${returnedPerson.name}`, 'success')
        })


            .catch(() => {
            showNotification(
              `Failed to update ${existingPerson.name}. They may have been removed from the server.`,
              'error'
            )
    // Remove the person from state so your UI is up to date
      setPersons(persons.filter(p => p.id !== existingPerson.id))
})
  

      }
      return
    }


  // ADD A NEW PERSON

    const personObject = {
      name: newName.trim(),
      number: newNumber.trim()
        }
  // Send to backend and update state

  PersonServices.create(personObject)
  .then(returnedPerson => {
  setPersons(persons.concat(returnedPerson))  // add backend response to state
  setNewName('')
  setNewNumber('')
  showNotification(`Added ${returnedPerson.name}`, 'success')
})
      .catch(() => {
        showNotification(`Failed to add ${newName}.`, 'error')
      })
  }

  // filter list
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  //DELETE A PERSON
  const handleDelete = (id, name) => {
    if(
      window.confirm(`Delete ${name}?`)) {
        // delete from backend and update state here
        PersonServices.remove(id)
        .then(()=> {
          setPersons(persons.filter(p => p.id !== id))
        //Add success and error messages:
        showNotification(`Deleted ${name}`, 'success')
        })
       .catch(() => {
          showNotification(
            `Failed to delete ${name}. They may have already been removed from the server.`,
            'error'
          )
          setPersons(persons.filter(p => p.id !== id)) // keep UI consistent
        })
    }
  }

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
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App
