// SplashScreen.jsx
export default function SplashScreen() {
    return (
        <div style={styles.wrap}>
            <div style={styles.card}>
                <div style={styles.logo}>✨</div>
                <div style={styles.title}>Believe</div>
                <div style={styles.sub}>loading your vault…</div>
            </div>
        </div>
    );
}

const styles = {
    wrap: {
        position: "fixed", inset: 0, display: "grid", placeItems: "center",
        background: "#FFF9F0", zIndex: 99999
    },
    card: {
        background: "#fff", padding: "1.25rem 1.5rem", borderRadius: 16,
        boxShadow: "0 10px 30px rgba(0,0,0,.08)", textAlign: "center",
    },
    logo: { fontSize: 28, marginBottom: 6 },
    title: { fontWeight: 800, fontSize: 20, letterSpacing: .3 },
    sub: { color: "#666", fontSize: 12, marginTop: 4 }
};