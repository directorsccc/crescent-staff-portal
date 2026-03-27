import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase-server";
import NavBar from "../components/NavBar";

const linkStyle = {
  display: "block",
  marginTop: "14px",
  padding: "14px 16px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  textDecoration: "none",
  color: "#003366",
  backgroundColor: "#f9f9f9",
  fontWeight: "bold" as const,
};

export default async function PoliciesPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <NavBar />

      <h1>Policies</h1>
      <p>Please select a policy below.</p>

      <a
        href="/policies/carerspolicies.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Carers Complete Policies
      </a>
      
      <a
        href="/policies/medication-policy.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Medication Policy
      </a>

      <a
        href="/policies/safeguarding-policy.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Safeguarding Policy
      </a>

      <a
        href="/policies/infectioncontrol-policy.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Infection Control Policy
      </a>

      <a
        href="/policies/health-safety-policy.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Health & Safety Policy
      </a>

      <a
        href="/policies/data-protection-gdpr-policy.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        GDPR / Confidentiality Policy
      </a>
    </main>
  );
}