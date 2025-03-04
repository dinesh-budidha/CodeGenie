import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Wand2, ArrowRight } from "lucide-react";
import FeatureCards from "@/components/FeatureCards";

const Home = () => {
  const navigate = useNavigate();

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
        {/* Hero Section */}
        <div className="text-center py-8 sm:py-12 lg:py-16">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Code Genie
          </h1>
          <p className="text-base sm:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
            Your AI-powered coding companion for generating, debugging, and understanding code. Transform your ideas into reality with advanced AI technology.
          </p>
          <Button
            onClick={() => navigate("/dashboard")}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white font-medium shadow-lg shadow-blue-500/20 h-10 sm:h-12 px-6 sm:px-8"
          >
            <Wand2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Start Coding
            <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>

        {/* Features Section */}
        <div className="py-8 sm:py-12 lg:py-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Powerful Features
          </h2>
          <div className="px-2 sm:px-4">
            <FeatureCards />
          </div>
        </div>

        {/* Supported Languages Section */}
        <div className="py-8 sm:py-12 lg:py-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-8 sm:mb-12 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Supported Languages
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 px-2 sm:px-4">
            {[
              { name: "Python", emoji: "🐍" },
              { name: "JavaScript", emoji: "🟡" },
              { name: "TypeScript", emoji: "📘" },
              { name: "Java", emoji: "☕" },
              { name: "C++", emoji: "⚡" },
              { name: "C#", emoji: "💜" },
              { name: "Go", emoji: "🔵" },
              { name: "Rust", emoji: "🦀" },
              { name: "Ruby", emoji: "💎" },
              { name: "PHP", emoji: "🐘" },
              { name: "Swift", emoji: "🦅" },
              { name: "Kotlin", emoji: "🟣" },
              { name: "Scala", emoji: "🔴" },
              { name: "R", emoji: "📊" },
              { name: "C", emoji: "⚡" },
            ].map((lang, index) => (
              <div
                key={index}
                className="flex items-center gap-2 p-3 sm:p-4 rounded-lg bg-card/50 dark:bg-card/80 backdrop-blur-xl border border-border/50 hover:shadow-lg transition-shadow duration-300"
              >
                <span className="text-xl sm:text-2xl">{lang.emoji}</span>
                <span className="font-medium text-sm sm:text-base">{lang.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 