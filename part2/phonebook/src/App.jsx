import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from "axios"
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

  const [persons, setPersons] = useState([])
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
    const personObject = {name : newName , number : number}
    axios
      .post("http://localhost:3001/persons", personObject)
      .then(response => {
        console.log(response.data)
        setPersons(persons.concat(response.data))
        setNewName("")
      setNumber("")
      setFilter("")
      })
    console.log("Success", persons)
  }

  const hook = () => {
    axios
    .get("http://localhost:3001/persons")
    .then( response => {
      console.log(response)
      setPersons(response.data)
    })
  }

  useEffect(hook,[])

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

