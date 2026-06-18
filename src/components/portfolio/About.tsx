import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Palette, Code, Users } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export default function About() {
  const cards = [
    {
      title: "Education",
      desc: "B.E. IT · 2024–2028 · GPA 8.75",
      icon: GraduationCap,
      color: "from-blue-500/20 to-blue-500/5",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Design Leadership",
      desc: "Head Graphic Designer (Innovation & Robotics Lab)",
      icon: Palette,
      color: "from-purple-500/20 to-purple-500/5",
      borderColor: "border-purple-500/20"
    },
    {
      title: "Web Development",
      desc: "Web Dev Intern (ShadowFox)",
      icon: Code,
      color: "from-emerald-500/20 to-emerald-500/5",
      borderColor: "border-emerald-500/20"
    },
    {
      title: "Community",
      desc: "Class Rep + NSS Volunteer",
      icon: Users,
      color: "from-rose-500/20 to-rose-500/5",
      borderColor: "border-rose-500/20"
    }
  ];

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            About <span className="text-primary">Me</span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              I'm a third-year B.E. student at Bharati Vidyapeeth College of Engineering, Navi Mumbai, with a CGPA of 8.75+. Passionate about software development and problem-solving, I am currently strengthening my skills in Data Structures & Algorithms and core computer science concepts.
            </p>
            <p>
              Alongside academics, I serve as the Graphic Design Head of the Innovation & Robotics Club, where I contribute to creative and technical initiatives.
            </p>
            <p>
              I continuously work on enhancing my skills in Mern Stack, Java, Web Development, Git/GitHub, and Linux while pursuing my goal of becoming a Software Engineer.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 gap-4">
            {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className={`h-full bg-gradient-to-br ${card.color} ${card.borderColor} border backdrop-blur-sm hover:scale-[1.02] transition-transform duration-300`}>
                  <CardContent className="p-6 flex flex-col items-start gap-4">
                    <div className="p-3 rounded-xl bg-background/50 border border-border/50">
                      <card.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold font-display text-foreground mb-1">{card.title}</h3>
                      <p className="text-sm text-muted-foreground">{card.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
