

import React from "react";
import { Link } from "react-router-dom";

const FALLBACK_IMG = "/mnt/data/be2de2bc-1eea-48a4-824a-376993aff157.png";

export default function ProductCard({ p, onAdd }) {
  const id = p.id || p._id || p._id?.toString?.() || "";

  // Inline styles to avoid missing Tailwind classes or plugin issues
  const wrapperStyle = {
    display: "flex",
    flexDirection: "column",
    background: "#fff",
    borderRadius: 16,
    padding: 16,
    border: "1px solid rgba(0,0,0,0.06)",
  };

  const imageBoxStyle = {
    width: "100%",
    height: 176, // same as h-44 (44 * 4 = 176px)
    background: "#f3f4f6",
    borderRadius: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 12,
  };

  const imgStyle = {
    maxWidth: "100%",
    height: "100%",
    width: "auto",     // important: let width auto so aspect ratio kept
    objectFit: "contain", // contain keeps entire image visible
    display: "block",
  };

  return (
    <div style={wrapperStyle}>
      <div style={imageBoxStyle} aria-hidden>
        <img
          src={p.imgurl || p.image || FALLBACK_IMG}
          alt={p.title || p.name || "product"}
          style={imgStyle}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = FALLBACK_IMG;
          }}
          onLoad={(e) => {
            // debug info — remove later
            // eslint-disable-next-line no-console
            console.log("Product image loaded:", {
              src: e.currentTarget.src,
              naturalWidth: e.currentTarget.naturalWidth,
              naturalHeight: e.currentTarget.naturalHeight,
            });
          }}
        />
      </div>

      <h3 style={{ fontSize: 14, fontWeight: 500, marginBottom: 8, lineHeight: 1.2 }}>
        {p.title || p.name}
      </h3>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "auto" }}>
        <div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>₹{p.price}</div>
          <div style={{ fontSize: 12, color: "#6b7280" }}>Stock: {p.stock ?? "—"}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Link to={`/products/${id}`} style={{ fontSize: 12, textDecoration: "underline" }}>
            View
          </Link>
          <button
            disabled={p.stock <= 0}
            onClick={() => typeof onAdd === "function" ? onAdd(id, 1) : null}
            style={{
              padding: "6px 10px",
              borderRadius: 8,
              background: p.stock > 0 ? "#4f46e5" : "#9ca3af",
              color: "#fff",
              border: "none",
              fontSize: 13,
              cursor: p.stock > 0 ? "pointer" : "not-allowed",
              opacity: p.stock > 0 ? 1 : 0.6,
            }}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
