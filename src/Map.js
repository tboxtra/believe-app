import React from "react";

function Map() {
    return (
        <div style={styles.container}>
            <h2>Adoption Map 🗺️</h2>
            <p style={{ color: "#888", marginBottom: "1rem" }}>
                See how the Believe community is spreading.
      </p>

            <div style={styles.mapWrapper}>
                <iframe
                    title="Believe Community Map"
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d126832.85842234253!2d3.3792!3d6.5244!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1699952871289!5m2!1sen!2sng"
                    width="100%"
                    height="400"
                    style={styles.map}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
    );
}

const styles = {
    container: {
        minHeight: "100vh",
        background: "#FFF9F0",
        padding: "2rem",
        textAlign: "center",
    },
    mapWrapper: {
        maxWidth: "800px",
        margin: "auto",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    },
    map: {
        border: 0,
    },
};

export default Map;