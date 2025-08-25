import React, { useState, useEffect } from "react";

export default function Buy({
    naira,
    onBack,
    balance,
    onBuy,
    phases,
    setPhases,
    purchases,
    setPurchases,
}) {
    const [amount, setAmount] = useState(""); // now a string
    const [bltToReceive, setBltToReceive] = useState(0);
    const [purchaseBreakdown, setPurchaseBreakdown] = useState([]);
    const [progress, setProgress] = useState(0);

    const BNG_PER_USD = 2000;

    useEffect(() => {
        const numericAmount = parseFloat(amount) || 0;
        calculatePhasesToBuy(numericAmount);
        setProgress(naira > 0 ? ((numericAmount / naira) * 100).toFixed(0) : 0);
    }, [amount, naira, phases, purchases]);

    const calculatePhasesToBuy = (inputAmount) => {
        let remaining = inputAmount;
        const newBreakdown = [];
        let totalBLT = 0;

        for (let i = 0; i < phases.length; i++) {
            const phase = phases[i];
            if (purchases[phase.id] || phase.users >= phase.cap) continue;

            const phasePrice = phase.investment * BNG_PER_USD;

            if (remaining >= phasePrice) {
                remaining -= phasePrice;
                newBreakdown.push({
                    id: phase.id,
                    amount: phasePrice,
                    blt: phase.tokens,
                });
                totalBLT += phase.tokens;
            } else {
                break;
            }
        }

        if (remaining >= BNG_PER_USD) {
            const extraBLT = Math.floor(remaining / BNG_PER_USD);
            totalBLT += extraBLT;
            newBreakdown.push({
                id: "default",
                amount: extraBLT * BNG_PER_USD,
                blt: extraBLT,
            });
        }

        setBltToReceive(totalBLT);
        setPurchaseBreakdown(newBreakdown);
    };

    const handleConfirm = () => {
        const numericAmount = parseFloat(amount);
        if (!numericAmount || numericAmount <= 0 || numericAmount > naira || bltToReceive === 0) return;

        const updatedPhases = [...phases];
        const updatedPurchases = { ...purchases };

        purchaseBreakdown.forEach((entry) => {
            if (entry.id === "default") return;

            const phase = updatedPhases.find((p) => p.id === entry.id);
            if (!phase) return;
            phase.users += 1;
            updatedPurchases[entry.id] = true;
        });

        setPhases(updatedPhases);
        setPurchases(updatedPurchases);
        onBuy(bltToReceive, numericAmount, purchaseBreakdown);
        setAmount(""); // reset input
    };

    const bestPhase = phases.find(
        (p) => !purchases[p.id] && p.users < p.cap
    );

    const numericAmount = parseFloat(amount) || 0;

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={onBack} style={styles.back}>
                    ← Back
                </button>

                <h2 style={styles.heading}>Buy $BELIEVE</h2>
                <p style={styles.sub}>
                    Use your ₦BNG to buy $BLT.{" "}
                    {bestPhase
                        ? `Best rate: ₦${(bestPhase.investment * BNG_PER_USD).toLocaleString()} → ${bestPhase.tokens} BLT`
                        : "₦2000 → 1 BLT"}
                </p>

                <div style={styles.card}>
                    <input
                        type="range"
                        min="0"
                        max={naira}
                        value={numericAmount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={styles.slider}
                    />
                    <div style={styles.percent}>{progress}%</div>

                    <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount in ₦"
                        style={styles.input}
                    />

                    <h3 style={styles.result}>
                        You'll get <strong>{bltToReceive.toLocaleString()}</strong> $BLT
                    </h3>

                    {purchaseBreakdown.length > 0 && (
                        <div style={styles.breakdown}>
                            <h4 style={styles.breakdownTitle}>Breakdown:</h4>
                            <ul style={styles.breakdownList}>
                                {purchaseBreakdown.map((entry, index) => (
                                    <li key={index} style={styles.breakdownItem}>
                                        {entry.id === "default"
                                            ? `Default Phase: ₦${entry.amount.toLocaleString()} → ${entry.blt.toLocaleString()} BLT`
                                            : `Phase ${entry.id}: ₦${entry.amount.toLocaleString()} → ${entry.blt.toLocaleString()} BLT`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button
                        onClick={handleConfirm}
                        disabled={
                            numericAmount <= 0 ||
                            numericAmount > naira ||
                            bltToReceive === 0
                        }
                        style={{
                            ...styles.confirm,
                            background:
                                numericAmount <= 0 || numericAmount > naira || bltToReceive === 0
                                    ? "#aaa"
                                    : "#000",
                            cursor:
                                numericAmount <= 0 || numericAmount > naira || bltToReceive === 0
                                    ? "not-allowed"
                                    : "pointer",
                        }}
                    >
                        Confirm Buy
                    </button>
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
    back: {
        marginBottom: "1.5rem",
        color: "blue",
        background: "none",
        border: "none",
        fontSize: "1rem",
        cursor: "pointer",
    },
    heading: {
        fontSize: "1.8rem",
        fontWeight: "600",
        marginBottom: "0.3rem",
    },
    sub: {
        fontSize: "1rem",
        color: "#555",
        marginBottom: "1.5rem",
    },
    card: {
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    slider: {
        width: "100%",
    },
    percent: {
        marginTop: "0.5rem",
        marginBottom: "1rem",
        fontWeight: "bold",
        fontSize: "1rem",
    },
    input: {
        width: "100%",
        marginBottom: "1rem",
        padding: "0.9rem",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
    },
    result: {
        marginTop: "1rem",
        fontSize: "1.1rem",
    },
    breakdown: {
        marginTop: "1.5rem",
        textAlign: "left",
    },
    breakdownTitle: {
        marginBottom: "0.5rem",
        fontSize: "1rem",
        fontWeight: "600",
    },
    breakdownList: {
        paddingLeft: "1rem",
        fontSize: "0.95rem",
    },
    breakdownItem: {
        marginBottom: "0.4rem",
    },
    confirm: {
        marginTop: "1.5rem",
        padding: "1rem",
        color: "#fff",
        border: "none",
        width: "100%",
        fontWeight: "bold",
        borderRadius: "10px",
    },
};