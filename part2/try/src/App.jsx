import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Note from './components/Note'
import axios from "axios"
import noteServices from "./services/notes"

const App = () => {
  const [notes, setNotes ]= useState([])
  const [newNote, setNewNote] = useState("")
  const [showAll, setShowAll] = useState(true)

  const notesToShow = showAll ? notes : notes.filter(note => note.important)

  const addNote = (e) => {
    e.preventDefault()
    const random = Math.round(Math.random())
    const note = {
      id : notes.length + 1 ,
      content : newNote,
      important : random < .5
    }

    noteServices.create(note)
    .then(n => {
      setNotes(notes.concat(n))
      setNewNote("")
    })
  }

  const hookEffect = () => {
    noteServices.getAll()
    .then(notes => {
      setNotes(notes)
    })
  }

  const toogleImportance = (id) => {
    const note = notes.find(note => note.id === id)
    const changedNote = {...note, important : !note.important}
    noteServices.update(id , changedNote)
    .then(response => {
      console.log(response);
      setNotes(notes.map(note => note.id !== id ? note : response))
    })
    .catch(error => console.log(`error with ${id} and ${changedNote}`, error))
  }

  useEffect(hookEffect, []);

  return (
    <div>
      <h1>Notes</h1>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "Important" : "All"}
        </button>
      </div>
      <ul>
        {
          notesToShow.map(note =>
          <Note key={note.id}
                note={note}
                toogleImportance={() => toogleImportance(note.id)}/>)
        }
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={(e)=> setNewNote(e.target.value)}/>
        <button type="submit">Save</button>
      </form>
    </div>
  )
}

export default App
