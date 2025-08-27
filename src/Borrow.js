// src/Borrow.js
import React, { useState } from "react";

function Borrow({ balance, borrowed = 0, onBack, onBorrow }) {
    // 40% cap of vault value (BLT * 2000)
    const capTotal = balance * 2000 * 0.4;

    // What’s still available to borrow now
    const remaining = Math.max(0, capTotal - (Number(borrowed) || 0));

    // Keep input as string so users can type "12.", "12.3", etc.
    const [borrowAmount, setBorrowAmount] = useState("");
    const [sliderValue, setSliderValue] = useState(0); // 0..100 of remaining

    // Helpers
    const round2 = (n) => Math.round((Number(n) || 0) * 100) / 100;
    // Show 0 decimals if whole number, otherwise 2
    const fmtSmart = (n) => {
        const v = round2(n);
        const hasDecimals = Math.abs(v - Math.trunc(v)) > 1e-9;
        return v.toLocaleString(undefined, {
            minimumFractionDigits: hasDecimals ? 2 : 0,
            maximumFractionDigits: 2,
        });
    };

    // Slider = percentage of remaining limit
    const handleSliderChange = (e) => {
        const percent = parseInt(e.target.value, 10) || 0;
        setSliderValue(percent);
        const calc = round2((percent / 100) * remaining);
        setBorrowAmount(String(calc)); // keep raw; formatting is for display only
    };

    // Accept up to 2 decimals; preserve raw typing; clamp to remaining
    const handleInputChange = (e) => {
        const raw = e.target.value;

        if (raw === "") {
            setBorrowAmount("");
            setSliderValue(0);
            return;
        }

        // allow "123", "123.", "123.4", "123.45"
        const ok = /^(\d+(\.\d{0,2})?)$/.test(raw);
        if (!ok) return;

        // Clamp to remaining limit
        const numeric = Math.min(parseFloat(raw) || 0, remaining);
        setBorrowAmount(raw);

        // Update slider relative to remaining
        const pct = remaining > 0 ? Math.min(Math.floor((numeric / remaining) * 100), 100) : 0;
        setSliderValue(pct);
    };

    const confirmBorrow = () => {
        const numeric = round2(parseFloat(borrowAmount));
        if (numeric > 0 && numeric <= remaining) onBorrow(numeric);
    };

    const amountNum = round2(parseFloat(borrowAmount) || 0);

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={onBack} style={styles.back}>← Back</button>

                <h2 style={styles.title}>Borrow BelieveNG</h2>

                <p style={styles.subtitle}>
                    You can only borrow up to <strong>40% of your Believe vault balance</strong>.
          <br />
          Limit: <strong>₦{fmtSmart(capTotal)}</strong> • Already borrowed: <strong>₦{fmtSmart(borrowed)}</strong>
                    <br />
          Remaining you can borrow now: <strong>₦{fmtSmart(remaining)}</strong>
                </p>

                <div style={styles.card}>
                    <div style={styles.sliderGroup}>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            step="1"
                            value={sliderValue}
                            onChange={handleSliderChange}
                            style={styles.slider}
                            disabled={remaining <= 0}
                        />
                        <div style={styles.percentBadge}>{sliderValue}% of remaining</div>
                    </div>

                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        inputMode="decimal"
                        value={borrowAmount}
                        onChange={handleInputChange}
                        placeholder="Enter amount to borrow (₦)"
                        style={styles.input}
                        disabled={remaining <= 0}
                    />

                    <button
                        style={{
                            ...styles.button,
                            opacity: amountNum > 0 && amountNum <= remaining ? 1 : 0.6,
                            cursor: amountNum > 0 && amountNum <= remaining ? "pointer" : "not-allowed",
                        }}
                        onClick={confirmBorrow}
                        disabled={!(amountNum > 0 && amountNum <= remaining)}
                    >
                        Confirm Borrow
          </button>
                </div>
            </div>
        </div>
    );
}

/* ---------------- STYLES ---------------- */
const styles = {
    container: {
        background: "#FFF9F0",
        minHeight: "100vh",
        padding: "2rem",
        display: "flex",
        justifyContent: "center",
    },
    wrapper: { maxWidth: "600px", width: "100%" },
    back: {
        marginBottom: "1rem",
        color: "blue",
        background: "none",
        border: "none",
        fontSize: "1rem",
        cursor: "pointer",
    },
    title: { fontSize: "1.8rem", fontWeight: "600", marginBottom: "0.5rem" },
    subtitle: { fontSize: "1rem", color: "#555", marginBottom: "1.5rem", lineHeight: 1.5 },
    card: {
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    sliderGroup: { position: "relative", marginBottom: "1.2rem" },
    slider: { width: "100%" },
    percentBadge: {
        position: "absolute",
        top: "-1.8rem",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#000",
        color: "#fff",
        padding: "0.35rem 0.7rem",
        borderRadius: "8px",
        fontSize: "0.85rem",
        fontWeight: "bold",
    },
    input: {
        width: "100%",
        padding: "1rem",
        fontSize: "1rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        marginBottom: "1.2rem",
    },
    button: {
        width: "100%",
        padding: "1rem",
        background: "#000",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        fontWeight: "bold",
    },
};

export default Borrow;