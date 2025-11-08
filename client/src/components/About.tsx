import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { GraduationCap, Briefcase, BookOpen } from "lucide-react";
import profileImage from "@assets/generated_images/Professional_educator_headshot_portrait_6b71f530.png";

export function About() {
  return (
    <section className="py-20 md:py-32" id="about">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            About Me
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <img
              src={profileImage}
              alt="Tanushree Bharti"
              className="rounded-lg w-full max-w-md mx-auto"
              data-testid="img-profile"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <p className="text-lg text-muted-foreground">
              With 1.5 years of experience in teaching undergraduate students, I
              am a Junior Research Fellow at Poornima University, Jaipur. I seek
              to enhance student engagement and contribute to academic planning
              through research, training, and interdisciplinary exposure.
            </p>

            <div className="space-y-4">
              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <GraduationCap className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Education</h3>
                    <p className="text-sm text-muted-foreground">
                      MCA in AI & Data Science - Poornima University (70.30% CGPA)
                    </p>
                    <p className="text-sm text-muted-foreground">
                      BCA - Jawaharlal Nehru University (68.29%)
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <Briefcase className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Current Role</h3>
                    <p className="text-sm text-muted-foreground">
                      Junior Research Fellow at Poornima University
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Teaching: Python, DBMS, Software Engineering, Web Tech, AI
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start gap-4">
                  <BookOpen className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-2">Research Focus</h3>
                    <p className="text-sm text-muted-foreground">
                      AI/ML, GANs, IoT Systems, Fire Detection, Medical Imaging
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
