import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const Header = ({course}) => {
  return(
    <>
    <h1>{course.name}</h1>
    </>
  )
}

const Part = ({course}) => {
  return (
    <>
      <h3>{course.course}</h3>
      <p>{course.exercises}</p>
    </>
  )
}

const Content = ({courses}) => {

  return(
    <>
    {courses.parts.map((course, i) =>
    <Part key={i} course={course}/>
      )}
    </>
  )
}

const Total = ({courses}) => {
  const sumTotal = courses.parts.reduce((total, course) => total + course.exercises,0)
  return(
    <div>
      Total amount of exercises : {sumTotal}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts : [
    {course:'Fundamentals of React', exercises: 10},
    {course:'Using props to pass data', exercises: 7},
    {course:'State of a component', exercises: 14}
  ]
}


  return (
    <div>
      <Header course={course}/>
      <Content courses={course}/>
      <Total courses={course}/>
    </div>
  )
}

export default App
