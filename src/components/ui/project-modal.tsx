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
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white border-black/10">
        <DialogHeader>
          <DialogTitle className="text-4xl font-bold text-black">
            {project.title}
          </DialogTitle>
        </DialogHeader>

        <div className="mt-6">
          <p className="text-xl text-gray-800 mb-6">
            {project.longDescription}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tech.map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary" 
                className="bg-gray-200 text-black border-gray-300 hover:bg-gray-300 hover:text-black hover:border-gray-400 transition-all duration-200"
              >
                {tech}
              </Badge>
            ))}
          </div>

          <div className="flex gap-4 mb-6">
            <Button 
              variant="outline" 
              className="bg-transparent border-black/30 text-black hover:bg-black hover:text-white"
              onClick={() => window.open(project.github, '_blank')}
            >
              <Github className="w-4 h-4 mr-2" />
              View Code
            </Button>
          </div>

          <div className="flex items-center gap-6 text-gray-700 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{project.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{project.role}</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-black mb-3">Key Features</h3>
              <ul className="list-disc list-inside text-gray-800 space-y-2">
                {project.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-black mb-3">Challenges & Solutions</h3>
              <p className="text-gray-800">{project.challenges}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 