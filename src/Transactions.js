import React from "react";

function Transactions({ transactions, onBack }) {
    return (
        <div style={styles.container}>
            <h2>Transaction History 📜</h2>

            {transactions.length === 0 ? (
                <p style={styles.empty}>No transactions yet.</p>
            ) : (
                    <ul style={styles.list}>
                        {transactions.map((tx, index) => (
                            <li key={index} style={styles.item}>
                                <div style={styles.row}>
                                    <span style={styles.type}>{tx.type}</span>
                                    <span style={styles.amount}>{tx.amount}</span>
                                </div>
                                <div style={styles.time}>{tx.time}</div>
                            </li>
                        ))}
                    </ul>
                )}

            <button style={styles.back} onClick={onBack}>
                ← Back
      </button>
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
    list: {
        listStyle: "none",
        padding: 0,
        marginTop: "1.5rem",
        maxWidth: "500px",
        marginLeft: "auto",
        marginRight: "auto",
    },
    item: {
        background: "#fff",
        padding: "1rem",
        borderRadius: "8px",
        marginBottom: "1rem",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        textAlign: "left",
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "0.5rem",
        fontWeight: "bold",
    },
    type: {
        color: "#333",
    },
    amount: {
        color: "#000",
    },
    time: {
        fontSize: "0.85rem",
        color: "#888",
    },
    empty: {
        color: "#999",
        marginTop: "2rem",
    },
    back: {
        marginTop: "2rem",
        background: "transparent",
        color: "#000",
        border: "none",
        fontSize: "0.9rem",
        cursor: "pointer",
    },
};

export default Transactions;