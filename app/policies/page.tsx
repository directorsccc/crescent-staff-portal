import { redirect } from "next/navigation";
import { createClient } from "../../lib/supabase-server";
import NavBar from "../components/NavBar";
import PolicyReceiptButton from "../components/PolicyReceiptButton";

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

  const { data: receipts } = await supabase
    .from("policy_receipts")
    .select("policy_slug, acknowledged_at")
    .eq("user_id", data.user.id);

  const receiptMap = new Map(
    (receipts || []).map((receipt) => [receipt.policy_slug, receipt.acknowledged_at])
  );

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <NavBar />

      <h1>Policies</h1>
      <p>Please select a policy below.</p>

      <a
        href="/policies/carerspolicies1.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Carers Complete Policies Part 1
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="carerspolicies1"
        initialAcknowledgedAt={receiptMap.get("carerspolicies1") ?? null}
      />

      <a
        href="/policies/carerspolicies2.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Carers Complete Policies Part 2
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="carerspolicies2"
        initialAcknowledgedAt={receiptMap.get("carerspolicies2") ?? null}
      />

      <a
        href="/policies/carerspolicies3.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Carers Complete Policies Part 3
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="carerspolicies3"
        initialAcknowledgedAt={receiptMap.get("carerspolicies") ?? null}
      />

      <a
        href="/policies/carerspolicies4.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Carers Complete Policies Part 4
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="carerspolicies4"
        initialAcknowledgedAt={receiptMap.get("carerspolicies") ?? null}
      />

      <a
        href="/policies/codeofconduct.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Carers Code Of Conduct
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="codeofconduct"
        initialAcknowledgedAt={receiptMap.get("codeofconduct") ?? null}
      />

      <a
        href="/policies/falsenailpolicy.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        False Nails & Nail Varnish Policy
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="falsenailpolicy"
        initialAcknowledgedAt={receiptMap.get("falsenailpolicy") ?? null}
      />

      <a
        href="/policies/medication-policy.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Medication Policy
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="medication-policy"
        initialAcknowledgedAt={receiptMap.get("medication-policy") ?? null}
      />

      <a
        href="/policies/safeguarding-policy.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Safeguarding Policy
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="safeguarding-policy"
        initialAcknowledgedAt={receiptMap.get("safeguarding-policy") ?? null}
      />

      <a
        href="/policies/infectioncontrol-policy.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Infection Control Policy
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="infectioncontrol-policy"
        initialAcknowledgedAt={receiptMap.get("infectioncontrol-policy") ?? null}
      />

      <a
        href="/policies/health-safety-policy.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Health & Safety Policy
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="health-safety-policy"
        initialAcknowledgedAt={receiptMap.get("health-safety-policy") ?? null}
      />

      <a
        href="/policies/data-protection-gdpr-policy.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        GDPR / Confidentiality Policy
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="data-protection-gdpr-policy"
        initialAcknowledgedAt={receiptMap.get("data-protection-gdpr-policy") ?? null}
      />
      <a
        href="/policies/backfacts.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Back Facts Sheet
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="backfacts"
        initialAcknowledgedAt={receiptMap.get("backfacts") ?? null}
      />
      <a
        href="/policies/bedbath_wash.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Bedbath & Washing Sheet
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="bedbath_wash"
        initialAcknowledgedAt={receiptMap.get("bedbath_wash") ?? null}
      />
      <a
        href="/policies/bristol_stool_chart.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Bristol Stool Chart
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="bristol_stool_chart"
        initialAcknowledgedAt={receiptMap.get("bristol_stool_chart") ?? null}
      />
      <a
        href="/policies/change_colostomy.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Changing Colostomy Bag Factsheet
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="change_colostomy"
        initialAcknowledgedAt={receiptMap.get("change_colostomy") ?? null}
      />
      <a
        href="/policies/convene.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Convene Factsheet
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="convene"
        initialAcknowledgedAt={receiptMap.get("convene") ?? null}
      />
      <a
        href="/policies/cookie_check.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        M & H Cookie Checklist
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="cookie_check"
        initialAcknowledgedAt={receiptMap.get("cookie_check") ?? null}
      />
      <a
        href="/policies/job_sheets_for_carers.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Job Sheets For Carers
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="job_sheets_for_carers"
        initialAcknowledgedAt={receiptMap.get("job_sheets_for_carers") ?? null}
      />
      <a
        href="/policies/mca.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        5 Principles of the Mental Capacity Act
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="mca"
        initialAcknowledgedAt={receiptMap.get("mca") ?? null}
      />
      <a
        href="/policies/piece_urostomy_bag.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Piece Urostomy Bag Factsheet
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="piece_urostomy_bag"
        initialAcknowledgedAt={receiptMap.get("piece_urostomy_bag") ?? null}
      />
      <a
        href="/policies/pressure_sores.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Pressure Sore Factsheet
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="pressure_sores"
        initialAcknowledgedAt={receiptMap.get("pressure_sores") ?? null}
      />
      <a
        href="/policies/urinary_catheter.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Urinary Catheter Factsheet
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="urinary_catheter"
        initialAcknowledgedAt={receiptMap.get("urinary_catheter") ?? null}
      />
      <a
        href="/policies/wheelchair_safety.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        Wheelchair Safety Factsheet
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="wheelchair_safety"
        initialAcknowledgedAt={receiptMap.get("wheelchair_safety") ?? null}
      />
       <a
        href="/policies/freda_information.pdf"
        target="_blank"
        rel="noreferrer"
        style={linkStyle}
      >
        FREDA Information Factsheet
      </a>
      <PolicyReceiptButton
        userId={data.user.id}
        policySlug="freda_information"
        initialAcknowledgedAt={receiptMap.get("freda_information") ?? null}
/>
        </main>
  );
}