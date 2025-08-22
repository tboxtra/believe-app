import React, { useState } from "react";

function Chat() {
    const [messages, setMessages] = useState([
        { sender: "system", text: "Welcome to the Believe chat 👋" },
    ]);
    const [input, setInput] = useState("");

    const sendMessage = () => {
        const trimmed = input.trim();
        if (!trimmed) return;

        setMessages((prev) => [...prev, { sender: "you", text: trimmed }]);
        setInput("");
    };

    return (
        <div style={styles.container}>
            <h2>Community Chat</h2>

            <div style={styles.chatBox}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        style={{
                            ...styles.message,
                            alignSelf: msg.sender === "you" ? "flex-end" : "flex-start",
                            backgroundColor: msg.sender === "you" ? "#000" : "#eee",
                            color: msg.sender === "you" ? "#fff" : "#000",
                        }}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>

            <div style={styles.inputRow}>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Type a message..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button style={styles.button} onClick={sendMessage}>
                    Send
        </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        background: "#FFF9F0",
        minHeight: "100vh",
        padding: "2rem",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
    },
    chatBox: {
        flex: 1,
        background: "#fff",
        borderRadius: "12px",
        padding: "1rem",
        margin: "1rem 0",
        overflowY: "auto",
        maxHeight: "400px",
        display: "flex",
        flexDirection: "column",
        gap: "0.5rem",
        boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
    },
    message: {
        padding: "0.6rem 1rem",
        borderRadius: "20px",
        maxWidth: "80%",
        wordBreak: "break-word",
    },
    inputRow: {
        display: "flex",
        gap: "0.5rem",
    },
    input: {
        flex: 1,
        padding: "0.8rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        fontSize: "1rem",
    },
    button: {
        padding: "0.8rem 1.5rem",
        background: "#000",
        color: "#fff",
        borderRadius: "8px",
        border: "none",
        fontWeight: "bold",
        cursor: "pointer",
    },
};

export default Chat;