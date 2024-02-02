
import { useState } from 'react'

const setBad=(props)=>{

  const newStatics={
    good:statics.good,
    neutral:statics.neutral,
    bad:statics.bad + 1
  }
  return newStatics
}
const setGood=(props)=>{

  const newStatics={
    good:statics.good +1,
    neutral:statics.neutral,
    bad:statics.bad 
  }
  return newStatics

}
const setNeutral=(props)=>{

  const newStatics={
    good:statics.good,
    neutral:statics.neutral +1,
    bad:statics.bad
  }
  return newStatics

}

const Statics =(props)=>{


  const [statics,setStatics]=useState({good:0,neutral:0,bad:0})
 

  return(
    <>
    <tr>
    <td>Good</td>
    <td>{props.statics.good}</td>
    </tr>
    </>
  )

}

function App() {

 
  const [porcents,setPorcents]=useState({average:0,positive:0,total:0})
  const [total,setTotal]=useState(0)
  

  const setPorcent=()=>{
    const newPorcents={
      average:statics.average,
      positive:statics.positive,
      total:statics.total + 1
    }
    setPorcents(setPorcent)
  }

  return(
    <>
    <h1>Give FeedBack</h1>
    <Button  text='BAD' click={setBad} />
    <Statics />
    </>
  )
}









const Button=(props)=>{
  return(
    <button onClick={props.click}>
      {props.text}
    </button>
  )
}

export default App
