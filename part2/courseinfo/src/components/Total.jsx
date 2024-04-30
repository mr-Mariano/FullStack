
const Total = ({courses}) => {
  const sumTotal = courses.reduce((total, course) => total + course.exercises, 0)
  return(
    <div>
      Total amount of exercises : {sumTotal}
    </div>
  )
}

export default Total