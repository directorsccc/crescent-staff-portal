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

export default async function FormsPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <NavBar />

      <h1>Forms</h1>
      <p>Please select a form below.</p>

      <a
        href="https://www.emailmeform.com/builder/form/m0JYRws30dT9"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Holiday Request
      </a>

    </main>
  );
}