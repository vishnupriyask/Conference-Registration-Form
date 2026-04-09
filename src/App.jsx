import { useState } from "react";
import "./App.css";
import { QRCodeCanvas } from "qrcode.react";

export default function App() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    event: "",
  });

  // Participant Management
  const [participants, setParticipants] = useState([]);

  // QR Ticket
  const [ticketUser, setTicketUser] = useState(null);

  // Email Confirmation Message
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // REGISTER USER
  const handleSubmit = (e) => {
    e.preventDefault();

    const newParticipant = {
      id: Date.now(),
      ...formData,
    };

    // Add participant
    setParticipants([...participants, newParticipant]);

    // Show QR ticket
    setTicketUser(newParticipant);

    // Simulated Email Confirmation
    setMessage(
      "✅ Registration successful! Confirmation email sent (simulated)."
    );

    // Reset form
    setFormData({
      name: "",
      email: "",
      event: "",
    });
  };

  // DELETE PARTICIPANT
  const deleteParticipant = (id) => {
    setParticipants(participants.filter((p) => p.id !== id));
  };

  return (
    <div className="app">
      {/* Animated Ocean Background */}
      <div className="wave"></div>
      <div className="wave wave2"></div>
      <div className="wave wave3"></div>

      <div className="container">
        <h1 className="title">Conference Registration</h1>

        {/* Online Registration Form */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            required
            value={formData.email}
            onChange={handleChange}
          />

          <select
            name="event"
            required
            value={formData.event}
            onChange={handleChange}
          >
            <option value="">Select Event</option>
            <option value="React Summit">React Summit</option>
            <option value="MERN Conference">MERN Conference</option>
            <option value="AI Tech Expo">AI Tech Expo</option>
          </select>

          <button type="submit">Register Now</button>
        </form>

        {/* Confirmation Email */}
        {message && <p className="success">{message}</p>}

        {/* QR Code / E-Ticket */}
        {ticketUser && (
          <div className="ticket">
            <h3>E-Ticket 🎟</h3>
            <QRCodeCanvas
              value={`${ticketUser.name} | ${ticketUser.event}`}
              size={140}
            />
            <p>{ticketUser.name}</p>
            <small>{ticketUser.event}</small>
          </div>
        )}

        {/* Participant Management */}
        {participants.length > 0 && (
          <div className="participants">
            <h3>Participants</h3>

            {participants.map((p) => (
              <div key={p.id} className="participantCard">
                <span>
                  {p.name} — {p.event}
                </span>
                <button onClick={() => deleteParticipant(p.id)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}