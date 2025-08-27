import React, { useState, useEffect, useMemo } from "react";

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
    // amount is a string so we can keep "1." while typing
    const [amount, setAmount] = useState("");
    const [bltToReceive, setBltToReceive] = useState(0);
    const [purchaseBreakdown, setPurchaseBreakdown] = useState([]);
    const [progress, setProgress] = useState(0);

    // ---- constants / helpers ----
    const RATE = 2000; // ₦BNG per 1 BLT
    const round2 = (n) => Math.round((Number(n) + Number.EPSILON) * 100) / 100;
    const fmtNum = (n) => {
        const v = Number(n) || 0;
        const hasDecimals = Math.abs(v - Math.trunc(v)) > 1e-9;
        return v.toLocaleString(undefined, {
            minimumFractionDigits: hasDecimals ? 2 : 0,
            maximumFractionDigits: 2,
        });
    };

    const bestPhase = useMemo(
        () => phases.find((p) => !purchases[p.id] && p.users < p.cap),
        [phases, purchases]
    );

    const numericAmount = useMemo(() => {
        // clamp to available balance; allow 2dp
        const n = Math.max(0, Math.min(Number(amount) || 0, naira));
        return round2(n);
    }, [amount, naira]);

    useEffect(() => {
        // progress % (0..100)
        setProgress(naira > 0 ? Math.min(100, Math.round((numericAmount / naira) * 100)) : 0);
        calculatePhasesToBuy(numericAmount);
    }, [numericAmount, naira, phases, purchases]); // eslint-disable-line

    const calculatePhasesToBuy = (inputAmount) => {
        let remaining = round2(inputAmount);
        const newBreakdown = [];
        let totalBLT = 0;

        // 1) Buy whole phases first
        for (let i = 0; i < phases.length; i++) {
            const phase = phases[i];
            if (purchases[phase.id] || phase.users >= phase.cap) continue;

            const phasePrice = phase.investment * RATE; // ₦BNG needed for this phase
            if (remaining >= phasePrice) {
                remaining = round2(remaining - phasePrice);
                newBreakdown.push({
                    id: phase.id,
                    amount: phasePrice,
                    blt: phase.tokens, // full phase tokens
                });
                totalBLT += phase.tokens;
            }
        }

        // 2) Convert the leftover at base rate — allow FRACTIONS up to 2dp
        if (remaining > 0) {
            const extraBLT = round2(remaining / RATE); // up to 2dp
            if (extraBLT > 0) {
                newBreakdown.push({
                    id: "default",
                    amount: round2(extraBLT * RATE), // may be a hair under input due to rounding
                    blt: extraBLT,                   // fractional BLT allowed
                });
                totalBLT = round2(totalBLT + extraBLT);
            }
        }

        setBltToReceive(totalBLT);
        setPurchaseBreakdown(newBreakdown);
    };

    const handleConfirm = () => {
        if (numericAmount <= 0 || numericAmount > naira || bltToReceive <= 0) return;

        // mark bought phases
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
        setAmount(""); // reset
    };

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={onBack} style={styles.back}>← Back</button>

                <h2 style={styles.heading}>Buy $BELIEVE</h2>
                <p style={styles.sub}>
                    Use your ₦BNG to buy $BLT.&nbsp;
          {bestPhase
                        ? `Best rate: ₦${(bestPhase.investment * RATE).toLocaleString()} → ${bestPhase.tokens} BLT`
                        : "₦2000 → 1 BLT"}
                </p>

                <div style={styles.card}>
                    {/* slider mirrors the typed amount; allow any step */}
                    <input
                        type="range"
                        min="0"
                        max={naira || 0}
                        step="any"
                        value={numericAmount}
                        onChange={(e) => setAmount(e.target.value)}
                        style={styles.slider}
                    />
                    <div style={styles.percent}>{progress}%</div>

                    {/* allow 2dp input */}
                    <input
                        type="number"
                        step="0.01"
                        inputMode="decimal"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount in ₦BNG"
                        style={styles.input}
                    />

                    <h3 style={styles.result}>
                        You'll get <strong>{fmtNum(bltToReceive)}</strong> $BLT
          </h3>

                    {purchaseBreakdown.length > 0 && (
                        <div style={styles.breakdown}>
                            <h4 style={styles.breakdownTitle}>Breakdown:</h4>
                            <ul style={styles.breakdownList}>
                                {purchaseBreakdown.map((entry, i) => (
                                    <li key={i} style={styles.breakdownItem}>
                                        {entry.id === "default"
                                            ? `Default: ₦${fmtNum(entry.amount)} → ${fmtNum(entry.blt)} BLT`
                                            : `Phase ${entry.id}: ₦${fmtNum(entry.amount)} → ${fmtNum(entry.blt)} BLT`}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <button
                        onClick={handleConfirm}
                        disabled={numericAmount <= 0 || numericAmount > naira || bltToReceive <= 0}
                        style={{
                            ...styles.confirm,
                            background:
                                numericAmount <= 0 || numericAmount > naira || bltToReceive <= 0
                                    ? "#aaa"
                                    : "#000",
                            cursor:
                                numericAmount <= 0 || numericAmount > naira || bltToReceive <= 0
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

/* ---------- styles ---------- */
const styles = {
    container: { background: "#FFF9F0", minHeight: "100vh", padding: "2rem", display: "flex", justifyContent: "center" },
    wrapper: { maxWidth: "600px", width: "100%" },
    back: { marginBottom: "1.5rem", color: "blue", background: "none", border: "none", fontSize: "1rem", cursor: "pointer" },
    heading: { fontSize: "1.8rem", fontWeight: 600, marginBottom: "0.3rem" },
    sub: { fontSize: "1rem", color: "#555", marginBottom: "1.5rem" },
    card: { background: "#fff", padding: "2rem", borderRadius: 12, boxShadow: "0 4px 10px rgba(0,0,0,0.05)" },
    slider: { width: "100%" },
    percent: { marginTop: "0.5rem", marginBottom: "1rem", fontWeight: "bold", fontSize: "1rem" },
    input: { width: "100%", marginBottom: "1rem", padding: "0.9rem", fontSize: "1rem", borderRadius: 8, border: "1px solid #ccc" },
    result: { marginTop: "1rem", fontSize: "1.1rem" },
    breakdown: { marginTop: "1.5rem", textAlign: "left" },
    breakdownTitle: { marginBottom: "0.5rem", fontSize: "1rem", fontWeight: 600 },
    breakdownList: { paddingLeft: "1rem", fontSize: "0.95rem" },
    breakdownItem: { marginBottom: "0.4rem" },
    confirm: { marginTop: "1.5rem", padding: "1rem", color: "#fff", border: "none", width: "100%", fontWeight: "bold", borderRadius: 10 },
};