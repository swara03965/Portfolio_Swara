import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Layers } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

const projects = [
  {
    title: "Smart Campus Connect",
    year: "2025",
    desc: "Full-stack college event platform with role-based dashboards for students, club heads & admins. JWT auth, real-time notifications, and analytics built in.",
    tech: ["Next.js", "TypeScript", "Spring Boot", "PostgreSQL"],
    color: "from-blue-500/10 via-background to-background",
    github: "https://github.com/swara03965/Campus_connect",
    live: "https://campus-frontend-six.vercel.app/"
  },
  {
    title: "ATM Simulator",
    year: "2026",
    desc: "Banking simulation with secure login, deposit, withdrawal, fast cash & PIN change. Layered architecture with JDBC for real-time data handling.",
    tech: ["Java", "MySQL", "Swing", "JDBC"],
    color: "from-purple-500/10 via-background to-background",
    github: "https://github.com/Krishna4375/Atm_simulator"
  },
  {
    title: "Mumbai Indians Official Fan Hub",
    year: "2026",
    desc: "A static single-page fan portal for the Mumbai Indians IPL team. Designed as a modern, responsive UI with rich interactions and content sections for schedule, roster, stats, news, videos, gallery, and fan engagement.",
    tech: ["HTML", "CSS", "JavaScript"],
    color: "from-emerald-500/10 via-background to-background",
    github: "https://github.com/swara03965/Mumbai_indians",
    live: "https://mumbaiindian.netlify.app/"
  },
  {
    title: "FlashCard Quiz App",
    year: "2026",
    desc: "A dynamic flashcard quiz application that allows users to create, edit, and test themselves on custom flashcards. Features include spaced repetition scheduling, progress tracking, and a sleek, intuitive interface.",
    tech: ["HTML", "CSS", "JavaScript"],
    color: "from-emerald-500/10 via-background to-background",
    github: "https://github.com/swara03965/flashcard-quiz-",
    live: "https://flashcard-quiz-mu.vercel.app/"
  }
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 relative bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Projects <span className="text-primary"></span>
            </h2>
            <Layers className="w-8 h-8 text-primary" />
          </div>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className={`h-full flex flex-col bg-gradient-to-br ${project.color} border-border/50 hover:border-primary/50 transition-all duration-300 group`}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="secondary" className="font-mono">{project.year}</Badge>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary"
                        onClick={() => window.open(project.github, "_blank")}
                      >
                        <Github className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 rounded-full text-muted-foreground hover:text-primary"
                        onClick={() => project.live && window.open(project.live, "_blank")}
                        disabled={!project.live}
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <CardTitle className="text-xl font-display group-hover:text-primary transition-colors">
                    {project.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.desc}
                  </p>
                </CardContent>

                <CardFooter className="pt-4 border-t border-border/50 flex flex-wrap gap-2">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-mono text-primary/80 bg-primary/10 px-2 py-1 rounded-md">
                      {t}
                    </span>
                  ))}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}