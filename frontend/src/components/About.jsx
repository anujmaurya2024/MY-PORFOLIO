import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <section id="about" className="py-20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full"></div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="aspect-square rounded-2xl overflow-hidden glass p-2">
                <img
                  src="/UDAY.jpeg"
                  alt="Anuj"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-primary-400">Who am I?</h3>
              <p className="text-slate-400 text-lg">
                I'm a passionate Full-Stack Developer based in Srinagar, Uttarakhand.
                With a deep love for building efficient, scalable, and user-centric web applications,
                I bridge the gap between creative design and robust engineering.
              </p>
              <p className="text-slate-400 text-lg">
                My journey in tech is driven by curiosity and a commitment to continuous learning.
                Whether it's optimizing a database query or crafting a pixel-perfect UI,
                I strive for excellence in every line of code I write.
              </p>
              <div className="flex gap-4">
                <div className="px-4 py-2 glass rounded-lg text-sm">Design Thinker</div>
                <div className="px-4 py-2 glass rounded-lg text-sm">Problem Solver</div>
                <div className="px-4 py-2 glass rounded-lg text-sm">Clean Coder</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
