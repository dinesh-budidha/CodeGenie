import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Terminal, Code, Wand2, Bug, Zap, Clock, FileCode, Code2, Share } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Index = () => {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setVisible(true);
    
    const handleScroll = () => {
      const elements = document.querySelectorAll('.animate-on-scroll');
      
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.8);
        
        if (isVisible) {
          el.classList.add('animate-fade-up');
          el.classList.remove('opacity-0');
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: "Code Generation",
      description: "Generate high-quality code in multiple languages from simple text descriptions",
      icon: <Wand2 className="h-6 w-6 text-primary" />,
    },
    {
      title: "Code Explanation",
      description: "Get detailed explanations of how your code works, line by line",
      icon: <Terminal className="h-6 w-6 text-primary" />,
    },
    {
      title: "Debugging Assistant",
      description: "Identify and fix bugs in your code with AI-powered suggestions",
      icon: <Bug className="h-6 w-6 text-primary" />,
    },
    {
      title: "Multiple Languages",
      description: "Support for JavaScript, Python, Java, C++, and many more",
      icon: <Code className="h-6 w-6 text-primary" />,
    },
    {
      title: "Lightning Fast",
      description: "Optimized performance for quick responses and minimal latency",
      icon: <Zap className="h-6 w-6 text-primary" />,
    },
    {
      title: "Save & Export",
      description: "Save your generated code and export it in various formats",
      icon: <Clock className="h-6 w-6 text-primary" />,
    },
    {
      title: "Code Templates",
      description: "Select from a variety of templates to kickstart your coding projects",
      icon: <FileCode className="h-6 w-6 text-primary" />,
    },
    {
      title: "Code Formatter",
      description: "Automatically format your code for better readability and consistency",
      icon: <Code2 className="h-6 w-6 text-primary" />,
    },
    {
      title: "Code Sharing",
      description: "Easily share your code snippets with others",
      icon: <Share className="h-6 w-6 text-primary" />,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-40 md:pb-32 px-6 overflow-hidden"
      >
        <div className="max-w-5xl mx-auto text-center">
          <div className={`transition-all duration-1000 delay-300 transform ${visible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              Developed by Wild Card Coders
            </div>
          </div>
          
          <h1 className={`text-4xl md:text-6xl font-bold mb-6 tracking-tight transition-all duration-1000 delay-500 transform ${visible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            Your AI <span className="text-primary">Code Assistant</span> for Modern Development
          </h1>
          
          <p className={`text-xl text-muted-foreground max-w-3xl mx-auto mb-8 transition-all duration-1000 delay-700 transform ${visible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            Generate, explain, and debug code with the power of AI. CodeGenie helps developers write better code faster.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-900 transform ${visible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link to="/dashboard">
                Try Code Genie
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 h-full w-full bg-white dark:bg-gray-950">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
        </div>
        
        {/* Code preview window */}
        <div className={`relative mt-16 md:mt-24 max-w-4xl mx-auto transition-all duration-1000 delay-1000 transform ${visible ? 'opacity-100' : 'opacity-0 translate-y-10'}`}>
          <div className="rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">
            <div className="bg-gray-800 text-gray-200 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="flex-1 text-center text-sm font-mono opacity-80">
                example.js
              </div>
            </div>
            <div className="bg-code text-code-foreground p-4 overflow-x-auto font-mono text-sm leading-relaxed">
              <pre>
                <span className="text-blue-400">function</span>{" "}
                <span className="text-yellow-300">quickSort</span>(
                <span className="text-orange-300">arr</span>) {"{"}
                <br />
                {"  "}
                <span className="text-purple-400">if</span> (arr.length {"<="}{" "}
                <span className="text-green-300">1</span>) {"{"}
                <br />
                {"    "}
                <span className="text-blue-400">return</span> arr;
                <br />
                {"  "}
                {"}"}
                <br />
                <br />
                {"  "}
                <span className="text-blue-400">const</span> pivot ={" "}
                <span className="text-orange-300">arr</span>[
                <span className="text-green-300">0</span>];
                <br />
                {"  "}
                <span className="text-blue-400">const</span> left = [];
                <br />
                {"  "}
                <span className="text-blue-400">const</span> right = [];
                <br />
                <br />
                {"  "}
                <span className="text-purple-400">for</span> (
                <span className="text-blue-400">let</span> i ={" "}
                <span className="text-green-300">1</span>; i {"<"}{" "}
                <span className="text-orange-300">arr</span>.length; i++) {"{"}
                <br />
                {"    "}
                <span className="text-purple-400">if</span> (
                <span className="text-orange-300">arr</span>[i] {"<"} pivot) {"{"}
                <br />
                {"      "}left.push(
                <span className="text-orange-300">arr</span>[i]);
                <br />
                {"    "}{"}"}
                <span className="text-purple-400"> else </span>
                {"{"}
                <br />
                {"      "}right.push(
                <span className="text-orange-300">arr</span>[i]);
                <br />
                {"    "}{"}"}
                <br />
                {"  "}{"}"}
                <br />
                <br />
                {"  "}
                <span className="text-blue-400">return</span> [
                ...quickSort(left), pivot, ...quickSort(right)];
                <br />
                {"}"}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-gray-50 dark:bg-gray-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 opacity-0 animate-on-scroll">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Powerful Features for Developers
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to accelerate your development workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border opacity-0 animate-on-scroll">
                <CardHeader>
                  <div className="mb-4 w-12 h-12 flex items-center justify-center rounded-lg bg-primary/10">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center opacity-0 animate-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Coding Experience?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Join thousands of developers who use CodeGenie to write better code, faster.
          </p>
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/dashboard">
              Try Code Genie for Free
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-gray-100 dark:bg-gray-900/50 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 text-primary font-semibold text-xl mb-6 md:mb-0">
              <Code className="h-6 w-6" />
              <span>CodeGenie</span>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Documentation
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800 text-center text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} CodeGenie. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
