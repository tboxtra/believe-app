import React, { useEffect, useState } from "react";

function Referral({ user, onBack, onOpenLeaderboard }) {
    const [copied, setCopied] = useState(false);
    const [refCount, setRefCount] = useState(0);

    const referralLink = `${window.location.origin}?ref=${user}`;

    useEffect(() => {
        const key = `referrals-${user}`;
        const count = parseInt(localStorage.getItem(key), 10) || 0;
        setRefCount(count);
    }, [user]);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div style={styles.container}>
            <button onClick={onBack} style={styles.back}>← Back</button>
            <h2>Referral Program 🎉</h2>

            <p style={styles.text}>
                Share this link and earn rewards when others sign up:
      </p>

            <div style={styles.linkBox}>
                <input type="text" value={referralLink} readOnly style={styles.input} />
                <button style={styles.copyBtn} onClick={handleCopy}>
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>

            <p style={{ marginTop: "1rem", color: "#666" }}>
                Total Referrals: <strong>{refCount}</strong>
            </p>

            <button style={styles.primaryBtn} onClick={onOpenLeaderboard}>
                View Leaderboard & Tiers
      </button>
        </div>
    );
}

const styles = {
    container: {
        background: "#FFF9F0",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
        fontFamily: "'Segoe UI', sans-serif",
    },
    back: { background: "none", border: "none", color: "blue", cursor: "pointer", marginBottom: "1rem" },
    text: { color: "#555", marginBottom: "1rem" },
    linkBox: {
        display: "flex",
        gap: "0.5rem",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
    },
    input: {
        width: "260px",
        padding: "0.6rem",
        fontSize: "0.95rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
    },
    copyBtn: {
        padding: "0.6rem 1rem",
        background: "#000",
        color: "#fff",
        borderRadius: "8px",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
    },
    primaryBtn: {
        marginTop: "1.2rem",
        padding: "0.9rem 1.4rem",
        background: "#000",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        fontWeight: 700,
        cursor: "pointer",
    },
};

export default Referral;