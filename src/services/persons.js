import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

//fetch all persons
const getAll = () => axios.get(baseUrl).
    then(res => res.data)

//Add a new person
const create = (newPerson) => axios.post(baseUrl, newPerson).then(res => res.data)

//delete a person by ID
const remove = (id) => axios.delete(`${baseUrl}/${id}`).then(res => res.data)

//update server for existing person
const update = (id, updatedPerson) => axios.put(`${baseUrl}/${id}`, updatedPerson).then(res => res.data)



export default {getAll, create, remove, update}