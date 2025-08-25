import React from "react";

function Home({
    user,
    balance,
    naira,
    onDeposit,
    onSend,
    onBorrow,
    onBuy,
    onRepay,
    setScreen,
    borrowedAmount
}) {
    const borrowLimit = balance * 2000;
    const usage = borrowedAmount / borrowLimit;
    const usagePercent = Math.min(usage * 100, 100);

    const healthColor =
        usage < 0.5 ? "#4CAF50" : usage < 0.8 ? "#FFC107" : "#F44336";

    return (
        <div style={styles.container}>
            <h2 style={styles.title}>Believe Vault</h2>

            <div style={styles.card}>
                <p style={styles.label}>Believe Vault Balance</p>
                <h1 style={styles.bigNumber}>{balance.toLocaleString()} BLT</h1>
                <p style={styles.subInfo}>~₦{borrowLimit.toLocaleString()}</p>
            </div>

            <div style={styles.card}>
                <p style={styles.label}>BelieveNG Balance</p>
                <h1 style={styles.bigNumber}>
                    ₦
                    {typeof naira === "number"
                        ? naira.toLocaleString()
                        : "0"}{" "}
                    BNG
                </h1>
            </div>

            <div style={styles.vaultCard}>
                <p style={styles.label}>Vault Health</p>
                <p style={styles.healthStatus}>
                    Borrowed: ₦
                    {typeof borrowedAmount === "number"
                        ? borrowedAmount.toLocaleString()
                        : "0"}{" "}
                    / ₦
                    {borrowLimit.toLocaleString()}
                </p>
                <div style={styles.barBackground}>
                    <div
                        style={{
                            ...styles.barFill,
                            width: `${usagePercent}%`,
                            background: healthColor,
                        }}
                    />
                </div>
            </div>

            <div style={styles.actions}>
                <button style={styles.btn} onClick={() => onBuy()}>
                    Buy $BELIEVE
                </button>
                <button style={styles.btn} onClick={onBorrow}>
                    Borrow
                </button>
                <button style={styles.btn} onClick={() => onRepay()}>
                    Repay
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
        fontFamily: "'Segoe UI', sans-serif",
    },
    title: {
        fontSize: "1.8rem",
        fontWeight: "600",
        marginBottom: "1.5rem",
    },
    label: {
        fontSize: "0.95rem",
        color: "#555",
        marginBottom: "0.3rem",
    },
    bigNumber: {
        fontSize: "2.2rem",
        fontWeight: "bold",
        margin: "0.2rem 0",
    },
    subInfo: {
        fontSize: "0.9rem",
        color: "#888",
    },
    card: {
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "12px",
        margin: "1rem auto",
        maxWidth: "400px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    vaultCard: {
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        marginTop: "1.5rem",
        marginBottom: "2rem",
        maxWidth: "400px",
        marginLeft: "auto",
        marginRight: "auto",
    },
    barBackground: {
        width: "100%",
        height: "14px",
        background: "#eee",
        borderRadius: "7px",
        marginTop: "0.5rem",
        overflow: "hidden",
    },
    barFill: {
        height: "100%",
        transition: "width 0.3s ease",
    },
    healthStatus: {
        fontSize: "0.95rem",
        marginBottom: "0.4rem",
    },
    actions: {
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: "2rem",
    },
    btn: {
        padding: "0.8rem 1.5rem",
        background: "#000",
        color: "#fff",
        borderRadius: "8px",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
        fontSize: "1rem",
        minWidth: "120px",
    },
};

export default Home;