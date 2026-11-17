
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
  const name = String(formData.get("name") || "").trim();

  if (!userId || !name) {
    return NextResponse.redirect(
      new URL("/admin?error=Invalid%20staff%20details", request.url),
      303
    );
  }

  const { error } =
    await supabaseAdmin.auth.admin.updateUserById(userId, {
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
