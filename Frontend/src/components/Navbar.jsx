import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/ts1.png'
import '../css/Navbar.css'

const Navbar = ({ role }) => {
  return (
    <nav className='navbar'>

      <Link to='/'>
        <img src={Logo} alt="Logo" />
      </Link>

      <div className='leftSide'>
        <div className='leftSide'>

          <div className='hiddenLinks'>
            <Link to="/about" className='navbar-link'>За нас</Link>
            <Link to="/contact" className='navbar-link'>Свържи се с нас</Link>

            {role === "admin" && <>
              <Link to="/devices" className='navbar-link'>Устройства</Link>
              <Link to="/adddevice" className="navbar-link">Добави Устройство</Link>
              <Link to="/adduser" className="navbar-link">Добави Потребител</Link>
              <Link to="/dashboard" className="navbar-link">Информационно табло</Link>
              <Link to="/thingspeak" className="navbar-link">Thingspeak</Link>

            </>
            }
            {role === "user" && <>
              <Link to="/devices" className='navbar-link'>Устройства</Link>
              <Link to="/adddevice" className="navbar-link">Добави Устройство</Link>
              <Link to="/thingspeak" className="navbar-link">Thingspeak</Link>

            </>
            }
            {role === "" ?
              <Link to="/login" className='navbar-link'>Влез</Link>
              : <Link to="/logout" className='navbar-link'>Излизане</Link>
            }
          </div>
        </div>
      </div>
      <div className='rightSide'>
        {(role !== "user" && role !== "admin") &&
          <>
            <Link to="/about" className='navbar-link'>За нас</Link>
            <Link to="/contact" className='navbar-link'>Свържи се с нас</Link>
          </>
        }

        {role === "admin" && <>
          <Link to="/devices" className='navbar-link'>Устройства</Link>
          <Link to="/adddevice" className="navbar-link">Добави Устройство</Link>
          <Link to="/adduser" className="navbar-link">Добави Потребител</Link>
          <Link to="/dashboard" className="navbar-link">Информационно табло</Link>
          <Link to="/thingspeak" className="navbar-link">Thingspeak</Link>

        </>
        }

        {role === "user" && <>
          <Link to="/devices" className='navbar-link'>Устройства</Link>
          <Link to="/adddevice" className="navbar-link">Добави Устройство</Link>
          <Link to="/thingspeak" className="navbar-link">Thingspeak</Link>
          <Link to="/about" className='navbar-link'>За нас</Link>
        </>
        }


        {role === "" ?
          <Link to="/login" className='navbar-link'>Влез</Link>
          : <Link to="/logout" className='navbar-link'>Излизане</Link>
        }
      </div>
    </nav>
  )
}

export default Navbar