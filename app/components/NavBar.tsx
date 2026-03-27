import Link from "next/link";

export default function NavBar() {
  const navStyle = {
    display: "flex",
    gap: "20px",
    padding: "20px 40px",
    borderBottom: "1px solid #ddd",
    marginBottom: "30px",
    fontFamily: "Arial",
  };

  const linkStyle = {
    textDecoration: "none",
    color: "#003366",
    fontWeight: "bold" as const,
  };

  return (
    <nav style={navStyle}>
      <Link href="/dashboard" style={linkStyle}>Dashboard</Link>
      <Link href="/policies" style={linkStyle}>Policies</Link>
      <Link href="/forms" style={linkStyle}>Forms</Link>
      <Link href="/memos" style={linkStyle}>Staff Memos</Link>
      <Link href="/contact" style={linkStyle}>Contact Office</Link>
      <Link href="/admin" style={linkStyle}>Admin</Link>
    </nav>
  );
}