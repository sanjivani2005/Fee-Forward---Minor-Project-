import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../AuthContext";
import L from 'leaflet';
import axios from "axios";

const Donation = () => {
  const { loggedIn } = useContext(AuthContext);

  const [donationData, setDonationData] = useState({
    name: "",
    email: "",
    amount: "",
    donationDate: new Date(),
    location: "",
    city: "",
    manufactureDate: "",
    expiryDate: "",
    foodType: []
  });

  const [donationMessage, setDonationMessage] = useState("");
  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No token found");
      }
      const response = await axios.post("http://localhost:5000/donate",
        donationData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setDonationMessage("Donation Made Successfully");
    } catch (error) {
      setDonationMessage(error.response && error.response.data.error ? error.response.data.error : "Something went wrong");
      console.log(error);
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    setDonationData(prevData => ({
      ...prevData,
      foodType: checked
        ? [...prevData.foodType, value]
        : prevData.foodType.filter(type => type !== value)
    }));
  };

  useEffect(() => {
    const initializeMap = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        const map = L.map('map').setView([latitude, longitude], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
          maxZoom: 18,
        }).addTo(map);

        const marker = L.marker([latitude, longitude], { draggable: true }).addTo(map);
        fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`)
          .then((response) => response.json())
          .then((data) => {
            setDonationData(prevData => ({
              ...prevData,
              location: data.display_name,
              city: data.address.city || ''
            }));
          });

        marker.on('dragend', (event) => {
          const latlng = event.target.getLatLng();
          fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latlng.lat}&lon=${latlng.lng}&format=json`)
            .then(response => response.json())
            .then(data => {
              setDonationData(prevData => ({
                ...prevData,
                location: data.display_name,
                city: data.address.city || ''
              }));
            });
        });
      });
    };

    initializeMap();
  }, []);

  return (
    <div className="donation-body">
      <div className="head-description">
        <h1>Donate Food with <span className="site-name">fEEDfORWARD</span></h1>
        <p>"Food donation is not just about filling empty stomachs; it's about nourishing hope, 
          <br />
          feeding compassion, and cultivating a brighter future for all."</p>
      </div>
      <div className="main-container">
        <div className="donateform-container">
          <h1>DONATE FOOD</h1>
          <form onSubmit={handleDonationSubmit}>
            <div className="name-id">
              <input
                type="text"
                placeholder="Name or Business Name"
                value={donationData.name}
                onChange={(e) => setDonationData({ ...donationData, name: e.target.value })}
                required
              />
            </div>
            <div className="email">
              <input
                type="email"
                placeholder="Email"
                value={donationData.email}
                onChange={(e) => setDonationData({ ...donationData, email: e.target.value })}
                required
              />
            </div>
            <div className="amount">
              <input
                type="number"
                placeholder="Food Details"
                value={donationData.amount}
                onChange={(e) => setDonationData({ ...donationData, amount: e.target.value })}
                required
              />
            </div>
            <div className="manufacture-date">
              <input
                type="date"
                placeholder="Manufacture Date"
                value={donationData.manufactureDate}
                onChange={(e) => setDonationData({ ...donationData, manufactureDate: e.target.value })}
                required
              />
            </div>
            <div className="expiry-date">
              <input
                type="date"
                placeholder="Expiry Date"
                value={donationData.expiryDate}
                onChange={(e) => setDonationData({ ...donationData, expiryDate: e.target.value })}
                required
              />
            </div>
            <div className="food-type">
               
            </div>
            <div className="location">
              <input
                type="text"
                placeholder="Address"
                value={donationData.location}
                onChange={(e) => setDonationData({ ...donationData, location: e.target.value })}
                required
              />
            </div>
            <div className="city">
              <input
                type="text"
                placeholder="City"
                value={donationData.city}
                onChange={(e) => setDonationData({ ...donationData, city: e.target.value })}
                required
              />
            </div>
            {loggedIn ? (
              <button type="submit" className="donate-btn">DONATE</button>
            ) : (
              <button type="button" className="donate-btn" disabled>LOG IN TO DONATE</button>
            )}
            {donationMessage && (
              <p className={`message ${donationMessage === "Donation Made Successfully" ? "success" : "error"}`}>
                {donationMessage}
              </p>
            )}
          </form>
        </div>
        <div className="map-container" id="map" style={{ width: "50%", height: "510px" }}></div>
      </div>
    </div>
  );
};

export default Donation;
