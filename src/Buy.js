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
        setProgress(((amount / naira) * 100).toFixed(0));
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
                // Can't partially buy phase, break
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
        onBuy(bltToReceive, amount);
    };

    const bestPhase = phases.find(
        (p) => !purchases[p.id] && p.users < p.cap
    );

    return (
        <div style={{ padding: 20 }}>
            <h2>Buy $BELIEVE</h2>
            <p>
                Use your ₦BNG balance to buy $BLT (
        {bestPhase
                    ? `Best rate: ₦${(bestPhase.investment * BNG_PER_USD).toLocaleString()} → ${bestPhase.tokens} BLT`
                    : "₦2000 → 1 BLT"}
        )
      </p>

            <input
                type="range"
                min="0"
                max={naira}
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                style={{ width: "100%" }}
            />
            <div>{progress}%</div>

            <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter amount in ₦"
                style={{ width: "100%", marginTop: 10 }}
            />

            <h3 style={{ marginTop: 10 }}>
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
                style={{
                    marginTop: 20,
                    padding: 12,
                    background: "black",
                    color: "white",
                    fontWeight: "bold",
                    border: "none",
                    width: "100%",
                    cursor: "pointer",
                }}
            >
                Confirm Buy
      </button>

            <button
                onClick={handleConfirm} // inside Confirm Buy button
                style={{ marginTop: 10, background: "none", border: "none", color: "blue" }}
            >
                ← Back
      </button>
        </div>
    );
}