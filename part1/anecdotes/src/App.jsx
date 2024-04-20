import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const MostVotes = ({anecdote}) => {
  return(
    <>
    <h1>Anecdote with most votes</h1>
    <p>{anecdote.anecdote}</p>
    </>
  )
}

const App = () => {
  const [most, setMost] = useState({anecdotes : 'No votes yet' , votes : 0})
  const [selected, setSelected] = useState(0)
  const [anecdotes, setAnecdotes] = useState([
    {anecdote: 'If it hurts, do it more often.', votes : 0},
    {anecdote: 'Adding manpower to a late software project makes it later!', votes : 0},
    {anecdote: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes : 0},
    {anecdote: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes : 0},
    {anecdote: 'Premature optimization is the root of all evil.', votes : 0},
    {anecdote: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes : 0},
    {anecdote: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes : 0},
    {anecdote: 'The only way to go fast, is to go well.', votes : 0},
  ])

  const handleAnecdote = () => {
    const random = Math.floor(Math.random() * anecdotes.length)
    setSelected(random)
    console.log(selected)
  }

  const handleVote = () => {
    const newAnecdotes = [...anecdotes]
    newAnecdotes[selected].votes += 1
    if (newAnecdotes[selected].votes > most.votes){
      setMost(newAnecdotes[selected])
    }
    setAnecdotes(newAnecdotes);
  }


  return (
    <>
      <button onClick={handleAnecdote}>Randomnize</button>
      <button onClick={handleVote}>Vote</button>
      <div>
      {anecdotes[selected].anecdote}
      {anecdotes[selected].votes}
      </div>
      <MostVotes anecdote={most}/>
    </>
  )
}

export default App