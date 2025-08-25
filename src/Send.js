import React from "react";

function Send({ setScreen, onBack }) {
    const options = [
        {
            title: "Withdraw Crypto",
            description: "Send BNG to an external wallet",
            onClick: () => setScreen("withdraw"),
        },
        {
            title: "Send to a Believer",
            description: "Transfer BNG directly to another app user",
            onClick: () => setScreen("sendtobeliever"),
        },
        {
            title: "P2P Trading",
            description: "Sell BNG for cash via bank transfer",
            onClick: () => setScreen("p2pbank"),
        },
    ];

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={onBack} style={styles.backButton}>
                    ← Back
                </button>

                <h2 style={styles.title}>💸 Send BNG</h2>
                <p style={styles.subtitle}>Choose how you want to send BelieveNG:</p>

                <div style={styles.optionsWrapper}>
                    {options.map((option, idx) => (
                        <div
                            key={idx}
                            onClick={option.onClick}
                            style={styles.card}
                        >
                            <h3 style={styles.cardTitle}>{option.title}</h3>
                            <p style={styles.cardDesc}>{option.description}</p>
                        </div>
                    ))}
                </div>
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
    backButton: {
        marginBottom: "1rem",
        color: "blue",
        background: "none",
        border: "none",
        fontSize: "1rem",
        cursor: "pointer",
    },
    title: {
        fontSize: "1.8rem",
        fontWeight: "600",
        marginBottom: "0.5rem",
    },
    subtitle: {
        fontSize: "1rem",
        color: "#555",
        marginBottom: "2rem",
    },
    optionsWrapper: {
        display: "flex",
        flexDirection: "column",
        gap: "1.2rem",
    },
    card: {
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        cursor: "pointer",
        transition: "transform 0.2s",
    },
    cardTitle: {
        fontSize: "1.2rem",
        marginBottom: "0.5rem",
        fontWeight: "600",
    },
    cardDesc: {
        color: "#777",
        fontSize: "0.95rem",
    },
};

export default Send;