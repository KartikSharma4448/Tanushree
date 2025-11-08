import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  BookOpen,
  FileText,
  GraduationCap,
  Lightbulb,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Achievements() {
  const [activeTab, setActiveTab] = useState("all");

  const publications = [
    {
      title: "Abstractive Text Summarization Using GAN",
      journal: "International Journal of Innovative Science and Research Technology",
      date: "August 2024",
      issn: "2456-2165",
      type: "Journal",
    },
    {
      title:
        "Fire Monitoring and Prevention System Based on the Severity of Fire Using NodeMCU and Cloud",
      journal:
        "International Conference on Intelligent and Innovative Technologies in Computing, Electrical and Electronics",
      date: "March 2024",
      publisher: "IEEE",
      type: "Conference",
    },
    {
      title: "Improving Quality of Medical Scans using GANs",
      journal: "International Journal of Innovative Science and Research Technology",
      date: "December 2024",
      issn: "2456-2165",
      type: "Journal",
    },
    {
      title:
        "A Bibliometric Analysis of Heart Disease Detection using Artificial Intelligence Techniques",
      journal: "International Journal of Innovative Science and Research Technology",
      date: "November 2023",
      issn: "2456-2165",
      type: "Journal",
    },
    {
      title:
        "Design and implementation of industrial fire detection and control system using internet of things",
      journal: "Artificial Intelligence, Blockchain, Computing and Security Volume 1",
      date: "December 2023",
      publisher: "CRC Press",
      type: "Book Chapter",
    },
  ];

  const patents = [
    {
      title: "Fire detection and controlling system using internet of things",
      status: "Filed",
    },
    {
      title:
        "Sensor Integration and fusion strategies for reliable drone obstacle detection",
      status: "Filed",
    },
  ];

  const book = {
    title: "Programming With Arduino and NodeMCU",
    year: "2023",
  };

  const certifications = [
    "Google Digital Marketing Certificate",
    "Free Code Camp Responsive Web Design Certificate",
    "Free Code Camp Information Security and Quality Assurance",
    "Free Code Camp Front End Library",
    "Free Code Camp Data Visualization",
    "Free Code Camp APIs And Microservices",
    "Free Code Camp JavaScript Algorithms and Data Structures Certificate",
    "Free Code Camp Full Stack",
    "Microsoft Azure Data Fundamental-900",
  ];

  const fdps = [
    "Recent Trends in Artificial Intelligence and Machine Learning for Smart Computing",
    "Gen AI and Prompt Engineering using Microsoft Co-pilot",
    "Machine Learning and Artificial Intelligence",
    "AI and Gen AI with Industry Application",
    "Generative AI Models and Applications of Machine Learning",
    "Deep Learning for Vision and Language",
    "IoT Applications with Sensors, Embedded Systems and Data Analytics",
    "STTP on Innovative AI Tools in Research (Top 10 Quiz Winner)",
    "Transformative Education: Integration AI Tools with Outcome-based Learning",
  ];

  const tabs = [
    { id: "all", label: "All" },
    { id: "publications", label: "Publications" },
    { id: "patents", label: "Patents" },
    { id: "certifications", label: "Certifications" },
    { id: "fdps", label: "FDPs" },
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Achievements</h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Research publications, patents, certifications, and professional
            development
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? "default" : "outline"}
              onClick={() => setActiveTab(tab.id)}
              data-testid={`button-tab-${tab.id}`}
            >
              {tab.label}
            </Button>
          ))}
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-12">
          {(activeTab === "all" || activeTab === "publications") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Publications</h2>
              </div>
              {publications.map((pub, index) => (
                <Card key={index} className="p-6">
                  <Badge className="mb-3">{pub.type}</Badge>
                  <h3 className="font-semibold text-lg mb-2">{pub.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {pub.journal}
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>{pub.date}</span>
                    {pub.issn && <span>ISSN: {pub.issn}</span>}
                    {pub.publisher && <span>{pub.publisher}</span>}
                  </div>
                </Card>
              ))}
            </motion.div>
          )}

          {(activeTab === "all" || activeTab === "patents") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Lightbulb className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Patents</h2>
              </div>
              {patents.map((patent, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="font-semibold text-lg">{patent.title}</h3>
                    <Badge variant="outline">{patent.status}</Badge>
                  </div>
                </Card>
              ))}

              <Card className="p-6 bg-primary/5">
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Book Published</h3>
                    <p className="text-lg">{book.title}</p>
                    <p className="text-sm text-muted-foreground">{book.year}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {(activeTab === "all" || activeTab === "certifications") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <Award className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">Certifications</h2>
              </div>
              <Card className="p-6">
                <div className="grid gap-3">
                  {certifications.map((cert, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-md hover-elevate"
                    >
                      <Award className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{cert}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}

          {(activeTab === "all" || activeTab === "fdps") && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="h-6 w-6 text-primary" />
                <h2 className="text-2xl font-bold">
                  FDPs & Workshops Attended
                </h2>
              </div>
              <Card className="p-6">
                <div className="grid gap-3">
                  {fdps.map((fdp, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3 p-3 rounded-md hover-elevate"
                    >
                      <GraduationCap className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm">{fdp}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
