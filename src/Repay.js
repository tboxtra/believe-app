// Repay.js
import React, { useState } from "react";

function Repay({ borrowed, naira, onRepay, onBack }) {
    const [amount, setAmount] = useState("");

    const handleRepay = () => {
        const numeric = parseInt(amount);
        if (!numeric || numeric <= 0) return alert("Enter valid amount.");
        if (numeric > borrowed) return alert("You can't repay more than you owe.");
        if (numeric > naira) return alert("Insufficient ₦BNG balance.");
        onRepay(numeric);
    };

    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h2>Repay Loan</h2>
            <p>You currently owe: ₦{borrowed.toLocaleString()}</p>

            <input
                type="number"
                placeholder="Enter repayment amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ padding: "1rem", width: "100%", marginTop: 20 }}
            />

            <button
                onClick={handleRepay}
                style={{ marginTop: 20, padding: "1rem", width: "100%", background: "black", color: "white", fontWeight: "bold" }}
            >
                Confirm Repayment
      </button>

            <button onClick={onBack} style={{ marginTop: 10, background: "none", border: "none", color: "blue" }}>
                ← Back
      </button>
        </div>
    );
}

export default Repay;