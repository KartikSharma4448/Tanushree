import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, Linkedin } from "lucide-react";
import { Link } from "wouter";
import heroBackground from "@assets/generated_images/Tech_neural_network_hero_background_e9185c86.png";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBackground})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/80" />
      </div>

      <div className="relative container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Hi, I'm <span className="text-primary">Tanushree Bharti</span>
            </motion.h1>
          </motion.div>

          <motion.p
            className="text-xl md:text-2xl text-muted-foreground mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Full Stack Developer & Junior Research Fellow
          </motion.p>

          <motion.p
            className="text-lg md:text-xl text-muted-foreground mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            Specializing in AI, IoT, and Web Development
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link href="/projects">
              <Button size="lg" data-testid="button-view-projects">
                View Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <a href="mailto:ajmertanu@gmail.com">
              <Button variant="outline" size="lg" data-testid="button-contact">
                <Mail className="mr-2 h-5 w-5" />
                Contact Me
              </Button>
            </a>
            <a
              href="https://www.linkedin.com/in/tanushree-bharti-23b1b11a0/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" size="lg" data-testid="button-linkedin">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </Button>
            </a>
          </motion.div>

          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-primary" data-testid="text-experience">
                1.5+
              </div>
              <div className="text-muted-foreground">Years Teaching</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary" data-testid="text-publications">
                5+
              </div>
              <div className="text-muted-foreground">Publications</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary" data-testid="text-projects">
                25+
              </div>
              <div className="text-muted-foreground">Projects Guided</div>
            </div>
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground rounded-full flex items-start justify-center p-2">
          <motion.div
            className="w-1.5 h-1.5 bg-muted-foreground rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          />
        </div>
      </motion.div>
    </section>
  );
}
