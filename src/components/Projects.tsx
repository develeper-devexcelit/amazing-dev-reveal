import { ExternalLink, Github } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { ProjectModal } from "@/components/ui/project-modal";

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const projects = [
    {
      id: "live-bitcoin-prediction",
      title: "Live Bitcoin Prediction",
      description: "A Django-based web application that fetches the current Bitcoin price, predicts the next minute's price using a simple linear regression model, and displays the data on a web page.",
      longDescription: "This project is a Django-based web application that fetches the current Bitcoin price, predicts the next minute's price using a simple linear regression model, and displays the data on a web page. The application updates the prediction and the displayed data every minute. It also displays historical Bitcoin prices on a chart for better visualization of price trends.",
      image: "https://images.unsplash.com/photo-1640340434855-6084b20a0449?w=800&h=500&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1640340434855-6084b20a0449?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1631526487228-a2d9a40076a0?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1518546305921-5208bb482f3a?w=600&h=400&fit=crop"
      ],
      tech: ["Django", "Background Task", "Pandas", "Scikit-learn", "NumPy", "Chart.js", "HTML/CSS/JavaScript"],
      github: "https://github.com/irtaza302/Bit_coin-prediction-Django-Live",
      live: "#",
      date: "2024",
      role: "Full-Stack Developer",
      features: [
        "Fetches Bitcoin price from CoinDesk API",
        "Predicts next minute's price with linear regression",
        "Real-time price and prediction display",
        "Automatic minute-by-minute updates",
        "Historical price chart visualization"
      ],
      challenges: "The key challenge was to implement a reliable background task for fetching and predicting Bitcoin prices every minute without affecting the main application's performance. This was solved using Django's background task capabilities to ensure asynchronous processing and timely updates."
    },
    {
      id: "advanced-research-agent",
      title: "Advanced Research Agent System",
      description: "A sophisticated AI research system built with the latest OpenAI Agents SDK, featuring multi-agent workflows for comprehensive research and analysis. Fully tested and production-ready with 13/13 tests passing.",
      longDescription: "A sophisticated AI research system built with the latest OpenAI Agents SDK, featuring multi-agent workflows for comprehensive research and analysis. The system employs 10 specialized agents working in coordination to handle various research domains, from academic research to market analysis. With structured outputs using Pydantic models, parallel processing capabilities, and built-in quality control, this system delivers professional research reports with actionable insights.",
      image: "https://images.unsplash.com/photo-1694663363412-f127ec81e3a1?w=800&h=500&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1694663363412-f127ec81e3a1?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1555949963-ff98c6269d5f?w=600&h=400&fit=crop"
      ],
      tech: ["Python", "OpenAI Agents SDK", "Pydantic", "Rich Console", "asyncio"],
      github: "https://github.com/irtaza302/open-router-agent",
      live: "",
      date: "2024",
      role: "AI Systems Engineer",
      features: [
        "Multi-Agent Coordination with 10 Specialized Agents",
        "Intelligent Triage and Routing System",
        "Parallel Processing for Optimal Performance",
        "Structured Outputs with Pydantic Models",
        "Real-time Progress Updates",
        "Source Verification and Credibility Assessment",
        "Automated Quality Control",
        "Professional Report Generation"
      ],
      challenges: "The main challenge was orchestrating multiple specialized agents to work together seamlessly while maintaining data consistency across the research pipeline. This was solved by implementing a robust agent communication protocol and a centralized orchestrator that manages agent handoffs and data validation at each step of the process."
    },
    {
      id: "ai-powered-diary",
      title: "AI-Powered Personal Diary",
      description: "A secure and responsive personal diary application with AI-powered insights, built with Next.js, MongoDB, and Google Generative AI.",
      longDescription: "This is a full-stack personal diary application built with the latest technologies. It provides secure user authentication using NextAuth.js and JWT, allowing users to create, edit, and manage their daily diary entries. The standout feature is the integration of Google's Generative AI, which offers intelligent insights and analysis of the user's entries. The application is built with a focus on a beautiful, responsive UI that works seamlessly on both desktop and mobile devices.",
      image: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&h=500&fit=crop",
      gallery: [
          "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1456325504744-8238b2549b62?w=600&h=400&fit=crop",
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop"
      ],
      tech: ["Next.js 15", "React 19", "NextAuth.js", "MongoDB", "Google Generative AI", "TailwindCSS", "Framer Motion", "TypeScript"],
      github: "https://github.com/irtaza302/ai-personal-diary",
      live: "#",
      date: "2024",
      role: "Full-Stack Developer",
      features: [
        "Secure Authentication with JWT & NextAuth",
        "Create, Edit, and Manage Diary Entries",
        "AI-Generated Insights from Entries",
        "Personal Record Management",
        "Fully Responsive Design",
        "Type-Safe with TypeScript"
      ],
      challenges: "Integrating Google's Generative AI to provide meaningful insights from diary entries while ensuring user privacy was a key challenge. This was addressed by creating a secure pipeline for data analysis and anonymizing sensitive information before processing."
    }
  ];

  const handleCardClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
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
              onClick={() => handleCardClick(project)}
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
                      window.open(project.github, '_blank');
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
                      window.open(project.live, '_blank');
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

      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedProject(null);
        }}
      />
    </section>
  );
};

export default Projects;
