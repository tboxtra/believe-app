import React from "react";

function Profile({ user, balance, onReferral, onTransactions }) {
    return (
        <div style={styles.container}>
            <h2>Your Profile</h2>

            <div style={styles.card}>
                <p style={{ fontSize: "0.9rem", color: "#555" }}>Logged in as</p>
                <h3>{user}</h3>
            </div>

            <div style={styles.card}>
                <p style={{ fontSize: "0.9rem", color: "#555" }}>Vault Balance</p>
                <h1>{balance.toLocaleString()} BLT</h1>
            </div>

            <div style={styles.actions}>
                <button style={styles.btn} onClick={onReferral}>
                    Referral 📩
        </button>
                <button style={styles.btn} onClick={onTransactions}>
                    View Transactions 📜
        </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        background: "#FFF9F0",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
    },
    card: {
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "12px",
        margin: "1.5rem auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    actions: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        marginTop: "2rem",
    },
    btn: {
        padding: "1rem",
        background: "#000",
        color: "#fff",
        borderRadius: "8px",
        fontWeight: "bold",
        border: "none",
        cursor: "pointer",
    },
};

export default Profile;