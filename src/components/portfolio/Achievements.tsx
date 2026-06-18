import * as React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Code2, Award, Users, HeartHandshake, PenTool } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const achievements = [
  {
    title: "50+ DSA Problems",
    desc: "Solved on LeetCode",
    icon: Code2,
  },
  {
    title: "Microsoft Certified",
    desc: "Intro to Programming Using Python",
    icon: Award,
  },
  {
    title: "NSS Volunteer",
    desc: "Community service & social impact",
    icon: HeartHandshake,
  },
  {
    title: "Creative Team, ITSA",
    desc: "Posters, event & promo creatives",
    icon: PenTool,
  }
];

export default function Achievements() {
  return (
    <section id="achievements" className="py-24 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Achievements & <span className="text-primary">Impact</span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="h-full bg-card/40 border-border/50 hover:bg-card hover:border-primary/30 transition-all duration-300 group overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardContent className="p-6 flex items-start gap-4 relative z-10">
                  <div className="p-3 rounded-xl bg-background border border-border group-hover:border-primary/50 group-hover:text-primary transition-colors">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold font-display text-lg mb-1 group-hover:text-primary transition-colors">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
