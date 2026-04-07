import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase-server";
import NavBar from "../components/NavBar";

const buttonStyle = {
  display: "block",
  width: "100%",
  padding: "16px",
  marginBottom: "15px",
  textAlign: "center" as const,
  borderRadius: "10px",
  textDecoration: "none",
  fontWeight: "bold",
  fontSize: "16px",
};

export default async function ContactPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <NavBar />

      <h1>Contact Office</h1>
      <p style={{ marginTop: "10px", color: "#666" }}>
        Tap a button below to contact the office.
      </p>

      <div style={{ marginTop: "30px", maxWidth: "400px" }}>
        {/* Office */}
        <a
          href="tel:02392738398"
          style={{
            ...buttonStyle,
            backgroundColor: "#003366",
            color: "white",
          }}
        >
          📞 Call Office
        </a>

        {/* Out of Hours */}
        <a
          href="tel:07958789359"
          style={{
            ...buttonStyle,
            backgroundColor: "#cc0000",
            color: "white",
          }}
        >
          🚨 Out of Hours / Duty Supervisor
        </a>

        {/* Email */}
        <a
          href="mailto:proofpoint@crescentcare.co.uk"
          style={{
            ...buttonStyle,
            backgroundColor: "#f0f0f0",
            color: "#003366",
            border: "1px solid #ccc",
          }}
        >
          📧 Email Office (Office Hours Only)
        </a>
      </div>
    </main>
  );
}