import axios from "axios"

const BASEURL = "https://studies.cs.helsinki.fi/restcountries/api/"

const getCountry = (name) => {
    return axios.get(`${BASEURL}/name/${name}`).then(response => {
        console.log(`Getting information of ${name}`, response.data);
        return response.data
    })

}

export default {getCountry}