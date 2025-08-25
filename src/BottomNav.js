import React from "react";

function BottomNav({ current, setScreen }) {
    const navItems = [
        { label: "Chat", key: "chat" },
        { label: "Wallet", key: "wallet" },
        { label: "Map", key: "map" },
        { label: "Profile", key: "profile" },
    ];

    return (
        <div style={styles.navbar}>
            {navItems.map((item) => (
                <button
                    key={item.key}
                    onClick={() => setScreen(item.key)}
                    style={{
                        ...styles.button,
                        background: current === item.key ? "#000" : "#fff",
                        color: current === item.key ? "#fff" : "#000",
                    }}
                >
                    {item.label}
                </button>
            ))}
        </div>
    );
}

const styles = {
    navbar: {
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        background: "#fff",
        display: "flex",
        justifyContent: "space-around",
        padding: "0.5rem 0",
        borderTop: "1px solid #ddd",
        zIndex: 100,
    },
    button: {
        flex: 1,
        padding: "0.8rem 0",
        fontWeight: "bold",
        border: "none",
        background: "none",
        cursor: "pointer",
        fontSize: "0.9rem",
    },
};

export default BottomNav;