import { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';
import leaf from '../assets/logo1.png';
import '../index.css';

const Contact = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const autoReplyID = import.meta.env.VITE_EMAILJS_AUTOREPLY_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Send to business first
    emailjs
      .sendForm(serviceID, templateID, form.current, publicKey)
      .then(() => {
        // Then send auto-reply to user
        emailjs
          .sendForm(serviceID, autoReplyID, form.current, publicKey)
          .then(() => {
            alert('Message sent! A confirmation email was also sent to you.');
            form.current.reset();
          })
          .catch((err) => alert('Auto-reply error: ' + err.text));
      })
      .catch((err) => alert('Message failed: ' + err.text));
  };

  return (
    <div className="contact-container py-5">
      <div className="text-center mb-4">
        <img src={leaf} alt="Cannabis Leaf" className="leaf-icon mb-3" />
        <h2 className="contact-heading">Let's Connect</h2>
        <p className="text-lime">Drop us a message about products, partnerships, or sneaker care.</p>
      </div>
<form ref={form} onSubmit={sendEmail} className="contact-form mx-auto">
  <div className="mb-3">
    <label htmlFor="user_name" className="form-label">Name</label>
    <input
      id="user_name"
      type="text"
      name="user_name"
      className="form-control rounded-pill"
      required
      placeholder="Enter your name"
    />
  </div>

  <div className="mb-3">
    <label htmlFor="user_title" className="form-label">Title</label>
    <input
      id="user_title"
      type="text"
      name="user_title"
      className="form-control rounded-pill"
      required
      placeholder="Enter your title"
    />
  </div>

  <div className="mb-3">
    <label htmlFor="user_email" className="form-label">Email</label>
    <input
      id="user_email"
      type="email"
      name="user_email"
      className="form-control rounded-pill"
      required
      placeholder="Enter your email"
    />
  </div>

  <div className="mb-3">
    <label htmlFor="message" className="form-label">Message</label>
    <textarea
      id="message"
      name="message"
      className="form-control rounded-4"
      rows="4"
      required
      placeholder="Write your message here"
    ></textarea>
  </div>

  <div className="text-center">
    <button type="submit" className="btn btn-success px-4 rounded-pill">Send 🌿</button>
  </div>
</form>
<div className="map-container mt-5">
  <iframe
    title="Our Location"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3577.4784207488765!2d27.770238886609032!3d-26.278586307769146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e95a4f2e3793a97%3A0xe140d6103d430e16!2s20511%20Tugela%20St%2C%20Protea%20Glen%2C%20Soweto%2C%201819!5e0!3m2!1sen!2sza!4v1755004647129!5m2!1sen!2sza"
    width="100%"
    height="350"
    style={{ border: 0, borderRadius: '12px' }}
    allowFullScreen=""
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
</div>
    
  );
};

export default Contact;
