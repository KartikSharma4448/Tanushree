import { useState } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import iotImage from "@assets/generated_images/IoT_fire_detection_project_273c6fe0.png";
import aiImage from "@assets/generated_images/AI_machine_learning_visualization_59fbc1ef.png";
import webImage from "@assets/generated_images/Web_development_project_illustration_4563f3c6.png";

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const projects = [
    {
      title: "Fire Detection & Control System",
      category: "IoT",
      description:
        "Industrial fire detection and control system using NodeMCU and cloud integration",
      tags: ["IoT", "NodeMCU", "Cloud"],
      image: iotImage,
    },
    {
      title: "Smart Dustbin",
      category: "IoT",
      description: "Automated waste management system using IoT sensors",
      tags: ["IoT", "Sensors", "Automation"],
      image: iotImage,
    },
    {
      title: "Smart Parking System",
      category: "IoT",
      description: "Intelligent parking management with real-time availability",
      tags: ["IoT", "Sensors", "Real-time"],
      image: iotImage,
    },
    {
      title: "Weather Reporting System",
      category: "IoT",
      description: "IoT-based weather monitoring and reporting system",
      tags: ["IoT", "Weather", "Sensors"],
      image: iotImage,
    },
    {
      title: "Smart Lighting System",
      category: "IoT",
      description: "Automated lighting control using IoT technology",
      tags: ["IoT", "Automation", "Energy"],
      image: iotImage,
    },
    {
      title: "Medical Image Enhancement",
      category: "AI",
      description: "Improving quality of medical scans using GANs",
      tags: ["GANs", "Medical", "Deep Learning"],
      image: aiImage,
    },
    {
      title: "Abstractive Text Summarization",
      category: "AI",
      description: "Text summarization using Generative Adversarial Networks",
      tags: ["NLP", "GANs", "AI"],
      image: aiImage,
    },
    {
      title: "AI Chatbot",
      category: "AI",
      description: "Intelligent conversational AI chatbot",
      tags: ["NLP", "AI", "Chatbot"],
      image: aiImage,
    },
    {
      title: "Palm Reader",
      category: "AI",
      description: "AI-powered palm reading application",
      tags: ["Computer Vision", "AI"],
      image: aiImage,
    },
    {
      title: "All AI Platform",
      category: "AI",
      description: "Unified platform for video, text, and image AI processing",
      tags: ["AI", "Multi-modal", "Platform"],
      image: aiImage,
    },
    {
      title: "Shopping Website",
      category: "Web",
      description: "Full-featured e-commerce platform",
      tags: ["E-commerce", "Full Stack"],
      image: webImage,
    },
    {
      title: "Ice Cream Selling Website",
      category: "Web",
      description: "Online ordering platform for ice cream shop",
      tags: ["E-commerce", "Web"],
      image: webImage,
    },
    {
      title: "QR Food Booking",
      category: "Web",
      description: "QR code-based food ordering system for restaurants",
      tags: ["QR", "Web", "Restaurant"],
      image: webImage,
    },
    {
      title: "Music Streaming Platform",
      category: "Web",
      description: "Spotify-like music streaming website",
      tags: ["Streaming", "Web", "Audio"],
      image: webImage,
    },
    {
      title: "Portfolio Websites",
      category: "Web",
      description: "Professional portfolio websites for clients",
      tags: ["Portfolio", "Web Design"],
      image: webImage,
    },
    {
      title: "Ludo Game",
      category: "Game",
      description: "Digital implementation of classic Ludo board game",
      tags: ["Game", "JavaScript"],
      image: webImage,
    },
    {
      title: "Candy Crush Game",
      category: "Game",
      description: "Match-3 puzzle game inspired by Candy Crush",
      tags: ["Game", "Puzzle"],
      image: webImage,
    },
    {
      title: "Zombie Game",
      category: "Game",
      description: "Action survival zombie game",
      tags: ["Game", "Action"],
      image: webImage,
    },
  ];

  const categories = [
    "All",
    "IoT",
    "AI",
    "Web",
    "Game",
  ];

  const filteredProjects =
    filter === "All"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Projects</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            A comprehensive collection of 25+ projects in IoT, AI/ML, web
            development, and game design
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={filter === category ? "default" : "outline"}
              onClick={() => setFilter(category)}
              data-testid={`button-filter-${category.toLowerCase()}`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
