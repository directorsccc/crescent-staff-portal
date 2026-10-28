
"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

export default function ChangePasswordPage() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function handleChangePassword(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();
    setMessage("");

    if (newPassword.length < 12) {
      setMessage("Your password must be at least 12 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setMessage("The passwords do not match.");
      return;
    }

    setSaving(true);

    try {
      const supabase = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );

      const { data, error: userError } =
        await supabase.auth.getUser();

      if (userError || !data.user) {
        setMessage("Please log in before changing your password.");
        return;
      }

      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        setMessage("Unable to change password: " + error.message);
      } else {
        setMessage("Your password has been changed successfully.");
        setNewPassword("");
        setConfirmPassword("");
      }
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <main
      style={{
        maxWidth: "480px",
        margin: "50px auto",
        padding: "24px",
        fontFamily: "Arial",
      }}
    >
      <h1>Change Password</h1>
      <p>Enter your new Crescent Staff Portal password below.</p>

      <form onSubmit={handleChangePassword}>
        <label htmlFor="newPassword">New Password</label>
        <input
          id="newPassword"
          type="password"
          autoComplete="new-password"
          required
          minLength={12}
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            boxSizing: "border-box",
            padding: "12px",
            margin: "8px 0 20px",
          }}
        />

        <label htmlFor="confirmPassword">
          Confirm New Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          autoComplete="new-password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            display: "block",
            width: "100%",
            boxSizing: "border-box",
            padding: "12px",
            margin: "8px 0 20px",
          }}
        />

        <button
          type="submit"
          disabled={saving}
          style={{
            padding: "12px 20px",
            backgroundColor: "#003366",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: saving ? "wait" : "pointer",
          }}
        >
          {saving ? "Changing..." : "Change Password"}
        </button>
      </form>

      {message && (
        <p role="status" aria-live="polite">
          {message}
        </p>
      )}
    </main>
  );
}