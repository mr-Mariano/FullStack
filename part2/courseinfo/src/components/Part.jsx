
const Part = ({course}) => {
    return (
      <>
        <h3>{course.name}</h3>
        <p>{course.exercises}</p>
      </>
    )
  }

export default Part;