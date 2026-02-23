import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, branch, rating, message } = await req.json();

    // Validate inputs
    if (!name || typeof name !== "string" || name.trim().length === 0 || name.length > 100) {
      return new Response(
        JSON.stringify({ error: "Invalid name. Must be 1-100 characters." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (branch && (typeof branch !== "string" || branch.length > 100)) {
      return new Response(
        JSON.stringify({ error: "Invalid branch." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return new Response(
        JSON.stringify({ error: "Rating must be 1-5." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    if (!message || typeof message !== "string" || message.trim().length === 0 || message.length > 1000) {
      return new Response(
        JSON.stringify({ error: "Invalid message. Must be 1-1000 characters." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    // Store feedback in database
    const { error: dbError } = await supabase.from("feedback").insert({
      name: name.trim(),
      branch: branch?.trim() || null,
      rating,
      message: message.trim(),
    });

    if (dbError) {
      console.error("DB error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save feedback." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Send email via Resend if API key is configured
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (RESEND_API_KEY) {
      try {
        const stars = "⭐".repeat(rating);
        await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${RESEND_API_KEY}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "StudyHub Feedback <onboarding@resend.dev>",
            to: ["adityapammannavaryt@gmail.com"],
            subject: `New StudyHub Feedback from ${name.trim()} ${stars}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #0d9488;">📬 New Student Feedback</h2>
                <table style="width: 100%; border-collapse: collapse;">
                  <tr><td style="padding: 8px; font-weight: bold;">Name:</td><td style="padding: 8px;">${name.trim()}</td></tr>
                  <tr><td style="padding: 8px; font-weight: bold;">Branch:</td><td style="padding: 8px;">${branch?.trim() || "Not specified"}</td></tr>
                  <tr><td style="padding: 8px; font-weight: bold;">Rating:</td><td style="padding: 8px;">${stars} (${rating}/5)</td></tr>
                </table>
                <div style="margin-top: 16px; padding: 16px; background: #f0fdfa; border-radius: 8px;">
                  <p style="margin: 0; font-style: italic;">"${message.trim()}"</p>
                </div>
                <p style="margin-top: 16px; color: #888; font-size: 12px;">— Sent from StudyHub Feedback Form</p>
              </div>
            `,
          }),
        });
      } catch (emailErr) {
        console.error("Email send error:", emailErr);
        // Don't fail the request if email fails — feedback is already saved
      }
    }

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("send-feedback error:", e);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
