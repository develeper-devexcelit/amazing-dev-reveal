
import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();
  
  const projects = [
    {
      id: "e-learning-platform",
      title: "E-learning Platform",
      description: "Architected and delivered complex projects end-to-end, including an e-learning platform and a card trading application.",
      image: "https://images.unsplash.com/photo-1546410531-bb4597444232?w=600&h=400&fit=crop",
      tech: ["Next.js", "Supabase", "PostgreSQL", "MongoDB"],
      github: "#",
      live: "#"
    },
    {
      id: "ai-features",
      title: "AI Features Integration",
      description: "Integrated OpenAI Assistant API for AI features; fine-tuned models to enhance chatbot performance and contextual accuracy.",
      image: "https://images.unsplash.com/photo-1596526131083-fdc04311369e?w=600&h=400&fit=crop",
      tech: ["OpenAI Assistant API", "Fine-tuning", "Chatbot"],
      github: "#",
      live: "#"
    },
    {
      id: "full-stack-applications",
      title: "Full-Stack Applications",
      description: "Developed full-stack applications using Next.js, Supabase, PostgreSQL, and MongoDB for front-end UI and backend data management.",
      image: "https://images.unsplash.com/photo-1587620962725-abab7fe65553?w=600&h=400&fit=crop",
      tech: ["Next.js", "Supabase", "PostgreSQL", "MongoDB"],
      github: "#",
      live: "#"
    },
    {
      id: "workflow-automation",
      title: "Workflow Automation",
      description: "Automated development workflows using n8n and API integrations (including OpenAI), significantly improving process efficiency.",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ed?w=600&h=400&fit=crop",
      tech: ["n8n", "API Integrations", "OpenAI"],
      github: "#",
      live: "#"
    }
  ];

  const handleCardClick = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  return (
    <section className="py-20 px-6">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for development
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title} 
              className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-500 hover:scale-105 overflow-hidden group cursor-pointer"
              onClick={() => handleCardClick(project.id)}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              <div className="relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-white text-xl">{project.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="bg-blue-500/20 text-blue-300 border-blue-500/30"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>
                
                <div className="flex gap-3 pt-4">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-transparent border-white/30 text-white hover:bg-white hover:text-gray-900 flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle GitHub link
                    }}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle live demo link
                    }}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
