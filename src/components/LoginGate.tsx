import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";

// ⚠️ CONFIGURATIE: Zet op true om sign-up te activeren
const ALLOW_SIGNUP = false;

export default function LoginGate({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  // Check if user is already logged in
  useEffect(() => {
    checkSession();
  }, []);

  const checkSession = async () => {
    if (!supabase) {
      setIsLoggedIn(localStorage.getItem("ats_logged_in") === "true");
      setIsLoading(false);
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    setIsLoggedIn(!!session);
    setIsLoading(false);

    supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });
  };

  const handleLogin = async () => {
    setError("");
    
    if (!supabase) {
      setError("Supabase niet geconfigureerd");
      return;
    }

    const { error: authError } = await supabase.auth.signInWithPassword({
      email: email,
      password: pass
    });

    if (authError) {
      setError(authError.message === "Invalid login credentials" 
        ? "Ongeldige inloggegevens" 
        : authError.message);
    }
  };

  const handleSignUp = async () => {
    if (!ALLOW_SIGNUP) {
      setError("Registratie is momenteel uitgeschakeld. Neem contact op met de beheerder.");
      return;
    }

    setError("");
    
    if (!supabase) {
      setError("Supabase niet geconfigureerd");
      return;
    }

    if (!name.trim()) {
      setError("Vul je naam in");
      return;
    }

    const { error: authError } = await supabase.auth.signUp({
      email: email,
      password: pass,
      options: {
        data: { full_name: name }
      }
    });

    if (authError) {
      setError(authError.message);
    } else {
      setError("");
      alert("Account aangemaakt! Controleer je e-mail om te bevestigen.");
      setIsSignUp(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      isSignUp ? handleSignUp() : handleLogin();
    }
  };

  // Styles
  const containerStyle: React.CSSProperties = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)"
  };

  const formStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    padding: "65px 45px",
    borderRadius: "15px",
    boxShadow: "0 10px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.05), inset 1px 1px 6px rgba(0,0,0,0.4), inset -1px -1px 4px rgba(255, 255, 255, 0.1)",
    background: "linear-gradient(145deg, #1e1e2f, #252540)"
  };

  const inputStyle: React.CSSProperties = {
    width: "245px",
    minHeight: "45px",
    color: "#fff",
    outline: "none",
    padding: "0px 15px",
    backgroundColor: "#212121",
    borderRadius: "6px",
    border: "2px solid #2a2a2a",
    boxShadow: "3px 3px 6px rgba(0,0,0,0.4), 1px 1px 4px rgba(255, 255, 255, 0.1)",
    fontSize: "14px",
    transition: "0.35s"
  };

  const buttonStyle: React.CSSProperties = {
    padding: "12px 35px",
    cursor: "pointer",
    backgroundColor: "#212121",
    borderRadius: "6px",
    border: "2px solid #2a2a2a",
    boxShadow: "3px 3px 6px rgba(0,0,0,0.4), 1px 1px 4px rgba(255, 255, 255, 0.1)",
    color: "#fff",
    fontSize: "15px",
    fontWeight: "bold",
    transition: "0.35s",
    width: "100%"
  };

  if (isLoading) {
    return (
      <div style={containerStyle}>
        <div style={{ color: "#fff", fontSize: "16px" }}>Laden...</div>
      </div>
    );
  }

  if (isLoggedIn) return <>{children}</>;

  return (
    <div style={containerStyle}>
      <div style={formStyle}>
        <div style={{ 
          fontSize: "25px", 
          fontWeight: 600, 
          paddingBottom: "10px", 
          color: "white" 
        }}>
          {isSignUp ? "Account aanmaken" : "Inloggen"}
        </div>

        {isSignUp && (
          <input
            type="text"
            placeholder="Volledige naam"
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyDown={handleKeyDown}
            style={inputStyle}
          />
        )}

        <input
          type="email"
          placeholder="E-mailadres"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={handleKeyDown}
          style={inputStyle}
        />

        <input
          type="password"
          placeholder="Wachtwoord"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          onKeyDown={handleKeyDown}
          style={inputStyle}
        />

        {error && (
          <p style={{ 
            color: "#ff6b6b", 
            margin: 0, 
            fontSize: "13px",
            textAlign: "center",
            maxWidth: "245px"
          }}>
            {error}
          </p>
        )}

        <button
          onClick={isSignUp ? handleSignUp : handleLogin}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.02)";
            e.currentTarget.style.boxShadow = "4px 4px 8px rgba(0,0,0,0.5), 1px 1px 4px rgba(255, 255, 255, 0.15), inset 1px 1px 4px rgba(0,0,0,0.3)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "3px 3px 6px rgba(0,0,0,0.4), 1px 1px 4px rgba(255, 255, 255, 0.1)";
          }}
        >
          {isSignUp ? "Registreren" : "Inloggen"}
        </button>

        {ALLOW_SIGNUP && (
          <div style={{ fontSize: "13px", color: "white" }}>
            {isSignUp ? "Al een account? " : "Nog geen account? "}
            <span
              onClick={() => {
                setIsSignUp(!isSignUp);
                setError("");
              }}
              style={{
                fontWeight: 700,
                cursor: "pointer",
                textDecoration: "underline"
              }}
            >
              {isSignUp ? "Inloggen" : "Registreren"}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
