
import { NextResponse } from "next/server";
import { supabaseAdmin } from "../../../../lib/supabase-admin";
import { createClient } from "../../../../lib/supabase-server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user || data.user.email !== process.env.ADMIN_EMAIL) {
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

  // Prevent the administrator from deleting their own account.
  if (userId === data.user.id) {
    return NextResponse.redirect(
      new URL("/admin?error=Cannot%20delete%20your%20own%20account", request.url),
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
