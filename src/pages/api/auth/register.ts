// With `output: 'static'` configured:
// export const prerender = false;
import type { APIRoute } from "astro";
import { supabase } from "../../../lib/supabase";

const turnstileSecretKey = import.meta.env.TURNSTILE_SECRET_KEY;

async function validateTurnstile(token: string) {
  try {
    const response = await fetch(
      `https://challenges.cloudflare.com/turnstile/v0/siteverify`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
        },
        body: new URLSearchParams({
          secret: turnstileSecretKey,
          response: token,
        }),
      },
    );
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Turnstile validation error:  ", error);
    return { success: false, "error-codes": ["internal-error"] };
  }
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  const cfToken = formData.get("cf-turnstile-response")?.toString();

  if (!cfToken) {
    return new Response("Captcha is required", { status: 400 });
  }

  if (!email || !password) {
    return new Response("Email and password are required", { status: 400 });
  }

  const verifyData = await validateTurnstile(cfToken);

  console.log("Verify data: ", verifyData);

  if (!verifyData.success) {
    console.log("Failed catpcha verification");
    return new Response("Failed captcha verification", { status: 403 });
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    return new Response(error.message, { status: 500 });
  }

  return redirect("/signin");
};
