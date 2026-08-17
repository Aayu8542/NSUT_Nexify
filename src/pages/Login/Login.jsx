import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

export default function Login() {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const { login } = useAuth();
  const navigate = useNavigate();
  const otpRefs = [useRef(), useRef(), useRef(), useRef()];

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setStep(2);
      // Auto focus first OTP input after small delay
      setTimeout(() => otpRefs[0].current?.focus(), 100);
    }
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto focus next
    if (value !== '' && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleLogin = () => {
    if (otp.join('').length === 4) {
      login(phone);
      navigate('/dashboard');
    }
  };

  return (
    <div className="login-page">
      <motion.div
        className="login-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="login-title">
          {step === 1 ? 'Welcome back' : 'Verify phone'}
        </h1>
        <p className="login-subtitle">
          {step === 1 
            ? 'Enter your mobile number to securely login.'
            : `Code sent to +91 ${phone}`}
        </p>
      </motion.div>

      <div className="login-form">
        {step === 1 ? (
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            onSubmit={handlePhoneSubmit}
            className="input-group"
          >
            <label className="input-label">Mobile Number</label>
            <div className="phone-input-wrapper">
              <span className="country-code">+91</span>
              <input
                type="tel"
                className="phone-input"
                placeholder="00000 00000"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                maxLength={10}
                autoFocus
              />
            </div>
            <div className="login-actions" style={{ marginTop: '48px' }}>
              <button 
                type="submit" 
                className="btn-primary"
                disabled={phone.length < 10}
              >
                Get OTP
              </button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="input-group"
          >
            <label className="input-label">Enter 4-digit code</label>
            <div className="otp-wrapper">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={otpRefs[index]}
                  type="text"
                  inputMode="numeric"
                  className="otp-input"
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ''))}
                  onKeyDown={(e) => handleOtpKeyDown(index, e)}
                  maxLength={1}
                />
              ))}
            </div>
            <div className="login-actions" style={{ marginTop: '48px' }}>
              <button 
                className="btn-primary"
                onClick={handleLogin}
                disabled={otp.join('').length < 4}
              >
                Verify & Login
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
