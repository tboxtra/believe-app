import React from "react";

function Profile({ user, balance, onReferral, onMoonPhases, onTransactions }) {
    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <h2 style={styles.title}>👤 Your Profile</h2>

                <div style={styles.card}>
                    <p style={styles.label}>Logged in as:</p>
                    <h3 style={styles.value}>@{user}</h3>
                </div>

                <div style={styles.card}>
                    <p style={styles.label}>Vault Balance</p>
                    <h1 style={styles.bigValue}>{balance.toLocaleString()} BLT</h1>
                </div>

                <div style={styles.actions}>
                    <button style={styles.btn} onClick={onMoonPhases}>
                        🌙 Moon Phases
                    </button>
                    <button style={styles.btn} onClick={onReferral}>
                        📩 Referral
                    </button>
                    <button style={styles.btn} onClick={onTransactions}>
                        📜 View Transactions
                    </button>
                </div>
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
        width: "100%",
        maxWidth: "600px",
    },
    title: {
        fontSize: "1.8rem",
        fontWeight: "bold",
        marginBottom: "2rem",
        textAlign: "center",
    },
    card: {
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "12px",
        marginBottom: "1.5rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        textAlign: "center",
    },
    label: {
        fontSize: "0.9rem",
        color: "#555",
        marginBottom: "0.4rem",
    },
    value: {
        fontSize: "1.3rem",
        fontWeight: "bold",
        color: "#222",
    },
    bigValue: {
        fontSize: "2rem",
        fontWeight: "bold",
        color: "#000",
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
        borderRadius: "10px",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "1rem",
    },
};

export default Profile;