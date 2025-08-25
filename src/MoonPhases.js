import React from "react";

function MoonPhases({ naira, balance, phases, purchases, onBuyPhase, onBack }) {
    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={onBack} style={styles.back}>
                    ← Back
                </button>

                <h2 style={styles.title}>🌙 Moon Calendar Phases</h2>
                <p style={styles.subtitle}>
                    Select a phase to buy $BELIEVE. You can only buy each phase once.
                </p>

                <div style={styles.grid}>
                    {phases.map((phase) => {
                        const purchased = purchases.includes(phase.id);
                        const capReached = phase.users >= phase.cap;
                        const userHasFunds = naira >= phase.investment * 2000;

                        const disabled = purchased || capReached || !userHasFunds;
                        const progressPercent = Math.min(
                            (phase.users / phase.cap) * 100,
                            100
                        );

                        return (
                            <div key={phase.id} style={styles.card}>
                                <h3 style={styles.cardTitle}>Phase {phase.id}</h3>
                                <p style={styles.detail}>
                                    <strong>Price:</strong> ₦{(phase.investment * 2000).toLocaleString()}
                                </p>
                                <p style={styles.detail}>
                                    <strong>Receive:</strong> {phase.tokens.toLocaleString()} BLT
                                </p>
                                <p style={styles.detail}>
                                    <strong>ROI:</strong> ~{Math.floor((phase.tokens * 2000) / (phase.investment * 2000))}x
                                </p>

                                <div style={styles.progressWrap}>
                                    <div
                                        style={{
                                            ...styles.progressBar,
                                            width: `${progressPercent}%`,
                                        }}
                                    />
                                </div>

                                <button
                                    disabled={disabled}
                                    onClick={() => !disabled && onBuyPhase(phase.id)}
                                    style={{
                                        ...styles.btn,
                                        background: disabled ? "#999" : "#000",
                                        color: disabled ? "#ccc" : "#fff",
                                        cursor: disabled ? "not-allowed" : "pointer",
                                    }}
                                >
                                    {purchased
                                        ? "Already Bought"
                                        : capReached
                                            ? "Cap Reached"
                                            : "Buy This Phase"}
                                </button>
                            </div>
                        );
                    })}
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
    wrapper: {
        width: "100%",
        maxWidth: "800px",
    },
    back: {
        background: "none",
        border: "none",
        color: "blue",
        cursor: "pointer",
        marginBottom: "1.5rem",
        fontSize: "1rem",
    },
    title: {
        fontSize: "1.8rem",
        fontWeight: "600",
        marginBottom: "0.5rem",
    },
    subtitle: {
        color: "#555",
        marginBottom: "2rem",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.5rem",
    },
    card: {
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        textAlign: "left",
    },
    cardTitle: {
        fontSize: "1.2rem",
        fontWeight: "600",
        marginBottom: "0.8rem",
    },
    detail: {
        fontSize: "0.95rem",
        margin: "0.2rem 0",
    },
    progressWrap: {
        height: "10px",
        width: "100%",
        background: "#eee",
        borderRadius: "5px",
        margin: "1rem 0",
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        background: "#4CAF50",
        transition: "width 0.3s ease",
    },
    btn: {
        width: "100%",
        padding: "0.8rem",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
    },
};

export default MoonPhases;