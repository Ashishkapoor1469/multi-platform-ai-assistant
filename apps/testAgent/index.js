import "dotenv/config";

import { createAgent, tool } from "langchain";
import { ChatOpenAI } from "@langchain/openai";
import {getWeather,addition} from "./tools.js"



const llm = new ChatOpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
    defaultHeaders: {
      "HTTP-Referer": "http://localhost:3000",
      "X-Title": "Test-Agent",
    },
  },
  model: "openrouter/free",
  temperature: 0,
});


const agent = createAgent({
  model: llm,
  tools: [getWeather,addition],
});


async function main() {
  try {
    const res = await agent.invoke({
      messages: [
        {
          role: "user",
          content: "add 3 and 8",
        },
      ],
    });

    console.log(res.messages.at(-1).content);
  } catch (err) {
    console.error("error", err);
  }
}

main();