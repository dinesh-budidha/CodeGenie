import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2, Check, Copy } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface CodeShareProps {
  code: string;
  language: string;
}

const CodeShare: React.FC<CodeShareProps> = ({ code, language }) => {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  const generateShareUrl = () => {
    // In a real application, this would create a unique URL on your backend
    // For now, we'll create a mock URL with the code and language
    const encodedCode = encodeURIComponent(code);
    const mockUrl = `${window.location.origin}/share?code=${encodedCode}&lang=${language}`;
    setShareUrl(mockUrl);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setIsCopied(true);
      toast({
        title: "Success",
        description: "Share URL copied to clipboard",
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share Code</DialogTitle>
          <DialogDescription>
            Generate a shareable link for your code
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="share-url">Share URL</Label>
            <div className="flex gap-2">
              <Input
                id="share-url"
                value={shareUrl}
                readOnly
                placeholder="Click Generate to create a share URL"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={copyToClipboard}
                disabled={!shareUrl}
              >
                {isCopied ? (
                  <Check className="h-4 w-4" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <Button
            onClick={generateShareUrl}
            className="w-full"
          >
            Generate Share URL
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CodeShare; 