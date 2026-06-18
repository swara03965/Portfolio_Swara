import * as React from 'react';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    role: "Head Graphic Designer & Programming Team Member",
    company: "Innovation & Robotics Lab",
    period: "2026–Present",
    points: [
      "Led design initiatives — high-impact posters, social creatives & branding assets",
      "Built and maintained web-based platforms for lab activities",
      "Drove UI/UX improvements, boosting engagement across internal tools",
      "Coordinated cross-functional teams under tight deadlines"
    ]
  },
  {
    role: "Web Development Intern",
    company: "ShadowFox",
    period: "2026",
    points: [
      "Developed responsive interfaces with modern frontend technologies",
      "Improved performance & usability through optimized design practices",
      "Gained hands-on experience in real-world dev workflows and debugging"
    ]
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Professional <span className="text-primary">Experience</span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="relative border-l-2 border-primary/20 ml-3 md:ml-0 md:pl-0 space-y-12">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
              className="relative pl-8 md:pl-0"
            >
              {/* Timeline marker */}
              <div className="absolute left-[-5px] md:left-1/2 top-1 w-3 h-3 rounded-full bg-primary ring-4 ring-background transform md:-translate-x-1/2" />
              
              <div className="md:grid md:grid-cols-2 md:gap-8 items-start relative">
                <div className={`md:text-right ${i % 2 === 0 ? 'md:col-start-1' : 'md:col-start-2 md:text-left'} mb-2 md:mb-0`}>
                  <div className="inline-flex items-center text-primary mb-2 font-mono text-sm">
                    <Briefcase className="w-4 h-4 mr-2" />
                    {exp.period}
                  </div>
                  <h3 className="text-xl font-bold font-display text-foreground">{exp.role}</h3>
                  <div className="text-lg font-medium text-muted-foreground">{exp.company}</div>
                </div>
                
                <div className={`bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 ${i % 2 === 0 ? 'md:col-start-2' : 'md:col-start-1 md:row-start-1'} shadow-lg hover:border-primary/30 transition-colors`}>
                  <ul className="space-y-3 text-muted-foreground">
                    {exp.points.map((point, j) => (
                      <li key={j} className="flex items-start">
                        <span className="mr-3 text-primary mt-1.5 leading-none">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
          {/* Vertical line for desktop centered layout */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-px bg-primary/20 transform -translate-x-1/2 -z-10" />
        </div>
      </div>
    </section>
  );
}
