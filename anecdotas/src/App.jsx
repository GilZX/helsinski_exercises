import { useState } from 'react'


const Vote=(props)=>{
  
  const voteIndex= 'anecdote0'+props.index
 
  console.log(voteIndex)
  return(<>
    <p>Votes -- {props.votes[voteIndex]}</p>
    
  </>)
}

const Buttons=(props)=>{
  return(
  <>
    <button onClick={props.action}>
    {props.text}
    </button>
  </>)

}



const App=()=> {
 
  const [selected,setSelected]=useState(0)
  const[count,setCount]=useState(0)
  const [votes,setVotes]=useState({anecdote00:0,anecdote01:0,anecdote02:0,anecdote03:0,
    anecdote04:0,anecdote05:0,anecdote06:0,anecdote07:0})
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]


  const nextAnecdote=()=>{
    
     const random = parseInt(Math.random()*100)
     const charRandom= parseInt(random.toString().charAt(0))

     if(charRandom >=0  || charRandom<=anecdotes.length){
      console.log(charRandom)
      console.log(anecdotes.length)
      setSelected(charRandom)
     }
     
  }

  const voteAnecdote=()=>{
    let cadena='anecdote0'+selected
    let valor= votes[cadena]
    console.log(valor);
    let newObjejct={...votes,[cadena]:valor + 1}
    console.log(newObjejct)
    setVotes(newObjejct)
    setCount(count+1)
  }




return(
  <>
    <div>
      <p>{anecdotes[selected]}</p>
      <Vote  votes={votes} index={selected}/>
      <Buttons text='Next Anecdote' action={nextAnecdote}/>
      <Buttons text='Vote' action={voteAnecdote}/>
      <p>count {count}</p>
      <b>Top Votes ::</b>
      <TopVotes votes={votes} anecdotes={anecdotes} />
    </div>
  </>
)


}


const TopVotes=(props)=>{
  const objSorted=Object.fromEntries(
    Object.entries(props.votes).sort(([,a],[,b] )=> b-a)
  )
    return (
      <>
      <ol>
      
        {Object.entries(objSorted).map((vote,index)=>{return <li> {props.anecdotes[vote[0].toString().charAt(9)]}</li>})}
      
      </ol>
      </>
    )
}
export default App
