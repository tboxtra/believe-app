import React from "react";

function ReceiveFromBeliever({ user, onBack }) {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(user);
        alert("Username copied!");
    };

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={onBack} style={styles.back}>
                    ← Back
                </button>

                <h2 style={styles.title}>🤝 Receive from a Believer</h2>
                <p style={styles.description}>Ask the sender to use your username below:</p>

                <div style={styles.usernameBox}>
                    @{user}
                </div>

                <button onClick={copyToClipboard} style={styles.button}>
                    Copy Username
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        background: "#FFF9F0",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
    },
    wrapper: {
        maxWidth: "600px",
        width: "100%",
    },
    back: {
        marginBottom: "1rem",
        color: "blue",
        background: "none",
        border: "none",
        cursor: "pointer",
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "1rem",
    },
    description: {
        fontSize: "1rem",
        color: "#555",
        marginBottom: "1rem",
    },
    usernameBox: {
        padding: "1rem",
        background: "#eee",
        borderRadius: "10px",
        fontSize: "1.2rem",
        fontWeight: "bold",
        marginBottom: "1.5rem",
    },
    button: {
        background: "#000",
        color: "#fff",
        padding: "1rem",
        width: "100%",
        borderRadius: "10px",
        fontWeight: "bold",
        border: "none",
        cursor: "pointer",
    },
};

export default ReceiveFromBeliever;