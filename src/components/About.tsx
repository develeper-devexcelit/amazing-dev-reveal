
import { Code, Lightbulb, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

const About = () => {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-black mb-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            About Me
          </motion.h2>
          <motion.p
            className="text-xl text-gray-900 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.15, ease: "easeOut" }}
          >
            From as long as I can remember, my deep curiosity and passion for learning have driven me to explore technology with relentless
            enthusiasm. I constantly seek out cutting-edge tools and innovative techniques to streamline my work, and I have expertise in Supabase, Stripe, and Next.js, which helps me tackle every task with precision and a commitment to excellence. Eager to embrace new challenges, I
            continuously master emerging technologies and pioneer fresh solutions, always pushing beyond expectations to not just adapt to
            change, but to drive it.
          </motion.p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[{
            icon: <Code className="w-12 h-12 text-black mx-auto mb-4" />,
            title: "Clean Code",
            desc: "Writing maintainable, scalable code following best practices and modern standards."
          }, {
            icon: <Lightbulb className="w-12 h-12 text-black mx-auto mb-4" />,
            title: "Innovation",
            desc: "Always exploring new technologies and creative solutions to complex problems."
          }, {
            icon: <Zap className="w-12 h-12 text-black mx-auto mb-4" />,
            title: "Performance",
            desc: "Optimizing applications for speed, accessibility, and exceptional user experience."
          }].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.2 + idx * 0.12, ease: "easeOut" }}
            >
              <Card className="bg-white border border-gray-200 hover:bg-gray-100 transition-all duration-300 hover:scale-105">
                <CardContent className="p-8 text-center">
                  {item.icon}
                  <h3 className="text-2xl font-bold text-black mb-4">{item.title}</h3>
                  <p className="text-gray-900">{item.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
      {/* Animated Work Experience Section */}
      <div className="container mx-auto mt-20">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-black mb-10 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Work Experience
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Job 1 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
          >
            <Card className="bg-white border border-gray-200 shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 h-full flex flex-col justify-between">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-black">Machine Learning Engineer/Intern</span>
                  <span className="text-sm text-gray-500">06/2024 - 08/2024</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-800">Machine Learning 1 Limited</span>
                  <span className="text-sm text-gray-500 ml-2">Lahore, Pakistan</span>
                </div>
                <ul className="list-disc pl-5 text-gray-700 space-y-1 mt-2 text-sm">
                  <li>Acquired foundational knowledge and practical exposure to Large Language Models (LLMs) and modern AI frameworks, including integration via APIs.</li>
                  <li>Prepared and cleaned data for AI/LLM applications, applying analytical problem-solving.</li>
                  <li>Developed chatbot prototypes using LangChain, gaining practical experience with LLMs and embeddings.</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
          {/* Job 2 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            <Card className="bg-white border border-gray-200 shadow-lg hover:bg-gray-50 transition-all duration-300 hover:scale-105 h-full flex flex-col justify-between">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-lg font-semibold text-black">Full Stack Developer & Data Scientist</span>
                  <span className="text-sm text-gray-500">06/2024 - Present</span>
                </div>
                <div className="mb-2">
                  <span className="font-medium text-gray-800">Devexcel IT</span>
                  <span className="text-sm text-gray-500 ml-2">Lahore, Pakistan</span>
                </div>
                <ul className="list-disc pl-5 text-gray-700 space-y-1 mt-2 text-sm">
                  <li>Architected and delivered complex projects end-to-end, including an e-learning platform and a card trading application.</li>
                  <li>Integrated OpenAI Assistant API for AI features; fine-tuned models to enhance chatbot performance and contextual accuracy.</li>
                  <li>Developed full-stack applications using Next.js, Supabase, PostgreSQL, and MongoDB for front-end UI and backend data management.</li>
                  <li>Automated development workflows using n8n and API integrations (including OpenAI), significantly improving process efficiency.</li>
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
