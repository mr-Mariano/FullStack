import axios from "axios"

const API_KEY = import.meta.env.VITE_SOME_KEY

const Results = ({length, results, countryData}) => {
    if(countryData){
        console.log("Length of 1: ", results);
        console.log(countryData.languages);
        const lat = countryData.latlng[0]
        const lon = countryData.latlng[1]
        const weather = `api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`

        axios.get(weather)
        .then(response => {
            console.log("Weather: ", response.data);
        })
        .catch(error => {
            console.log("Error getting the Weather: ", error);
        })

        return(
            <>
            <h1>{countryData.name.common}</h1>
            <p>Capital : {countryData.capital[0]}</p>
            <p>Area : {countryData.area}</p>
            <h3>Languages:</h3>
            <ul>
                {Object.values(countryData.languages).map((language,i) => {
                    return <li key={i}>{language}</li>
                })}
            </ul>
            <img src={countryData.flags.png}/>
            <h2>Weather in {countryData.capital[0]}</h2>
            <p>Temperature: {weather}</p>
            </>
        )
    }
    else if(length > 10){
        return(
            <div>
                <p>Too many matches,specify another filter</p>
            </div>
        )
    }

    return(
        <>
        <ul>
            {results.map((country,i) => {
                return <li key={i}>{country}</li>
            })}
        </ul>
        </>
    )
}


export default Results;