import React from "react";

function Transactions({ transactions, onBack }) {
    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={onBack} style={styles.back}>
                    ← Back
                </button>

                <h2 style={styles.title}>📜 Transaction History</h2>

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
            </div>
        </div>
    );
}

const styles = {
    container: {
        background: "#FFF9F0",
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
    },
    wrapper: {
        maxWidth: "600px",
        width: "100%",
    },
    back: {
        marginBottom: "1.5rem",
        color: "blue",
        background: "none",
        border: "none",
        fontSize: "1rem",
        cursor: "pointer",
    },
    title: {
        fontSize: "1.8rem",
        fontWeight: "600",
        marginBottom: "1rem",
    },
    list: {
        listStyle: "none",
        padding: 0,
    },
    item: {
        background: "#fff",
        padding: "1rem",
        borderRadius: "12px",
        marginBottom: "1rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    row: {
        display: "flex",
        justifyContent: "space-between",
        marginBottom: "0.5rem",
        fontWeight: "600",
    },
    type: {
        color: "#333",
    },
    amount: {
        color: "#000",
    },
    time: {
        fontSize: "0.85rem",
        color: "#777",
    },
    empty: {
        color: "#999",
        fontSize: "1rem",
        marginTop: "2rem",
        textAlign: "center",
    },
};

export default Transactions;