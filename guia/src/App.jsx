import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' , number:"503 + 75 01 55 40"}
  ])

 
  const [personsForFilter,setPersonsForFilter]=useState([{name:"" ,number:""}])
  const [newName, setNewName] = useState('Digite Un Nombre')
  const [currencyNote, setCurrencyNote] = useState("")
  const [currencyNumber, setCurrencyNumber] = useState("")
  const [currencyFilter, setCurrencyFilter] = useState("")
  const [estatusFilter, setEstatusFilter] = useState(false)




  const duplicados=(name,values)=>{
      const duplicadosVal=values.filter((elemento)=>elemento.name===name) 
      return duplicadosVal.length
  }


  function saveNote(event) {
    event.preventDefault()
    const newObject = { name: currencyNote , number:currencyNumber }
    const newPersons = persons.concat(newObject)
    console.log(duplicados(currencyNote,persons))
    if(duplicados(currencyNote,persons)!=0){
      console.log(duplicados(currencyNote,persons))
    alert(`${currencyNote} is already added to phonebook`)
    }else{
      setPersons(newPersons)
      setCurrencyNote("")
    }
   
  }
  return (
    <div>
    <p>Filter {currencyFilter}</p>
    <p>Estatus {estatusFilter? "True" :"False"}</p>
      <h2>Phonebook</h2>
  <form> 
      <p>Filter For Name: <input value={currencyFilter} onInput={(element)=>{
        const filterValue = element.target.value;
        setCurrencyFilter(filterValue);
        
        const filterPersons=persons.filter(person=>person.name.toLowerCase().includes(currencyFilter.toLowerCase()))
        console.log(filterPersons)
        setPersonsForFilter(filterPersons)

        filterValue.length? setEstatusFilter(true):setEstatusFilter(false)
      
      }}/> </p> 

  </form>

      <form onSubmit={saveNote}>
        <div>
          name: <input value={currencyNote} onInput={(element) => setCurrencyNote(element.target.value)} />
        </div>
        <div>
          Number: <input value={currencyNumber} onInput={(element) => setCurrencyNumber(element.target.value)} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {
        estatusFilter ? personsForFilter.map((elemento) => <p key={elemento.name}>{elemento.name} ---- {elemento.number}</p>) : persons.map((elemento) => <p key={elemento.name}>{elemento.name} ---- {elemento.number}</p>)   
        //2.6-2.10
      }

      
    </div>
  )
}

export default App