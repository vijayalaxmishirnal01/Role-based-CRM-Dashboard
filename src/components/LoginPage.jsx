import { useState } from "react";
import {  sendPasswordResetEmail, signInWithEmailAndPassword , GoogleAuthProvider , signInWithPopup} from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { doc, collection, query, where, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);

      const docRef = doc(db, "user", userCred.user.uid);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        alert("User role not found");
        return;
      }

      const role = docSnap.data().role;

      if (role === "superadmin") navigate("/superadmin");
      else if (role === "admin") navigate("/admin");
      else if (role === "manager") navigate("/manager");
      else alert("Invalid role");

    } catch (error) {
      alert(error.message);
    }
  };

  /*const signInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
  }*/

    const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const q = query(
      collection(db, "user"),
      where("email", "==", user.email)
    );

    const snapshot = await getDoc(q);

    if (snapshot.empty) {
      alert("Access denied! Contact user.");
      return;
    }

    let role = "";

    snapshot.forEach((doc) => {
      role = doc.data().role;
    });

    // Redirect
    if (role === "superadmin") navigate("/superadmin");
    else if (role === "admin") navigate("/admin");
    else if (role === "manager") navigate("/manager");
    else if (role === "telecaller") navigate("/telecaller");

  } catch (error) {
    console.error(error);
  }
};

const handleForgotPassword = async () => {
  if (!email) {
    alert("Please enter your email first");
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset email sent ");
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

  return (
    <div className="container">
      <div className="card">
        <h3>CRM DASHBOARD</h3>
        <p>Login</p>

        <label>Email Address</label>
        <input
          type="email"
          className="input"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <div className="password-box">
          <input
            type="password"
            className="input"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="row">
          <input type="checkbox" onChange={() => setRemember(!remember)} />
          <label>Remember me</label>
        </div>
        <p className="forgot" onClick={handleForgotPassword}> Forgot Password? </p>

        <br/>
        <button className="google-button" onClick={signInWithGoogle}>
          <img src="/google.png" alt="google" className="google-icon" />
          Sign in with Google
        </button>
        <button className="button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}