import React, { useState } from 'react';
import '../styles/BecomeMember.css';
import leaf from '../assets/logo1.webp';
import Swal from 'sweetalert2';
import { api } from '../axios/api'; // ✅ CHANGE 1: Import the configured Axios instance

const BecomeMember = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    surname: '',
    gender: '',
    phone_number: '',
    email: '',
    address: '',
    city: '',
    dob: '',
    agree: false,
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
    if (!formData.surname.trim()) newErrors.surname = 'Surname is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    if (!formData.phone_number.trim()) newErrors.phone_number = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    else {
      const today = new Date();
      const dobDate = new Date(formData.dob);
      let age = today.getFullYear() - dobDate.getFullYear();
      const m = today.getMonth() - dobDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }
      if (age < 18) {
        newErrors.dob = 'You must be at least 18 years old to join';
      }
    }
    if (!formData.agree) newErrors.agree = 'You must agree to the terms';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    try {
      const body = {
        firstName: formData.first_name,
        lastName: formData.surname,
        gender: formData.gender,
        phoneNumber: formData.phone_number,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        dateOfBirth: formData.dob,
        agreeToTerms: formData.agree
      };

      // ✅ CHANGE 2: Use api.post instead of fetch
      // This automatically uses the Proxy (/api) and adds Auth Headers if they exist
      const response = await api.post('/Clients/add-client', body);

      // Axios throws an error automatically if status is not 200-299,
      // so we don't need to check "if (!response.ok)" manually.
      
      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Membership created successfully!",
      });

      setFormData({
        first_name: '',
        surname: '',
        gender: '',
        phone_number: '',
        email: '',
        address: '',
        city: '',
        dob: '',
        agree: false,
      });

    } catch (error) {
      // ✅ CHANGE 3: Handle Axios Errors
      const errorMessage = error.response?.data?.message || "Unable to reach the server";
      
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorMessage,
      });
    }

    setLoading(false);
  };

  return (
    <div className="become-member-container py-5">
      <div className="text-center mb-4">
        <img src={leaf} alt="Cannabis Leaf" className="leaf-icon mb-3" />
        <h2 className="member-title">Become a Member</h2>
        <p className="member-subtitle">Fill out the form below to join our community.</p>
      </div>
      <form className="mx-auto" onSubmit={handleSubmit} noValidate>
        {/* ... (Rest of your form inputs remain exactly the same) ... */}
        
        <div className="mb-3">
          <label htmlFor="first_name" className="form-label">Name</label>
          <input
            id="first_name"
            type="text"
            name="first_name"
            className="form-control"
            value={formData.first_name}
            onChange={handleChange}
            placeholder="Enter your name"
          />
          {errors.first_name && <p className="text-danger">{errors.first_name}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="surname" className="form-label">Surname</label>
          <input
            id="surname"
            type="text"
            name="surname"
            className="form-control"
            value={formData.surname}
            onChange={handleChange}
            placeholder="Enter your surname"
          />
          {errors.surname && <p className="text-danger">{errors.surname}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="gender" className="form-label">Gender</label>
          <select
            id="gender"
            name="gender"
            className="form-control"
            value={formData.gender}
            onChange={handleChange}
            defaultValue=""
          >
            <option value="" disabled>Select your gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="non_binary">Non-binary</option>
            <option value="prefer_not_to_say">Prefer not to say</option>
          </select>
          {errors.gender && <p className="text-danger">{errors.gender}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="phone_number" className="form-label">Phone Number</label>
          <input
            id="phone_number"
            type="tel"
            name="phone_number"
            className="form-control"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
          {errors.phone_number && <p className="text-danger">{errors.phone_number}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input
            id="address"
            type="text"
            name="address"
            className="form-control"
            value={formData.address}
            onChange={handleChange}
            placeholder="Enter your address"
          />
          {errors.address && <p className="text-danger">{errors.address}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="city" className="form-label">City</label>
          <input
            id="city"
            type="text"
            name="city"
            className="form-control"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
          />
          {errors.city && <p className="text-danger">{errors.city}</p>}
        </div>

        <div className="mb-3">
          <label htmlFor="dob" className="form-label">Date of Birth</label>
          <input
            id="dob"
            type="date"
            name="dob"
            className="form-control"
            value={formData.dob}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]}
          />
          {errors.dob && <p className="text-danger">{errors.dob}</p>}
        </div>

        <div className="form-check mb-3">
          <input
            id="agree"
            type="checkbox"
            name="agree"
            className="form-check-input"
            checked={formData.agree}
            onChange={handleChange}
          />
          <label htmlFor="agree" className="form-check-label">
            I agree to the terms and conditions
          </label>
          {errors.agree && <p className="text-danger">{errors.agree}</p>}
        </div>

        <div className="text-center">
          <button type="submit" className="btn-submit-member rounded-pill px-4" disabled={loading}>
            {loading ? "Submitting..." : "Join Now 🌿"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BecomeMember;