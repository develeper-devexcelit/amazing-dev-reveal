
import { Code, Lightbulb, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Me
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            From as long as I can remember, my deep curiosity and passion for learning have driven me to explore technology with relentless
            enthusiasm. I constantly seek out cutting-edge tools and innovative techniques to streamline my work, and my expertise in prompt
            engineering helps me tackle every task with precision and a commitment to excellence. Eager to embrace new challenges, I
            continuously master emerging technologies and pioneer fresh solutions, always pushing beyond expectations to not just adapt to
            change, but to drive it.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <Code className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Clean Code</h3>
              <p className="text-gray-300">
                Writing maintainable, scalable code following best practices and modern standards.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <Lightbulb className="w-12 h-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Innovation</h3>
              <p className="text-gray-300">
                Always exploring new technologies and creative solutions to complex problems.
              </p>
            </CardContent>
          </Card>
          
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <Zap className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-4">Performance</h3>
              <p className="text-gray-300">
                Optimizing applications for speed, accessibility, and exceptional user experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default About;
