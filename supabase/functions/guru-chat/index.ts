import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are GURU AI — a smart, friendly academic assistant for engineering students.

CORE BEHAVIOR:
- Answer questions using the uploaded notes/study materials provided in the conversation
- Explain concepts in simple, student-friendly language
- Solve numerical problems step-by-step with formulas
- Provide code examples for programming subjects
- Help with assignments, lab questions, and exam preparation
- If the answer is not found in the provided material, say politely: "This topic is not available in the provided material. However, here's what I know about it:"
- Support engineering subjects (ECE, CSE, EEE, Civil, Mech, etc.)

RESPONSE FORMAT:
- Use markdown formatting for structure
- Use **bold** for key terms and definitions
- Use code blocks for code examples
- Use LaTeX-style notation for formulas (e.g., \`E = mc²\`)
- Use bullet points and numbered lists for clarity
- Keep responses structured and readable
- Not too long, not too short — aim for clarity

PERSONALITY:
- Friendly, patient, and intelligent tutor
- Encourage understanding, not memorization
- Be encouraging and supportive

SAFETY:
- Focus only on academic support
- Do not generate harmful, illegal, or inappropriate content
- Avoid hallucinations — if unsure, say so`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, fileContent } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    // Build messages array with file context if provided
    const systemMessages: any[] = [
      { role: "system", content: SYSTEM_PROMPT },
    ];

    if (fileContent) {
      systemMessages.push({
        role: "system",
        content: `The student has uploaded a document. Here is the extracted text content:\n\n---\n${fileContent}\n---\n\nUse this content to answer their questions. Reference specific sections when relevant.`,
      });
    }

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
          messages: [...systemMessages, ...messages],
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
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("guru-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
