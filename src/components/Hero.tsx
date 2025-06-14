
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 animate-pulse"></div>
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-bounce"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Hi, I'm{" "}
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent animate-pulse">
              Alex Developer
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Full-Stack Developer crafting beautiful, scalable web applications with modern technologies
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-12">
            <Button variant="outline" size="lg" className="bg-transparent border-white/20 text-white hover:bg-white hover:text-gray-900 hover:scale-105 transition-all duration-300">
              <Github className="w-5 h-5 mr-2" />
              GitHub
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white/20 text-white hover:bg-white hover:text-gray-900 hover:scale-105 transition-all duration-300">
              <Linkedin className="w-5 h-5 mr-2" />
              LinkedIn
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white/20 text-white hover:bg-white hover:text-gray-900 hover:scale-105 transition-all duration-300">
              <Mail className="w-5 h-5 mr-2" />
              Contact
            </Button>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300">
              View My Work
            </Button>
            <Button variant="outline" size="lg" className="bg-transparent border-white/30 text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300">
              Download CV
            </Button>
          </div>
          
          {/* Scroll indicator */}
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 text-white/70 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
