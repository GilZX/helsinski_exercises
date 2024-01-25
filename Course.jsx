


const Course = ({course})=>{
    let total=0
    total=course.parts.reduce((acum,currency)=>acum + currency.exercises , 0)
return (

    <>
       <p>
        {course.name}
       </p>
       <ul>
        {course.parts.map(coursed=><li>{coursed.name} {coursed.exercises}</li>)}
       </ul>
       <p>Total Assigments {total}</p>
    </>
)


}

export default Course;