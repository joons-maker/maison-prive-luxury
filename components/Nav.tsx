"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/membership", label: "Membership" },
  { href: "/process", label: "Process" },
  { href: "/faq", label: "FAQ" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const path = usePathname();

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(10,10,10,0.92)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid rgba(201,169,110,0.15)",
    }}>
      <div style={{
        maxWidth: "1280px", margin: "0 auto", padding: "0 2rem",
        height: "72px", display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <Link href="/" style={{ textDecoration: "none" }}>
          <div style={{ fontFamily: "Georgia,serif", fontSize: "1.25rem", letterSpacing: "0.2em", color: "#c9a96e" }}>
            MAISON PRIVÉ
          </div>
          <div style={{ fontSize: "0.58rem", letterSpacing: "0.3em", color: "#555550", marginTop: "1px" }}>
            PARIS · MILAN
          </div>
        </Link>

        <div className="hidden md:flex" style={{ gap: "2.5rem", alignItems: "center" }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} style={{
              textDecoration: "none", fontSize: "0.72rem", letterSpacing: "0.18em",
              color: path === l.href ? "#c9a96e" : "#666660",
            }}>
              {l.label.toUpperCase()}
            </Link>
          ))}
          <Link href="/request" style={{
            textDecoration: "none", fontSize: "0.68rem", letterSpacing: "0.18em",
            color: "#0a0a0a", background: "#c9a96e", padding: "0.55rem 1.3rem", fontWeight: 500,
          }}>
            VIP REQUEST
          </Link>
        </div>

        <button className="md:hidden" onClick={() => setOpen(!open)}
          style={{ background: "none", border: "none", color: "#c9a96e", fontSize: "1.4rem", cursor: "pointer" }}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {open && (
        <div className="md:hidden" style={{
          background: "#111111", borderTop: "1px solid rgba(201,169,110,0.1)",
          padding: "1.5rem 2rem", display: "flex", flexDirection: "column", gap: "1.25rem",
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} style={{
              textDecoration: "none", fontSize: "0.78rem", letterSpacing: "0.18em",
              color: path === l.href ? "#c9a96e" : "#666660",
            }}>
              {l.label.toUpperCase()}
            </Link>
          ))}
          <Link href="/request" onClick={() => setOpen(false)} style={{
            textDecoration: "none", fontSize: "0.72rem", letterSpacing: "0.18em",
            color: "#0a0a0a", background: "#c9a96e", padding: "0.75rem 1.5rem", textAlign: "center", marginTop: "0.5rem",
          }}>
            VIP REQUEST
          </Link>
        </div>
      )}
    </nav>
  );
}
