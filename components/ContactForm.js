"use client";
import { useState } from "react";

export default function ContactForm() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="contact-form-box">
      <h2>Send us a Message</h2>
      {sent && (
        <div className="contact-success">
          Thanks for reaching out! Our team will get back to you within 24 hours.
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Your Name</label>
          <input type="text" placeholder="Full name" required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" placeholder="you@example.com" required />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea rows={4} placeholder="How can we help?" required />
        </div>
        <button type="submit" className="auth-submit">Send Message</button>
      </form>
    </div>
  );
}
