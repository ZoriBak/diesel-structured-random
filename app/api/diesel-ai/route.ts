
import OpenAI from "openai";

const fallbackLines = [
  "Good. Now it’s yours.",
  "That’s the point.",
  "Perfect is boring.",
  "Leave the mess.",
  "Don’t clean it up.",
  "Wear it louder.",
  "Chaos suits you.",
  "Real looks better.",
  "Stop fixing it.",
  "Keep the spill."
];

export async function POST(req: Request) {
  const { message } = await req.json();

  // Fallback random response
  if (!process.env.OPENAI_API_KEY) {
    const randomLine =
      fallbackLines[Math.floor(Math.random() * fallbackLines.length)];
    return Response.json({ reply: randomLine });
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
  });

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are Diesel. Short. Confident. Fashion." },
      { role: "user", content: message }
    ]
  });

  return Response.json({ reply: res.choices[0].message.content });
}
