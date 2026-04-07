import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase-server";
import NavBar from "../components/NavBar";

const linkStyle = {
  color: "#003366",
  textDecoration: "none",
  fontWeight: "bold",
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
        Please use the appropriate contact depending on urgency.
      </p>

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        <li style={{ marginBottom: "15px" }}>
          📞 Office:{" "}
          <a href="tel:02392738398" style={linkStyle}>
            023 92 738 398
          </a>
        </li>

        <li style={{ marginBottom: "15px" }}>
          📱 Out of Hours:{" "}
          <a href="tel:07958789359" style={linkStyle}>
            07958 789359
          </a>
        </li>

        <li style={{ marginBottom: "15px" }}>
          📧 Email (office hours only):{" "}
          <a href="mailto:proofpoint@crescentcare.co.uk" style={linkStyle}>
            proofpoint@crescentcare.co.uk
          </a>
        </li>
      </ul>
    </main>
  );
}