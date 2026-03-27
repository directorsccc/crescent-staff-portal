import Link from "next/link";
import NavBar from "../components/NavBar";
export default function DashboardPage() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Crescent Staff Portal</h1>
      <p>Welcome to the dashboard.</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Link href="/policies" style={cardStyle}>
          <h2>Policies</h2>
          <p>View company policies and procedures.</p>
        </Link>

        <Link href="/forms" style={cardStyle}>
          <h2>Forms</h2>
          <p>Access staff forms and requests.</p>
        </Link>

        <Link href="/memos" style={cardStyle}>
          <h2>Staff Memos</h2>
          <p>Read important office updates and notices.</p>
        </Link>

        <Link href="/contact" style={cardStyle}>
          <h2>Contact Office</h2>
          <p>Find office contact details and support information.</p>
        </Link>
      </div>
    </main>
  );
}

const cardStyle = {
  display: "block",
  padding: "20px",
  border: "1px solid #ccc",
  borderRadius: "12px",
  textDecoration: "none",
  color: "black",
  backgroundColor: "#f9f9f9",
};