import React, { useState, useEffect } from 'react'
import './style.css'
import { Card } from '../../components/Card'

export function Home() {  
  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({name:'', avatar:''});

  function addStudent() {
     const newStudent = {
      name: studentName,
      time: new Date().toLocaleString( 'pt-BR', {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        
      })
     }
     setStudents(prevState => [...prevState, newStudent]);
  }

  useEffect( () => {
    //corpo do useEffect 


    fetch('https://api.github.com/users/DeeDzS')
    .then(res => res.json())
    .then(data => {
      setUser({
        avatar: data.avatar_url,
        name: data.name
      })
    })
  }, [])
     return (
      <div className="Root">
        <header>
        <h1>Lista de Presença </h1>
        <div>
          <strong>{user.name}</strong>
          <img src={user.avatar} alt="Profile pricture" />
        </div>
        </header>
        
        <input 
          type="text"
          placeholder="Digite seu nome"
          onChange={e => setStudentName(e.target.value)}
        />
        
        <button type="button" onClick={addStudent}>
          Adicionar 
        </button>

      {
        students.map( student => (
        <Card 
        key={student.time}
        name={student.name} 
        time={student.time} />
        ))
       
      }

      </div>
    )
  
  }
