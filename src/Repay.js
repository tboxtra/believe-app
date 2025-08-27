import React, { useState } from "react";

export default function Repay({ borrowed, naira, onRepay, onBack }) {
    // keep as string so we can validate/allow "1." while typing
    const [amount, setAmount] = useState("");

    // show up to 2 decimals, but hide decimals when not needed
    const fmt = (n) => {
        const hasDecimals = Math.abs((Number(n) || 0) - Math.trunc(Number(n) || 0)) > 1e-9;
        return (Number(n) || 0).toLocaleString(undefined, {
            minimumFractionDigits: hasDecimals ? 2 : 0,
            maximumFractionDigits: 2,
        });
    };

    // allow only numbers with up to 2 decimal places
    const onChangeAmount = (e) => {
        const v = e.target.value;
        if (v === "" || /^\d*([.]\d{0,2})?$/.test(v)) setAmount(v);
    };

    const handleRepay = () => {
        const numeric = parseFloat(amount);
        if (!numeric || numeric <= 0) return alert("Enter a valid amount.");
        if (numeric > borrowed) return alert("You can't repay more than you owe.");
        if (numeric > naira) return alert("Insufficient ₦BNG balance.");
        // round to 2dp to avoid tiny float residues
        onRepay(Math.round(numeric * 100) / 100);
    };

    const numeric = parseFloat(amount) || 0;
    const disabled = !numeric || numeric <= 0 || numeric > borrowed || numeric > naira;

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={onBack} style={styles.back}>← Back</button>

                <h2 style={styles.title}>Repay Loan</h2>
                <p style={styles.subtitle}>
                    You currently owe: <strong>₦{fmt(borrowed)}</strong>
                </p>

                <div style={styles.card}>
                    <input
                        type="number"
                        inputMode="decimal"
                        step="0.01"
                        min="0"
                        placeholder="Enter repayment amount (₦)"
                        value={amount}
                        onChange={onChangeAmount}
                        style={styles.input}
                    />

                    <button
                        onClick={handleRepay}
                        style={{ ...styles.button, opacity: disabled ? 0.6 : 1, cursor: disabled ? "not-allowed" : "pointer" }}
                        disabled={disabled}
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
    wrapper: { maxWidth: "600px", width: "100%" },
    back: {
        marginBottom: "1rem",
        color: "blue",
        background: "none",
        border: "none",
        fontSize: "1rem",
        cursor: "pointer",
    },
    title: { fontSize: "1.8rem", fontWeight: "600", marginBottom: "0.5rem" },
    subtitle: { fontSize: "1rem", color: "#555", marginBottom: "2rem" },
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
    },
};