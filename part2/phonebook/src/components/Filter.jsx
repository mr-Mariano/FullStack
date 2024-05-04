const Filter = ({filter , onChange }) => {
    return(
      <div>
          <h1>Phonebook</h1>
          <form>
            Filer shown with <input value={filter} onChange={onChange}/>
          </form>
        </div>
    )
}

export default Filter;