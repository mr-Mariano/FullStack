import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Note from './components/Note'

const App = (props) => {
  const [notes, setNotes ]= useState(props.notes)
  console.log(notes)

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {
          notes.map(note =>
          <Note key={note.id} note={note.content}/>)
        }
      </ul>
      <form>
        
      </form>
    </div>
  )
}

export default App
