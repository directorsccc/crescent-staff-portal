import { redirect } from "next/navigation";
import NavBar from "../components/NavBar";
import { createClient } from "../../lib/supabase-server";
import { supabaseAdmin } from "../../lib/supabase-admin";

const policies = [
  "carerspolicies1",
  "carerspolicies2",
  "carerspolicies3",
  "carerspolicies4",
  "codeofconduct",
  "falsenailpolicy",
  "medication-policy",
  "safeguarding-policy",
  "infectioncontrol-policy",
  "health-safety-policy",
  "data-protection-gdpr-policy",
];

export default async function StaffReportPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  if (data.user.email !== process.env.ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  const { data: usersData, error: usersError } =
    await supabaseAdmin.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });

  if (usersError) {
    throw new Error(usersError.message);
  }

  const { data: receipts, error: receiptsError } = await supabaseAdmin
    .from("policy_receipts")
    .select("user_id, policy_slug, acknowledged_at");

  if (receiptsError) {
    throw new Error(receiptsError.message);
  }

  const receiptMap = new Map(
    (receipts || []).map((receipt) => [
      `${receipt.user_id}-${receipt.policy_slug}`,
      receipt.acknowledged_at,
    ])
  );

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <NavBar />

      <h1>Staff Policy Report</h1>
      <p>Read receipt report for staff policies.</p>

      <div style={{ overflowX: "auto", marginTop: "30px" }}>
        <table
          style={{
            borderCollapse: "collapse",
            width: "100%",
            minWidth: "1000px",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Staff Email</th>
              {policies.map((policy) => (
                <th key={policy} style={thStyle}>
                  {policy}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {usersData.users.map((user) => (
              <tr key={user.id}>
                <td style={tdStyle}>{user.email}</td>
                {policies.map((policy) => {
                  const receipt = receiptMap.get(`${user.id}-${policy}`);
                  return (
                    <td key={policy} style={tdStyle}>
                      {receipt
                        ? `Yes - ${new Date(receipt).toLocaleString()}`
                        : "No"}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

const thStyle = {
  border: "1px solid #ccc",
  padding: "10px",
  backgroundColor: "#f0f0f0",
  textAlign: "left" as const,
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
};