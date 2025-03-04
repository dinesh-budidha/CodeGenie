
import { Language } from "@/types";

// This is a mock service that simulates interactions with the CodeLlama model
// In a real implementation, this would connect to a backend that hosts the model

interface GenerateCodeParams {
  prompt: string;
  language: Language;
}

interface DebugCodeParams {
  code: string;
  language: Language;
}

interface ExplainCodeParams {
  code: string;
  language: Language;
}

interface CodeResponse {
  code: string;
  explanation: string;
}

// Mock delay function to simulate API latency
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const llmService = {
  // Generate code based on a prompt
  generateCode: async ({ prompt, language }: GenerateCodeParams): Promise<CodeResponse> => {
    // Simulate API call delay
    await delay(1500 + Math.random() * 1000);
    
    // This is where you would call the actual CodeLlama API
    // For now, we'll return mock data
    return {
      code: `// Generated ${language} code for: ${prompt}
function example() {
  console.log("This is a placeholder for CodeLlama generated code");
  return "Hello from CodeLlama";
}`,
      explanation: `This code demonstrates a simple function that would fulfill the request: "${prompt}". 
In a real implementation, CodeLlama would generate more sophisticated code based on the prompt.`,
    };
  },
  
  // Debug code
  debugCode: async ({ code, language }: DebugCodeParams): Promise<CodeResponse> => {
    // Simulate API call delay
    await delay(1500 + Math.random() * 1000);
    
    // This is where you would call the actual CodeLlama API
    // For now, we'll return mock data with some "improvements"
    const improvedCode = code
      .replace(/var /g, "let ")
      .replace(/console.log/g, "console.info");
    
    return {
      code: improvedCode,
      explanation: "I've analyzed the code and made some improvements:\n\n1. Replaced 'var' with 'let' for better scoping\n2. Used console.info instead of console.log for better logging",
    };
  },
  
  // Explain code
  explainCode: async ({ code, language }: ExplainCodeParams): Promise<CodeResponse> => {
    // Simulate API call delay
    await delay(1500 + Math.random() * 1000);
    
    // This is where you would call the actual CodeLlama API
    // For now, we'll return mock data
    return {
      code,
      explanation: `This ${language} code appears to be ${code.length > 100 ? "a complex" : "a simple"} implementation. 
      
Here's what it does:
1. Defines a function or set of instructions
2. Processes some kind of data or input
3. Returns or outputs a result

In a real implementation, CodeLlama would provide a detailed line-by-line explanation of your code.`,
    };
  },
};
