import Header from "./Header"
import Content from "./Content"
import Total from "./Total"

const Course = ({course}) => {
    console.log('course :>> ', course);

    return (
        <>
        <Header course={course.name}/>
        <Content courses={course.parts}/>
        <Total courses={course.parts}/>
        </>
    )
}

export default Course;