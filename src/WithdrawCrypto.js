import React, { useState } from "react";

function WithdrawCrypto({ naira, onBack, onSend }) {
    const [wallet, setWallet] = useState("");
    const [amount, setAmount] = useState("");

    const handleWithdraw = () => {
        const amt = parseInt(amount);
        if (!wallet || isNaN(amt) || amt <= 0 || amt > naira) {
            alert("Enter valid wallet address and amount");
            return;
        }

        onSend(amt);
    };

    return (
        <div style={styles.container}>
            <button onClick={onBack} style={styles.backButton}>
                ← Back
            </button>

            <h2 style={styles.title}>Withdraw Crypto</h2>
            <p style={styles.subtitle}>Balance: ₦{naira.toLocaleString()}</p>

            <div style={styles.card}>
                <input
                    type="text"
                    placeholder="Recipient Wallet Address"
                    value={wallet}
                    onChange={(e) => setWallet(e.target.value)}
                    style={styles.input}
                />
                <input
                    type="number"
                    placeholder="Amount (₦)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={styles.input}
                />
                <button onClick={handleWithdraw} style={styles.button}>
                    Confirm Withdraw
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
        fontFamily: "'Segoe UI', sans-serif",
        textAlign: "center",
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
        cursor: "pointer",
        fontSize: "1rem",
    },
};

export default WithdrawCrypto;