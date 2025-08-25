import React from "react";

function Receive({ setScreen, onBack }) {
    const options = [
        {
            title: "Deposit Crypto",
            description: "Already have crypto? Deposit directly",
            onClick: () => setScreen("selectCoin"),
        },
        {
            title: "Receive from a Believer",
            description: "Get BNG from another user",
            onClick: () => setScreen("receiveFromBeliever"),
        },
        {
            title: "P2P Trading",
            description: "Bank Transfer, Opay, PalmPay and more",
            onClick: () => setScreen("p2p"),
        },
    ];

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={onBack} style={styles.back}>
                    ← Back
                </button>

                <h2 style={styles.title}>💰 Select Payment Method</h2>
                <p style={styles.subtitle}>Choose how you want to receive BelieveNG</p>

                {options.map((option, idx) => (
                    <div key={idx} onClick={option.onClick} style={styles.optionBox}>
                        <h3 style={styles.optionTitle}>{option.title}</h3>
                        <p style={styles.optionDescription}>{option.description}</p>
                    </div>
                ))}
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
        flexDirection: "column",
        alignItems: "center",
    },
    wrapper: {
        width: "100%",
        maxWidth: "600px",
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
        marginBottom: "0.5rem",
    },
    subtitle: {
        fontSize: "1rem",
        color: "#777",
        marginBottom: "2rem",
    },
    optionBox: {
        background: "#fff",
        borderRadius: "10px",
        padding: "1.5rem",
        marginBottom: "1rem",
        cursor: "pointer",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    },
    optionTitle: {
        margin: 0,
        fontSize: "1.1rem",
    },
    optionDescription: {
        margin: "0.3rem 0 0",
        color: "#555",
        fontSize: "0.9rem",
    },
};

export default Receive;