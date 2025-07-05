
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-white">
      {/* Logo in the top left */}
      <img
        src="/logo3.png"
        alt="Irtaza Logo"
        className="absolute -top-8 left-6 w-32 h-32 md:w-52 md:h-52 object-contain z-20 drop-shadow-lg"
      />
      {/* Remove animated background elements for a clean look */}
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold text-black mb-6 leading-tight">
            Hi, I'm{" "}
            <span
              className="bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent font-bold relative animate-gradient-move"
              style={{
                textShadow: '0 2px 16px rgba(80, 80, 180, 0.18)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
              }}
            >
              Irtaza
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-900 mb-8 max-w-3xl mx-auto">
            Full Stack Developer & Data Science Engineer
          </p>
          
          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-12">
            <a href="https://github.com/irtaza302" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="bg-transparent border-gray-200 text-black hover:bg-gray-100 hover:text-gray-900 hover:scale-105 transition-all duration-300">
                <Github className="w-5 h-5 mr-2" />
                GitHub
              </Button>
            </a>
            <a href="https://www.linkedin.com/in/irtaza-malik-15a656239/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="lg" className="bg-transparent border-gray-200 text-black hover:bg-gray-100 hover:text-gray-900 hover:scale-105 transition-all duration-300">
                <Linkedin className="w-5 h-5 mr-2" />
                LinkedIn
              </Button>
            </a>
            <a href="mailto:malikirtaza96@gmail.com">
              <Button variant="outline" size="lg" className="bg-transparent border-gray-200 text-black hover:bg-gray-100 hover:text-gray-900 hover:scale-105 transition-all duration-300">
                <Mail className="w-5 h-5 mr-2" />
                Contact
              </Button>
            </a>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button size="lg" className="bg-gray-800 text-white px-8 py-4 text-lg font-semibold hover:bg-gray-900 hover:scale-105 transition-all duration-300">
              View My Work
            </Button>
            <a
              href="/Irtaza_malik_-_Full_Stack_at_DevExcel__Passionate_about_Full-Stack_Development.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" className="bg-transparent border-gray-200 text-black hover:bg-gray-100 hover:text-gray-900 px-8 py-4 text-lg font-semibold hover:scale-105 transition-all duration-300">
                Download CV
              </Button>
            </a>
          </div>
          
          {/* Scroll indicator */}
          <div className="animate-bounce">
            <ArrowDown className="w-6 h-6 text-gray-400 mx-auto" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
