// ConfettiBurst.jsx
import { useEffect, useState } from "react";

export default function ConfettiBurst() {
    const [shots, setShots] = useState(0);

    useEffect(() => {
        const handler = () => setShots((n) => n + 1);
        window.addEventListener("bonus:credited", handler);
        return () => window.removeEventListener("bonus:credited", handler);
    }, []);

    return (
        <>
            {Array.from({ length: shots }).map((_, s) => (
                <Particles key={s} />
            ))}
        </>
    );
}

function Particles() {
    const count = 24;
    const arr = Array.from({ length: count });
    const now = Date.now();
    return (
        <div style={wrap}>
            {arr.map((_, i) => {
                const angle = (i / count) * Math.PI * 2;
                const dx = Math.cos(angle) * 120;
                const dy = Math.sin(angle) * 90;
                const delay = (i * 10) + "ms";
                const emoji = ["🎉", "✨", "💫", "🟡", "🟠", "🟣"][i % 6];
                return (
                    <span key={now + i}
                        style={{
                            position: "absolute",
                            left: "50%", top: "50%",
                            transform: "translate(-50%,-50%)",
                            animation: `pop 900ms cubic-bezier(.17,.67,.2,1) ${delay} forwards`,
                            fontSize: 18
                        }}>
                        <span style={{
                            display: "inline-block",
                            transform: `translate(${dx}px, ${dy}px)`
                        }}>{emoji}</span>
                    </span>
                );
            })}
            <style>{`
        @keyframes pop {
          0% { opacity: 0; transform: translate(-50%,-50%) scale(.6); }
          40% { opacity: 1; }
          100% { opacity: 0; transform: translate(-50%,-50%) scale(1.1); }
        }
      `}</style>
        </div>
    );
}

const wrap = {
    position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99997
};