import React, { useState } from 'react';
import '../styles/BecomeMember.css';
import leaf from '../assets/logo1.webp';
import Swal from 'sweetalert2';
import { api } from '../axios/api';

// Simple Arrow Icon
const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
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
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: null }));
  };

  // ✅ HELPER: Calculate Age
  const getAge = (dobString) => {
    if (!dobString) return 0;
    const today = new Date();
    const birthDate = new Date(dobString);
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.first_name.trim()) newErrors.first_name = 'First name required';
    if (!formData.surname.trim()) newErrors.surname = 'Surname required';
    if (!formData.email.trim()) newErrors.email = 'Email required';
    
    // ✅ AGE VALIDATION
    if (!formData.dob) {
      newErrors.dob = 'Date of birth required';
    } else {
      const age = getAge(formData.dob);
      if (age < 18) {
        newErrors.dob = 'You must be 18+ to join.';
        
        // Immediate Alert for Underage
        Swal.fire({
          icon: 'error',
          title: 'Age Restriction',
          text: 'You must be at least 18 years old to become a member.',
          confirmButtonColor: '#ef4444',
          // Dark Mode Styling
          background: '#1f2937', 
          color: '#ffffff'
        });
      }
    }

    if (!formData.agree) newErrors.agree = 'Please agree to terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return; 

    // ✅ CONFIRMATION DIALOG (With Custom Background)
    const confirmResult = await Swal.fire({
      title: 'Confirm Your Details',
      // Added white/light gray text styles for visibility on dark background
      html: `
        <div style="text-align: left; font-size: 0.95rem; line-height: 1.6; color: #d1d5db;">
          <p><strong style="color: #ffffff;">Name:</strong> ${formData.first_name} ${formData.surname}</p>
          <p><strong style="color: #ffffff;">Email:</strong> ${formData.email}</p>
          <p><strong style="color: #ffffff;">DOB:</strong> ${formData.dob} (Age: ${getAge(formData.dob)})</p>
          <hr style="margin: 10px 0; border: 0; border-top: 1px solid #374151;">
          <p style="font-size: 0.85rem; color: #ef4444;">By confirming, you certify that these details are accurate and you meet the age requirements.</p>
        </div>
      `,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, Submit',
      cancelButtonText: 'Edit',
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#6b7280',
      
      // ✅ CHANGE BACKGROUND HERE
      background: '#1f2937',  // Dark Grey (Matches modern dark mode)
      color: '#ffffff',       // White Text
      
      // Optional: Add a subtle border
      customClass: {
        popup: 'border border-gray-700'
      }
    });

    if (!confirmResult.isConfirmed) return;

    setLoading(true);
    try {
      const body = {
        firstName: formData.first_name, lastName: formData.surname, gender: formData.gender,
        phoneNumber: formData.phone_number, email: formData.email, address: formData.address,
        city: formData.city, dateOfBirth: formData.dob, agreeToTerms: formData.agree
      };
      
      await api.post('/Clients/add-client', body);
      
      Swal.fire({ 
        icon: "success", 
        title: "Welcome!", 
        text: "You are now a member.", 
        confirmButtonColor: '#10b981',
        background: '#1f2937', 
        color: '#ffffff'
      });
      
      setFormData({ first_name: '', surname: '', gender: '', phone_number: '', email: '', address: '', city: '', dob: '', agree: false });
    
    } catch (error) {
      Swal.fire({ 
        icon: "error", 
        title: "Error", 
        text: error.response?.data?.message || "Server Error", 
        confirmButtonColor: '#ef4444',
        background: '#1f2937', 
        color: '#ffffff'
      });
    }
    setLoading(false);
  };

  return (
    <div className="split-layout">
      {/* ... (The rest of your JSX remains exactly the same) ... */}
      {/* LEFT SIDE: Brand & Emotion */}
      <div className="brand-panel">
        <div className="brand-content">
          <img src={leaf} alt="Logo" className="brand-logo animate-float" />
          <h1 className="brand-heading">Join the<br/>Movement.</h1>
          <p className="brand-text">
            Experience exclusive benefits, community events, and premium access. 
            Your journey to a greener lifestyle starts here.
          </p>
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

            <div className="terms-wrapper">
              <label className="custom-checkbox">
                <input type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} />
                <span className="checkmark"></span>
                <span className="label-text">I agree to the <a href="#">Terms & Privacy Policy</a></span>
              </label>
              {errors.agree && <span className="error-msg block">{errors.agree}</span>}
            </div>

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