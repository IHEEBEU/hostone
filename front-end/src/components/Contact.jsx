import React , {useEffect, useState}from 'react'

function Contact() {
  
  
    return (
      <div className="contact-form">
      <span className="heading">Contact Us</span>
      <form>
        <label htmlFor="name">Name:</label>
        <input type="text" required />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="message">Message:</label>
        <textarea id="message" name="message" required></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
    
    );
}

export default Contact
