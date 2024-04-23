import React, { useEffect, useState } from 'react'
import axios from 'axios'
import  {useNavigate, useParams} from 'react-router-dom'

const EditDevice = () => {
    const [name, setName] = useState('')
    const [description, setDescription] = useState('') 
    const [channel, setChannel] = useState('') 
    const [chart, setChart] = useState('')
    const navigate = useNavigate()
    const {id} = useParams()

    useEffect(() => {
        axios.get('http://localhost:3001/device/device/'+id)
        .then(res => { 
            setName(res.data.name)
            setDescription(res.data.description)
            setChannel(res.data.channel)
            setChart(res.data.chart)

        })
        .catch(err => console.log(err))
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3001/device/device/'+id, {name, description, channel,chart})
        .then(res => { 
            if(res.data.updated) {
                navigate('/devices')
            }
            else {
                console.log(res)
            }
        })
        .catch(err => console.log(err))
      }

  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>Редактирай Устройство</h2>
        <div className="form-group">
          <label htmlFor="device">Име на устройство:</label>
          <input type="text" id="device" name="device"  value={name}
          onChange={(e) => setName(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="description">Описание:</label>
          <input type="text" id="description" name="description" value ={description}
          onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="channel">Канал:</label>
          <input type="text" id="channel" name="channel" value={channel}
          onChange={(e) => setChannel(e.target.value)}/>
        </div>
        <div className="form-group">
          <label htmlFor="chart">Графика:</label>
          <input type="text" id="chart" name="chart" value={chart}
          onChange={(e) => setChart(e.target.value)}/>
        </div>
        <button type="submit">Актуализирай </button>
      </form>
    </div>
  )
}

export default EditDevice