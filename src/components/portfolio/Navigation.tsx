import React, { useState, useEffect } from 'react';
import { Menu, X, Download, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Achievements', href: '#achievements' },
  { name: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDownloadResume = () => {
    window.open('/swara-pawar-resume.pdf', '_blank');
    const a = document.createElement('a');
    a.href = '/swara-pawar-resume.pdf';
    a.download = 'Swara_Pawar_Resume.pdf';
    a.click();
  };

  const handleViewResume = () => {
    window.open('/swara-pawar-resume.pdf', '_blank');
  };

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <a href="#" className="font-display font-bold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
              SP
            </a>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="border-primary/50 text-primary hover:bg-primary/10">
                    Resume
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-card border-border">
                  <DropdownMenuItem onClick={handleViewResume} className="cursor-pointer focus:bg-primary/20">
                    <Eye className="mr-2 h-4 w-4" />
                    <span>View Resume</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleDownloadResume} className="cursor-pointer focus:bg-primary/20">
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download PDF</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-foreground hover:text-primary transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-lg border-b border-border absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-foreground/80 hover:text-primary block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="px-3 py-2 flex gap-2">
              <Button onClick={handleViewResume} variant="secondary" className="flex-1">
                View Resume
              </Button>
              <Button onClick={handleDownloadResume} className="flex-1 bg-primary text-primary-foreground">
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
