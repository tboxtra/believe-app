import React, { useState } from "react";

function Deposit({ onBack, onDeposit }) {
    const [method, setMethod] = useState("crypto");
    const [amount, setAmount] = useState("");

    const handleDeposit = () => {
        const numeric = parseInt(amount);
        if (!numeric || numeric <= 0) return;
        onDeposit(numeric);
    };

    return (
        <div style={styles.container}>
            <h2>Deposit BelieveNG</h2>
            <p>Choose how you want to deposit to your BelieveNG wallet.</p>

            <div style={styles.methodSwitch}>
                <button
                    style={{
                        ...styles.methodButton,
                        background: method === "crypto" ? "#000" : "#eee",
                        color: method === "crypto" ? "#fff" : "#000",
                    }}
                    onClick={() => setMethod("crypto")}
                >
                    Crypto
        </button>
                <button
                    style={{
                        ...styles.methodButton,
                        background: method === "bank" ? "#000" : "#eee",
                        color: method === "bank" ? "#fff" : "#000",
                    }}
                    onClick={() => setMethod("bank")}
                >
                    Bank Transfer
        </button>
            </div>

            <div style={styles.card}>
                {method === "crypto" ? (
                    <>
                        <p style={{ fontWeight: "bold" }}>Send USDT (BEP20) to:</p>
                        <p style={{ wordBreak: "break-all", fontSize: "0.9rem" }}>
                            0x1234abcd5678efgh9012ijklmnop3456qrst7890
            </p>
                        <p style={{ fontSize: "0.8rem", color: "#888" }}>
                            Enter the BelieveNG equivalent to confirm your deposit.
            </p>
                    </>
                ) : (
                        <>
                            <p style={{ fontWeight: "bold" }}>Transfer to:</p>
                            <p>Bank: Zenith Bank</p>
                            <p>Account Number: 1234567890</p>
                            <p>Account Name: Believe Wallets Ltd</p>
                        </>
                    )}

                <input
                    type="number"
                    placeholder="Enter amount in ₦"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    style={styles.input}
                />

                <button style={styles.button} onClick={handleDeposit}>
                    Confirm Deposit
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
    methodSwitch: {
        display: "flex",
        justifyContent: "center",
        marginBottom: "1rem",
        gap: "1rem",
    },
    methodButton: {
        padding: "0.6rem 1.5rem",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
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
        padding: "0.8rem",
        margin: "1rem 0",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "1rem",
    },
    button: {
        width: "100%",
        padding: "1rem",
        background: "#000",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        marginBottom: "1rem",
        cursor: "pointer",
    },
    back: {
        background: "transparent",
        color: "#000",
        border: "none",
        fontSize: "0.9rem",
        cursor: "pointer",
    },
};

export default Deposit;