"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import "./TeamLogin.css";
 
export default function TeamLogin() {
  const [loginType, setLoginType] = useState("email");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [selectedRole, setSelectedRole] = useState("teamleader");

  const navigate = useNavigate();

  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        { size: "invisible" }
      );
    }
  };

  const handleLogin = async () => {
    // Phone Login
    if (loginType === "phone") {
      if (!phone) return alert("Enter phone number");

      try {
        setupRecaptcha();

        const confirmationResult = await signInWithPhoneNumber(
          auth,
          "+91" + phone,
          window.recaptchaVerifier
        );

        window.confirmationResult = confirmationResult;
        alert("OTP Sent");
        navigate("/otp");
      } catch (error) {
        alert(error.message);
      }
    }

    // Email Login
    else {
      if (!email || !password) {
        return alert("Enter email & password");
      }

      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;

        const docRef = doc(db, "user", user.uid); 
        const snap = await getDoc(docRef);

        if (!snap.exists()) {
          return alert("User not found");
        }

        const userData = snap.data();

        if (userData.role !== selectedRole) {
          return alert("Wrong role selected");
        }

        alert("Login Successful");

        if (userData.role === "teamleader") {
          navigate("/teamleader");
        } else {
          navigate("/telecaller");
        }
      } catch (error) {
        alert(error.message);
      }
    }
  };
 
  return (
    <div className="login-wrapper">
      <div className="login-card">

        <h2 className="title">CRM Dashboard</h2>
        <p className="subtitle">Login to continue</p>

        {/* Toggle */}
        <div className="toggle">
          <button
            className={loginType === "email" ? "active" : ""}
            onClick={() => setLoginType("email")}
          >
            Email
          </button>
          <button
            className={loginType === "phone" ? "active" : ""}
            onClick={() => setLoginType("phone")}
          >
            Phone
          </button>
        </div>

        {/* Role Select */}
        {loginType === "email" && (
          <div className="form-group">
            <label>Role</label>
            <select onChange={(e) => setSelectedRole(e.target.value)}>
              <option value="teamleader">Team Leader</option>
              <option value="telecaller">Telecaller</option>
            </select>
          </div>
        )}

        {/* Inputs */}
        {loginType === "email" ? (
          <>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </>
        ) : (
          <div className="form-group">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="Enter phone number"
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        )}

        {/* Buttons */}
        <button className="login-btn" onClick={handleLogin}>
          Login
        </button>

        <button
          className="register-btn"
          onClick={() => navigate("/register")}
        >
          Create Account
        </button>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}