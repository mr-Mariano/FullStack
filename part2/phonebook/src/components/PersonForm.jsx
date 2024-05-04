const PersonForm = ({handleSubmit, newName , number, handleNameChange, handleNumberChange}) => {
    return(
      <>
        <form onSubmit={handleSubmit}>
              <div>
                name: <input value={newName} onChange={handleNameChange}/>
              </div>
              <div>
                number : <input value={number} onChange={handleNumberChange}/>
              </div>
              <div>
                <button type="submit">add</button>
              </div>
            </form>
      </>
    )
  }

export default PersonForm;