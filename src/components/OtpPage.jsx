import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import "./OtpPage.css";

export default function OtpPage() {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

 /* const handleVerify = async () => {
  try {
    const result = await window.confirmationResult.confirm(otp);

    alert("Login Success");

    navigate("/team-dashboard");

  } catch (error) {
    alert("Invalid OTP");
  }
};*/
const handleVerify = async () => {
  const savedOtp = localStorage.getItem("otp");

  if (otp !== savedOtp) {
    alert("Invalid OTP");
    return;
  }

  const data = JSON.parse(localStorage.getItem("registerData"));

  try {
    const userCred = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    await setDoc(doc(db, "users", userCred.user.uid), {
      ...data,
      role: "teamleader" // optional: store role
    });

    localStorage.removeItem("otp");
    localStorage.removeItem("registerData");

    alert("Registered Successfully");

    // ✅ Navigate to Team Leader Dashboard directly
    navigate("/team-dashboard");

  } catch (error) {
    alert(error.message);
  }
};


  return (
    <div className="container">
      <div className="card">
        <h3>Enter OTP</h3>

        <input
          type="text"
          placeholder="Enter OTP"
          onChange={(e) => setOtp(e.target.value)}
        />

        <button className="button" onClick={handleVerify}>
          Verify
        </button>
      </div>
    </div>
  );
}