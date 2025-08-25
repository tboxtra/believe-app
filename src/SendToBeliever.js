import React, { useState } from "react";

function SendToBeliever({ naira, onBack, onSend }) {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");

    const handleSend = () => {
        const amt = parseInt(amount);
        if (!recipient || isNaN(amt) || amt <= 0 || amt > naira) {
            alert("Enter valid recipient and amount");
            return;
        }

        onSend(amt);
    };

    return (
        <div style={styles.container}>
            <button onClick={onBack} style={styles.backButton}>
                ← Back
            </button>

            <h2 style={styles.title}>Send to a Believer 🤝</h2>
            <p style={styles.subtitle}>Wallet Balance: ₦{naira.toLocaleString()}</p>

            <div style={styles.card}>
                <input
                    type="text"
                    placeholder="Recipient's wallet ID or email"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="number"
                    placeholder="Amount to send (₦)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleSend} style={styles.button}>
                    Confirm Send
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
        fontFamily: "'Segoe UI', sans-serif",
    },
    backButton: {
        marginBottom: "1rem",
        color: "blue",
        background: "none",
        border: "none",
        fontSize: "1rem",
        cursor: "pointer",
    },
    title: {
        fontSize: "1.8rem",
        fontWeight: "600",
        marginBottom: "0.5rem",
    },
    subtitle: {
        fontSize: "1rem",
        color: "#555",
        marginBottom: "1.5rem",
    },
    card: {
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        maxWidth: "400px",
        margin: "auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    input: {
        width: "100%",
        padding: "0.9rem",
        marginBottom: "1rem",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
    },
    button: {
        width: "100%",
        padding: "1rem",
        background: "#000",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        fontSize: "1rem",
        cursor: "pointer",
    },
};

export default SendToBeliever;