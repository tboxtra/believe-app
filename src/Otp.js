import React, { useState } from "react";

function Otp({ user, onVerify }) {
    const [otp, setOtp] = useState("");

    const handleVerify = () => {
        if (otp.length === 4) {
            onVerify(); // move to home screen
        } else {
            alert("Please enter a valid 4-digit OTP.");
        }
    };

    return (
        <div style={styles.container}>
            <h2>Enter OTP</h2>
            <p style={styles.subtitle}>
                We sent a 4-digit code to <strong>{user}</strong>
            </p>

            <input
                type="text"
                maxLength="4"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                style={styles.input}
                placeholder="1234"
            />

            <button style={styles.button} onClick={handleVerify}>
                Verify
      </button>
        </div>
    );
}

const styles = {
    container: {
        background: "#FFF9F0",
        minHeight: "100vh",
        padding: "3rem 2rem",
        textAlign: "center",
    },
    subtitle: {
        color: "#666",
        marginBottom: "2rem",
    },
    input: {
        padding: "1rem",
        fontSize: "1.5rem",
        width: "150px",
        textAlign: "center",
        border: "1px solid #ccc",
        borderRadius: "8px",
        marginBottom: "1.5rem",
    },
    button: {
        background: "#000",
        color: "#fff",
        border: "none",
        padding: "1rem 2rem",
        fontSize: "1rem",
        borderRadius: "8px",
        cursor: "pointer",
        fontWeight: "bold",
    },
};

export default Otp;