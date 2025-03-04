import React, { useRef, useEffect, useState } from "react";
import { Language } from "@/types";
import { Check, Clipboard, Download, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface CodeEditorProps {
  code: string;
  onChange?: (code: string) => void;
  language: Language;
  onLanguageChange?: (language: Language) => void;
  readOnly?: boolean;
}

const languageOptions: { value: Language; label: string; icon: string }[] = [
  { value: "python", label: "Python", icon: "🐍" },
  { value: "java", label: "Java", icon: "☕" },
  { value: "c", label: "C", icon: "⚡" },
];

const CodeEditor: React.FC<CodeEditorProps> = ({
  code,
  onChange,
  language,
  onLanguageChange,
  readOnly = false,
}) => {
  const [copied, setCopied] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      // Adjust textarea height based on content
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [code]);

  const handleCopy = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const fileExtension = getFileExtension(language);
    const blob = new Blob([code], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `code.${fileExtension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const getFileExtension = (lang: Language): string => {
    switch (lang) {
      case "python":
        return "py";
      case "java":
        return "java";
      case "c":
        return "c";
      default:
        return "txt";
    }
  };

  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
      <div className="flex items-center justify-between p-2 bg-muted/50 border-b">
        <div className="flex items-center gap-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 rounded-full bg-red-500"></div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
          </div>
          {onLanguageChange ? (
            <Select
              value={language}
              onValueChange={(value) => onLanguageChange(value as Language)}
            >
              <SelectTrigger className="h-7 w-[120px] text-xs bg-background/50 border-none shadow-none hover:bg-accent transition-colors">
                <Code2 className="h-3.5 w-3.5 mr-1 text-primary" />
                <SelectValue placeholder="Language" />
              </SelectTrigger>
              <SelectContent>
                {languageOptions.map((option) => (
                  <SelectItem 
                    key={option.value} 
                    value={option.value}
                    className="text-xs"
                  >
                    <span className="flex items-center">
                      <span className="mr-2">{option.icon}</span>
                      {option.label}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <span className="text-xs font-medium flex items-center">
              <Code2 className="h-3.5 w-3.5 mr-1 text-primary" />
              {languageOptions.find((l) => l.value === language)?.label || language}
            </span>
          )}
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-accent"
            onClick={handleCopy}
            title="Copy code"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-green-500" />
            ) : (
              <Clipboard className="h-3.5 w-3.5" />
            )}
            <span className="sr-only">Copy</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 hover:bg-accent"
            onClick={handleDownload}
            title="Download code"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="sr-only">Download</span>
          </Button>
        </div>
      </div>
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm bg-code text-code-foreground font-mono">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => onChange && onChange(e.target.value)}
            readOnly={readOnly}
            className="w-full h-full min-h-[200px] bg-transparent resize-none outline-none font-mono"
            spellCheck="false"
          />
        </pre>
      </div>
    </div>
  );
};

export default CodeEditor;
