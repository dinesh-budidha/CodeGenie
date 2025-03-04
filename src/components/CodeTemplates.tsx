import React from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CodeTemplate } from "@/types";
import { FileCode } from 'lucide-react';
import { CODE_TEMPLATES } from '@/types';

interface CodeTemplatesProps {
  language: string;
  onSelectTemplate: (template: CodeTemplate) => void;
}

const CodeTemplates: React.FC<CodeTemplatesProps> = ({ language, onSelectTemplate }) => {
  const templates = CODE_TEMPLATES.filter(template => template.language === language);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <FileCode className="h-4 w-4" />
          Templates
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Code Templates</DialogTitle>
          <DialogDescription>
            Select a template to get started with common code patterns
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-4">
            {templates.map((template, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-border hover:border-primary/50 cursor-pointer transition-colors"
                onClick={() => onSelectTemplate(template)}
              >
                <h3 className="font-medium mb-1">{template.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                <pre className="text-xs bg-muted/50 p-2 rounded overflow-x-auto">
                  {template.code}
                </pre>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default CodeTemplates; 