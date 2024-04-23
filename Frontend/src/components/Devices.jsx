import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DeviceCard from './DeviceCard'
import '../css/Device.css'

const Devices = ({role}) => {
  const [devices, setDevices] = useState([])
  useEffect(() => {
    axios.get('http://localhost:3001/device/devices')
    .then(res => {
      setDevices(res.data)
      console.log(res.data)
    }).catch(err => console.log(err))
  } , [])
  return (
    <div className='device-list'>
      {
        devices.map(device => {
          return <DeviceCard key={device.id} device = {device} role = {role}></DeviceCard>
        })
      }
    </div>
  )
}

export default Devices