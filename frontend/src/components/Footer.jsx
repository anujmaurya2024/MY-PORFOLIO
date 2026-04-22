import React from 'react';
import { Github, Linkedin, Twitter, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="py-12 border-t border-slate-800">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <a href="#home" className="text-2xl font-bold text-gradient">ANUJ MAURYA</a>
            <p className="text-slate-400 mt-2">Crafting premium digital experiences.</p>
          </div>

          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <Github size={24} />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <Linkedin size={24} />
            </a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors">
              <Twitter size={24} />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} Anuj Maurya. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart size={14} className="text-red-500 fill-red-500" /> by Anjali
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
