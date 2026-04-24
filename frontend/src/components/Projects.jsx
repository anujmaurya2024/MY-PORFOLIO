import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, ArrowRight } from 'lucide-react';

const techColors = {
  'React': '#61DAFB', 'Next.js': '#ffffff', 'Node.js': '#68A063',
  'Express': '#68A063', 'MongoDB': '#47A248', 'PostgreSQL': '#4169E1',
  'Tailwind CSS': '#38BDF8', 'TypeScript': '#3178C6', 'Python': '#3776AB',
  'FastAPI': '#009688', 'Firebase': '#FFCA28', 'AWS': '#FF9900',
  'Docker': '#2496ED', 'Vercel': '#ffffff', 'Redux': '#764ABC',
  'GraphQL': '#E10098', 'Socket.io': '#010101', 'Stripe': '#635BFF',
  'Java': '#ED8B00', 'Spring Boot': '#6DB33F', 'JavaScript': '#F7DF1E',
  'HTML5': '#E34F26', 'CSS3': '#1572B6', 'CSS': '#1572B6',
};

const projects = [

  {
    title: 'HNBGU TPIC Platform',
    description: 'Designed and developed the frontend website for the Technology and Product Incubation Center (TPIC) at Hemvati Nandan Bahuguna Garhwal University.',
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    github: '#',
    live: 'https://www.tpic.co.in/discover/thrust-areas',
    accent: 'rgba(173,110,84,0.12)',
    accentBorder: 'rgba(173,110,84,0.25)',
  },
  {
    title: 'PhytoCare',
    description: 'AI-powered plant disease detection application using TensorFlow/Keras. Achieves high accuracy on plant disease classification with a FastAPI backend and React frontend.',
    tech: ['Python', 'FastAPI', 'React', 'TensorFlow'],
    github: 'https://github.com/anujmaurya2024/Phytocare-0.0.1',
    live: '#',
    accent: 'rgba(238,197,160,0.12)',
    accentBorder: 'rgba(238,197,160,0.25)',
  },
  {
    title: 'F1 ZeroNet',
    description: 'A decentralized web platform focusing on peer-to-peer data sharing and robust networking concepts. Built as part of an exploration into decentralized architectures.',
    tech: ['Node.js', 'React', 'Socket.io', 'MongoDB'],
    github: 'https://github.com/anujmaurya2024/F1zeronet',
    live: '#',
    accent: 'rgba(238,197,160,0.12)',
    accentBorder: 'rgba(238,197,160,0.25)',
  },
  {
    title: 'InstantCure',
    description: 'AI-powered mobile application to predict the risk of critical health conditions including breast cancer, diabetes, and heart disease. Uses Logistic Regression and SVM for high-accuracy assessment.',
    tech: ['React Native', 'Python', 'Flask', 'Scikit-learn'],
    github: 'https://github.com/anujmaurya2024',
    live: '#',
    accent: 'rgba(238,197,160,0.12)',
    accentBorder: 'rgba(238,197,160,0.25)',
  },

  {
    title: 'POS Billing App',
    description: 'Lightweight Point of Sale application with QR code scanning, real-time cart management, automated totals, print-ready receipts, and session-based transaction history.',
    tech: ['React', 'Python', 'Express', 'PostgreSQL'],
    github: 'https://github.com/anujmaurya2024',
    live: '#',
    accent: 'rgba(173,110,84,0.1)',
    accentBorder: 'rgba(173,110,84,0.2)',
  },
  {
    title: 'MyPortfolio v1',
    description: 'The first iteration of my personal portfolio — a clean, responsive full-stack web app with Node.js/Express backend, MongoDB, and React frontend.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS'],
    github: 'https://github.com/anujmaurya2024',
    live: '#',
    accent: 'rgba(238,197,160,0.1)',
    accentBorder: 'rgba(238,197,160,0.2)',
  },
  {
    title: 'AlgoLogic',
    description: 'A platform or tool focused on algorithm visualization, learning, or solving logical programming challenges.',
    tech: ['React', 'JavaScript', 'CSS'],
    github: 'https://github.com/anujmaurya2024/algologic',
    live: '#',
    accent: 'rgba(173,110,84,0.12)',
    accentBorder: 'rgba(173,110,84,0.25)',
  },
  {
    title: 'Chess',
    description: 'A fully functional chess game implementation. Likely includes move validation, check/checkmate detection, and interactive gameplay.',
    tech: ['JavaScript', 'HTML5', 'CSS3'],
    github: 'https://github.com/anujmaurya2024/chess',
    live: '#',
    accent: 'rgba(238,197,160,0.12)',
    accentBorder: 'rgba(238,197,160,0.25)',
  },
  {
    title: 'JP Morgan Virtual Experience',
    description: 'Developed during the JPMorgan Chase Software Engineering Virtual Experience (Forage Midas). Focuses on Java and Spring Boot backend engineering tasks.',
    tech: ['Java', 'Spring Boot'],
    github: 'https://github.com/anujmaurya2024/forage-midas',
    live: '#',
    accent: 'rgba(173,110,84,0.12)',
    accentBorder: 'rgba(173,110,84,0.25)',
  },
];

