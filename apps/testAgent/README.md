
# Test AI Agent
 
> A tool-calling AI agent built with LangChain, powered by an OpenRouter-hosted LLM.
 
## Tech stack
 
| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Language | JavaScript / TypeScript |
| AI framework | LangChain |
| Agent system | `createAgent()` — ReAct-based agent |
| Model provider | OpenRouter (OpenAI-compatible API) |
| LLM wrapper | `@langchain/openai` |
| Schema validation | Zod |
| Tools system | LangChain `tool()` API |
 
### Installation
 
```bash
npm install
```
 
### Configuration
 
Set your OpenRouter API key as an environment variable:
 
```bash
OPENROUTER_API_KEY=your_key_here
```
 
### Running the agent
 
```bash
node index.js
```
 
