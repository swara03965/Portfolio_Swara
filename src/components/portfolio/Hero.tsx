import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ParticleCanvas from './ParticleCanvas';
import FloatingTechBadges from './FloatingTechBadges';
import { Button } from '@/components/ui/button';
import { ArrowRight, Code2, Trophy, BookOpen, Star } from 'lucide-react';

const roles = ["Full-Stack Apps", "Beautiful UIs", "Smart Systems", "Real-World Products"];

export default function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden bg-background">

      {/* 2D Particle Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <ParticleCanvas />
      </div>

      {/* Grid Lines Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none hero-grid-overlay" />

      {/* Radial glow blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_55%_45%_at_30%_50%,rgba(124,58,237,0.07),transparent)]" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(ellipse_40%_35%_at_75%_35%,rgba(236,72,153,0.06),transparent)]" />

      {/* Floating tech badges */}
      <FloatingTechBadges />

      {/* Vignette */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(7,11,22,0.88)_100%)]" />

      <div className="container relative z-20 mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">

        {/* Left: Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col space-y-8"
        >
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm font-medium text-primary backdrop-blur-sm"
              data-testid="badge-available"
            >
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2 animate-pulse" />
            
            </motion.div>

            <h1
              className="text-5xl sm:text-7xl font-bold tracking-tight text-foreground"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              data-testid="heading-name"
            >
              Swara Pawar
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-400 to-blue-400">
              </span>
            </h1>

            <div className="h-12 flex items-center text-xl sm:text-2xl font-medium text-muted-foreground">
              <span>Building&nbsp;</span>
              <motion.span
                key={currentRole}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="font-bold text-foreground"
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                data-testid="text-role"
              >
                {roles[currentRole]}
              </motion.span>
              <span className="ml-1 animate-pulse text-primary">_</span>
            </div>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed">
              An Aspiring Software Engineer focused on strengthening my coding skills, Data Structures & Algorithms, and computer science fundamentals.Currently preparing for opportunities at leading tech companies while developing technical, leadership, and extracurricular skills. Confident, disciplined, and passionate about solving real-world problems through technology.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 shadow-lg shadow-primary/30"
              asChild
              data-testid="button-view-work"
            >
              <a href="#projects">
                View Work <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="rounded-full px-8 border-primary/30 hover:bg-primary/10 hover:border-primary/60 backdrop-blur-sm"
              asChild
              data-testid="button-contact"
            >
              <a href="#contact">Get in Touch</a>
            </Button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-border/40">
            {[
              { label: 'Projects', value: '3+', icon: Code2 },
              { label: 'DSA Solved', value: '50+', icon: Trophy },
              { label: 'GPA', value: '8.75', icon: BookOpen },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
                className="flex flex-col space-y-1"
                data-testid={`stat-${stat.label.toLowerCase().replace(' ', '-')}`}
              >
                <div className="flex items-center text-primary mb-1">
                  <stat.icon className="h-4 w-4" />
                </div>
                <span className="text-2xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                  {stat.value}
                </span>
                <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Photo Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative mx-auto w-full max-w-sm hidden lg:block"
        >
          <div className="absolute -inset-3 bg-gradient-to-tr from-primary/40 via-purple-500/20 to-blue-500/30 rounded-3xl blur-3xl opacity-30 animate-pulse" />

          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-primary/25 bg-card shadow-2xl shadow-primary/15 p-2 hover:-translate-y-3 transition-transform duration-500 group">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-blue-500/5 z-10 pointer-events-none rounded-3xl" />

            <div className="w-full h-full rounded-2xl overflow-hidden relative bg-muted flex items-center justify-center">
              {!imageError ? (
                <img
                  src="/Swara.jpeg"
                  alt="Swara Pawar"
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105"
                  onError={() => setImageError(true)}
                  data-testid="img-profile"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-background via-card to-primary/15 gap-6 px-6">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary to-purple-400 rounded-full blur-2xl opacity-50 scale-125" />
                    <div className="relative w-36 h-36 rounded-full bg-gradient-to-br from-primary via-purple-500 to-blue-500 flex items-center justify-center shadow-2xl border-2 border-white/10">
                      <span className="text-5xl font-bold text-white" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                        SP
                      </span>
                    </div>
                  </div>
                  <div className="text-center space-y-1">
                    <p className="text-base font-semibold text-foreground" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                      Swara Pawar
                    </p>
                    <p className="text-xs text-primary font-medium tracking-wider uppercase">Full-Stack Developer</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {['React', 'Next.js', 'Spring Boot', 'Node.js'].map(tag => (
                      <span key={tag} className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground/60 text-center mt-2">
                    Add your photo as<br />/swara-pawar-photo.jpg
                  </p>
                </div>
              )}

              {/* Tech corner brackets */}
              <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-primary/70 z-20" />
              <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-primary/70 z-20" />
              <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-primary/70 z-20" />
              <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-primary/70 z-20" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
