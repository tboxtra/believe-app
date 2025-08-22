import React from "react";

function Onboarding({ onStart }) {
    return (
        <div style={styles.container}>
            <img
                src="/logo192.png" // replace with your actual logo path if different
                alt="Believe Logo"
                style={styles.logo}
            />
            <h1>Welcome to Believe 💫</h1>
            <p style={styles.subtitle}>
                A new way to build wealth and belief from anywhere in the world.
      </p>

            <button style={styles.button} onClick={onStart}>
                Get Started
      </button>
        </div>
    );
}

const styles = {
    container: {
        background: "#FFF9F0",
        minHeight: "100vh",
        padding: "3rem 2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
    },
    logo: {
        width: "100px",
        marginBottom: "2rem",
    },
    subtitle: {
        color: "#888",
        maxWidth: "300px",
        marginBottom: "2rem",
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

export default Onboarding;