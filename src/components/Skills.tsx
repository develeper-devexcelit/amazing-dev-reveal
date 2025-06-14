
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skills = [
    "React", "TypeScript", "Node.js", "Python", "JavaScript", "Next.js",
    "Tailwind CSS", "PostgreSQL", "MongoDB", "AWS", "Docker", "Git",
    "GraphQL", "Redux", "Express.js", "Vue.js", "Sass", "Firebase"
  ];

  return (
    <section className="py-20 px-6 bg-white/5 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            I work with modern technologies to build scalable, performant applications
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <Badge 
              key={skill} 
              variant="secondary" 
              className="text-lg px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-white/20 text-white hover:from-blue-500/30 hover:to-purple-500/30 hover:scale-110 transition-all duration-300 cursor-pointer"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
