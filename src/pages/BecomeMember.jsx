import React, { useState } from 'react';
import '../styles/BecomeMember.css';
import leaf from '../assets/logo1.webp';
import Swal from 'sweetalert2';
import { api } from '../axios/api';
// Using Lucide icons for a cleaner look (standard SVG icons if you don't have the library)
const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
);

const BecomeMember = () => {
  const [formData, setFormData] = useState({
    first_name: '', surname: '', gender: '', phone_number: '',
    email: '', address: '', city: '', dob: '', agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    // Clear error as user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = 'First name required';
    if (!formData.surname.trim()) newErrors.surname = 'Surname required';
    if (!formData.email.trim()) newErrors.email = 'Email required';
    if (!formData.dob) newErrors.dob = 'Date of birth required';
    // ... (Keep your existing validation logic here for age, etc.)
    if (!formData.agree) newErrors.agree = 'Please agree to terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const body = {
        firstName: formData.first_name, lastName: formData.surname, gender: formData.gender,
        phoneNumber: formData.phone_number, email: formData.email, address: formData.address,
        city: formData.city, dateOfBirth: formData.dob, agreeToTerms: formData.agree
      };
      await api.post('/Clients/add-client', body);
      Swal.fire({ icon: "success", title: "Welcome!", text: "You are now a member.", confirmButtonColor: '#10b981' });
      setFormData({ first_name: '', surname: '', gender: '', phone_number: '', email: '', address: '', city: '', dob: '', agree: false });
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.message || "Server Error", confirmButtonColor: '#ef4444' });
    }
    setLoading(false);
  };

  return (
    <div className="split-layout">
      {/* LEFT SIDE: Brand & Emotion */}
      <div className="brand-panel">
        <div className="brand-content">
          <img src={leaf} alt="Logo" className="brand-logo animate-float" />
          <h1 className="brand-heading">Join the<br/>Movement.</h1>
          <p className="brand-text">
            Experience exclusive benefits, community events, and premium access. 
            Your journey to a greener lifestyle starts here.
          </p>
          
          {/* Decorative circles */}
          <div className="circle-deco circle-1"></div>
          <div className="circle-deco circle-2"></div>
        </div>
      </div>

      {/* RIGHT SIDE: The Form */}
      <div className="form-panel">
        <div className="form-wrapper">
          <div className="mobile-header">
            <h2 className="form-title">Become A Member</h2>
            <p className="form-subtitle">It's free and takes less than a minute.</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            {/* Name Row */}
            <div className="input-row">
              <div className="input-group">
                <label>First Name</label>
                <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Jane" className={errors.first_name ? 'error' : ''} />
                {errors.first_name && <span className="error-msg">{errors.first_name}</span>}
              </div>
              <div className="input-group">
                <label>Surname</label>
                <input type="text" name="surname" value={formData.surname} onChange={handleChange} placeholder="Doe" className={errors.surname ? 'error' : ''} />
                {errors.surname && <span className="error-msg">{errors.surname}</span>}
              </div>
            </div>

            {/* Contact Row */}
            <div className="input-group">
              <label>Email Address</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="jane@example.com" className={errors.email ? 'error' : ''} />
              {errors.email && <span className="error-msg">{errors.email}</span>}
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>Phone</label>
                <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} placeholder="082 123 4567" />
              </div>
              <div className="input-group">
                <label>Gender</label>
                <div className="select-wrapper">
                  <select name="gender" value={formData.gender} onChange={handleChange} className="gender-select">
                    <option value="" disabled>Select</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                    <option value="other">Prefer not to say</option>
                    
                  </select>
                </div>
              </div>
            </div>

            {/* Location Row */}
            <div className="input-group">
              <label>Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="123 Green Street" />
            </div>
            
            <div className="input-row">
              <div className="input-group">
                <label>City</label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="Cape Town" />
              </div>
              <div className="input-group">
                <label>Date of Birth</label>
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} max={new Date().toISOString().split('T')[0]} className={errors.dob ? 'error' : ''}/>
                {errors.dob && <span className="error-msg">{errors.dob}</span>}
              </div>
            </div>

            {/* Terms */}
            <div className="terms-wrapper">
              <label className="custom-checkbox">
                <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
                <span className="checkmark"></span>
                <span className="label-text">I agree to the <a href="#">Terms & Privacy Policy</a></span>
              </label>
              {errors.agree && <span className="error-msg block">{errors.agree}</span>}
            </div>

            {/* Action */}
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Processing..." : <>Submit <ArrowRightIcon /></>}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BecomeMember;