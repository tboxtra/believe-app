import React, { useState } from "react";

export default function Repay({ borrowed, naira, onRepay, onBack }) {
    const [amount, setAmount] = useState("");

    const handleRepay = () => {
        const numeric = parseInt(amount);
        if (!numeric || numeric <= 0) return alert("Enter valid amount.");
        if (numeric > borrowed) return alert("You can't repay more than you owe.");
        if (numeric > naira) return alert("Insufficient ₦BNG balance.");
        onRepay(numeric);
    };

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={onBack} style={styles.back}>
                    ← Back
                </button>

                <h2 style={styles.title}>Repay Loan</h2>
                <p style={styles.subtitle}>
                    You currently owe: <strong>₦{borrowed.toLocaleString()}</strong>
                </p>

                <div style={styles.card}>
                    <input
                        type="number"
                        placeholder="Enter repayment amount (₦)"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={styles.input}
                    />

                    <button
                        onClick={handleRepay}
                        style={styles.button}
                        disabled={!amount || parseInt(amount) <= 0}
                    >
                        Confirm Repayment
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
        maxWidth: "600px",
        width: "100%",
    },
    back: {
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
        marginBottom: "2rem",
    },
    card: {
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    input: {
        width: "100%",
        padding: "1rem",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        marginBottom: "1.5rem",
    },
    button: {
        width: "100%",
        padding: "1rem",
        background: "#000",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        fontWeight: "bold",
        cursor: "pointer",
    },
};