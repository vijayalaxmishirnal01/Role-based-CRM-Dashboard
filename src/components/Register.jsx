import { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import "./Register.css";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    company: "",
    city: "",
    country: "",
    address: "",
    role: ""
  });

  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /*const handleRegister = () => {
    if (!form.email || !form.password) {
      alert("Fill required fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (!form.role) {
      alert("Please select role");
      return;
    }

    // Save data for OTP page
    localStorage.setItem("registerData", JSON.stringify(form));

    // Go to OTP page
    navigate("/team-login");
  };*/

  const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const handleRegister = async () => {
  if (!form.email || !form.password) {
    alert("Fill required fields");
    return;
  }

  if (form.password !== form.confirmPassword) {
    alert("Passwords do not match");
    return;
  }

  const otp = generateOTP();

  // save data + otp
  localStorage.setItem("registerData", JSON.stringify(form));
  localStorage.setItem("otp", otp);

  try {
    await emailjs.send(
      "service_whuc50q",
      "template_ctmzyqe",
      {
        to_email: form.email,
        otp: otp,
      },
      "Hccaird13JrUU4DCY"
    );

    alert("OTP sent to email ");

    navigate("/otp");

  } catch (error) {
    alert("Email send failed");
  }
};

  return (
    <div className="container">
      <div className="card">
        <h2 className="title">CRM Dashboard - Register</h2>

        {/* ROLE */}
        <div className="section">
          <label>Select Role</label>
          <select name="role" onChange={handleChange}>
            <option value="">Select Role</option>
            <option value="teamleader">Team Leader</option>
            <option value="telecaller">Telecaller</option>
          </select>
        </div>

        {/* Main Contact */}
        <div className="section">
          <h4>Main Contact Info</h4>
          <div className="grid">

            <div className="field">
              <label>First Name</label>
              <input name="firstName" onChange={handleChange} />
            </div>

            <div className="field">
              <label>Last Name</label>
              <input name="lastName" onChange={handleChange} />
            </div>

            <div className="field">
              <label>Email</label>
              <input name="email" onChange={handleChange} />
            </div>

            <div className="field">
              <label>Phone</label>
              <input name="phone" onChange={handleChange} />
            </div>

            <div className="field">
              <label>Password</label>
              <input type="password" name="password" onChange={handleChange} />
            </div>

            <div className="field">
              <label>Repeat Password</label>
              <input type="password" name="confirmPassword" onChange={handleChange} />
            </div>

          </div>
        </div>

        {/* Company */}
        <div className="section">
          <h4>Company Data</h4>
          <div className="grid">

            <div className="field">
              <label>Company Name</label>
              <input name="company" onChange={handleChange} />
            </div>

            <div className="field">
              <label>City</label>
              <input name="city" onChange={handleChange} />
            </div>

            <div className="field">
              <label>Country</label>
              <input name="country" onChange={handleChange} />
            </div>

            <div className="field">
              <label>Address</label>
              <input name="address" onChange={handleChange} />
            </div>

          </div>
        </div>

        <button className="button" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}