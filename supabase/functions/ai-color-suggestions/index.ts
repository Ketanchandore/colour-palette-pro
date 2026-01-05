import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, baseColor } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const systemPrompt = `You are an expert color consultant and designer. Generate beautiful, harmonious color palettes based on user requests.

When given a base color or theme, suggest 5 complementary colors that work well together.

ALWAYS respond with a JSON object in this exact format:
{
  "palette_name": "Descriptive name for the palette",
  "colors": ["#HEX1", "#HEX2", "#HEX3", "#HEX4", "#HEX5"],
  "description": "Brief description of why these colors work together",
  "use_cases": ["Use case 1", "Use case 2", "Use case 3"]
}

Only output valid JSON, no additional text.`;

    const userPrompt = baseColor 
      ? `Generate a beautiful color palette based on this base color: ${baseColor}. ${prompt || ''}`
      : prompt;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Payment required. Please add credits." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    // Parse the JSON from AI response
    let palette;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        palette = JSON.parse(jsonMatch[0]);
      } else {
        throw new Error("No JSON found in response");
      }
    } catch (parseError) {
      console.error("Parse error:", parseError);
      // Return a default palette if parsing fails
      palette = {
        palette_name: "AI Generated Palette",
        colors: ["#A05AFF", "#1BCFB4", "#4BCBEB", "#FE9496", "#9E58FF"],
        description: "A vibrant modern palette",
        use_cases: ["Web design", "Mobile apps", "Branding"]
      };
    }

    return new Response(JSON.stringify(palette), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
