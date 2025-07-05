
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const Skills = () => {
  const skills = [
    "TypeScript", "Next.js", "Supabase", "Stripe","Google Analytics and Tag Manager", "Full Stack Development", "n8n Automation",
    "Database Optimization", "AI Integrations", "Workflow Automation", 
    "Debugging", "Troubleshooting", "API Development", "RESTful APIs", 
    "MongoDB", "Google Cloud", "Docker", "Langchain", "PostgreSQL", "GitHub", "Web Development",
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Skills & Technologies
          </h2>
          <p className="text-xl text-gray-900 max-w-2xl mx-auto">
            I work with modern technologies to build scalable, performant applications
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.08,
                ease: "easeOut"
              }}
              style={{ display: "inline-block", animationDelay: `${index * 0.1}s` }}
            >
              <Badge
                variant="secondary"
                className="text-lg px-6 py-3 bg-white border border-gray-300 text-black hover:bg-gray-100 hover:border-gray-400 hover:text-black hover:scale-110 transition-all duration-300 cursor-pointer"
              >
                {skill}
              </Badge>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
