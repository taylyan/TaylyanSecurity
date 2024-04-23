import React, { useEffect, useState } from 'react'
import '../css/Dashboard.css'
import axios from 'axios'

const Dashboard = () => {
  const [users, setUsers] = useState(0)
  const [admin, setAdmin] = useState(0)
  const [devices, setDevices] = useState(0)

  useEffect(() => {
    axios.get('http://localhost:3001/dashboard')
    .then(res => {
      if(res.data.ok) {
        setUsers(res.data.user)
        setAdmin(res.data.admin)
        setDevices(res.data.device)
      }
    }).catch(err => console.log(err))
  } , [])
  return (
    <div className="dashboard">
      <div className="dashboard-box">
        <h2>Всички Устройства</h2> <br />
        <h2>{devices}</h2>
      </div>
      <div className="dashboard-box">
        <h2>Всички Потребители</h2> <br />
        <h2>{users}</h2>
      </div>
      <div className="dashboard-box">
        <h2>Всички Администратори</h2> <br />
        <h2>{admin}</h2>
      </div>
    </div>
  )
}

export default Dashboard