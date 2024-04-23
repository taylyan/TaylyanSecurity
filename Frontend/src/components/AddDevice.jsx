import React, { useState } from 'react'
import axios from 'axios'
import  {useNavigate} from 'react-router-dom'

const AddDevice = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('') 
    const [channel, setChannel] = useState('') 
    const [chart, setChart] = useState('')

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post('http://localhost:3001/device/add', {name, description, channel,chart})
        .then(res => { 
            if(res.data.added) {
                navigate('/devices')
            }
            else {
                console.log(res)
            }
        })
        .catch(err => console.log(err))
      }

  return (
    <div className="user-form-container">
      <form className="user-form" onSubmit={handleSubmit}>
        <h2>Добави Устройство</h2>
        <div className="form-group">
          <label htmlFor="device">Име на устройство:</label>
          <input type="text" id="device" name="device" 
          onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Описание:</label>
          <input type="text" id="description" name="description" 
          onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="image">Канал:</label>
          <input type="text" id="channel" name="channel" 
          onChange={(e) => setChannel(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="image">Графика:</label>
          <input type="text" id="chart" name="chart" 
          onChange={(e) => setChart(e.target.value)}/>
        </div>
        <button type="submit">Добави </button>
      </form>
    </div>
  )
}

export default AddDevice