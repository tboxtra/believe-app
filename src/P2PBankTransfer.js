import React from "react";

function P2PBankTransfer({ onBack }) {
    return (
        <div style={styles.container}>
            <button onClick={onBack} style={styles.back}>
                ← Back
            </button>

            <h2 style={styles.title}>🏦 P2P Bank Transfer</h2>
            <p style={styles.subtitle}>
                Trade BelieveNG (₦BNG) with trusted believers via bank transfer, Opay, PalmPay and more.
            </p>

            <div style={styles.notice}>
                <h4 style={{ marginBottom: "0.3rem" }}>🪙 P2P Marketplace Coming Soon</h4>
                <p style={{ color: "#555" }}>
                    You'll be able to post offers, view trades, and chat with other believers.
                </p>
            </div>
        </div>
    );
}

const styles = {
    container: {
        background: "#FFF9F0",
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    back: {
        background: "none",
        border: "none",
        color: "blue",
        marginBottom: "1rem",
        fontSize: "0.9rem",
        cursor: "pointer",
    },
    title: {
        fontSize: "1.5rem",
        marginBottom: "0.5rem",
    },
    subtitle: {
        color: "#666",
        marginBottom: "2rem",
    },
    notice: {
        background: "#E6F1F9",
        padding: "1.2rem",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    },
    contentWrapper: {
        width: "100%",
        maxWidth: "600px",
    },
};

export default P2PBankTransfer;