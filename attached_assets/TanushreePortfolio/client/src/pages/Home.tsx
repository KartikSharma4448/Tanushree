import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { ProjectCard } from "@/components/ProjectCard";
import iotImage from "@assets/generated_images/IoT_fire_detection_project_273c6fe0.png";
import aiImage from "@assets/generated_images/AI_machine_learning_visualization_59fbc1ef.png";
import webImage from "@assets/generated_images/Web_development_project_illustration_4563f3c6.png";

export default function Home() {
  const featuredProjects = [
    {
      title: "Fire Detection & Control System",
      category: "IoT",
      description:
        "Industrial fire detection and control system using NodeMCU and cloud integration",
      tags: ["IoT", "NodeMCU", "Cloud", "Sensors"],
      image: iotImage,
    },
    {
      title: "Medical Image Enhancement",
      category: "AI/ML",
      description:
        "Improving quality of medical scans using Generative Adversarial Networks",
      tags: ["GANs", "Medical Imaging", "Deep Learning"],
      image: aiImage,
    },
    {
      title: "Full Stack Web Applications",
      category: "Web Development",
      description: "Modern responsive web applications with complete functionality",
      tags: ["React", "Node.js", "Flutter", "Full Stack"],
      image: webImage,
    },
  ];

  return (
    <div>
      <Hero />
      <About />

      <section className="py-20 md:py-32 bg-card/30">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured Projects
            </h2>
            <p className="text-muted-foreground text-lg">
              A selection of my recent work in AI, IoT, and web development
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={index} {...project} index={index} />
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/projects">
              <Button size="lg" data-testid="button-view-all-projects">
                View All Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
