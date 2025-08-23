import React from "react";

function MoonPhases({ naira, balance, phases, purchases, onBuyPhase, onBack }) {
    return (
        <div style={styles.container}>
            <h2>🌙 Moon Calendar Phases</h2>
            <p style={{ marginBottom: "2rem", color: "#555" }}>
                Select a phase to buy $BELIEVE. You can only buy each phase once.
      </p>

            <div style={styles.grid}>
                {phases.map((phase) => {
                    const purchased = purchases.includes(phase.id);
                    const capReached = phase.users >= phase.cap;
                    const userHasFunds = naira >= phase.investment;

                    const progressPercent = Math.min((phase.users / phase.cap) * 100, 100);

                    const disabled = purchased || capReached || !userHasFunds;

                    return (
                        <div key={phase.id} style={styles.card}>
                            <h3>🌑 Phase {phase.id}</h3>
                            <p>
                                <strong>Price:</strong> ₦{(phase.investment * 2000).toLocaleString()}
                            </p>
                            <p>
                                <strong>Receive:</strong> {phase.tokens.toLocaleString()} BLT
              </p>
                            <p>
                                <strong>ROI:</strong> ~{Math.floor((phase.tokens) / phase.investment)}×
              </p>

                            <div style={styles.progressWrap}>
                                <div style={{ ...styles.progressBar, width: `${progressPercent}%` }} />
                            </div>

                            <button
                                disabled={disabled}
                                onClick={() => onBuyPhase(phase.id)}
                                style={{
                                    ...styles.btn,
                                    background: disabled ? "#999" : "#000",
                                    cursor: disabled ? "not-allowed" : "pointer",
                                }}
                            >
                                {purchased
                                    ? "Purchased"
                                    : capReached
                                        ? "Phase Full"
                                        : !userHasFunds
                                            ? "Insufficient ₦"
                                            : "Buy This Phase"}
                            </button>
                        </div>
                    );
                })}
            </div>

            <button style={styles.back} onClick={onBack}>
                ← Back
      </button>
        </div>
    );
}

const styles = {
    container: {
        padding: "2rem",
        background: "#FFF9F0",
        minHeight: "100vh",
        textAlign: "center",
    },
    grid: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "1.5rem",
    },
    card: {
        background: "#fff",
        borderRadius: "12px",
        padding: "1.5rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
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
    progressText: {
        fontSize: "0.85rem",
        color: "#555",
    },
    btn: {
        marginTop: "1rem",
        padding: "0.6rem 1.2rem",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
    },
    back: {
        marginTop: "2rem",
        display: "inline-block",
        background: "transparent",
        border: "none",
        color: "#000",
        fontWeight: "bold",
        fontSize: "1rem",
        cursor: "pointer",
    },
};

export default MoonPhases;