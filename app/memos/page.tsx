import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase-server";
import NavBar from "../components/NavBar";

const memoStyle = {
  display: "block",
  marginTop: "14px",
  padding: "16px",
  border: "1px solid #ccc",
  borderRadius: "10px",
  textDecoration: "none",
  color: "#003366",
  backgroundColor: "#f9f9f9",
  fontWeight: "bold" as const,
};

export default async function MemosPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <NavBar />

      <h1>Staff Memos</h1>
      <p>Please read the latest updates below.</p>

      {/* Newsletter */}
      <a
        href="/memos/crescent_newsletter_april_2026.pdf"
        target="_blank"
        rel="noreferrer"
        style={memoStyle}
      >
        📄 April Newsletter 2026
      </a>

       {/* Newsletter */}
      <a
        href="/memos/crescent_newsletter_may_2026.pdf"
        target="_blank"
        rel="noreferrer"
        style={memoStyle}
      >
        📄 May Newsletter 2026
      </a>
 {/* Newsletter */}
      <a
        href="/memos/crescent_newsletter_june_2026.pdf"
        target="_blank"
        rel="noreferrer"
        style={memoStyle}
      >
        📄 June Newsletter 2026
      </a>
      {/* You can add more memos below */}


    </main>
  );
}