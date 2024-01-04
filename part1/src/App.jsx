/*const App = () => {

  const now = new Date();
  const a = 10;
  const b = 25;
  const id='Vite'
  const author='Author Vite'
  console.log(now, a * b);

  return (
    <div>
      <p>Hello world , it is {now.toString()}</p>
      <p>
        Result Operation is {a * b}
      </p>
      <h1>Messages</h1>
      <Hello id='React' author='Author React' />
      <Hello  id={id}  author={author}/>
    </div>
  )
}*/


const App = () => {
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0]}</p>
      <p>{friends[1]}</p>
    </div>
  )
}





const Hello = (props) => {


  return (
    <div>
      <h2>Hello From React {props.id} , Autor {props.author}</h2>
    </div>
  )

}

export default App