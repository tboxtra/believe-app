import React from "react";

function DepositAddress({ selectedCoin, onBack }) {
    const dummyAddress = "gvYtJ2XwbQ4JEAkxxxxxxxxxyyyyyyyyyzzz"; // Replace with actual logic

    const handleCopy = () => {
        navigator.clipboard.writeText(dummyAddress);
        alert("Address copied to clipboard!");
    };

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={onBack} style={styles.back}>
                    ← Back
                </button>

                <h2 style={styles.title}>{selectedCoin.symbol} Deposit</h2>
                <p style={styles.network}><strong>Network:</strong> {selectedCoin.network}</p>

                <div style={styles.addressBox}>
                    <strong>Address:</strong>
                    <p style={styles.address}>{dummyAddress}</p>
                    <button onClick={handleCopy} style={styles.copyButton}>
                        Copy Address
                    </button>
                </div>

                {/* Optional QR Code Placeholder */}
                <div style={styles.qrSection}>
                    <div style={styles.qrPlaceholder}></div>
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
        maxWidth: "600px",
        width: "100%",
    },
    back: {
        background: "none",
        border: "none",
        color: "blue",
        cursor: "pointer",
        marginBottom: "1rem",
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        marginBottom: "0.5rem",
    },
    network: {
        color: "#555",
        marginBottom: "1.5rem",
    },
    addressBox: {
        background: "#fff",
        padding: "1.5rem",
        borderRadius: "10px",
        boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
    },
    address: {
        fontFamily: "monospace",
        wordBreak: "break-word",
        marginTop: "0.5rem",
        color: "#222",
        fontSize: "1rem",
    },
    copyButton: {
        marginTop: "1rem",
        padding: "0.8rem 1.5rem",
        background: "#000",
        color: "#fff",
        borderRadius: "8px",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
    },
    qrSection: {
        marginTop: "2rem",
        textAlign: "center",
    },
    qrPlaceholder: {
        width: 150,
        height: 150,
        background: "#ccc",
        borderRadius: "12px",
        margin: "auto",
    },
};

export default DepositAddress;