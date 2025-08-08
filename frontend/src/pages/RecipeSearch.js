import React from "react";
import { Link } from "react-router-dom";

const BirthdayDonation = () => {
  return (
    <div className="donation-body">
      <div className="donation-content">
        <h2 className="donation-title">Celebrate Your Birthday by Giving Back! 🎉</h2>
        <p className="donation-description">
          This year, why not make your birthday even more special by helping those in need? Instead of receiving gifts, you can choose to donate food or money to support a cause close to your heart. Every contribution, no matter how small, makes a big difference in the lives of those who need it the most.
        </p>
        <p className="donation-description">
          Whether you're donating food or contributing money, your support can help provide meals for families, children, and individuals who struggle with hunger. It's a perfect way to spread love and kindness on your special day.
        </p>

        <div className="donation-options">
          <h3 className="donation-subtitle">How You Can Help:</h3>
          <ul className="donation-list">
            <li>Donate food to local food banks or shelters.</li>
            <li>Make a monetary donation to organizations helping those in need.</li>
            <li>Share your birthday wish and encourage others to join in!</li>
          </ul>
        </div>

        <div className="donation-qr">
          <h3 className="donation-subtitle">Donate with Ease: Scan the QR Code</h3>
          <p className="donation-description">
            To make a donation today, simply scan the QR code below. Your generosity can make a lasting impact.
          </p>
          <img
            src="/images/donation-qr.png" // Path to the image in the public folder
            alt="Donate via QR code"
            className="qr-image"
            onError={(e) => e.target.src = "/images/placeholder.png"} // Fallback to placeholder if image fails to load
          />
          <p className="donation-description">
            Once you scan the QR code, you’ll be directed to a secure donation platform where you can contribute either food or funds.
          </p>
        </div>

        <div className="donation-message">
          <h3 className="donation-subtitle">Why Donate on Your Birthday?</h3>
          <p className="donation-description">
            Your birthday is a wonderful opportunity to share your blessings with others. By donating, you not only spread joy to those in need, but you also create a ripple effect of kindness that can inspire others to do the same. Let's make this birthday season a time of giving and sharing.
          </p>
        </div>

        <div className="donation-links">
          <p className="donation-call-to-action">
            Ready to make a difference? <Link to="/donate" className="donation-link">Click here to donate now!</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default BirthdayDonation;
