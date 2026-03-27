import { redirect } from "next/navigation";
import NavBar from "../components/NavBar";
import { createClient } from "../../lib/supabase-server";
import { supabaseAdmin } from "../../lib/supabase-admin";

async function getUsers() {
  const { data, error } = await supabaseAdmin.auth.admin.listUsers();

  if (error) {
    throw new Error(error.message);
  }

  return data.users;
}

export default async function AdminPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/login");
  }

  if (data.user.email !== process.env.ADMIN_EMAIL) {
    redirect("/dashboard");
  }

  const users = await getUsers();

  return (
    <main style={{ padding: "40px", fontFamily: "Arial" }}>
      <NavBar />

      <h1>Admin Control Panel</h1>
      <p>Manage staff portal access below.</p>

      <div
        style={{
          marginTop: "30px",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          backgroundColor: "#f9f9f9",
        }}
      >
        <h2>Add Staff User</h2>
        <form action="/api/admin/create-user" method="post" style={{ display: "grid", gap: "12px", maxWidth: "500px" }}>
          <input
            type="email"
            name="email"
            placeholder="Staff email"
            required
            style={{ padding: "10px" }}
          />
          <input
            type="password"
            name="password"
            placeholder="Temporary password"
            required
            style={{ padding: "10px" }}
          />
          <button type="submit" style={{ padding: "10px" }}>
            Create User
          </button>
        </form>
      </div>

      <div style={{ marginTop: "40px" }}>
        <h2>Current Staff Users</h2>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "20px",
          }}
        >
          <thead>
            <tr>
              <th style={thStyle}>Email</th>
              <th style={thStyle}>Created</th>
              <th style={thStyle}>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td style={tdStyle}>{user.email}</td>
                <td style={tdStyle}>
                  {user.created_at
                    ? new Date(user.created_at).toLocaleString()
                    : "N/A"}
                </td>
                <td style={tdStyle}>
                  {user.email !== process.env.ADMIN_EMAIL ? (
                    <form action="/api/admin/delete-user" method="post">
                      <input type="hidden" name="userId" value={user.id} />
                      <button
                        type="submit"
                        style={{
                          padding: "8px 12px",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </form>
                  ) : (
                    "Admin account"
                  )}
                </td>
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
  textAlign: "left" as const,
  backgroundColor: "#f0f0f0",
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "10px",
};