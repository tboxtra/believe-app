import React, { useState } from "react";

function Buy({ naira, onBack, onBuy }) {
    const [nairaInput, setNairaInput] = useState(0);
    const [sliderValue, setSliderValue] = useState(0);

    const handleSliderChange = (e) => {
        const percent = parseInt(e.target.value);
        const calculated = Math.floor((percent / 100) * naira);
        setSliderValue(percent);
        setNairaInput(calculated);
    };

    const handleInputChange = (e) => {
        const value = parseInt(e.target.value) || 0;
        setNairaInput(value);
        setSliderValue(Math.min(Math.floor((value / naira) * 100), 100));
    };

    const confirmBuy = () => {
        const blt = nairaInput / 100; // 1 BLT = ₦100
        if (nairaInput > 0 && nairaInput <= naira) {
            onBuy(blt, nairaInput);
        }
    };

    return (
        <div style={styles.container}>
            <h2>Buy $BELIEVE</h2>
            <p style={{ color: "#888" }}>
                Use your ₦BNG balance to buy $BLT (₦100 = 1 BLT)
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
                    value={nairaInput}
                    onChange={handleInputChange}
                    placeholder="Enter amount in ₦"
                    style={styles.input}
                />

                <p style={{ marginTop: "1rem", fontWeight: "bold" }}>
                    You’ll get {(nairaInput / 100).toFixed(2)} $BLT
        </p>

                <button style={styles.button} onClick={confirmBuy}>
                    Confirm Buy
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

export default Buy;