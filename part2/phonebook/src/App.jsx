import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Filter from "./components/Filter"
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phonebookServices from "./services/phonebook"
import Notification from "./components/Notification"


const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [number, setNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState(null)

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
          console.log("Updated:", data);
          setPersons(persons.map(p => p.id != person.id ? p : data))
          setStatus(true)
          setMessage(`Updated ${personObject.name} number`)
          setNumber('')
          setNewName('')
        })

        setTimeout(() => {
          setStatus(null)
          setMessage('')
        }, 5000)
        return;
      }else{
        return
      }
    }


    phonebookServices
    .create(personObject)
    .then(data => {
      console.log("data: ", data);
      setPersons(persons.concat(data))
      setStatus(true)
      setMessage(`Added ${personObject.name}`)
      setNewName("")
      setNumber("")
      setFilter("")
    })

    setTimeout(() => {
      setStatus(null)
      setMessage('')
    }, 5000)
    console.log("Success")
  }

  const deletePerson = (id) => {
    const person = persons.find(person => person.id == id)

    if(window.confirm(`Delete ${person.name}?`)){
      phonebookServices.del(id)
      .then(data => {
        setPersons(persons.filter(person => person.id != id))
        setStatus(true)
        setMessage(`Deleted ${person.name}`)
      })
      .catch(error => {
        console.log("error", error);
        setStatus(false)
        setMessage(`Information of ${person.name} has already been deleted`)
      })

      setTimeout(() => {
        setStatus(null)
        setMessage('')
      }, 5000)
    }
  }

  const hook = () => {
    phonebookServices.getAll().then(data => setPersons(data))
  }

  useEffect(hook,[])

  return (
    <div>
      <Notification status={status} message={message}/>
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

