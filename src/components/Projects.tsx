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
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Featured Projects
          </h2>
          <p className="text-xl text-gray-900 max-w-2xl mx-auto">
            Here are some of my recent projects that showcase my skills and passion for development
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card 
              key={project.title} 
              className="bg-white border-gray-200 hover:bg-gray-50 transition-all duration-500 hover:scale-105 overflow-hidden group cursor-pointer h-full flex flex-col"
              onClick={() => handleCardClick(project)}
              style={{
                animationDelay: `${index * 0.2}s`
              }}
            >
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-black text-xl">{project.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4 flex-1 flex flex-col pt-6">
                <p className="text-gray-900 text-sm leading-relaxed flex-1">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.tech.slice(0, 3).map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary" 
                      className="bg-white border border-gray-300 text-black hover:bg-gray-100 hover:border-gray-400 hover:text-black transition-all duration-200"
                    >
                      {tech}
                    </Badge>
                  ))}
                  {project.tech.length > 3 && (
                    <Badge variant="outline" className="bg-transparent text-gray-500">
                      +{project.tech.length - 3} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex gap-3 pt-4 mt-auto">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="bg-transparent border-gray-300 text-gray-900 hover:bg-gray-100 flex-1"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(project.github, '_blank');
                    }}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Code
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
