import { useState } from "react";

const MASTER_USER = "admin";
const MASTER_PASS = "supersecret123"; // verander zelf!

export default function LoginGate({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("ats_logged_in") === "true"
  );

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    if (user === MASTER_USER && pass === MASTER_PASS) {
      localStorage.setItem("ats_logged_in", "true");
      setIsLoggedIn(true);
    } else {
      setError("Ongeldige inloggegevens");
    }
  };

  if (isLoggedIn) return <>{children}</>;

  return (
    <div style={{
      display: "flex",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
      background: "#f2f2f2"
    }}>
      <div style={{
        width: 350,
        padding: 30,
        borderRadius: 8,
        background: "white",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        <h2 style={{ marginBottom: 20 }}>ATS Inloggen</h2>

        <input
          type="text"
          placeholder="Gebruikersnaam"
          value={user}
          onChange={(e) => setUser(e.target.value)}
          style={{ width: "100%", padding: 10, marginBottom: 10 }}
        />

        <input
          type="password"
          placeholder="Wachtwoord"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          style={{ width: "100%", padding: 10 }}
        />

        {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

        <button
          onClick={handleLogin}
          style={{
            marginTop: 20,
            width: "100%",
            padding: 12,
            background: "#000",
            color: "white",
            border: "none",
            borderRadius: 6,
            cursor: "pointer"
          }}
        >
          Inloggen
        </button>
      </div>
    </div>
  );
}
