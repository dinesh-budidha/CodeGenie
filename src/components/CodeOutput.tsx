import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CodeEditor from "./CodeEditor";
import { Language } from "@/types";
import { AlertCircle, Cpu, FileText } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CodeOutputProps {
  code: string;
  language: Language;
  explanation: string;
  error?: string;
}

const CodeOutput: React.FC<CodeOutputProps> = ({
  code,
  language,
  explanation,
  error,
}) => {
  if (!code && !explanation && !error) {
    return null;
  }

  return (
    <div className="space-y-4 animate-fade-up">
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="code" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="code" className="flex items-center gap-2">
            <Cpu className="h-4 w-4" />
            <span>Code</span>
          </TabsTrigger>
          <TabsTrigger value="explanation" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            <span>Explanation</span>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="code" className="mt-0">
          {code ? (
            <CodeEditor code={code} language={language} readOnly />
          ) : (
            <div className="p-4 text-muted-foreground">No code generated yet.</div>
          )}
        </TabsContent>
        <TabsContent value="explanation" className="mt-0">
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className="p-6 prose prose-gray dark:prose-invert max-w-none">
              <h3 className="text-lg font-medium mb-4">Code Explanation</h3>
              <div className="whitespace-pre-line">
                {explanation || "No explanation available for this code."}
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CodeOutput;
