import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const DeleteDevice = () => {
    const navigate = useNavigate()
    const {id} = useParams()
    useEffect(() => {
      axios.delete('http://localhost:3001/device/device/'+id)
      .then(res => {
          if(res.data.deleted) {
              navigate('/devices')
          }
      }).catch(err => console.log(err))
    }, [])
}

export default DeleteDevice