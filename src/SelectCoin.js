import React from "react";


function SelectCoin({ setScreen, setSelectedCoin, onBack }) {
    const coins = [
        { symbol: "USDT", name: "Tether", network: "Solana" },
        { symbol: "SOL", name: "Solana", network: "Solana" },
        { symbol: "ETH", name: "Ethereum", network: "Ethereum" },
        { symbol: "BTC", name: "Bitcoin", network: "Bitcoin" },
    ];

    const handleSelectCoin = (coin) => {
        setSelectedCoin(coin);
        setScreen("depositAddress");
    };

    return (
        <div style={{ padding: "2rem" }}>
            <button
                onClick={onBack}
                style={{
                    marginBottom: "1rem",
                    color: "blue",
                    background: "none",
                    border: "none",
                    fontSize: "1rem",
                    cursor: "pointer"
                }}
            >
                ← Back
</button>
            <h2>Select Coin</h2>
            <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {coins.map((coin, index) => (
                    <div
                        key={index}
                        onClick={() => handleSelectCoin(coin)}
                        style={{
                            padding: "1rem",
                            border: "1px solid #eee",
                            borderRadius: "10px",
                            cursor: "pointer",
                            background: "#fafafa",
                            fontSize: "1rem",
                            transition: "0.2s",
                            hover: {
                                background: "#f0f0f0"
                            }
                        }}
                    >
                        <strong>{coin.symbol}</strong> — {coin.name}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SelectCoin;