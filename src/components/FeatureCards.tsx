import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Wand2, Bug, FileText, Code2, Share2, Play, LayoutTemplate, 
  Brain, Zap, Lock, Cloud, GitBranch, Database, 
  TestTube, Rocket, History, Settings, 
  Search, BookOpen, Terminal, Shield
} from "lucide-react";

const features = [
  {
    title: "AI-Powered Code Generation",
    description: "Transform natural language descriptions into working code. Our advanced AI understands your requirements and generates clean, efficient code in your preferred programming language.",
    icon: Wand2,
    gradient: "from-blue-600 to-purple-600",
    darkGradient: "from-blue-400 to-purple-400",
  },
  {
    title: "Intelligent Code Debugging",
    description: "Automatically identify and fix bugs in your code. Get detailed explanations of issues and AI-suggested solutions to improve code quality and reliability.",
    icon: Bug,
    gradient: "from-red-600 to-orange-600",
    darkGradient: "from-red-400 to-orange-400",
  },
  {
    title: "Comprehensive Code Explanation",
    description: "Get detailed explanations of any code snippet. Understand complex algorithms, functions, and code patterns with step-by-step breakdowns and best practices.",
    icon: FileText,
    gradient: "from-green-600 to-emerald-600",
    darkGradient: "from-green-400 to-emerald-400",
  },
  {
    title: "Smart Code Formatting",
    description: "Automatically format your code following industry best practices. Maintain consistent style across your project with intelligent indentation and structure.",
    icon: Code2,
    gradient: "from-indigo-600 to-violet-600",
    darkGradient: "from-indigo-400 to-violet-400",
  },
  {
    title: "Easy Code Sharing",
    description: "Share your code snippets instantly with others. Generate secure, shareable links that can be accessed by anyone, perfect for collaboration and code reviews.",
    icon: Share2,
    gradient: "from-pink-600 to-rose-600",
    darkGradient: "from-pink-400 to-rose-400",
  },
  {
    title: "Browser-Based Code Execution",
    description: "Run your code directly in the browser. Test Python and JavaScript code instantly with a built-in execution environment and real-time output.",
    icon: Play,
    gradient: "from-yellow-600 to-amber-600",
    darkGradient: "from-yellow-400 to-amber-400",
  },
  {
    title: "Rich Code Templates",
    description: "Access a comprehensive library of pre-built templates for common programming patterns. Start with production-ready code structures for various use cases.",
    icon: LayoutTemplate,
    gradient: "from-cyan-600 to-teal-600",
    darkGradient: "from-cyan-400 to-teal-400",
  },
  {
    title: "Advanced AI Technology",
    description: "Leverage cutting-edge AI models for intelligent code generation, analysis, and optimization. Get smart suggestions and insights to improve your code.",
    icon: Brain,
    gradient: "from-purple-600 to-fuchsia-600",
    darkGradient: "from-purple-400 to-fuchsia-400",
  },
  {
    title: "Real-Time Code Analysis",
    description: "Get instant feedback on your code quality, performance, and potential issues. Our AI analyzes your code in real-time and provides actionable insights.",
    icon: Zap,
    gradient: "from-orange-600 to-red-600",
    darkGradient: "from-orange-400 to-red-400",
  },
  {
    title: "Secure Code Handling",
    description: "Your code is handled with the highest security standards. All operations are performed locally when possible, with secure cloud processing when needed.",
    icon: Lock,
    gradient: "from-emerald-600 to-green-600",
    darkGradient: "from-emerald-400 to-green-400",
  },
  {
    title: "Cloud Integration",
    description: "Seamlessly integrate with cloud services and version control systems. Save, sync, and manage your code across different platforms and devices.",
    icon: Cloud,
    gradient: "from-sky-600 to-blue-600",
    darkGradient: "from-sky-400 to-blue-400",
  },
  {
    title: "Multi-Language Support",
    description: "Work with a wide range of programming languages. From Python to Rust, our platform supports multiple languages with specialized handling for each.",
    icon: Code2,
    gradient: "from-violet-600 to-purple-600",
    darkGradient: "from-violet-400 to-purple-400",
  },
  {
    title: "Git Integration",
    description: "Seamlessly integrate with Git repositories. Version control your code, track changes, and collaborate with team members directly from the platform.",
    icon: GitBranch,
    gradient: "from-orange-600 to-red-600",
    darkGradient: "from-orange-400 to-red-400",
  },
  {
    title: "Database Management",
    description: "Create and manage database schemas, queries, and migrations. Support for multiple database types with visual query builders and schema designers.",
    icon: Database,
    gradient: "from-blue-600 to-cyan-600",
    darkGradient: "from-blue-400 to-cyan-400",
  },
  {
    title: "Automated Testing",
    description: "Generate and run unit tests automatically. Create test suites, mock data, and validate your code with comprehensive testing tools.",
    icon: TestTube,
    gradient: "from-green-600 to-emerald-600",
    darkGradient: "from-green-400 to-emerald-400",
  },
  {
    title: "Performance Optimization",
    description: "Analyze and optimize your code's performance. Get detailed insights into bottlenecks and AI-powered suggestions for improvement.",
    icon: Rocket,
    gradient: "from-purple-600 to-pink-600",
    darkGradient: "from-purple-400 to-pink-400",
  },
  {
    title: "Code History",
    description: "Track changes and maintain version history of your code. Compare different versions, revert changes, and understand code evolution.",
    icon: History,
    gradient: "from-indigo-600 to-violet-600",
    darkGradient: "from-indigo-400 to-violet-400",
  },
  {
    title: "Customizable Settings",
    description: "Personalize your development environment with customizable settings. Configure editor preferences, themes, and tool integrations.",
    icon: Settings,
    gradient: "from-yellow-600 to-orange-600",
    darkGradient: "from-yellow-400 to-orange-400",
  },
  {
    title: "Advanced Search",
    description: "Search through your codebase with powerful filtering options. Find specific functions, variables, or patterns across multiple files.",
    icon: Search,
    gradient: "from-cyan-600 to-blue-600",
    darkGradient: "from-cyan-400 to-blue-400",
  },
  {
    title: "Documentation Generation",
    description: "Automatically generate comprehensive documentation for your code. Create API docs, README files, and inline documentation with ease.",
    icon: BookOpen,
    gradient: "from-emerald-600 to-teal-600",
    darkGradient: "from-emerald-400 to-teal-400",
  },
  {
    title: "Terminal Integration",
    description: "Access a built-in terminal for running commands and scripts. Execute shell commands, manage dependencies, and control your development environment.",
    icon: Terminal,
    gradient: "from-gray-600 to-slate-600",
    darkGradient: "from-gray-400 to-slate-400",
  },
  {
    title: "Security Scanning",
    description: "Automatically scan your code for security vulnerabilities. Get detailed reports and recommendations for fixing security issues.",
    icon: Shield,
    gradient: "from-red-600 to-pink-600",
    darkGradient: "from-red-400 to-pink-400",
  }
];

const FeatureCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
      {features.map((feature, index) => {
        const Icon = feature.icon;
        return (
          <Card key={index} className="border border-border/50 shadow-lg bg-card/50 dark:bg-card/80 backdrop-blur-xl hover:shadow-xl transition-shadow duration-300 h-full">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.gradient} dark:${feature.darkGradient} text-white`}>
                  <Icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-sm sm:text-base lg:text-lg bg-gradient-to-r from-foreground to-foreground/70 dark:from-foreground dark:to-foreground/70 bg-clip-text text-transparent">
                  {feature.title}
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {feature.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default FeatureCards; 