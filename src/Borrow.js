import React, { useState } from "react";

function Borrow({ balance, naira, onBack, onBorrow }) {
    const maxBorrow = balance * 2000;
    const [borrowAmount, setBorrowAmount] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);

    const handleSliderChange = (e) => {
        const percent = parseInt(e.target.value);
        const calculated = Math.floor((percent / 100) * maxBorrow);
        setSliderValue(percent);
        setBorrowAmount(calculated);
    };

    const handleInputChange = (e) => {
        const raw = e.target.value;

        if (raw === "") {
            setBorrowAmount("");  // Allow clear
            setSliderValue(0);
            return;
        }

        const numeric = parseInt(raw.replace(/^0+/, "")) || 0;
        setBorrowAmount(numeric);
        setSliderValue(Math.min(Math.floor((numeric / maxBorrow) * 100), 100));
    };

    const confirmBorrow = () => {
        if (borrowAmount > 0 && borrowAmount <= maxBorrow) {
            onBorrow(borrowAmount);
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={onBack} style={styles.back}>
                    ← Back
                </button>

                <h2 style={styles.title}>Borrow BelieveNG</h2>
                <p style={styles.subtitle}>
                    You can borrow up to <strong>₦{maxBorrow.toLocaleString()}</strong> with your current BLT.
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
                        />
                        <div style={styles.percentBadge}>{sliderValue}%</div>
                    </div>

                    <input
                        type="number"
                        min="0"
                        value={borrowAmount}
                        onChange={handleInputChange}
                        placeholder="Enter amount to borrow (₦)"
                        style={styles.input}
                    />

                    <button style={styles.button} onClick={confirmBorrow}>
                        Confirm Borrow
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
    card: {
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    sliderGroup: {
        position: "relative",
        marginBottom: "1.5rem",
    },
    slider: {
        width: "100%",
    },
    percentBadge: {
        position: "absolute",
        top: "-1.8rem",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#000",
        color: "#fff",
        padding: "0.4rem 0.8rem",
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
        marginBottom: "1.5rem",
    },
    button: {
        width: "100%",
        padding: "1rem",
        background: "#000",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        fontWeight: "bold",
        cursor: "pointer",
    },
};

export default Borrow;