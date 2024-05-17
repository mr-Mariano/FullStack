import axios from "axios"
const BASEURL = "http://localhost:3001/persons"

const getAll = () => {
    return axios.get(BASEURL).then(response => {
        console.log(response.data)
        return response.data
    }
    )
}

const create = (PERSON) => {
    return axios.post(BASEURL, PERSON).then(response => {
        console.log("Success at backend: ", response);
        return response.data
    })
}

const del = (ID) => {
    return axios.delete(`${BASEURL}/${ID}`)
    .then(response => {
        console.log(`Deleted post with ID ${ID}`);
        console.log(response.data);
        return response.data
     })
}

const update = (ID, UPDATED_OBJECT) => {
    return axios.put(`${BASEURL}/${ID}`,UPDATED_OBJECT )
    .then(response => {
        console.log("Data:" , response.data);
        return response.data
    })
}


export default {
    getAll,
    create,
    del,
    update
}