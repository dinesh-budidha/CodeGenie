import React, { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Language } from "@/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeEditor from "@/components/CodeEditor";
import CodeOutput from "@/components/CodeOutput";
import { Wand2, Bug, FileText, LoaderCircle, Code2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { huggingFaceService, validateToken } from "@/utils/huggingFaceService";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import CodeFormatter from '@/components/CodeFormatter';
import CodeExecutor from '@/components/CodeExecutor';
import CodeShare from '@/components/CodeShare';
import CodeTemplates from '@/components/CodeTemplates';

const gradientStyle = `
  @keyframes pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 0.5; }
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes float {
    0% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
    100% { transform: translateY(0px); }
  }

  .animate-gradient {
    animation: gradient 8s ease infinite;
    background-size: 200% 200%;
  }

  .animate-pulse {
    animation: pulse 10s ease-in-out infinite;
  }

  .animate-float {
    animation: float 6s ease-in-out infinite;
  }
  
  .bg-grid-slate-900\/\[0\.04\] {
    background-image: linear-gradient(to right, rgb(15 23 42 / 0.04) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(15 23 42 / 0.04) 1px, transparent 1px);
  }
  
  .dark .bg-grid-slate-400\/\[0\.05\] {
    background-image: linear-gradient(to right, rgb(148 163 184 / 0.05) 1px, transparent 1px),
      linear-gradient(to bottom, rgb(148 163 184 / 0.05) 1px, transparent 1px);
  }

  .nodes-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: -1;
    opacity: 0.5;
  }

  .node {
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgb(var(--primary) / 0.5);
  }

  .node::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: rgb(var(--primary) / 0.1);
    animation: pulse 2s ease-in-out infinite;
  }

  .line {
    position: absolute;
    height: 100px;
    width: 1px;
    background: linear-gradient(180deg, rgb(var(--primary) / 0.2), transparent);
    transform-origin: top;
  }
`;

const Dashboard = () => {
  const { toast } = useToast();
  const [mode, setMode] = useState<"generate" | "debug" | "explain">("generate");
  const [prompt, setPrompt] = useState("");
  const [codeInput, setCodeInput] = useState("");
  const [language, setLanguage] = useState<Language>("python");
  const [outputCode, setOutputCode] = useState("");
  const [explanation, setExplanation] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [inputCode, setInputCode] = useState("");

  const handleGenerateCode = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Error",
        description: "Please enter a description of the code you want to generate.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(undefined);
    setOutputCode("");
    setExplanation("");

    try {
      const result = await huggingFaceService.generateCode(prompt, language);
      if (!result.code || !result.explanation) {
        throw new Error("Failed to generate code or explanation");
      }
      setOutputCode(result.code);
      setExplanation(result.explanation);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred while generating code";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Error generating code:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDebugCode = async () => {
    if (!codeInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter code to debug.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(undefined);
    setOutputCode("");
    setExplanation("");

    try {
      const result = await huggingFaceService.debugCode(codeInput, language);
      if (!result.code || !result.explanation) {
        throw new Error("Failed to debug code or generate explanation");
      }
      setOutputCode(result.code);
      setExplanation(result.explanation);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred while debugging code";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Error debugging code:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExplainCode = async () => {
    if (!codeInput.trim()) {
      toast({
        title: "Error",
        description: "Please enter code to explain.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(undefined);
    setOutputCode("");
    setExplanation("");

    try {
      const result = await huggingFaceService.explainCode(codeInput, language);
      if (!result.explanation) {
        throw new Error("Failed to generate explanation");
      }
      setExplanation(result.explanation);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An error occurred while explaining code";
      setError(errorMessage);
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Error explaining code:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (mode === "generate") {
      await handleGenerateCode();
    } else if (mode === "debug") {
      await handleDebugCode();
    } else if (mode === "explain") {
      await handleExplainCode();
    }
  };

  return (
    <div className="min-h-screen pt-16 sm:pt-20 px-4 sm:px-6 relative overflow-hidden bg-background">
      {/* Modern Grid Background */}
      <div className="absolute inset-0 -z-10 h-full w-full">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#00000015_1px,transparent_1px),linear-gradient(to_bottom,#00000015_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff15_1px,transparent_1px),linear-gradient(to_bottom,#ffffff15_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      </div>
      
      {/* Ambient Light Effects */}
      <div className="absolute left-[-10%] top-[-10%] h-[600px] w-[600px] rounded-full bg-blue-500/5 dark:bg-blue-500/10 blur-3xl animate-pulse -z-10" />
      <div className="absolute right-[-10%] bottom-[-10%] h-[600px] w-[600px] rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl animate-pulse -z-10" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-indigo-500/3 dark:bg-indigo-500/5 blur-3xl animate-pulse -z-10" />

      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Input Section */}
          <Card className="border border-border/50 shadow-lg bg-card/50 dark:bg-card/80 backdrop-blur-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-bold">Input Terminal</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="generate" className="w-full" onValueChange={(value) => setMode(value as "generate" | "debug" | "explain")}>
                <TabsList className="grid w-full grid-cols-3 h-10 sm:h-11 bg-muted/50 border border-border">
                  <TabsTrigger value="generate" className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                    <Wand2 className="h-4 w-4" />
                    <span>Generate</span>
                  </TabsTrigger>
                  <TabsTrigger value="debug" className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                    <Bug className="h-4 w-4" />
                    <span>Debug</span>
                  </TabsTrigger>
                  <TabsTrigger value="explain" className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground data-[state=active]:bg-background data-[state=active]:text-foreground">
                    <FileText className="h-4 w-4" />
                    <span>Explain</span>
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="generate" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                        <SelectTrigger className="w-full sm:w-[120px] h-10 sm:h-11 bg-background border border-input text-foreground">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-input">
                          <SelectItem value="python" className="text-foreground hover:bg-muted">🐍 Python</SelectItem>
                          <SelectItem value="java" className="text-foreground hover:bg-muted">☕ Java</SelectItem>
                          <SelectItem value="c" className="text-foreground hover:bg-muted">⚡ C</SelectItem>
                          <SelectItem value="javascript" className="text-foreground hover:bg-muted">🟡 JavaScript</SelectItem>
                          <SelectItem value="typescript" className="text-foreground hover:bg-muted">📘 TypeScript</SelectItem>
                          <SelectItem value="cpp" className="text-foreground hover:bg-muted">⚡ C++</SelectItem>
                          <SelectItem value="csharp" className="text-foreground hover:bg-muted">💜 C#</SelectItem>
                          <SelectItem value="go" className="text-foreground hover:bg-muted">🔵 Go</SelectItem>
                          <SelectItem value="rust" className="text-foreground hover:bg-muted">🦀 Rust</SelectItem>
                          <SelectItem value="ruby" className="text-foreground hover:bg-muted">💎 Ruby</SelectItem>
                          <SelectItem value="php" className="text-foreground hover:bg-muted">🐘 PHP</SelectItem>
                          <SelectItem value="swift" className="text-foreground hover:bg-muted">🦅 Swift</SelectItem>
                          <SelectItem value="kotlin" className="text-foreground hover:bg-muted">🟣 Kotlin</SelectItem>
                          <SelectItem value="scala" className="text-foreground hover:bg-muted">🔴 Scala</SelectItem>
                          <SelectItem value="r" className="text-foreground hover:bg-muted">📊 R</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        <CodeTemplates
                          language={language}
                          onSelectTemplate={(template) => setPrompt(template.code)}
                        />
                        <CodeFormatter
                          code={prompt}
                          language={language}
                          onFormat={setPrompt}
                        />
                        <CodeShare
                          code={prompt}
                          language={language}
                        />
                      </div>
                      <Button 
                        onClick={handleSubmit} 
                        disabled={isLoading}
                        className="w-full sm:flex-1 h-10 sm:h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white font-medium shadow-lg shadow-blue-500/20"
                      >
                        {isLoading ? (
                          <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Wand2 className="mr-2 h-4 w-4" />
                            Generate Code
                          </>
                        )}
                      </Button>
                    </div>
                    <Textarea
                      placeholder="Describe what you want to generate..."
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      className="min-h-[200px] sm:min-h-[300px] text-sm sm:text-base bg-background border border-input text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                </TabsContent>
                <TabsContent value="debug" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                        <SelectTrigger className="w-full sm:w-[120px] h-10 sm:h-11 bg-background border border-input text-foreground">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-input">
                          <SelectItem value="python" className="text-foreground hover:bg-muted">🐍 Python</SelectItem>
                          <SelectItem value="java" className="text-foreground hover:bg-muted">☕ Java</SelectItem>
                          <SelectItem value="c" className="text-foreground hover:bg-muted">⚡ C</SelectItem>
                          <SelectItem value="javascript" className="text-foreground hover:bg-muted">🟡 JavaScript</SelectItem>
                          <SelectItem value="typescript" className="text-foreground hover:bg-muted">📘 TypeScript</SelectItem>
                          <SelectItem value="cpp" className="text-foreground hover:bg-muted">⚡ C++</SelectItem>
                          <SelectItem value="csharp" className="text-foreground hover:bg-muted">💜 C#</SelectItem>
                          <SelectItem value="go" className="text-foreground hover:bg-muted">🔵 Go</SelectItem>
                          <SelectItem value="rust" className="text-foreground hover:bg-muted">🦀 Rust</SelectItem>
                          <SelectItem value="ruby" className="text-foreground hover:bg-muted">💎 Ruby</SelectItem>
                          <SelectItem value="php" className="text-foreground hover:bg-muted">🐘 PHP</SelectItem>
                          <SelectItem value="swift" className="text-foreground hover:bg-muted">🦅 Swift</SelectItem>
                          <SelectItem value="kotlin" className="text-foreground hover:bg-muted">🟣 Kotlin</SelectItem>
                          <SelectItem value="scala" className="text-foreground hover:bg-muted">🔴 Scala</SelectItem>
                          <SelectItem value="r" className="text-foreground hover:bg-muted">📊 R</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        <CodeTemplates
                          language={language}
                          onSelectTemplate={(template) => setCodeInput(template.code)}
                        />
                        <CodeFormatter
                          code={codeInput}
                          language={language}
                          onFormat={setCodeInput}
                        />
                        <CodeShare
                          code={codeInput}
                          language={language}
                        />
                      </div>
                      <Button 
                        onClick={handleSubmit} 
                        disabled={isLoading}
                        className="w-full sm:flex-1 h-10 sm:h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white font-medium shadow-lg shadow-blue-500/20"
                      >
                        {isLoading ? (
                          <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <Bug className="mr-2 h-4 w-4" />
                            Debug Code
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="min-h-[200px] sm:min-h-[300px]">
                      <CodeEditor
                        code={codeInput}
                        onChange={setCodeInput}
                        language={language}
                      />
                    </div>
                    <CodeExecutor
                      code={codeInput}
                      language={language}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="explain" className="mt-4">
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                      <Select value={language} onValueChange={(value) => setLanguage(value as Language)}>
                        <SelectTrigger className="w-full sm:w-[120px] h-10 sm:h-11 bg-background border border-input text-foreground">
                          <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent className="bg-background border border-input">
                          <SelectItem value="python" className="text-foreground hover:bg-muted">🐍 Python</SelectItem>
                          <SelectItem value="java" className="text-foreground hover:bg-muted">☕ Java</SelectItem>
                          <SelectItem value="c" className="text-foreground hover:bg-muted">⚡ C</SelectItem>
                          <SelectItem value="javascript" className="text-foreground hover:bg-muted">🟡 JavaScript</SelectItem>
                          <SelectItem value="typescript" className="text-foreground hover:bg-muted">📘 TypeScript</SelectItem>
                          <SelectItem value="cpp" className="text-foreground hover:bg-muted">⚡ C++</SelectItem>
                          <SelectItem value="csharp" className="text-foreground hover:bg-muted">💜 C#</SelectItem>
                          <SelectItem value="go" className="text-foreground hover:bg-muted">🔵 Go</SelectItem>
                          <SelectItem value="rust" className="text-foreground hover:bg-muted">🦀 Rust</SelectItem>
                          <SelectItem value="ruby" className="text-foreground hover:bg-muted">💎 Ruby</SelectItem>
                          <SelectItem value="php" className="text-foreground hover:bg-muted">🐘 PHP</SelectItem>
                          <SelectItem value="swift" className="text-foreground hover:bg-muted">🦅 Swift</SelectItem>
                          <SelectItem value="kotlin" className="text-foreground hover:bg-muted">🟣 Kotlin</SelectItem>
                          <SelectItem value="scala" className="text-foreground hover:bg-muted">🔴 Scala</SelectItem>
                          <SelectItem value="r" className="text-foreground hover:bg-muted">📊 R</SelectItem>
                        </SelectContent>
                      </Select>
                      <div className="flex gap-2">
                        <CodeTemplates
                          language={language}
                          onSelectTemplate={(template) => setCodeInput(template.code)}
                        />
                        <CodeFormatter
                          code={codeInput}
                          language={language}
                          onFormat={setCodeInput}
                        />
                        <CodeShare
                          code={codeInput}
                          language={language}
                        />
                      </div>
                      <Button 
                        onClick={handleSubmit} 
                        disabled={isLoading}
                        className="w-full sm:flex-1 h-10 sm:h-11 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white font-medium shadow-lg shadow-blue-500/20"
                      >
                        {isLoading ? (
                          <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          <>
                            <FileText className="mr-2 h-4 w-4" />
                            Explain Code
                          </>
                        )}
                      </Button>
                    </div>
                    <div className="min-h-[200px] sm:min-h-[300px]">
                      <CodeEditor
                        code={codeInput}
                        onChange={setCodeInput}
                        language={language}
                      />
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Output Section */}
          <Card className="border border-border/50 shadow-lg bg-card/50 dark:bg-card/80 backdrop-blur-xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg sm:text-xl bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent font-bold">Output Terminal</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="flex items-center justify-center min-h-[200px] sm:min-h-[300px]">
                  <div className="flex flex-col items-center gap-4">
                    <LoaderCircle className="h-8 w-8 animate-spin text-blue-600 dark:text-blue-400" />
                    <p className="text-sm sm:text-base text-muted-foreground">Processing your request...</p>
                  </div>
                </div>
              ) : (
                <div className="min-h-[200px] sm:min-h-[300px]">
                  {mode === "generate" ? (
                    <div className="space-y-4">
                      <div className="flex justify-end gap-2">
                        <CodeFormatter
                          code={outputCode}
                          language={language}
                          onFormat={setOutputCode}
                        />
                        <CodeShare
                          code={outputCode}
                          language={language}
                        />
                      </div>
                      <CodeEditor
                        code={outputCode}
                        language={language}
                        readOnly
                      />
                      <CodeExecutor
                        code={outputCode}
                        language={language}
                      />
                    </div>
                  ) : mode === "debug" ? (
                    <div className="space-y-4">
                      <div className="flex justify-end gap-2">
                        <CodeFormatter
                          code={outputCode}
                          language={language}
                          onFormat={setOutputCode}
                        />
                        <CodeShare
                          code={outputCode}
                          language={language}
                        />
                      </div>
                      <CodeEditor
                        code={outputCode}
                        language={language}
                        readOnly
                      />
                      <CodeExecutor
                        code={outputCode}
                        language={language}
                      />
                      <div className="p-4 bg-muted/50 rounded-lg border border-border">
                        <h3 className="font-medium mb-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Debugging Suggestions:</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground">{explanation}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="flex justify-end gap-2">
                        <CodeFormatter
                          code={codeInput}
                          language={language}
                          onFormat={setCodeInput}
                        />
                        <CodeShare
                          code={codeInput}
                          language={language}
                        />
                      </div>
                      <CodeEditor
                        code={codeInput}
                        language={language}
                        readOnly
                      />
                      <CodeExecutor
                        code={codeInput}
                        language={language}
                      />
                      <div className="p-4 bg-muted/50 rounded-lg h-full overflow-auto border border-border">
                        <h3 className="font-medium mb-2 text-sm sm:text-base bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">Code Explanation:</h3>
                        <p className="text-xs sm:text-sm text-muted-foreground whitespace-pre-wrap">{explanation}</p>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
