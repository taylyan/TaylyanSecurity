import React, { useState } from 'react';
import Picture from '../assets/security.jpg';
import '../css/Contact.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/api/contact', { name, email, message })
      .then((res) => {
        console.log('Message sent successfully', res);
        alert('Успешно изпращане.');
      })
      .catch((err) => console.error('Error submitting contact form:', err));
  };


  return (
    <div className='contact'>
    <div className='leftSide' style={{ backgroundImage: `url(${Picture})` }}>
    </div>
    <div className='rightSide'>
      <h1>Свържи се с нас</h1>
      <form id='contact-form' onSubmit={handleSubmit}>

        <label htmlFor='name'>Имена:</label>
        <input name='name' id="name" placeholder='Въведи имена...' type='text' value={name}
        onChange={(e) => setName(e.target.value)} required/>

        <label htmlFor='email'>Имейл:</label>
        <input name='email' id="email" placeholder='Въведи имейл...' type='email' value={email}
        onChange={(e) => setEmail(e.target.value)} required/>

        <label htmlFor='message'>Съобщение</label>
        <textarea rows="6" id="message" placeholder='Въведи съопщение.....' name='message' value={message} 
        onChange={(e) => setMessage(e.target.value)} required> </textarea>

        <button type='submit'>Изпрати Съобщение</button>
      </form>
      </div>
  </div>
  );
}

export default Contact