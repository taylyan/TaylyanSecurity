import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import '../css/Login.css'
import axios from 'axios'
const Login = ({setRoleVar}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('admin')
  const navigate = useNavigate()
  
  axios.defaults.withCredentials = true;
  const handleSubmit = () => {
    axios.post('http://localhost:3001/auth/login', {username, password, role})
    .then(res => {
      if(res.data.login && res.data.role === 'admin') {
        setRoleVar('admin')
        navigate('/dashboard')
        alert('Успешно влизане.');

      } else if (res.data.login && res.data.role === 'user') {
        setRoleVar('user')
        navigate('/devices')
        alert('Успешно влизане.');
      } else{
        alert('Неуспешно влизане. Моля, проверете имейла, паролата или ролята си.');
      }
      
      console.log(res)
    })
    .catch(err => console.log(err))
  }

  return (
    <div className='login-page'>
      <div className="login-container">
        <h2>За да имате достъп до сайта трябва да Ви бъде предоставен профил от администратор!</h2>
        <h2>Влез</h2>
        <div className="form-group">
          <label htmlFor="username">Псевдоним:</label>
          <input type="text" placeholder='Enter Username'
           onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="password">Парола:</label>
          <input type="password" placeholder='Enter Password'
           onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="role">Роля:</label>
          <select name="role" id="role"
           onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Администратор</option>
            <option value="user">Потребител</option>
          </select>
        </div>
        <button className='btn-login' onClick={handleSubmit}>Влез</button>
      </div>
    </div>
  )
}

export default Login