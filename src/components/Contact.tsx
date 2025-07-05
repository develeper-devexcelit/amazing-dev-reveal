
import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Contact = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Let's Work Together
          </h2>
          <p className="text-xl text-gray-900 max-w-2xl mx-auto">
            I'm always open to discussing new opportunities and interesting projects
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <Card className="bg-white border border-gray-200 hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <Mail className="w-12 h-12 text-black mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Email</h3>
              <p className="text-gray-900">malikirtaza96@gmail.com</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-gray-200 hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <Phone className="w-12 h-12 text-black mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Phone</h3>
              <p className="text-gray-900">+923035737327</p>
            </CardContent>
          </Card>
          
          <Card className="bg-white border border-gray-200 hover:bg-gray-100 transition-all duration-300 hover:scale-105">
            <CardContent className="p-8 text-center">
              <MapPin className="w-12 h-12 text-black mx-auto mb-4" />
              <h3 className="text-xl font-bold text-black mb-2">Location</h3>
              <p className="text-gray-900">Lahore, Pakistan</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            variant="default"
            className="px-12 py-6 text-lg font-semibold hover:scale-105 transition-all duration-300"
          >
            <Mail className="w-5 h-5 mr-2" />
            Get In Touch
          </Button>
        </div>
        
        {/* Footer */}
        <div className="text-center mt-20 pt-8 border-t border-white/10">
          <p className="text-gray-400">
          © 2025 Irtaza. Built with React, Vite, TypeScript, Tailwind CSS, shadcn/ui, OpenRouter API, React Router, Supabase, and more.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
