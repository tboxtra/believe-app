import React, { useState } from "react";

const popularCoins = ["USDC", "ETH", "SOL", "USDT"];
const recommendedCoins = ["BTC", "ETH", "USDT", "HMSTR", "USDC", "XRP", "TRX", "MNT", "SOL"];
const allCoins = ["1INCH", "1SOL", "3P", "5IRE", "A", "A8", "AAPLX"];

function DepositCrypto({ onBack }) {
    const [search, setSearch] = useState("");

    const filteredCoins = allCoins.filter((coin) =>
        coin.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={onBack} style={styles.back}>
                    ← Back
                </button>

                <h2 style={styles.title}>🪙 Select Coin</h2>

                <input
                    type="text"
                    placeholder="Search coin"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={styles.input}
                />

                <div style={styles.section}>
                    <p style={styles.label}>Popular Coins</p>
                    <div style={styles.badgeContainer}>
                        {popularCoins.map((coin, idx) => (
                            <span key={idx} style={styles.badge}>
                                {coin}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={styles.section}>
                    <p style={styles.label}>Recommended</p>
                    <div style={styles.badgeContainer}>
                        {recommendedCoins.map((coin, idx) => (
                            <span key={idx} style={styles.badge}>
                                {coin}
                            </span>
                        ))}
                    </div>
                </div>

                <div style={styles.coinList}>
                    {filteredCoins.map((coin, idx) => (
                        <div
                            key={idx}
                            onClick={() => alert(`Selected ${coin}`)}
                            style={styles.coinItem}
                        >
                            {coin}
                        </div>
                    ))}
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
        marginBottom: "1rem",
        color: "blue",
        background: "none",
        border: "none",
        fontSize: "1rem",
        cursor: "pointer",
    },
    title: {
        fontSize: "1.5rem",
        fontWeight: "bold",
        color: "#222",
        marginBottom: "1.5rem",
    },
    input: {
        width: "100%",
        padding: "1rem",
        fontSize: "1rem",
        borderRadius: "10px",
        border: "1px solid #ccc",
        marginBottom: "1.5rem",
    },
    section: {
        marginBottom: "1.5rem",
    },
    label: {
        fontSize: "1rem",
        color: "#444",
        marginBottom: "0.5rem",
        fontWeight: "500",
    },
    badgeContainer: {
        display: "flex",
        flexWrap: "wrap",
        gap: "0.5rem",
    },
    badge: {
        background: "#000",
        color: "#fff",
        borderRadius: "20px",
        padding: "0.4rem 1rem",
        fontSize: "0.85rem",
        fontWeight: "500",
        cursor: "pointer",
    },
    coinList: {
        marginTop: "2rem",
        borderTop: "1px solid #ccc",
    },
    coinItem: {
        padding: "1rem 0",
        borderBottom: "1px solid #eee",
        cursor: "pointer",
        color: "#333",
        fontSize: "1rem",
        fontWeight: "500",
    },
};

export default DepositCrypto;