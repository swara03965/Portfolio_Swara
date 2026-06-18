import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

const skillCategories = {
  Frontend: ['HTML5', 'JavaScript', 'React.js', 'Next.js', 'Tailwind CSS', 'Bootstrap', 'TypeScript'],
  Backend: ['Node.js', 'Express.js', 'Spring Boot', 'REST APIs', 'Java'],
  Database: ['MongoDB', 'MySQL'],
  Tools: ['Git', 'Docker', 'GitHub', 'OpenAI API', 'UI/UX Design'],
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('All');

  const categories = ['All', ...Object.keys(skillCategories)];
  
  const getSkillsToDisplay = () => {
    if (activeTab === 'All') {
      return Object.entries(skillCategories).flatMap(([category, skills]) => 
        skills.map(skill => ({ name: skill, category }))
      );
    }
    return skillCategories[activeTab as keyof typeof skillCategories].map(skill => ({
      name: skill, category: activeTab
    }));
  };

  const displayedSkills = getSkillsToDisplay();

  return (
    <section id="skills" className="py-24 relative bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Technical <span className="text-primary">Skills</span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto" />
        </motion.div>

        <div className="flex flex-col items-center gap-8">
          <Tabs defaultValue="All" className="w-full max-w-3xl mx-auto" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center w-full h-auto p-1 bg-card/50 backdrop-blur-sm border border-border/50">
              {categories.map((cat) => (
                <TabsTrigger 
                  key={cat} 
                  value={cat}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all sm:flex-1"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>

          <motion.div 
            layout
            className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl"
          >
            <AnimatePresence mode="popLayout">
              {displayedSkills.map((skill, i) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3, delay: i * 0.02 }}
                  key={skill.name}
                  className="px-4 py-2 rounded-full border border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 text-foreground font-medium transition-colors cursor-default"
                >
                  {skill.name}
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
