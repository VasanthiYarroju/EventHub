// src/components/Estimate.jsx

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './Estimate.css'; // Your existing stylesheet

import {
  EVENT_CONFIG,
  VENUE_COST_PER_GUEST,
  CATERING_COST_PER_GUEST,
  getAvailableEvents
} from '../config/EVENT_CONFIG';


const SuccessMessage = ({ onReset }) => (
  <div className="success-message">
    <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
    <h2>Booking Submitted!</h2>
    <p>Thank you! We will contact you shortly to confirm the details.</p>
    <button onClick={onReset}>Plan Another Event</button>
  </div>
);

const Estimate = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    mobileNumber: '',
    eventType: serviceName,
    guestCount: 100,
    venueType: 'non_ac',
    cateringPackage: 'basic',
    extraServices: {},
  });

  // New state to hold form validation errors.
  const [formErrors, setFormErrors] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const currentEventConfig = EVENT_CONFIG[formData.eventType];
  const availableEvents = getAvailableEvents();

  // --- Effects (Mostly unchanged) ---
  useEffect(() => {
    setFormData(prev => ({ ...prev, eventType: serviceName, extraServices: {} }));
  }, [serviceName]);

  useEffect(() => {
    if (!currentEventConfig) return;
    let cost = currentEventConfig.baseCost;
    const guests = formData.guestCount > 0 ? parseInt(formData.guestCount) : 0;
    const venueCost = VENUE_COST_PER_GUEST[formData.venueType] || 0;
    const cateringCost = CATERING_COST_PER_GUEST[formData.cateringPackage] || 0;
    cost += (venueCost + cateringCost) * guests;
    currentEventConfig.extraServices.forEach(service => {
      if (formData.extraServices[service.id]) {
        cost += service.cost;
      }
    });
    setTotalCost(cost);
  }, [formData, currentEventConfig]);

  // --- 2. Form Validation Logic ---
  const validateForm = () => {
    const errors = {};
    if (!formData.userName.trim()) {
      errors.userName = "Your name is required.";
    }
    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid.";
    }
    if (!formData.mobileNumber) {
      errors.mobileNumber = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(formData.mobileNumber)) {
      errors.mobileNumber = "Mobile number must be 10 digits.";
    }
    return errors;
  };

  // --- Event Handlers ---
  // handleChange is generic and works for new fields without changes.
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "eventType") {
      navigate(`/estimate/${value}`);
    }
    setFormData(prev => ({
      ...prev,
      [name]: name === 'guestCount' ? parseInt(value) : value,
    }));
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      extraServices: { ...prev.extraServices, [name]: checked },
    }));
  };

  // handleSubmit is updated to include validation.
   const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    setFormErrors(errors);

    // Only proceed if there are no validation errors
    if (Object.keys(errors).length === 0) {
      setIsLoading(true);
      const bookingData = {
        ...formData,
        eventName: currentEventConfig.name,
        totalEstimatedCost: totalCost,
        bookingDate: new Date().toISOString(),
      };
      
      console.log("Submitting to backend:", JSON.stringify(bookingData, null, 2));
      
      try {
        // --- THIS IS THE NEW PART ---
        // Send the data to your backend API endpoint
        const response = await fetch('http://localhost:5000/api/bookings', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(bookingData)
        });

        
        if (!response.ok) {
          
          const errorData = await response.json();
          throw new Error(errorData.message || 'Booking submission failed.');
        }
        

        setIsSubmitted(true); 

      } catch (error) {
        
        console.error("Booking failed:", error);
        alert(`There was an error: ${error.message}`);
      } finally {
        setIsLoading(false); 
      }
    } else {
      console.log("Form validation failed:", errors);
    }
  };

  
  const handleReset = () => {
    setIsSubmitted(false);
    navigate('/');
  };

  // --- Render Logic (Updated JSX) ---
  if (!currentEventConfig) {
    return (
      <div className="estimate-page">
        <div className="estimate-container">
          <h2>Event Not Found</h2>
          <p>The event type "{serviceName}" is not valid. <Link to="/">Go back to Home</Link></p>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="estimate-page"><div className="estimate-container"><SuccessMessage onReset={handleReset} /></div></div>
    );
  }

  return (
    <div className="estimate-page">
      <div className="estimate-container">
        <h1 className="main-title">{currentEventConfig.name} Planning</h1>
        <h2 className="sub-title">Budget Estimator</h2>
        
        <div className="form-card">
          <form onSubmit={handleSubmit} noValidate> {/* noValidate prevents default browser validation */}
            <div className="form-grid">
              
              {/* --- 3. New User Details Section --- */}
              <fieldset className="form-group fieldset-full-width">
                <legend className="fieldset-legend">Your Details</legend>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="userName">Your Name</label>
                    <input type="text" name="userName" id="userName" value={formData.userName} onChange={handleChange} className={`form-input ${formErrors.userName ? 'input-error' : ''}`} />
                    {formErrors.userName && <p className="error-message">{formErrors.userName}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} className={`form-input ${formErrors.email ? 'input-error' : ''}`} />
                    {formErrors.email && <p className="error-message">{formErrors.email}</p>}
                  </div>

                  <div className="form-group">
                    <label htmlFor="mobileNumber">Mobile Number</label>
                    <input type="tel" name="mobileNumber" id="mobileNumber" value={formData.mobileNumber} onChange={handleChange} className={`form-input ${formErrors.mobileNumber ? 'input-error' : ''}`} maxLength="10" />
                    {formErrors.mobileNumber && <p className="error-message">{formErrors.mobileNumber}</p>}
                  </div>
                </div>
              </fieldset>

              <hr className="form-divider" />
              
              {/* --- Event Details Section (Existing) --- */}
              <fieldset className="form-group fieldset-full-width">
                <legend className="fieldset-legend">Event Details</legend>
                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="eventType">Event Type</label>
                    <select id="eventType" name="eventType" value={formData.eventType} onChange={handleChange} className="form-select">
                      {availableEvents.map(event => (
                        <option key={event.id} value={event.id}>{event.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="guestCount">Guest Count</label>
                    <input type="number" name="guestCount" id="guestCount" value={formData.guestCount} onChange={handleChange} min="1" className="form-input" />
                  </div>

                  <div className="form-group">
                    <label htmlFor="cateringPackage">Catering Package</label>
                    <select id="cateringPackage" name="cateringPackage" value={formData.cateringPackage} onChange={handleChange} className="form-select">
                      <option value="basic">Basic</option>
                      <option value="standard">Standard</option>
                      <option value="premium">Premium</option>
                    </select>
                  </div>
                  
                  <fieldset className="form-group">
                    <legend className="fieldset-legend">Venue Type</legend>
                    <div className="radio-group">
                      <div className="radio-item"><input id="ac" name="venueType" type="radio" value="ac" checked={formData.venueType === 'ac'} onChange={handleChange} /><label htmlFor="ac">AC Hall</label></div>
                      <div className="radio-item"><input id="non_ac" name="venueType" type="radio" value="non_ac" checked={formData.venueType === 'non_ac'} onChange={handleChange} /><label htmlFor="non_ac">Non-AC Hall</label></div>
                    </div>
                  </fieldset>

                  <fieldset className="form-group fieldset-full-width">
                    <legend className="fieldset-legend">Add-on Services</legend>
                    <div className="checkbox-group">
                      {currentEventConfig.extraServices.map(service => (
                        <div className="checkbox-item" key={service.id}>
                          <input type="checkbox" id={service.id} name={service.id} checked={!!formData.extraServices[service.id]} onChange={handleCheckboxChange} />
                          <label htmlFor={service.id}>{service.name}</label>
                        </div>
                      ))}
                    </div>
                  </fieldset>
                </div>
              </fieldset>
            </div>

            <div className="totals-section">
              <div className="total-cost-display">
                <p className="total-cost-label">Estimated Budget:</p>
                <p className="total-cost-value">₹{totalCost.toLocaleString('en-IN')}</p>
              </div>
              <button type="submit" disabled={isLoading} className="submit-button">
                {isLoading ? 'Submitting...' : 'Submit Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Estimate;