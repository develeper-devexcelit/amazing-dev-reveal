
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Github, ExternalLink, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const ProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock project data - in a real app, this would come from an API or database
  const projects = [
    {
      id: "ecommerce-platform",
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution with React, Node.js, and PostgreSQL. Features include user authentication, payment integration, and admin dashboard.",
      longDescription: "This comprehensive e-commerce platform was built to handle high-traffic scenarios with a focus on user experience and performance. The application features a modern React frontend, robust Node.js backend, and PostgreSQL database for reliable data management. Key features include secure user authentication, Stripe payment integration, real-time inventory management, and a comprehensive admin dashboard for managing products, orders, and customers.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=600&h=400&fit=crop"
      ],
      tech: ["React", "Node.js", "PostgreSQL", "Stripe", "JWT", "Tailwind CSS"],
      github: "#",
      live: "#",
      date: "2024",
      role: "Full-Stack Developer",
      features: [
        "User Authentication & Authorization",
        "Shopping Cart & Checkout Process",
        "Payment Integration with Stripe",
        "Product Catalog Management",
        "Order Tracking System",
        "Admin Dashboard",
        "Responsive Design",
        "RESTful API Design"
      ],
      challenges: "The main challenge was implementing real-time inventory updates across multiple user sessions while maintaining data consistency. This was solved using WebSocket connections and optimistic UI updates with proper error handling."
    },
    {
      id: "task-management-app",
      title: "Task Management App",
      description: "A collaborative project management tool with real-time updates, drag-and-drop functionality, and team collaboration features.",
      longDescription: "A modern task management application designed for teams to collaborate effectively. Built with Vue.js and Firebase, it offers real-time synchronization, intuitive drag-and-drop interfaces, and comprehensive project tracking capabilities.",
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=500&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop"
      ],
      tech: ["Vue.js", "Firebase", "Tailwind CSS", "Vuex"],
      github: "#",
      live: "#",
      date: "2024",
      role: "Frontend Developer",
      features: [
        "Real-time Collaboration",
        "Drag & Drop Interface",
        "Team Management",
        "Project Timeline Views",
        "File Attachments",
        "Comments & Notifications",
        "Progress Tracking",
        "Mobile Responsive"
      ],
      challenges: "Implementing smooth drag-and-drop functionality while maintaining real-time synchronization across multiple users required careful state management and conflict resolution strategies."
    },
    {
      id: "weather-dashboard",
      title: "Weather Dashboard",
      description: "A beautiful weather application with location-based forecasts, interactive maps, and detailed weather analytics.",
      longDescription: "An elegant weather dashboard that provides comprehensive weather information with beautiful visualizations. Built with React and TypeScript, it integrates with the OpenWeather API to deliver accurate forecasts and interactive weather maps.",
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=500&fit=crop",
      gallery: [
        "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop",
        "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop"
      ],
      tech: ["React", "TypeScript", "OpenWeather API", "Chart.js"],
      github: "#",
      live: "#",
      date: "2024",
      role: "Frontend Developer",
      features: [
        "Current Weather Display",
        "5-Day Forecast",
        "Interactive Weather Maps",
        "Location Search",
        "Weather Alerts",
        "Historical Data Charts",
        "Favorite Locations",
        "Dark/Light Mode"
      ],
      challenges: "Creating smooth animations and transitions for weather data updates while handling API rate limits and ensuring the app remains responsive during data fetching."
    }
  ];

  const project = projects.find(p => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Project Not Found</h1>
          <Button onClick={() => navigate('/')} className="bg-blue-500 hover:bg-blue-600">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Header */}
      <div className="container mx-auto px-6 py-8">
        <Button 
          onClick={() => navigate('/')} 
          variant="outline" 
          className="bg-transparent border-white/30 text-white hover:bg-white hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>

        {/* Hero Section */}
        <div className="mb-12">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            <div className="lg:w-1/2">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {project.title}
              </h1>
              <p className="text-xl text-gray-300 mb-6">
                {project.longDescription}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
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

              <div className="flex gap-4 mb-6">
                <Button 
                  variant="outline" 
                  className="bg-transparent border-white/30 text-white hover:bg-white hover:text-gray-900"
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </Button>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
              </div>

              <div className="flex items-center gap-6 text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{project.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span>{project.role}</span>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-64 lg:h-80 object-cover rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>

        {/* Project Gallery */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-white mb-6">Project Gallery</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.gallery.map((image, index) => (
              <img 
                key={index}
                src={image} 
                alt={`${project.title} screenshot ${index + 1}`}
                className="w-full h-48 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
              />
            ))}
          </div>
        </div>

        {/* Features & Challenges */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Key Features</h3>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="text-gray-300 flex items-start gap-2">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold text-white mb-4">Challenges & Solutions</h3>
              <p className="text-gray-300 leading-relaxed">
                {project.challenges}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
