import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, Phone } from 'lucide-react';

export default function Contact() {
  const contacts = [
    {
      icon: Mail,
      label: "Email",
      value: "pswara458@gmail.com",
      href: "mailto:pswara458@gmail.com"
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "linkedin.com/in/swara-pawar",
      href: "https://linkedin.com/in/swara-pawar"
    },
    {
      icon: Github,
      label: "GitHub",
      value: "github.com/swara03965",
      href: "https://github.com/swara03965"
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91-9321144673",
      href: "tel:+919321144673"
    }
  ];

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px] pointer-events-none -z-10" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-display font-bold mb-6">
            Let's <span className="text-primary">Connect</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {contacts.map((contact, i) => (
            <motion.div
              key={contact.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <a
                href={contact.href}
                target={contact.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-card border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
              >
                <div className="p-3 rounded-full bg-muted group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <contact.icon className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-muted-foreground mb-1">{contact.label}</p>
                  <p className="text-foreground font-medium group-hover:text-primary transition-colors">{contact.value}</p>
                </div>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-24 pt-8 border-t border-border/30 text-muted-foreground text-sm flex flex-col sm:flex-row items-center justify-between"
        >
          <p>© {new Date().getFullYear()} Swara Pawar. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 flex items-center gap-2">
             <span className="text-primary font-bold">Swara Pawar</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
