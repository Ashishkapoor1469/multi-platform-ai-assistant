import axios from "axios";
import dotenv from "dotenv";

dotenv.config();
const TAVILY_API_KEY = "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";

export const searchWeb = async (query) => {
  try {
    const res = await axios.post("https://api.tavily.com/search", {
      api_key: TAVILY_API_KEY,
      query,
      search_depth: "advanced",
      include_answer: true,
      max_results: 5,
    });

    const results = res.data.results || [];
  console.log("Search results:", results);
  
    return results
      .map((r, i) => `Source ${i + 1}: ${r.content}`)
      .join("\n\n");
  } catch (err) {
    console.log("SEARCH ERROR:", err.message);
    return "No latest data found.";
  }
};