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
            <h2 style={styles.heading}>Repay Loan</h2>
            <p style={styles.sub}>
                You currently owe: ₦{borrowed.toLocaleString()}
            </p>

            <div style={styles.card}>
                <input
                    type="number"
                    placeholder="Enter repayment amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={styles.input}
                />

                <button
                    onClick={handleRepay}
                    style={styles.confirm}
                    disabled={!amount || parseInt(amount) <= 0}
                >
                    Confirm Repayment
        </button>

                <button onClick={onBack} style={styles.back}>
                    ← Back
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
        textAlign: "center",
    },
    heading: {
        fontSize: "1.8rem",
        marginBottom: "0.5rem",
    },
    sub: {
        color: "#555",
        marginBottom: "1.5rem",
    },
    card: {
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        maxWidth: "600px",
        margin: "0 auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    input: {
        width: "100%",
        padding: "12px",
        fontSize: "1rem",
        marginBottom: "1rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
    },
    confirm: {
        width: "100%",
        padding: "12px",
        fontSize: "1rem",
        background: "black",
        color: "white",
        fontWeight: "bold",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
    },
    back: {
        marginTop: "15px",
        background: "none",
        border: "none",
        color: "blue",
        fontSize: "1rem",
        cursor: "pointer",
    },
};