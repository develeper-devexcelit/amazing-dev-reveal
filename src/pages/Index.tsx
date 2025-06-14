
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import ChatBot from "@/components/ChatBot";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <ChatBot />
    </div>
  );
};

export default Index;
