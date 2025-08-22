import React, { useState } from "react";

function Auth({ onContinue }) {
    const [input, setInput] = useState("");
    const [error, setError] = useState("");

    const handleContinue = () => {
        if (!input.trim()) {
            setError("Please enter your phone number or email.");
            return;
        }

        setError("");
        onContinue(input.trim());
    };

    return (
        <div style={styles.container}>
            <h2>Enter your phone number or email</h2>

            <input
                style={styles.input}
                type="text"
                placeholder="Phone or Email"
                value={input}
                onChange={(e) => setInput(e.target.value)}
            />

            {error && <p style={styles.error}>{error}</p>}

            <button style={styles.button} onClick={handleContinue}>
                Continue
      </button>

            <p style={styles.note}>
                By continuing, you agree to our Terms of Service and Privacy Policy.
      </p>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        background: "#FFF9F0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
        textAlign: "center",
    },
    input: {
        padding: "0.8rem",
        width: "90%",
        maxWidth: "400px",
        margin: "1rem 0",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "1rem",
    },
    button: {
        padding: "0.8rem 2rem",
        background: "#000",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        cursor: "pointer",
        marginTop: "1rem",
    },
    error: {
        color: "#f44336",
        fontSize: "0.9rem",
    },
    note: {
        fontSize: "0.8rem",
        color: "#888",
        marginTop: "2rem",
        width: "80%",
        maxWidth: "400px",
    },
};

export default Auth;