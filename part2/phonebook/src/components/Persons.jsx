const Persons = ({filteredPeople}) => {
    return(
      <>
        <ul>
              {
                filteredPeople.map((person) =>
                <li key={person.id}>{person.name} : {person.number}</li>)
              }
        </ul>
      </>
    )
  }

export default Persons;