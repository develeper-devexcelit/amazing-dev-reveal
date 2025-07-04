import { ArrowLeft, Github, ExternalLink, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  tech: string[];
  github: string;
  live: string;
  date: string;
  role: string;
  features: string[];
  challenges: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 border-white/10">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold text-white">
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col lg:flex-row gap-8 items-start mt-6">
          <div className="lg:w-1/2">
            <p className="text-xl text-gray-300 mb-6">
              {project.longDescription}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech) => (
                <Badge 
                  key={tech} 
                  variant="secondary" 
                  className="bg-blue-500/20 text-blue-300 border-blue-500/30 hover:bg-blue-500/30 hover:text-blue-200 hover:border-blue-400/40 transition-all duration-200"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="flex gap-4 mb-6">
              <Button 
                variant="outline" 
                className="bg-transparent border-white/30 text-white hover:bg-white hover:text-gray-900"
                onClick={() => window.open(project.github, '_blank')}
              >
                <Github className="w-4 h-4 mr-2" />
                View Code
              </Button>
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                onClick={() => window.open(project.live, '_blank')}
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Live Demo
              </Button>
            </div>

            <div className="flex items-center gap-6 text-gray-300 mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{project.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{project.role}</span>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Key Features</h3>
                <ul className="list-disc list-inside text-gray-300 space-y-2">
                  {project.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-white mb-3">Challenges & Solutions</h3>
                <p className="text-gray-300">{project.challenges}</p>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-4">
            {project.gallery.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`${project.title} screenshot ${index + 1}`}
                className="w-full rounded-lg shadow-lg"
              />
            ))}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 