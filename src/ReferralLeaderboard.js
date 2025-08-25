// ReferralLeaderboard.js
import React, { useEffect, useMemo, useState } from "react";
import RewardTiersModal from "./RewardTiersModal";

export default function ReferralLeaderboard({ user, onBack }) {
    const [isTiersOpen, setIsTiersOpen] = useState(false);
    const [sortBy, setSortBy] = useState("referrals"); // 'referrals' | 'bonus'
    const [, forceTick] = useState(0);

    // Normalize to match App.js storage keys
    const normalize = (h) => (h || "").replace(/^@/, "").trim().toLowerCase();
    const youHandle = normalize(user);

    // ---- Tiers config ----
    const tiers = [
        { name: "🌱 Believer", min: 1, max: 4, perk: "+2% borrow limit" },
        { name: "🌿 Spreader", min: 5, max: 19, perk: "+5% borrow limit" },
        { name: "🌙 Phase Guide", min: 20, max: 49, perk: "+10% borrow limit" },
        { name: "🌌 Star Believer", min: 50, max: Infinity, perk: "+15% borrow limit" },
    ];

    const getTierFor = (count) => {
        if (!count || count <= 0) return { name: "—", perk: "No perk yet" };
        return (
            tiers.find((t) => count >= t.min && count <= t.max) || {
                name: "—",
                perk: "No perk yet",
            }
        );
    };

    // ---- Build leaderboard from localStorage ----
    const leaderboard = useMemo(() => {
        const entries = [];
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith("referrals-")) {
                const handle = k.replace("referrals-", "");
                const count = parseInt(localStorage.getItem(k), 10) || 0;
                const bonus = parseInt(localStorage.getItem(`bonus-${handle}`), 10) || 0;

                entries.push({ user: `@${handle}`, handle, count, bonus });
            }
        }

        if (sortBy === "bonus") {
            // Sort by bonus desc, tie-break by referrals desc
            entries.sort((a, b) => (b.bonus - a.bonus) || (b.count - a.count));
        } else {
            // Sort by referrals desc, tie-break by bonus desc
            entries.sort((a, b) => (b.count - a.count) || (b.bonus - a.bonus));
        }

        return entries.map((e, idx) => {
            const t = getTierFor(e.count);
            return { rank: idx + 1, ...e, tier: t.name, perk: t.perk };
        });
    }, [sortBy]);

    const you = leaderboard.find((e) => normalize(e.handle) === youHandle);
    const yourCount =
        parseInt(localStorage.getItem(`referrals-${youHandle}`), 10) || you?.count || 0;
    const yourTier = getTierFor(yourCount);
    const yourBonus =
        parseInt(localStorage.getItem(`bonus-${youHandle}`), 10) || you?.bonus || 0;

    // Re-render when referrals/bonuses change (from other tabs or parts of the app)
    useEffect(() => {
        const onStorage = (e) => {
            if (!e.key) return;
            if (e.key.startsWith("referrals-") || e.key.startsWith("bonus-")) {
                forceTick((v) => v + 1);
            }
        };
        window.addEventListener("storage", onStorage);
        return () => window.removeEventListener("storage", onStorage);
    }, []);

    return (
        <div style={styles.container}>
            {/* Header */}
            <div style={styles.headerRow}>
                <button onClick={onBack} style={styles.back}>← Back</button>
                <h2 style={styles.title}>Referral Leaderboard</h2>

                {/* Sort toggle */}
                <div style={styles.sortWrap}>
                    <button
                        onClick={() => setSortBy("referrals")}
                        style={{
                            ...styles.sortBtn,
                            ...(sortBy === "referrals" ? styles.sortBtnActive : {}),
                        }}
                    >
                        Sort: Referrals
          </button>
                    <button
                        onClick={() => setSortBy("bonus")}
                        style={{
                            ...styles.sortBtn,
                            ...(sortBy === "bonus" ? styles.sortBtnActive : {}),
                        }}
                    >
                        Sort: Bonus
          </button>
                    <button onClick={() => setIsTiersOpen(true)} style={styles.tiersBtn}>
                        Reward Tiers
          </button>
                </div>
            </div>

            {/* Your Summary (includes Bonus) */}
            <div style={styles.youCard}>
                <div style={styles.youTop}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <span style={styles.youUser}>@{youHandle || user}</span>
                        <span style={styles.youTierPill}>{yourTier.name}</span>
                    </div>
                    {you ? <span style={styles.youRank}>#{you.rank}</span> : <span style={styles.youRank}>—</span>}
                </div>
                <div style={styles.youMeta}>
                    <span>Referrals: <strong>{yourCount}</strong></span>
                    <span style={{ marginLeft: 12 }}>Perk: <strong>{yourTier.perk}</strong></span>
                    <span style={{ marginLeft: 12 }}>Bonus: <strong>{yourBonus.toLocaleString()} ₦BNG</strong></span>
                </div>
            </div>

            {/* Leaderboard Table */}
            <div style={styles.tableWrap}>
                <div style={styles.tableHead}>
                    <div style={{ ...styles.col, width: 70 }}>Rank</div>
                    <div style={{ ...styles.col, flex: 1, textAlign: "left" }}>User</div>
                    <div style={{ ...styles.col, width: 120 }}>Referrals</div>
                    <div style={{ ...styles.col, width: 160 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
                            <span>Bonus (₦BNG)</span>
                            {/* Tooltip icon */}
                            <span
                                style={styles.infoDot}
                                title="Rule: You earn 500 ₦BNG per referral who deposits and buys ≥ 5000 ₦BNG worth of Believe (BLT)."
                                aria-label="Bonus rule"
                            >
                                i
              </span>
                        </div>
                    </div>
                    <div style={{ ...styles.col, width: 160 }}>Tier</div>
                </div>

                {leaderboard.length === 0 ? (
                    <div style={styles.emptyRow}>No referrals yet. Share your link to get started!</div>
                ) : (
                        leaderboard.map((entry) => {
                            const isYou = normalize(entry.handle) === youHandle;
                            return (
                                <div
                                    key={entry.handle}
                                    style={{
                                        ...styles.tableRow,
                                        background: isYou ? "#f5f2ea" : "#fff",
                                        border: isYou ? "1px solid #e6ddc7" : "1px solid #eee",
                                    }}
                                >
                                    <div style={{ ...styles.col, width: 70 }}>
                                        <span style={styles.rankBadge}>#{entry.rank}</span>
                                    </div>
                                    <div style={{ ...styles.col, flex: 1, textAlign: "left", fontWeight: 600 }}>
                                        {entry.user}
                                    </div>
                                    <div style={{ ...styles.col, width: 120 }}>{entry.count}</div>
                                    <div style={{ ...styles.col, width: 160 }}>{(entry.bonus || 0).toLocaleString()}</div>
                                    <div style={{ ...styles.col, width: 160 }}>
                                        <span style={styles.tierPill}>{entry.tier}</span>
                                    </div>
                                </div>
                            );
                        })
                    )}
            </div>

            {/* Tiers Modal */}
            <RewardTiersModal
                open={isTiersOpen}
                onClose={() => setIsTiersOpen(false)}
                referrals={yourCount}
            />
        </div>
    );
}

/* ---------------- STYLES ---------------- */
const styles = {
    container: {
        background: "#FFF9F0",
        minHeight: "100vh",
        padding: "2rem",
        fontFamily: "'Segoe UI', sans-serif",
    },
    headerRow: {
        display: "grid",
        gridTemplateColumns: "auto 1fr auto",
        alignItems: "center",
        gap: "0.6rem",
        marginBottom: "1rem",
    },
    back: {
        background: "none",
        border: "none",
        color: "blue",
        cursor: "pointer",
        fontSize: "1rem",
    },
    title: { textAlign: "center", fontSize: "1.6rem", margin: 0 },

    sortWrap: {
        display: "flex",
        alignItems: "center",
        gap: "0.4rem",
    },
    sortBtn: {
        background: "#eee",
        color: "#000",
        border: "1px solid #ddd",
        borderRadius: 10,
        padding: "0.45rem 0.7rem",
        fontWeight: 600,
        cursor: "pointer",
    },
    sortBtnActive: {
        background: "#000",
        color: "#fff",
        borderColor: "#000",
    },
    tiersBtn: {
        background: "#000",
        color: "#fff",
        border: "none",
        borderRadius: 10,
        padding: "0.45rem 0.7rem",
        fontWeight: 600,
        cursor: "pointer",
    },

    youCard: {
        background: "#fff",
        padding: "1rem",
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        maxWidth: 800,
        margin: "0 auto 1.5rem",
    },
    youTop: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
    },
    youUser: { fontWeight: 700, fontSize: "1.05rem" },
    youTierPill: {
        background: "#000",
        color: "#fff",
        padding: "0.2rem 0.6rem",
        borderRadius: 8,
        fontSize: "0.8rem",
        fontWeight: 600,
    },
    youRank: {
        padding: "0.25rem 0.7rem",
        background: "#000",
        color: "#fff",
        borderRadius: "999px",
        fontSize: "0.85rem",
        fontWeight: 700,
    },
    youMeta: {
        marginTop: 6,
        color: "#444",
        display: "flex",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 6,
    },

    tableWrap: {
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
        maxWidth: 800,
        margin: "0 auto",
        border: "1px solid #eee",
    },
    tableHead: {
        display: "flex",
        alignItems: "center",
        background: "#f7f2e6",
        borderBottom: "1px solid #e9e0c9",
        padding: "0.75rem 1rem",
        fontWeight: 700,
    },
    tableRow: {
        display: "flex",
        alignItems: "center",
        padding: "0.85rem 1rem",
        borderBottom: "1px solid #eee",
    },
    emptyRow: { padding: "1rem", color: "#777", textAlign: "center" },
    col: {
        fontSize: "0.95rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    rankBadge: {
        minWidth: 40,
        textAlign: "center",
        padding: "0.25rem 0.5rem",
        borderRadius: 999,
        background: "#000",
        color: "#fff",
        fontWeight: 700,
    },
    tierPill: {
        background: "#000",
        color: "#fff",
        padding: "0.25rem 0.6rem",
        borderRadius: 8,
        fontSize: "0.8rem",
        fontWeight: 600,
    },

    infoDot: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: 16,
        height: 16,
        borderRadius: "50%",
        fontSize: 12,
        lineHeight: "16px",
        background: "#000",
        color: "#fff",
        cursor: "help",
        userSelect: "none",
    },
};