import React, { useState } from "react";

function WithdrawCrypto({ naira, onBack, onSend }) {
    const [wallet, setWallet] = useState("");
    const [amount, setAmount] = useState(""); // keep as string while typing

    const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
    const fmtSmart = (n) => {
        const v = round2(n);
        const hasDecimals = Math.abs(v - Math.trunc(v)) > 1e-9;
        return v.toLocaleString(undefined, {
            minimumFractionDigits: hasDecimals ? 2 : 0,
            maximumFractionDigits: 2,
        });
    };

    const onAmountChange = (e) => {
        const raw = e.target.value;
        if (raw === "") return setAmount("");

        // allow "123", "123.", "123.4", "123.45"
        const ok = /^(\d+(\.\d{0,2})?)$/.test(raw);
        if (!ok) return;

        // clamp to balance (don’t round yet, keep what the user typed)
        const numeric = Math.min(parseFloat(raw) || 0, naira);
        setAmount(raw);
    };

    const handleWithdraw = () => {
        const numeric = round2(parseFloat(amount));
        if (!wallet || !numeric || numeric <= 0 || numeric > naira) {
            alert("Enter a valid wallet address and amount.");
            return;
        }
        onSend(numeric);
    };

    const disabled =
        !wallet || !(round2(parseFloat(amount)) > 0) || round2(parseFloat(amount)) > naira;

    return (
        <div style={styles.container}>
            <button onClick={onBack} style={styles.backButton}>← Back</button>

            <h2 style={styles.title}>Withdraw Crypto</h2>
            <p style={styles.subtitle}>Balance: ₦{fmtSmart(naira)}</p>

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
                    inputMode="decimal"
                    step="0.01"
                    placeholder="Amount (₦)"
                    value={amount}
                    onChange={onAmountChange}
                    style={styles.input}
                />

                <button
                    onClick={handleWithdraw}
                    style={{
                        ...styles.button,
                        opacity: disabled ? 0.6 : 1,
                        cursor: disabled ? "not-allowed" : "pointer",
                    }}
                    disabled={disabled}
                >
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
    title: { fontSize: "1.8rem", fontWeight: 600, marginBottom: "0.5rem" },
    subtitle: { fontSize: "1rem", color: "#555", marginBottom: "1.5rem" },
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
    },
};

export default WithdrawCrypto;