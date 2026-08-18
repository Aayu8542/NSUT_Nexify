import './PhoneBorder.css';

export default function PhoneBorder({ children }) {
  return (
    <div className="phone-frame">
      <div className="phone-notch"></div>
      <div className="phone-screen">
        {children}
      </div>
      <div className="phone-home-indicator"></div>
    </div>
  );
}
