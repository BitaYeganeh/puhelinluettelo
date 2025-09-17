//This prints the list of people.
//  The parent (App) will decide which persons to pass (filtered or all).//

// src/components/Persons.js
const Persons = ({ persons }) => {
  return (
    <ul>
      {persons.map(person => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  )
}

export default Persons
