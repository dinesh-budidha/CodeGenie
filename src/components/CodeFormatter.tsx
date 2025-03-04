import React from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Wand2 } from 'lucide-react';
import prettier from 'prettier/standalone';

interface CodeFormatterProps {
  code: string;
  language: string;
  onFormat: (formattedCode: string) => void;
}

const CodeFormatter: React.FC<CodeFormatterProps> = ({ code, language, onFormat }) => {
  const { toast } = useToast();

  const formatCode = async () => {
    try {
      // Only format JavaScript and TypeScript code for now
      if (language.toLowerCase() !== 'javascript' && language.toLowerCase() !== 'typescript') {
        toast({
          title: "Error",
          description: "Code formatting is currently only supported for JavaScript and TypeScript",
          variant: "destructive",
        });
        return;
      }

      const formattedCode = await prettier.format(code, {
        parser: language.toLowerCase(),
        semi: true,
        singleQuote: true,
        tabWidth: 2,
        trailingComma: 'es5',
        printWidth: 80,
      });

      onFormat(formattedCode);
      toast({
        title: "Success",
        description: "Code formatted successfully",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to format code",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      className="gap-2"
      onClick={formatCode}
    >
      <Wand2 className="h-4 w-4" />
      Format
    </Button>
  );
};

export default CodeFormatter; 