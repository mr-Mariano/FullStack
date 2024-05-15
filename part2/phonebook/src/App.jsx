import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookServices from "./services/phonebook"


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
        return arr[i]
      }
    }
    return false
  }

  const addPerson = (e) => {
    e.preventDefault()
    const person = existsName(newName,persons)
    const personObject = {name : person ? person.name : newName , number : number, id : person.id}

    console.log(person);
    console.log("Person Object: ", personObject);
    console.log("Name: ", newName);

    if(person){
      if(window.confirm(`${newName} already exists, would you like to update the information?`)){
        phonebookServices.update(person.id, personObject)
        .then(data => {
          console.log(data);
          setPersons(persons.map(p => p.id != person.id ? p : data))
        })
      }else{
        return
      }
    }


    phonebookServices
    .create(personObject)
    .then(data => {
      console.log("data: ", data);
      setPersons(persons.concat(data))
      setNewName("")
      setNumber("")
      setFilter("")
    })

    console.log("Success")
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id == id)
    if(window.confirm(`Delete ${person.name}?`)){
      phonebookServices.del(id)
      .then(data => {
        setPersons(persons.filter(person => person.id != id) )
      })
    }
  }

  const hook = () => {
    phonebookServices.getAll().then(data => setPersons(data))
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
        <Persons
          filteredPeople={filteredPeople}
          deletePerson={deletePerson}
        />
      </div>
    </div>
  )
}

export default App

