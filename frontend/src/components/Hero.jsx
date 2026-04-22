import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code, Database, Layout } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen pt-32 pb-20 flex items-center relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-indigo-600/20 rounded-full blur-[120px] -z-10 animate-pulse"></div>

      <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block px-4 py-1.5 bg-primary-500/10 border border-primary-500/20 rounded-full text-primary-400 text-sm font-semibold mb-6">
            Available for New Projects
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            I'm <span className="text-gradient">Anuj Maurya</span> <br />
            Full-Stack <br />
            Developer.
          </h1>
          <p className="text-xl text-slate-400 mb-10 max-w-lg leading-relaxed">
            I'm a Full-Stack Developer specializing in building exceptional digital products, 
            from sleek frontends to scalable backends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a href="#projects" className="px-8 py-4 bg-primary-500 hover:bg-primary-600 rounded-xl font-bold transition-all flex items-center justify-center gap-2 group">
              View My Work
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#contact" className="px-8 py-4 glass hover:bg-white/10 rounded-xl font-bold transition-all flex items-center justify-center">
              Let's Talk
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative z-10 grid grid-cols-2 gap-4">
            <div className="space-y-4 pt-12">
              <div className="glass p-6 rounded-2xl">
                <Layout className="text-primary-400 mb-4" size={32} />
                <h3 className="font-bold mb-1">Frontend</h3>
                <p className="text-sm text-slate-400">React, Tailwind, Framer</p>
              </div>
              <div className="glass p-6 rounded-2xl">
                <Database className="text-indigo-400 mb-4" size={32} />
                <h3 className="font-bold mb-1">Backend</h3>
                <p className="text-sm text-slate-400">Node, Express, Mongo</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="glass p-6 rounded-2xl bg-white/5">
                <Code className="text-blue-400 mb-4" size={32} />
                <h3 className="font-bold mb-1">Performance</h3>
                <p className="text-sm text-slate-400">Optimization & Scale</p>
              </div>
              <div className="bg-gradient-to-br from-primary-500 to-indigo-600 p-6 rounded-2xl shadow-xl shadow-primary-500/20">
                <h3 className="text-4xl font-bold mb-1 text-white">10+</h3>
                <p className="text-sm text-white/80">Completed Projects</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
