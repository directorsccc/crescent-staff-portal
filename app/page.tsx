import Image from "next/image";

import Link from "next/link";

export default function Home() {
  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>Crescent Staff Portal</h1>
      <p>Welcome to the staff portal.</p>
      <p>This is the starter homepage.</p>

      <div style={{ marginTop: "30px" }}>
        <Link href="/login">
          <button style={{ padding: "10px 16px" }}>Go to Login</button>
        </Link>
      </div>
    </main>
  );
}