// RewardTiers.js
import React, { useMemo } from "react";

const TIERS = [
    { id: "bronze", name: "Bronze", min: 1, max: 5, perks: ["+100 BLT bonus pool access"], color: "#CD7F32" },
    { id: "silver", name: "Silver", min: 6, max: 20, perks: ["Priority airdrops", "Special chat badge"], color: "#C0C0C0" },
    { id: "gold", name: "Gold", min: 21, max: 100, perks: ["Higher borrow boost", "Early features access"], color: "#D4AF37" },
    { id: "diamond", name: "Diamond", min: 101, max: Infinity, perks: ["VIP events", "OG profile frame"], color: "#7FDBFF" },
];

export default function RewardTiers({ user, onBack }) {
    // read current user's referral count from the same localStorage key used in Referral.js
    const myCount = useMemo(() => {
        if (!user) return 0;
        const key = `referrals-${user}`;
        return parseInt(localStorage.getItem(key)) || 0;
    }, [user]);

    const currentTier = useMemo(() => {
        return TIERS.find(t => myCount >= t.min && myCount <= t.max) || null;
    }, [myCount]);

    // progress toward next tier
    const nextTier = useMemo(() => {
        const idx = TIERS.findIndex(t => t.id === (currentTier?.id || ""));
        return idx >= 0 && idx < TIERS.length - 1 ? TIERS[idx + 1] : null;
    }, [currentTier]);

    const progressPercent = useMemo(() => {
        if (!currentTier) return 0;
        if (!nextTier) return 100;
        const span = (nextTier.min - currentTier.min) || 1;
        const progressed = Math.min(Math.max(myCount - currentTier.min, 0), span);
        return Math.round((progressed / span) * 100);
    }, [currentTier, nextTier, myCount]);

    return (
        <div style={styles.container}>
            <div style={styles.wrapper}>
                <button onClick={onBack} style={styles.back}>← Back</button>

                <h2 style={styles.heading}>🎁 Referral Reward Tiers</h2>
                <p style={styles.sub}>
                    Your confirmed referrals unlock perks and status. Keep inviting to climb tiers.
        </p>

                {/* Your status */}
                <div style={styles.card}>
                    <div style={styles.meRow}>
                        <div>
                            <div style={{ fontSize: "0.9rem", color: "#555" }}>Your referrals</div>
                            <div style={{ fontSize: "1.6rem", fontWeight: 700 }}>{myCount.toLocaleString()}</div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <div style={{ fontSize: "0.9rem", color: "#555" }}>Current tier</div>
                            <div style={{ fontWeight: 700 }}>
                                {currentTier ? currentTier.name : "—"}
                            </div>
                        </div>
                    </div>

                    {/* Progress to next */}
                    {nextTier ? (
                        <>
                            <div style={{ marginTop: "0.75rem", fontSize: "0.95rem" }}>
                                {Math.max(nextTier.min - myCount, 0)} more to reach <strong>{nextTier.name}</strong>
                            </div>
                            <div style={styles.progressWrap}>
                                <div
                                    style={{
                                        ...styles.progressBar,
                                        width: `${progressPercent}%`,
                                        background: currentTier?.color || "#000",
                                    }}
                                />
                            </div>
                            <div style={styles.progressScale}>
                                <span>{currentTier.min}</span>
                                <span>{nextTier.min}</span>
                            </div>
                        </>
                    ) : (
                            <div style={{ marginTop: "0.75rem", fontSize: "0.95rem" }}>
                                You’re at the top! Keep going for special surprises ✨
                            </div>
                        )}
                </div>

                {/* Tiers list */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1rem", marginTop: "1.25rem" }}>
                    {TIERS.map(tier => {
                        const active = currentTier?.id === tier.id;
                        return (
                            <div key={tier.id} style={{ ...styles.tierCard, border: active ? `2px solid ${tier.color}` : "1px solid #eee" }}>
                                <div style={styles.tierHeader}>
                                    <span style={{ ...styles.tierDot, background: tier.color }} />
                                    <h3 style={styles.tierTitle}>{tier.name}</h3>
                                </div>
                                <div style={styles.tierRange}>
                                    {tier.max === Infinity
                                        ? `${tier.min}+ referrals`
                                        : `${tier.min} – ${tier.max} referrals`}
                                </div>
                                <ul style={styles.perks}>
                                    {tier.perks.map((p, i) => (
                                        <li key={i} style={{ marginBottom: "0.35rem" }}>• {p}</li>
                                    ))}
                                </ul>
                                <button
                                    style={{
                                        ...styles.cta,
                                        background: active ? "#000" : "#111",
                                        opacity: active ? 1 : 0.8,
                                    }}
                                    disabled={active}
                                    title={active ? "This is your current tier" : "Keep referring to unlock"}
                                >
                                    {active ? "Current Tier" : "Locked"}
                                </button>
                            </div>
                        );
                    })}
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
        width: "100%",
        maxWidth: "720px",
    },
    back: {
        marginBottom: "1rem",
        color: "blue",
        background: "none",
        border: "none",
        fontSize: "1rem",
        cursor: "pointer",
    },
    heading: {
        fontSize: "1.6rem",
        fontWeight: 700,
    },
    sub: {
        color: "#555",
        marginTop: "0.35rem",
        marginBottom: "1rem",
    },
    card: {
        background: "#fff",
        borderRadius: "12px",
        padding: "1.25rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    meRow: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        gap: "1rem",
    },
    progressWrap: {
        width: "100%",
        height: "10px",
        background: "#eee",
        borderRadius: "6px",
        marginTop: "0.6rem",
        overflow: "hidden",
    },
    progressBar: {
        height: "100%",
        borderRadius: "6px",
        transition: "width 0.25s ease",
    },
    progressScale: {
        display: "flex",
        justifyContent: "space-between",
        fontSize: "0.8rem",
        color: "#777",
        marginTop: "0.35rem",
    },
    tierCard: {
        background: "#fff",
        borderRadius: "12px",
        padding: "1rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    tierHeader: {
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        marginBottom: "0.25rem",
    },
    tierDot: {
        width: "10px",
        height: "10px",
        borderRadius: "50%",
    },
    tierTitle: {
        margin: 0,
        fontSize: "1.1rem",
        fontWeight: 700,
    },
    tierRange: {
        color: "#666",
        fontSize: "0.95rem",
        marginBottom: "0.5rem",
    },
    perks: {
        margin: 0,
        paddingLeft: "1rem",
        color: "#333",
        minHeight: "3.2rem",
    },
    cta: {
        marginTop: "0.8rem",
        width: "100%",
        padding: "0.8rem",
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        fontWeight: 700,
        cursor: "default",
    },
};