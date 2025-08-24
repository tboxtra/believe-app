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

        // Allow empty input (user is deleting)
        if (raw === "") {
            setBorrowAmount("");  // Keep as empty string temporarily
            setSliderValue(0);
            return;
        }

        // Remove leading zeros and parse
        const numeric = parseInt(raw.replace(/^0+/, '')) || 0;
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
            <h2>Borrow BelieveNG</h2>
            <p style={{ color: "#888" }}>
                Your current BLT allows up to ₦{maxBorrow.toLocaleString()} borrow limit.
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
                    <div style={styles.percentageDisplay}>{sliderValue}%</div>
                </div>

                <input
                    type="number"
                    min="0"
                    value={borrowAmount}
                    onChange={handleInputChange}
                    placeholder="Enter amount to borrow"
                    style={styles.input}
                />

                <button style={styles.button} onClick={confirmBorrow}>
                    Confirm Borrow
        </button>
                <button style={styles.back} onClick={onBack}>
                    ← Back
        </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        background: "#FFF9F0",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
    },
    card: {
        background: "#fff",
        padding: "2rem",
        borderRadius: "12px",
        maxWidth: "400px",
        margin: "2rem auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    sliderGroup: {
        position: "relative",
        marginBottom: "1rem",
    },
    slider: {
        width: "100%",
    },
    percentageDisplay: {
        position: "absolute",
        top: "-2rem",
        left: "50%",
        transform: "translateX(-50%)",
        background: "#000",
        color: "#fff",
        padding: "0.3rem 0.6rem",
        borderRadius: "6px",
        fontSize: "0.8rem",
    },
    input: {
        width: "100%",
        padding: "0.8rem",
        marginBottom: "1rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "1rem",
    },
    button: {
        width: "100%",
        padding: "1rem",
        background: "#000",
        color: "#fff",
        border: "none",
        borderRadius: "8px",
        fontWeight: "bold",
        marginBottom: "1rem",
        cursor: "pointer",
    },
    back: {
        background: "transparent",
        color: "#000",
        border: "none",
        fontSize: "0.9rem",
        cursor: "pointer",
    },
};

export default Borrow;