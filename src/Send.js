import React, { useState } from "react";

function Send({ naira, onBack, onSend }) {
    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState("");

    const handleSend = () => {
        const amt = parseInt(amount);
        if (!recipient || !amt || amt <= 0 || amt > naira) {
            alert("Enter valid recipient and amount");
            return;
        }

        onSend(amt);
    };

    return (
        <div style={styles.container}>
            <h2>Send BelieveNG 💸</h2>
            <p style={{ color: "#666", marginBottom: "1rem" }}>
                Current Balance: ₦{naira.toLocaleString()}
            </p>

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

                <button style={styles.button} onClick={handleSend}>
                    Send
        </button>
                <button style={styles.back} onClick={onBack}>
                    ← Back
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
        padding: "2rem",
        borderRadius: "12px",
        maxWidth: "400px",
        margin: "auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    input: {
        width: "100%",
        padding: "0.9rem",
        margin: "0.8rem 0",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
    },
    button: {
        width: "100%",
        padding: "1rem",
        background: "#000",
        color: "#fff",
        fontWeight: "bold",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        marginBottom: "1rem",
    },
    back: {
        background: "transparent",
        color: "#000",
        border: "none",
        fontSize: "0.9rem",
        cursor: "pointer",
    },
};

export default Send;