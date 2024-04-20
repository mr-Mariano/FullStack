import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { useState } from 'react'

const Button = ({handleClick, text}) => {
  return (
    <>
    <button onClick={handleClick}>{text}</button>
    </>
  )
}

const StatiticLine = ({text,stat}) =>{
  return(
    <>
    <tr>
      <th>{text}</th>
      <td>{stat}</td>
    </tr>
    </>
  )
}

const Statics = ({stats}) => {
  const [good, neutral, bad, all] = stats
  const average = ((good*1) + (bad*-1))/all
  const positive = (good/all)*100


  if (all === 0){
    return(
      <>No feedback given</>
    )
  }
  return (
    <>
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatiticLine text='Good' stat={good}/>
          <StatiticLine text='Neutral' stat={neutral}/>
          <StatiticLine text='Bad' stat={bad}/>
          <StatiticLine text='All' stat={all}/>
          <StatiticLine text='Average' stat={average}/>
          <StatiticLine text='Positive' stat={positive}/>
        </tbody>
      </table>
    </div>
    </>
  )
}

const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const stats = [good, neutral, bad, all]

  const handleGood = () => {
    setGood(good + 1)
    setAll(all+1)
    console.log(good)
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all+1)
    console.log(bad)
  }

  const handleNeutral= () => {
    setNeutral(neutral + 1)
    setAll(all+1)
    console.log(neutral)
  }

  return (
    <>
    <div>
      <h1>Give Feddback</h1>
      <Button handleClick={handleGood} text='Good'/>
      <Button handleClick={handleNeutral} text='Neutral'/>
      <Button handleClick={handleBad} text='Bad'/>
    </div>
    <Statics stats={stats}/>
    </>
  )
}

export default App