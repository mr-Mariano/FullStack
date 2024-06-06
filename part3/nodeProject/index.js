const express = require('express');
const app = express();
app.use(express.json())

let notes = [
    {
      id: 1,
      content: "HTML is easy",
      important: true
    },
    {
      id: 2,
      content: "Browser can execute only JavaScript",
      important: false
    },
    {
      id: 3,
      content: "GET and POST are the most important methods of HTTP protocol",
      important: true
    }
  ]

app.get('' , (request, response) => {
    response.send(
        "<h1>Hello World!</h1>"
    );
})

//Get All Notes
app.get('/api/notes' , (request, response) => {
    response.json(notes)
})

//Get single notes

app.get('/api/notes/:id' , (request, response) => {
    const id = parseInt(request.params.id , 10);
    const note = notes.find(note => note.id === id);
    if(note){
        return response.json(note).end()
    }
    return response.status(404).end("Not in server")
})

//Delete a Note
app.delete('/api/notes/:id', (request, response) => {
    const id = parseInt(request.params.id);
    notes = notes.filter(note => note.id !== id)
    response.status(204).end()
})

//Function to generate id
const generateId = () => {
    return notes.length + 1
}

//Post a note
app.post('/api/notes', (request, response) => {
    const body = request.body;

    //Asegurarse de que se mandan datos en el request
    if(!body.content){
        return response.status(400).json(
            {error: "content is missing"}
        )
    }

    const note = {
        content : body.content,
        important : Boolean(body.important) || false,
        id : generateId()
    }
    console.log(note);
    notes.concat(note)
    response.json(note)
})

const PORT = 3001;
app.listen(PORT, () =>
    console.log(`Server Running on port ${PORT}`)
);