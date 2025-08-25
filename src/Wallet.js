import React, { useState } from "react";

export default function Wallet({ balance, naira, borrowedAmount, setScreen }) {
    const [currency, setCurrency] = useState("BNG");

    const convert = (value) => {
        if (currency === "BNG") return `₦${value.toLocaleString()}`;
        if (currency === "BLT") return `${(value / 2000).toLocaleString()} BLT`;
        if (currency === "USD") return `$${(value / 1500).toFixed(2)}`;
        if (currency === "EUR") return `€${(value / 1600).toFixed(2)}`;
        return value;
    };

    const safeNaira = Number(naira) || 0;
    const safeBalance = Number(balance) || 0;
    const safeBorrowed = Number(borrowedAmount) || 0;

    // ✅ Correct total without borrowed amount
    const totalAssets = safeNaira + safeBalance * 2000 - safeBorrowed;

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Total Assets</h2>
            <h1 style={styles.amount}>{convert(totalAssets)}</h1>

            <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                style={styles.dropdown}
            >
                <option value="BNG">₦BNG</option>
                <option value="BLT">BLT</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
            </select>

            <div style={styles.buttonRow}>
                <button onClick={() => setScreen("send")} style={styles.button}>Send</button>
                <button onClick={() => setScreen("receive")} style={styles.button}>Receive</button>
            </div>

            <div style={styles.accounts}>
                <h3>Account</h3>
                <div style={styles.accountItem}>
                    <span>Funding (₦BNG Wallet)</span>
                    <strong>{convert(naira)}</strong>
                </div>

                <button
                    onClick={() => setScreen("home")}
                    style={styles.vaultButton}
                >
                    🏛 Community Vault → {balance.toLocaleString()} BLT
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
    heading: {
        fontSize: "1.4rem",
        marginBottom: "1rem",
    },
    amount: {
        fontSize: "2.5rem",
        margin: "1rem 0",
    },
    dropdown: {
        padding: "0.5rem 1rem",
        marginBottom: "2rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "1rem",
    },
    buttonRow: {
        display: "flex",
        justifyContent: "center",
        gap: "1rem",
    },
    button: {
        flex: 1,
        background: "#000",
        color: "#fff",
        padding: "1rem",
        fontWeight: "bold",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer",
        maxWidth: "160px",
    },
    accounts: {
        marginTop: "3rem",
        textAlign: "left",
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto",
    },
    accountItem: {
        display: "flex",
        justifyContent: "space-between",
        margin: "1rem 0",
        paddingBottom: "0.5rem",
        borderBottom: "1px solid #eee",
    },
    vaultButton: {
        marginTop: "1rem",
        width: "100%",
        padding: "1rem",
        background: "#000",
        color: "#fff",
        border: "none",
        borderRadius: "12px",
        fontWeight: "bold",
        fontSize: "1rem",
        cursor: "pointer",
        textAlign: "left",
    },
};