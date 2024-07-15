import { useState, useEffect } from 'react'
import React from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState([])
  const [member, setMember] = useState("")

  useEffect(() => {
    fetch("http://localhost:5001/members")
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch members`)
        }
        return res.json()
      })
      .then(data => {
        setData(data.members)
      })
      .catch(error => {
        console.error("Fetch error:", error)
      })
  }, [])
  
  const handleAdd = (event)=>{
    event.preventDefault() 
    axios.post('http://localhost:5001/members',{
      name: member
    })
    .then((response)=>{
      setData([...data, member])
      setMember('')
    })
    . catch((error)=>{
      console.log("shit didnt work");
    })
  }

  return (
    <>
    <div>
      <form
      onSubmit={handleAdd}
      >
        <input
        type='text'
        value={member}
        onChange={(e => setMember(e.target.value))}
        />
        <button type='submit'> ADD</button>
      </form>
    <h1>Members</h1>
      <ul>
        {data.map((member, index) => (
          <li key={index}>{member}</li>
        ))}
      </ul>
    </div>
  </>
  )
}

export default App
