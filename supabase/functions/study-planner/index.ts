import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are GURU AI — Study Planner. Generate a personalized, detailed study schedule for engineering students.

OUTPUT FORMAT (strictly follow this):
- Use markdown tables for the schedule
- Include time slots with specific hours
- Break subjects into topics/modules
- Add breaks, revision slots, and self-test time
- Include tips for each day
- Mark high-priority topics with ⚡
- Mark revision topics with 🔄
- Mark easy/buffer topics with 🟢

RULES:
- Be realistic with time allocation (no more than 8-10 hours of study per day)
- Include breaks every 90 minutes
- Prioritize difficult subjects first in the day
- Allocate more time to weaker subjects
- Include revision days before exam
- Add a "Quick Tips" section at the end with study strategies
- Consider the student's branch and semester for appropriate difficulty level

RESPONSE STRUCTURE:
1. **📋 Study Plan Overview** — summary of the plan
2. **📅 Day-wise Schedule** — detailed daily breakdown in table format
3. **⚡ Priority Topics** — topics that need extra attention
4. **💡 Quick Tips** — personalized study strategies`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { subjects, examDate, hoursPerDay, branch, semester, weakSubjects } = await req.json();

    if (!subjects || !Array.isArray(subjects) || subjects.length === 0) {
      return new Response(
        JSON.stringify({ error: "Please provide at least one subject." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const userPrompt = `Create a detailed study plan with the following details:
- **Subjects:** ${subjects.join(", ")}
- **Exam Date:** ${examDate || "Not specified (assume 2 weeks from now)"}
- **Study Hours Per Day:** ${hoursPerDay || 6} hours
- **Branch:** ${branch || "Engineering"}
- **Semester:** ${semester || "Not specified"}
- **Weak Subjects:** ${weakSubjects && weakSubjects.length > 0 ? weakSubjects.join(", ") : "None specified"}

Generate a comprehensive day-by-day study schedule with specific time slots, topics, and revision strategy.`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: userPrompt },
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please wait a moment and try again." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("Study planner error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("study-planner error:", e);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred. Please try again." }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
