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


/*const App = () => {
  const friends = [
    { name: 'Peter', age: 10 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <div>
      <p>{friends[0].name} {friends[0].age} </p>
      <p>{friends[1].name}  {friends[1].age} </p>

      <Hello id='0000-1' author='Gilzx' age='24'/>
    </div>


  )





}*/


import {useState} from 'react'


const Display= (props)=>{

  return (
      <div>
           {props.counter}
      </div>
  )
}

const Buttons=(props)=>{
  return (
    <>
      <button onClick={props.handleClik}>
        {props.text}
      </button>
    </>

  )
}





const App=()=>{

   /*setTimeout(
      ()=>setCounter((value)=>value+1),1000)*/

    /*const [counter,setCounter]=useState(0)
    console.log('rendering with counter value', counter)


    const incrementar=()=>{
      console.log('increasing, value before', counter)
      setCounter((element)=>element+1)

    }
    const decrementar=()=>{
      console.log('decreasing, value before', counter)
      setCounter((element)=>element-1)
    }
    const reset=()=>{
      console.log('resetting to zero, value before', counter)
      setCounter(0)
    }*/

    

  /*  const[left,setLeft]=useState(0)
    const[right,setRight]=useState(0)*/


const [cliks,setClicks]=useState({left:0,right:0})
const [allClicks,setAllClicks]=useState([])
const [total,setAllTotal]=useState(0)
const [cont,setCont]=useState(0)

const handleClikLeft=()=>{

  const newClicks={
    left:cliks.left+1,
    right:cliks.right
  }
  setClicks(newClicks)
  setAllClicks(allClicks.concat('L'))
  setAllTotal(newClicks.left+newClicks.right)
  setCont(cont+1)
}


const handleClikRight=()=>{
  const newClicks={
    left:cliks.left,
    right:cliks.right +1 
  }

  setClicks(newClicks)
  setAllClicks(allClicks.concat('R'))

  setAllTotal(newClicks.left+newClicks.right)
  setCont(cont+1)

}


return(


<>
{cliks.left}
<button onClick={handleClikLeft}>
  --Left--
</button>
<button onClick={handleClikRight}>
  --Right--
</button>
{cliks.right}
<History allClicks={allClicks} total={total} cont={cont}/>

</>

 /* <>
    {left}
    <button onClick={()=>setLeft(left+1)}>
      --Left--
    </button>
    <button onClick={()=>setRight(right+1)}>
      --Right--
    </button>
    {right}
  </>*/
 /* <>
  <Display counter={counter}/>
  <Buttons text='+' handleClik={incrementar}/>
  <Buttons text='-' handleClik={decrementar}/>
  <Buttons text='reset' handleClik={reset}/>
  </>*/
)


}




const History=(props)=>{
 
  if(props.allClicks.length===0 && props.cont===0){
    
    return(
      
      <div>
        The App Is Not Inisializetd
      </div>
    )
  }
  
  return(
    <>
  <p>All Cliks {props.allClicks.join('--')}</p>
  <p>Total {props.total}</p>
  <p>Cont {props.cont}</p>
    </>
  )
  
  
  }





/*const Hello = (props) => {
      const id=props.id
      const author=props.author
      const age=props.age

      const bornYear=()=> new Date().getFullYear() - parseInt (age)
      console.log(bornYear());
  return (
    <div>
      <h2>Hello From React {id} , Autor {author}</h2>
      <p>Age: {age} - bornYear : {bornYear()}</p>
    </div>
  )

}*/

export default App