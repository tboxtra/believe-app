// RewardTiersModal.js
import React, { useEffect } from "react";

export default function RewardTiersModal({ open, onClose, referrals = 0 }) {
    // Always call hooks at the top
    useEffect(() => {
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);

    if (!open) return null; // safe to return null AFTER hooks

    // Tier definitions
    const tiers = [
        { id: 1, name: "Belief Seed", emoji: "🌱", min: 1, max: 9, reward: "Starter badge + early perks" },
        { id: 2, name: "Faith Builder", emoji: "🔥", min: 10, max: 49, reward: "Priority access, boosted XP" },
        { id: 3, name: "Vault Guardian", emoji: "🛡️", min: 50, max: 199, reward: "Special badge + community privileges" },
        { id: 4, name: "Moon Caller", emoji: "🌙", min: 200, max: Infinity, reward: "Top-tier badge + elite benefits" },
    ];

    const getTier = (count) =>
        tiers.reduce(
            (acc, t) => (count >= t.min ? t : acc),
            { id: 0, name: "No Tier Yet", emoji: "✨", min: 0, max: 0, reward: "Invite friends to unlock rewards" }
        );

    const currentTier = getTier(referrals);
    const nextTier = tiers.find((t) => referrals < t.min);
    const toNext = nextTier ? Math.max(0, nextTier.min - referrals) : 0;

    const progressPercent = (() => {
        if (!currentTier.min && nextTier) {
            return Math.min(100, Math.round((referrals / nextTier.min) * 100));
        }
        if (!nextTier) return 100;
        const span = nextTier.min - currentTier.min || 1;
        const into = referrals - currentTier.min;
        return Math.min(100, Math.round((into / span) * 100));
    })();

    return (
        <div style={styles.overlay} onClick={onClose}>
            <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div style={styles.header}>
                    <button style={styles.back} onClick={onClose}>← Back</button>
                    <h2 style={styles.title}>Reward Tiers</h2>
                    <div style={{ width: 64 }} />
                </div>

                <div style={styles.summaryCard}>
                    <p style={styles.muted}>Your referrals</p>
                    <h1 style={{ margin: 0 }}>{Number(referrals || 0).toLocaleString()}</h1>
                    <p style={{ marginTop: 8 }}>
                        Current Tier: <strong>{currentTier.emoji} {currentTier.name}</strong>
                    </p>

                    {nextTier ? (
                        <>
                            <div style={styles.progressWrap}>
                                <div style={{ ...styles.progressBar, width: `${progressPercent}%` }} />
                            </div>
                            <p style={styles.mutedSmall}>
                                {toNext} more referral{toNext === 1 ? "" : "s"} to reach {nextTier.emoji} {nextTier.name}
                            </p>
                        </>
                    ) : (
                            <p style={styles.mutedSmall}>You’re at the highest tier. Legendary! 🌟</p>
                        )}
                </div>

                <div style={styles.tierGrid}>
                    {tiers.map((t) => {
                        const youAreHere = currentTier.id === t.id;
                        const unlocked = referrals >= t.min;
                        return (
                            <div key={t.id} style={{ ...styles.tierCard, ...(youAreHere ? styles.tierActive : {}) }}>
                                <div style={styles.tierHeader}>
                                    <span style={styles.tierEmoji}>{t.emoji}</span>
                                    <h3 style={styles.tierName}>{t.name}</h3>
                                </div>
                                <p style={styles.range}>
                                    {t.min}–{t.max === Infinity ? "∞" : t.max} referrals
                                </p>
                                <p style={styles.reward}>{t.reward}</p>
                                <div style={styles.badgeRow}>
                                    <span
                                        style={{
                                            ...styles.badge,
                                            background: unlocked ? "#000" : "#eee",
                                            color: unlocked ? "#fff" : "#333",
                                        }}
                                    >
                                        {unlocked ? "Unlocked" : "Locked"}
                                    </span>
                                    {youAreHere && (
                                        <span style={{ ...styles.badge, background: "#4CAF50", color: "#fff" }}>
                                            Current
                                        </span>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button style={styles.closeButton} onClick={onClose}>Close</button>
            </div>
        </div>
    );
}

const styles = {
    overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "2rem 1rem", zIndex: 1000 },
    modal: { background: "#FFF9F0", borderRadius: 14, width: "min(720px, 100%)", boxShadow: "0 12px 30px rgba(0,0,0,0.15)", padding: "1.25rem", maxHeight: "85vh", overflowY: "auto" },
    header: { display: "grid", gridTemplateColumns: "64px 1fr 64px", alignItems: "center", marginBottom: "0.75rem" },
    back: { background: "none", border: "none", color: "blue", cursor: "pointer", fontSize: "0.95rem", textAlign: "left" },
    title: { textAlign: "center", margin: 0, fontSize: "1.5rem", fontWeight: 700 },
    summaryCard: { background: "#fff", borderRadius: 12, padding: "1rem 1.25rem", boxShadow: "0 4px 10px rgba(0,0,0,0.05)", textAlign: "center", marginBottom: "1rem" },
    muted: { color: "#666", margin: 0 },
    mutedSmall: { color: "#777", marginTop: 6, fontSize: "0.9rem" },
    progressWrap: { width: "100%", height: 12, background: "#eee", borderRadius: 8, overflow: "hidden", marginTop: 10 },
    progressBar: { height: "100%", background: "#000", transition: "width 0.3s ease" },
    tierGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.9rem" },
    tierCard: { background: "#fff", borderRadius: 12, padding: "1rem", boxShadow: "0 4px 10px rgba(0,0,0,0.05)" },
    tierActive: { outline: "2px solid #000" },
    tierHeader: { display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.25rem" },
    tierEmoji: { fontSize: "1.25rem" },
    tierName: { margin: 0, fontSize: "1.05rem" },
    range: { margin: "0.25rem 0", color: "#555", fontSize: "0.9rem" },
    reward: { margin: "0.25rem 0 0.75rem", color: "#333", fontSize: "0.95rem" },
    badgeRow: { display: "flex", gap: "0.5rem" },
    badge: { padding: "0.35rem 0.6rem", borderRadius: 8, fontSize: "0.8rem", fontWeight: 600 },
    closeButton: { marginTop: "1rem", width: "100%", padding: "0.9rem", background: "#000", color: "#fff", border: "none", borderRadius: 10, fontWeight: 700, cursor: "pointer" },
};