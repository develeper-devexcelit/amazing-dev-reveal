
import { Badge } from "@/components/ui/badge";

const Skills = () => {
  const skills = [
    "TypeScript", "Next.js", "Supabase", "Stripe", "Full Stack Development",
    "Database Optimization", "AI Integrations", "Workflow Automation", 
    "Debugging", "Troubleshooting", "API Development", "RESTful APIs", 
    "GraphQL", "Docker", "CI/CD", "Git", "GitHub", "Web Development"
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
              className="text-lg px-6 py-3 bg-slate-800/80 border-slate-600/50 text-slate-100 hover:bg-slate-700/90 hover:border-slate-500/70 hover:text-white hover:scale-110 transition-all duration-300 cursor-pointer backdrop-blur-sm"
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
