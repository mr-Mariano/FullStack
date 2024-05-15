const Persons = ({filteredPeople, deletePerson}) => {

    return(
      <>
        <ul>
              {
                filteredPeople.map((person) =>
                <div key={person.id}>
                  <li>{person.name} : {person.number} </li>
                  <button onClick={() => deletePerson(person.id)}>DELETE</button>
                </div>
                )
              }
        </ul>
      </>
    )
  }

export default Persons;