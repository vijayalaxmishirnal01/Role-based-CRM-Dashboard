import { useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function RoleRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      const uid = auth.currentUser?.uid;

      // ✅ FIXED BLOCK
      if (!uid) {
        navigate("/login");
        return;
      }

      const snapshot = await getDoc(doc(db, "users", uid));

      if (snapshot.exists()) {
        const role = snapshot.data().role;

        if (role === "manager") navigate("/manager");
        else if (role === "admin") navigate("/admin");
        else if (role === "superadmin") navigate("/superadmin");
        else if (role === "teamleader") navigate("/teamleader");
        else if (role === "telecaller") navigate("/telecaller");
      }
    };

    checkRole();
  }, [navigate]);

  return <p>Loading...</p>;
}import { useEffect } from "react";
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export default function RoleRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      const uid = auth.currentUser?.uid;

      if (!uid) {
        navigate("/login");
        return;
      }

      const snapshot = await getDoc(doc(db, "users", uid));

      if (snapshot.exists()) {
        const role = snapshot.data().role;

        if (role === "manager") navigate("/manager");
        else if (role === "admin") navigate("/admin");
        else if (role === "superadmin") navigate("/superadmin");
        else if (role === "teamleader") navigate("/teamleader");
        else if (role === "telecaller") navigate("/telecaller");
      }
    };

    checkRole();
  }, [navigate]);

  return <p>Loading...</p>;
}
