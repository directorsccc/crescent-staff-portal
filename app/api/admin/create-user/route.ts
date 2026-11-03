
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabase-admin";
import { createClient } from "../../../../lib/supabase-server";
import {
  canManageStaff,
  isProtectedAdmin,
} from "../../../../lib/admin-permissions";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user || !canManageStaff(data.user.email)) {
    return NextResponse.redirect(
      new URL("/dashboard", request.url),
      303
    );
  }

  const formData = await request.formData();

  const name = String(formData.get("name") || "").trim();
  const email = String(formData.get("email") || "")
    .trim()
    .toLowerCase();
  const password = String(formData.get("password") || "");

  if (!name || !email || password.length < 12) {
    return NextResponse.redirect(
      new URL("/admin?error=Invalid%20staff%20details", request.url),
      303
    );
  }

  // Prevent creation of accounts using protected administrator emails.
  if (isProtectedAdmin(email)) {
    return NextResponse.redirect(
      new URL("/admin?error=Protected%20administrator%20email", request.url),
      303
    );
  }

  const { error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      full_name: name,
    },
  });

  if (error) {
    return NextResponse.redirect(
      new URL(
        `/admin?error=${encodeURIComponent(error.message)}`,
        request.url
      ),
      303
    );
  }

  return NextResponse.redirect(
    new URL("/admin", request.url),
    303
  );
}
