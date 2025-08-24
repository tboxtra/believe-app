// Buy.js
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
    const [amount, setAmount] = useState(0);
    const [bltToReceive, setBltToReceive] = useState(0);
    const [purchaseBreakdown, setPurchaseBreakdown] = useState([]);
    const [progress, setProgress] = useState(0);

    const BNG_PER_USD = 2000;

    useEffect(() => {
        calculatePhasesToBuy(amount);
        setProgress(naira > 0 ? ((amount / naira) * 100).toFixed(0) : 0);
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
        if (amount <= 0 || amount > naira || bltToReceive === 0) return;

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
        onBuy(bltToReceive, amount, purchaseBreakdown);
    };

    const bestPhase = phases.find(
        (p) => !purchases[p.id] && p.users < p.cap
    );

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Buy $BELIEVE</h2>
            <p style={styles.sub}>
                Use your ₦BNG balance to buy $BLT (
        {bestPhase
                    ? `Best rate: ₦${(
                        bestPhase.investment * BNG_PER_USD
                    ).toLocaleString()} → ${bestPhase.tokens} BLT`
                    : "₦2000 → 1 BLT"}
        )
      </p>

            <div style={styles.card}>
                <input
                    type="range"
                    min="0"
                    max={naira}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    style={styles.slider}
                />
                <div style={styles.percent}>{progress}%</div>

                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Enter amount in ₦"
                    style={styles.input}
                />

                <h3 style={styles.received}>
                    You'll get <strong>{bltToReceive.toLocaleString()}</strong> $BLT
        </h3>

                {purchaseBreakdown.length > 0 && (
                    <div style={{ marginTop: 20 }}>
                        <h4>Breakdown:</h4>
                        <ul>
                            {purchaseBreakdown.map((entry, index) => (
                                <li key={index}>
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
                    disabled={amount <= 0 || amount > naira || bltToReceive === 0}
                    style={styles.confirm}
                >
                    Confirm Buy
        </button>

                <button onClick={onBack} style={styles.back}>
                    ← Back
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
    heading: {
        fontSize: "1.8rem",
        marginBottom: "0.5rem",
    },
    sub: {
        color: "#555",
        marginBottom: "1.5rem",
    },
    card: {
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        maxWidth: "600px",
        margin: "0 auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    slider: {
        width: "100%",
    },
    percent: {
        marginTop: "10px",
        marginBottom: "10px",
        fontWeight: "bold",
        fontSize: "1rem",
    },
    input: {
        width: "100%",
        marginTop: "10px",
        padding: "10px",
        fontSize: "1rem",
        border: "1px solid #ccc",
        borderRadius: "6px",
    },
    received: {
        marginTop: "20px",
    },
    confirm: {
        marginTop: "20px",
        padding: "12px",
        background: "black",
        color: "white",
        fontWeight: "bold",
        border: "none",
        width: "100%",
        cursor: "pointer",
        borderRadius: "8px",
    },
    back: {
        marginTop: "15px",
        background: "none",
        border: "none",
        color: "#000",
        fontSize: "1rem",
        cursor: "pointer",
    },
};