const TiltProjectCard = ({ project, index, onExpand }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const ref = useRef(null);

  const onMove = (e) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 16;
    const y = ((e.clientY - top) / height - 0.5) * -16;
    setTilt({ x, y });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false); }}
      style={{ perspective: 1000 }}
    >
      <div
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${hovered ? 1.02 : 1})`,
          transformStyle: 'preserve-3d',
          background: 'rgba(6,11,20,0.7)',
          backdropFilter: 'blur(16px)',
          border: `1px solid ${hovered ? project.accentBorder : 'rgba(255,255,255,0.06)'}`,
          borderRadius: 20,
          padding: 28,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          transition: `${tilt.x === 0 ? 'transform 0.5s ease' : 'transform 0.1s ease'}, border-color 0.3s ease, box-shadow 0.3s ease`,
          boxShadow: hovered
            ? `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${project.accent}`
            : '0 4px 20px rgba(0,0,0,0.2)',
          cursor: 'pointer',
        }}
        onClick={() => onExpand(project)}
      >
        {/* Top accent line */}
        <div style={{
          height: 2,
          background: `linear-gradient(90deg, ${project.accentBorder}, transparent)`,
          borderRadius: 999,
          marginBottom: 4,
        }} />

        <h3 style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 700,
          fontSize: '1.15rem',
          color: hovered ? 'white' : 'rgba(255,255,255,0.85)',
          transition: 'color 0.2s',
          margin: 0,
        }}>
          {project.title}
        </h3>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.35)',
          lineHeight: 1.7,
          margin: 0,
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
        }}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              style={{
                padding: '4px 10px',
                borderRadius: 999,
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.68rem',
                color: techColors[t] || 'rgba(255,255,255,0.4)',
                fontWeight: 500,
              }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span style={{ padding: '4px 10px', fontSize: '0.68rem', color: 'rgba(255,255,255,0.25)', fontFamily: "'JetBrains Mono', monospace" }}>
              +{project.tech.length - 4} more
            </span>
          )}
        </div>

        {/* Expand hint */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          color: hovered ? '#a855f7' : 'rgba(255,255,255,0.2)',
          fontSize: '0.78rem',
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 500,
          transition: 'color 0.2s',
        }}>
          View Details
          <ArrowRight size={14} style={{ transform: hovered ? 'translateX(4px)' : 'none', transition: 'transform 0.2s' }} />
        </div>
      </div>
    </motion.div>
  );
};

// Expanded project modal
const ProjectModal = ({ project, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      position: 'fixed', inset: 0, zIndex: 5000,
      background: 'rgba(2,4,8,0.92)',
      backdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 24,
    }}
    onClick={onClose}
  >
    <motion.div
      initial={{ scale: 0.9, y: 30 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 30 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      style={{
        background: 'rgba(6,11,20,0.95)',
        border: `1px solid ${project.accentBorder}`,
        borderRadius: 24,
        padding: 40,
        maxWidth: 560,
        width: '100%',
        position: 'relative',
        boxShadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 60px ${project.accent}`,
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClose}
        style={{
          position: 'absolute', top: 20, right: 20,
          background: 'rgba(255,255,255,0.05)', border: 'none',
          color: 'rgba(255,255,255,0.5)', cursor: 'pointer',
          borderRadius: 8, padding: 8,
          display: 'flex', alignItems: 'center',
          transition: 'background 0.2s',
        }}
      >
        <X size={18} />
      </button>

      <div style={{ height: 2, background: `linear-gradient(90deg, ${project.accentBorder}, transparent)`, borderRadius: 999, marginBottom: 28 }} />

      <h3 style={{
        fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
        fontSize: '1.5rem', color: 'white', marginBottom: 16,
      }}>
        {project.title}
      </h3>

      <p style={{
        fontFamily: "'Inter', sans-serif", fontSize: '0.95rem',
        color: 'rgba(255,255,255,0.45)', lineHeight: 1.8, marginBottom: 28,
      }}>
        {project.description}
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 32 }}>
        {project.tech.map((t) => (
          <span
            key={t}
            style={{
              padding: '6px 14px', borderRadius: 999,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.75rem',
              color: techColors[t] || 'rgba(255,255,255,0.5)',
              fontWeight: 500,
            }}
          >
            {t}
          </span>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 12 }}>
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          className="btn-primary"
          style={{ flex: 1, justifyContent: 'center', textDecoration: 'none' }}
        >
          <Github size={16} /> View Code
        </a>
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost"
          style={{ flex: 1, justifyContent: 'center', textDecoration: 'none' }}
        >
          <ExternalLink size={16} /> Live Demo
        </a>
      </div>
    </motion.div>
  </motion.div>
);

const Projects = () => {
  const [expanded, setExpanded] = useState(null);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="projects" style={{ padding: '120px 24px', position: 'relative', zIndex: 1 }}>
      <div style={{
        position: 'absolute', bottom: '10%', left: '-5%',
        width: 350, height: 350,
        background: 'radial-gradient(circle, rgba(168,85,247,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div className="section-label" style={{ justifyContent: 'center', display: 'inline-flex' }}>
            Projects
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            letterSpacing: '-0.03em',
            marginTop: 16,
          }}>
            Things I've <span className="text-gradient">built</span>
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.95rem',
            color: 'rgba(255,255,255,0.3)',
            marginTop: 12,
          }}>
            Click any card to explore details
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: 20,
        }}>
          {projects.map((p, i) => (
            <TiltProjectCard
              key={p.title}
              project={p}
              index={i}
              onExpand={setExpanded}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {expanded && <ProjectModal project={expanded} onClose={() => setExpanded(null)} />}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
