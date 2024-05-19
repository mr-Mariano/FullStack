import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import countriesServices from "./services/countriesServices"
import axios from "axios"
import Results from './components/Results'

const App = () => {
  const [allCountries, setAllCountries] = useState([])
  const [country, setCountry] = useState('')
  const [results, setResults] = useState([])
  const [countryData, setCountryData] = useState(null)

  const firstRender = () => {
    axios
    .get("https://studies.cs.helsinki.fi/restcountries/api/all")
    .then( response => {
    const countries = response.data.map(country => country.name.common)
    setAllCountries(countries)
    })
    .catch(error => {
      console.log("Error in firstRender: ", error);
    })
  }

  const changeCountry = (e) => {
    setCountry(e.target.value)
    if(country){
      console.log("Fetching results");
      console.log("All countries : ", allCountries);
      const filtered = allCountries.filter(c => {
        return c.toLowerCase().includes(country.toLowerCase())
      })
      console.log("Filtered: ", filtered);
      setResults(filtered)
    }
  }

  const lengthHook = () => {
    if(results.length === 1){
      countriesServices.getCountry(results[0])
      .then(data => {
        console.log("Data Received : ", data);
        setCountryData(data)
      })
      .catch(error => console.log("Error in length Hook ", error))
    }
  }

  useEffect(lengthHook, [results])
  useEffect(firstRender, [])

  return (
    <>
      <div>
        <label>Find Countries:</label>
        <input type="text" value={country} onChange={changeCountry}/>
        <Results results={results}
                length={results.length}
                countryData={countryData}/>
      </div>
    </>
  )
}

export default App;
