// Toasts.jsx
import { useEffect, useState } from "react";

let pushToast; // global-ish signal

export function toast(message, type = "success", ms = 2400) {
    pushToast && pushToast({ id: crypto.randomUUID(), message, type, ms });
}

export default function Toasts() {
    const [items, setItems] = useState([]);
    useEffect(() => {
        pushToast = (t) => {
            setItems((prev) => [...prev, t]);
            setTimeout(() => {
                setItems((prev) => prev.filter((x) => x.id !== t.id));
            }, t.ms);
        };
        return () => { pushToast = null; };
    }, []);
    return (
        <div style={styles.wrap}>
            {items.map((t) => (
                <div key={t.id} style={{
                    ...styles.toast,
                    borderLeftColor: t.type === "success" ? "#10B981" : "#2563EB"
                }}>
                    {t.message}
                </div>
            ))}
        </div>
    );
}

const styles = {
    wrap: {
        position: "fixed", right: 16, bottom: 16, display: "grid", gap: 10,
        zIndex: 99998
    },
    toast: {
        background: "#fff", borderRadius: 10, padding: "10px 12px",
        boxShadow: "0 10px 30px rgba(0,0,0,.10)",
        borderLeft: "4px solid #10B981", fontWeight: 600, color: "#111"
    }
};