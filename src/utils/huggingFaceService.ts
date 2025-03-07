import { Language } from "@/types";

const HUGGINGFACE_API_URL = "https://api-inference.huggingface.co/models/codellama/CodeLlama-34b-Instruct-hf";
const HUGGINGFACE_TOKEN = "Enter your hugging face access token here";

interface ApiResponse {
  generated_text: string;
}

const generatePrompt = (task: "generate" | "debug" | "explain", input: string, language: Language): string => {
  const prompts = {
    python: {
      generate: `<s>[INST] Write a Python function that ${input}. Include proper error handling, type hints, and docstrings. Ensure the code is complete and functional. [/INST]`,
      debug: `<s>[INST] Debug and fix this Python code. Explain the issues and provide a corrected version:

${input} [/INST]`,
      explain: `<s>[INST] Explain this Python code in detail, including its purpose, functionality, and any potential improvements:

${input} [/INST]`
    },
    java: {
      generate: `<s>[INST] Write a Java method that ${input}. Include proper error handling, documentation, and best practices. Ensure the code is complete and functional. [/INST]`,
      debug: `<s>[INST] Debug and fix this Java code. Explain the issues and provide a corrected version:

${input} [/INST]`,
      explain: `<s>[INST] Explain this Java code in detail, including its purpose, functionality, and any potential improvements:

${input} [/INST]`
    },
    c: {
      generate: `<s>[INST] Write a C function that ${input}. Include proper error handling, memory management, and documentation. Ensure the code is complete and functional. [/INST]`,
      debug: `<s>[INST] Debug and fix this C code. Explain the issues and provide a corrected version:

${input} [/INST]`,
      explain: `<s>[INST] Explain this C code in detail, including its purpose, functionality, and any potential improvements:

${input} [/INST]`
    }
  };

  return prompts[language][task];
};

const extractCodeFromResponse = (response: string, task: "generate" | "debug" | "explain"): string => {
  if (task === "explain") {
    return response;
  }

  // Try to extract code between ``` markers
  const codeRegex = /```(?:python|java|c)?\n?([\s\S]*?)```/;
  const match = response.match(codeRegex);
  if (match) {
    return match[1].trim();
  }

  // If no markers found, try to extract code between common headers and footers for C
  if (response.includes("#include")) {
    const lines = response.split("\n");
    let startIndex = lines.findIndex(line => line.includes("#include"));
    if (startIndex === -1) startIndex = 0;
    return lines.slice(startIndex).join("\n").trim();
  }

  // If no markers found, return the raw response
  return response.trim();
};

const callHuggingFaceApi = async (prompt: string, task: "generate" | "debug" | "explain"): Promise<string> => {
  try {
    console.log("Sending prompt to API:", prompt);
    const response = await fetch(HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HUGGINGFACE_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_length: 1024,
          temperature: 0.1,
          top_p: 0.95,
          return_full_text: false,
          stop: ["</s>", "[INST]"],
          repetition_penalty: 1.2,
          num_return_sequences: 1,
          do_sample: true,
          use_cache: true
        }
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error Response:", errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log("Raw API Response:", data);

    const generatedText = Array.isArray(data) ? data[0].generated_text : data.generated_text;
    
    if (!generatedText) {
      throw new Error("No text was generated by the API");
    }

    const processedResponse = extractCodeFromResponse(generatedText, task);
    console.log("Processed Response:", processedResponse);

    if (!processedResponse) {
      throw new Error("Failed to extract code from the response");
    }

    return processedResponse;
  } catch (error) {
    console.error("Error calling Hugging Face API:", error);
    throw error;
  }
};

export const huggingFaceService = {
  generateCode: async (prompt: string, language: Language): Promise<{ code: string; explanation: string }> => {
    console.log(`Generating ${language} code for prompt:`, prompt);
    try {
      const enhancedPrompt = `${prompt}\n\nPlease include:\n1. Proper error handling\n2. Type hints/documentation\n3. Best practices\n4. 3-5 meaningful test cases`;
      const codeResponse = await callHuggingFaceApi(generatePrompt("generate", enhancedPrompt, language), "generate");
      const explanationResponse = await callHuggingFaceApi(generatePrompt("explain", codeResponse, language), "explain");

      if (!codeResponse || !explanationResponse) {
        throw new Error("Failed to generate code or explanation");
      }

      return {
        code: codeResponse,
        explanation: explanationResponse,
      };
    } catch (error) {
      console.error("Error in generateCode:", error);
      throw error;
    }
  },

  debugCode: async (code: string, language: Language): Promise<{ code: string; explanation: string }> => {
    try {
      const debuggedCode = await callHuggingFaceApi(generatePrompt("debug", code, language), "debug");
      const explanation = await callHuggingFaceApi(generatePrompt("explain", debuggedCode, language), "explain");

      if (!debuggedCode || !explanation) {
        throw new Error("Failed to debug code or generate explanation");
      }

      return {
        code: debuggedCode,
        explanation: explanation,
      };
    } catch (error) {
      console.error("Error in debugCode:", error);
      throw error;
    }
  },

  explainCode: async (code: string, language: Language): Promise<{ code: string; explanation: string }> => {
    try {
      const explanation = await callHuggingFaceApi(generatePrompt("explain", code, language), "explain");

      if (!explanation) {
        throw new Error("Failed to generate explanation");
      }

      return {
        code: code,
        explanation: explanation,
      };
    } catch (error) {
      console.error("Error in explainCode:", error);
      throw error;
    }
  },
};

export const validateToken = async (token: string): Promise<void> => {
  const response = await fetch(HUGGINGFACE_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: "test" }),
  });

  if (!response.ok) {
    throw new Error(`Token validation failed with status ${response.status}`);
  }
}; 