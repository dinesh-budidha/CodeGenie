import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Play, Square } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { loadPyodide } from 'pyodide';

interface CodeExecutorProps {
  code: string;
  language: string;
}

const CodeExecutor: React.FC<CodeExecutorProps> = ({ code, language }) => {
  const { toast } = useToast();
  const [output, setOutput] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [error, setError] = useState<string>('');

  const executeCode = async () => {
    setIsRunning(true);
    setError('');
    setOutput('');

    try {
      switch (language.toLowerCase()) {
        case 'python': {
          // For Python, we'll use Pyodide
          const pyodide = await loadPyodide();
          const pythonResult = await pyodide.runPythonAsync(code);
          setOutput(String(pythonResult));
          break;
        }

        case 'javascript': {
          // For JavaScript, we can use Function constructor
          const jsResult = new Function(code)();
          setOutput(String(jsResult));
          break;
        }

        default:
          setError('Code execution is not supported for this language');
          toast({
            title: "Error",
            description: "Code execution is not supported for this language",
            variant: "destructive",
          });
      }
    } catch (err) {
      setError(String(err));
      toast({
        title: "Error",
        description: "Failed to execute code",
        variant: "destructive",
      });
    } finally {
      setIsRunning(false);
    }
  };

  const stopExecution = () => {
    setIsRunning(false);
    setError('');
    setOutput('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={executeCode}
          disabled={isRunning}
        >
          <Play className="h-4 w-4" />
          Run
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="gap-2"
          onClick={stopExecution}
          disabled={!isRunning}
        >
          <Square className="h-4 w-4" />
          Stop
        </Button>
      </div>

      {(output || error) && (
        <Card className="p-4">
          <pre className="whitespace-pre-wrap font-mono text-sm">
            {error || output}
          </pre>
        </Card>
      )}
    </div>
  );
};

export default CodeExecutor; 