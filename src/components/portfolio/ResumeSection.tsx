import React from 'react';
import { motion } from 'framer-motion';
import { Download, Eye, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function ResumeSection() {
  const handleDownload = () => {
    window.open('/swara-pawar-resume.pdf', '_blank');
    const a = document.createElement('a');
    a.href = '/swara-pawar-resume.pdf';
    a.download = 'Swara_Pawar_Resume.pdf';
    a.click();
  };

  const handleView = () => {
    window.open('/swara-pawar-resume.pdf', '_blank');
  };

  return (
    <section id="resume" className="py-24 relative bg-muted/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            My <span className="text-primary"> Resume </span>
          </h2>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="border-none shadow-2xl overflow-hidden mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-rose-500/10 z-0 pointer-events-none" />
            <CardContent className="p-8 sm:p-12 relative z-10 flex flex-col sm:flex-row items-center justify-between gap-8 backdrop-blur-sm bg-card/60">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-lg shadow-primary/20">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-display text-foreground mb-2">Swara Pawar - Resume</h3>
                  <p className="text-muted-foreground">Software Developer & Designer</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                <Button onClick={handleView} variant="outline" className="border-primary/30 hover:bg-primary/10">
                  <Eye className="w-4 h-4 mr-2" /> View PDF
                </Button>
                <Button onClick={handleDownload} className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/20">
                  <Download className="w-4 h-4 mr-2" /> Download Resume
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="rounded-xl overflow-hidden border border-border/50 bg-card shadow-xl ring-1 ring-white/5">
            <div className="bg-muted p-3 border-b border-border/50 flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-4 text-xs font-mono text-muted-foreground">swara-pawar-resume.pdf</span>
            </div>
            <iframe 
              src="/swara-pawar-resume.pdf" 
              width="100%" 
              height="600px" 
              className="w-full bg-white"
              title="Resume PDF preview"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
