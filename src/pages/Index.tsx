
import { lazy, Suspense } from 'react';
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";

// Lazy load the Chatbot component
const Chatbot = lazy(() => import('@/components/Chatbot'));

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Contact />
      <Suspense fallback={null}>
        <Chatbot />
      </Suspense>
    </div>
  );
};

export default Index;
