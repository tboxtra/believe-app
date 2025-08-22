import React from "react";

function Home({ user, balance, naira, onDeposit, onSend, onBorrow, onBuy }) {
    const borrowLimit = balance * 100;
    const usage = naira / borrowLimit;
    const usagePercent = Math.min(usage * 100, 100);

    const healthColor =
        usage < 0.5 ? "#4CAF50" : usage < 0.8 ? "#FFC107" : "#F44336";

    return (
        <div style={styles.container}>
            <h2>Hi, {user.split("@")[0] || "User"} 👋</h2>

            <div style={styles.card}>
                <p style={{ fontSize: "0.9rem", color: "#555" }}>Vault Balance</p>
                <h1>{balance.toLocaleString()} BLT</h1>
                <p style={{ color: "#888" }}>~₦{borrowLimit.toLocaleString()}</p>
            </div>

            <div style={styles.card}>
                <p style={{ fontSize: "0.9rem", color: "#555" }}>Naira Wallet</p>
                <h1>₦{naira.toLocaleString()}</h1>
            </div>

            <div style={styles.vaultCard}>
                <p style={{ fontSize: "0.9rem", color: "#555" }}>Vault Health</p>
                <p>
                    Borrowed: ₦{naira.toLocaleString()} / ₦{borrowLimit.toLocaleString()}
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
                <button style={styles.btn} onClick={onDeposit}>
                    Deposit
        </button>
                <button style={styles.btn} onClick={onSend}>
                    Send
        </button>
                <button style={styles.btn} onClick={onBorrow}>
                    Borrow
        </button>
                <button style={styles.btn} onClick={onBuy}>
                    Buy $BELIEVE
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
    card: {
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "12px",
        margin: "1rem auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    vaultCard: {
        background: "#fff",
        padding: "1rem",
        borderRadius: "10px",
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)",
        marginTop: "1.5rem",
        marginBottom: "1.5rem",
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
    actions: {
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        flexWrap: "wrap",
        marginTop: "1rem",
    },
    btn: {
        padding: "0.8rem 1.5rem",
        background: "#000",
        color: "#fff",
        borderRadius: "8px",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
    },
};

export default Home;