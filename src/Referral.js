import React, { useEffect, useState } from "react";

function Referral({ user, onBack }) {
    const [copied, setCopied] = useState(false);
    const [refCount, setRefCount] = useState(0);

    const referralLink = `${window.location.origin}?ref=${user}`;

    useEffect(() => {
        const key = `referrals-${user}`;
        const count = parseInt(localStorage.getItem(key)) || 0;
        setRefCount(count);
    }, [user]);

    const handleCopy = () => {
        navigator.clipboard.writeText(referralLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={onBack} style={styles.back}>
                    ← Back
                </button>

                <h2 style={styles.title}>🎉 Referral Program</h2>
                <p style={styles.subtitle}>
                    Share your unique referral link to invite others and earn rewards.
                </p>

                <div style={styles.linkRow}>
                    <input
                        type="text"
                        value={referralLink}
                        readOnly
                        style={styles.input}
                    />
                    <button style={styles.copyBtn} onClick={handleCopy}>
                        {copied ? "Copied!" : "Copy"}
                    </button>
                </div>

                <p style={styles.refCount}>
                    Total Referrals: <strong>{refCount}</strong>
                </p>
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
        textAlign: "center",
    },
    back: {
        marginBottom: "1.5rem",
        color: "blue",
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "1rem",
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
    linkRow: {
        display: "flex",
        flexWrap: "wrap",
        gap: "1rem",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "1.5rem",
    },
    input: {
        flex: "1",
        minWidth: "250px",
        padding: "0.9rem",
        borderRadius: "8px",
        border: "1px solid #ccc",
        fontSize: "0.95rem",
    },
    copyBtn: {
        padding: "0.9rem 1.2rem",
        background: "#000",
        color: "#fff",
        borderRadius: "8px",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
    },
    refCount: {
        fontSize: "1rem",
        color: "#444",
        marginTop: "1rem",
    },
};

export default Referral;