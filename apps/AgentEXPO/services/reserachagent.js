import { researchWithOllama } from "./ollama.js";
import { searchWeb } from "./search.js";
export const runResearchAgent = async (query) => {
  const webData = await searchWeb(query);

 const prompt = `
You are an AI Research Assistant.

STRICT RULES:
- Output ONLY valid JSON
- No markdown
- No explanation
- No text outside JSON

If you cannot answer, still return valid JSON.

DATA:
${webData}

QUERY:
${query}

OUTPUT FORMAT:
{
  "type": "research",
  "blocks": [
    { "type": "summary", "text": "..." },
    { "type": "key_points", "points": ["...", "..."] },
    { "type": "conclusion", "text": "..." }
  ]
}
`;

const messages = [
      {
        role: "system",
        content: prompt,
      },
      {
        role: "user",
        content: query,
      },
    ];

  const response = await researchWithOllama(messages);

  const raw = response.message?.content || "";

console.log("🧠 Raw Ollama Output:", raw);

try {
  // Try parsing directly
  return JSON.parse(raw);
} catch (err) {
  console.log("⚠️ JSON Parse Failed, attempting cleanup...");

  // Remove markdown/code blocks if model added them
  const cleaned = raw
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  try {
    return JSON.parse(cleaned);
  } catch (err2) {
    console.log("❌ Still invalid JSON, fallback triggered");

    // Fallback response so frontend doesn't break
    return {
      type: "research",
      blocks: [
        {
          type: "summary",
          text: raw.slice(0, 300),
        },
      ],
    };
  }
}

};
