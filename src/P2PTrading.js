import React, { useState } from "react";

export default function P2PTrading({ onBack, onDeposit }) {
    const [showDepositInput, setShowDepositInput] = useState(false);
    const [amount, setAmount] = useState("");

    const handleConfirmDeposit = () => {
        const num = parseFloat(amount);
        if (!num || num <= 0) {
            alert("Please enter a valid amount.");
            return;
        }

        onDeposit(num); // 👈 triggers App.js logic to credit ₦BNG
        setAmount("");
        setShowDepositInput(false);
    };

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
            marginBottom: "0.5rem",
        },
        subtitle: {
            color: "#777",
            marginBottom: "1.5rem",
        },
        alertBox: {
            marginTop: "1rem",
            background: "#eef3f8",
            borderRadius: "10px",
            padding: "1rem",
        },
        input: {
            width: "100%",
            padding: "1rem",
            fontSize: "1rem",
            marginTop: "1rem",
            marginBottom: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
        },
        button: {
            padding: "1rem 2rem",
            background: "#000",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            fontWeight: "bold",
            cursor: "pointer",
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={onBack} style={styles.back}>
                    ← Back
                </button>

                <h2 style={styles.title}>🌍 P2P Trading</h2>
                <p style={styles.subtitle}>
                    Trade BelieveNG (₦BNG) with trusted believers via bank transfer, Opay, PalmPay and more.
                </p>

                <div style={styles.alertBox}>
                    <p><strong>🚧 P2P Marketplace Coming Soon</strong></p>
                    <p>You’ll be able to post offers, view trades, and chat with other believers.</p>
                </div>

                {showDepositInput ? (
                    <>
                        <input
                            type="number"
                            placeholder="Enter test deposit amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            style={styles.input}
                        />
                        <button style={styles.button} onClick={handleConfirmDeposit}>
                            Confirm Deposit
                        </button>
                    </>
                ) : (
                        <button
                            onClick={() => setShowDepositInput(true)}
                            style={styles.button}
                        >
                            Test Deposit (Bank Transfer)
                        </button>
                    )}
            </div>
        </div>
    );
}