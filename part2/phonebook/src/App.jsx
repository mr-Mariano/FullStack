import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')

  const filteredPeople = filter === '' ? persons : persons.filter(
    person => person.name.toLowerCase().includes(filter.toLowerCase())
  )

  const existsName = (name ,arr) => {
    for(let i = 0; i < arr.length ; i++){
      if(name.toLowerCase() === arr[i].name.toLowerCase()){
        return true
      }
    }
    return false
  }

  const addPerson = (e) => {
    e.preventDefault()
    if (existsName(newName,persons)){
      window.alert(`${newName} is already in the phonebook`)
      return
    }
    setPersons([...persons, {name : newName , number : number, id : persons.length + 1}])
    setNewName("")
    setNumber("")
    setFilter("")
    console.log("Success", persons)
  }

  return (
    <div>
      <Filter filter={filter} onChange={(e) => setFilter(e.target.value)}/>
      <div>
        <h1>Add New</h1>
        <PersonForm
          handleSubmit={addPerson}
          newName={newName}
          number={number}
          handleNameChange={(e) => setNewName(e.target.value)}
          handleNumberChange={(e) => setNumber(e.target.value)}
        />
      </div>
      <h2>Numbers</h2>
      <div>
        <Persons filteredPeople={filteredPeople}/>
      </div>
    </div>
  )
}

export default App

