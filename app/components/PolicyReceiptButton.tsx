"use client";

import { useState } from "react";
import { createClient } from "../../lib/supabase-client";

type Props = {
  userId: string;
  policySlug: string;
  initialAcknowledgedAt: string | null;
};

export default function PolicyReceiptButton({
  userId,
  policySlug,
  initialAcknowledgedAt,
}: Props) {
  const [acknowledgedAt, setAcknowledgedAt] = useState<string | null>(
    initialAcknowledgedAt
  );
  const [message, setMessage] = useState("");

  const handleAcknowledge = async () => {
    setMessage("Saving...");

    const supabase = createClient();

    const { error, data } = await supabase
      .from("policy_receipts")
      .upsert(
        {
          user_id: userId,
          policy_slug: policySlug,
          acknowledged_at: new Date().toISOString(),
        },
        {
          onConflict: "user_id,policy_slug",
        }
      )
      .select()
      .single();

    if (error) {
      setMessage(error.message);
      return;
    }

    setAcknowledgedAt(data.acknowledged_at);
    setMessage("Receipt saved.");
  };

  return (
    <div style={{ marginTop: "8px", marginBottom: "20px" }}>
      <button
        onClick={handleAcknowledge}
        style={{
          padding: "8px 14px",
          backgroundColor: "#003366",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        I have read this policy
      </button>

      {acknowledgedAt && (
        <p style={{ marginTop: "8px", color: "#333" }}>
          Read and acknowledged on {new Date(acknowledgedAt).toLocaleString()}
        </p>
      )}

      {message && (
        <p style={{ marginTop: "6px", color: "#666" }}>{message}</p>
      )}
    </div>
  );
}