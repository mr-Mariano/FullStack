import axios from "axios"
const baseUrl = "http://localhost:3001/notes"

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data).catch(error => console.log("ERROR: ", error))
}

const create = newObject => {
    return axios.post(baseUrl, newObject).then(response => response.data).catch(error => console.log("ERROR: ", error))
  }

  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data).catch(error => console.log("ERROR: ", error))
  }


export default {
    getAll,
    create,
    update
};
