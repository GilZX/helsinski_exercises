

const Header = (props) => {
  console.log(props)

  return (
    <>
      <h1>{props.course}</h1>
    </>)
}



const Part = (props) => {
  console.log(props)
  return (
    <>
      <p>
        {props.part} {props.exercises}
      </p>
    </>
  )

}

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </>

  )
}




const App = () => {
  /*/*const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14*/
  /*
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }*/


  /*const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]*/


  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }



  const Content = () => {

    return (
      <>
        <Part part={course.parts[0].name} exercises={course.parts[0].exercises} />
        <Part part={course.parts[1].name} exercises={course.parts[1].exercises} />
        <Part part={course.parts[2].name} exercises={course.parts[2].exercises} />
      </>
    )
  }
  return (
    <div>
      <Header course={course.name} />
      <Content />
      <Total exercises1={course.parts[0].exercises} exercises2={course.parts[1].exercises} exercises3={course.parts[2].exercises} />
    </div>
  )
}




export default App