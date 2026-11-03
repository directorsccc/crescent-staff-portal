
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
  const userId = String(formData.get("userId") || "").trim();

  if (!userId) {
    return NextResponse.redirect(
      new URL("/admin?error=Missing%20user%20ID", request.url),
      303
    );
  }

  // Retrieve the target account from Supabase.
  const { data: target, error: lookupError } =
    await supabaseAdmin.auth.admin.getUserById(userId);

  if (lookupError || !target.user) {
    return NextResponse.redirect(
      new URL("/admin?error=User%20not%20found", request.url),
      303
    );
  }

  // Never allow deletion of either administrator account.
  if (
    isProtectedAdmin(target.user.email) ||
    target.user.id === data.user.id
  ) {
    return NextResponse.redirect(
      new URL(
        "/admin?error=Administrator%20accounts%20are%20protected",
        request.url
      ),
      303
    );
  }

  const { error } =
    await supabaseAdmin.auth.admin.deleteUser(userId);

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
