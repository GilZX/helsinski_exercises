
import ReactDOM from 'react-dom'
import { useState,useEffect } from 'react'

import axios from 'axios'

const promise = axios.get('http://localhost:3001/notes')
promise.then(response =>{console.log(response)})
console.log(promise)

const promise2 = axios.get('http://localhost:3001/foobar')
promise2.then(response=>{console.log(response)})
console.log(promise2)


const App = props => {
 //const { notes } = props
 const [notes,setNotes]=useState([])
 const [newNote,setNewNote]=useState("")
 const [allNotes,setAllNotes]=useState(true)


 useEffect(()=>{
    console.log('effect');
    axios.get('http://localhost:3001/notes').then((response)=>{
    console.log('promise completed')
    setNotes(response.data)

    })

 },[])

 console.log('render : ' , notes.length , 'notes')

const notesShow=allNotes ? notes : notes.filter(note => note.important)


 const addNote=(value)=>{
  const addNote={
    content:newNote,
    id:notes.length +1,
    important:false,
    date:new Date()
  }
  value.preventDefault();
  console.log("button clicked",event.target)
  setNotes(notes.concat(addNote))
  setNewNote("")
 }

 const stateInputNote=(value)=>[
  setNewNote(value.target.value)
 ]

function changeStatusNote(){
 setAllNotes(!allNotes)
}

  return (
    <div>
      <h1>Notes</h1>
    <div>
      <button  onClick={changeStatusNote} > {allNotes?"import":"all"} </button> <p> {!allNotes?"Actual Importan Notes":"All Notes"}</p>
    </div>

      <ul>
      {notesShow.map(
          note => (
            <li key={note.id}>{note.content}</li>
          )
        )}
      </ul>
      <form onSubmit={addNote}>
           <input value={newNote}  onChange={stateInputNote}/>
           <button type='submit'>Save</button> 

      </form>
      
    </div>
  )
}                                             

ReactDOM.render(<App />, document.getElementById('root'))