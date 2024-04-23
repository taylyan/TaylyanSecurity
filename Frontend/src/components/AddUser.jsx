import React, { useState } from 'react'
import axios from 'axios'
import  {useNavigate} from 'react-router-dom'

const AddUser = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/user/register', {username, password, email})
        .then(res => { 
            if(res.data.registered) {
                navigate('/dashboard')
            }
            console.log(res)
        })
        .catch(err => console.log(err))
      }

  return (
    <div className="user-form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <h2>Добави Потребител</h2>
        <div className="form-group">
          <label htmlFor="username">Псевдоним:</label>
          <input type="text" id="username" name="username" 
          onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="email">Имейл:</label>
          <input type="email" id="email" name="email" 
          onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Парола:</label>
          <input type="password" id="password" name="password" 
          onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <button type="submit">Регистрирай</button>
      </form>
    </div>
  )
}

export default AddUser