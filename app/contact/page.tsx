import NavBar from "../components/NavBar";
export default function ContactPage() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Contact Office</h1>
      <p>If you need support, please use the details below.</p>

      <ul style={{ marginTop: "20px", lineHeight: "2" }}>
        <li>Office: 023 92 738 398</li>
        <li>Out of Hours: 07958 789359</li>
        <li>(office hours only)Email: proofpoint@crescentcare.co.uk</li>
      </ul>
    </main>
  );
}