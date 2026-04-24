import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles } from 'lucide-react';

// Letter-by-letter animation
const AnimatedText = ({ text, delay = 0, className = '', style = {} }) => {
  return (
    <span className={className} style={{ display: 'inline-block', ...style }}>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.04,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: 'inline-block', whiteSpace: char === ' ' ? 'pre' : 'normal' }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  );
};

// Typewriter hook
const useTypewriter = (texts, speed = 60, pause = 2000) => {
  const [display, setDisplay] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx((c) => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx((c) => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx((t) => (t + 1) % texts.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return display;
};

// 3D floating geometry shapes
const FloatingGeometry = ({ mouseX, mouseY }) => {
  const shapes = [
    {
      size: 180,
      color: 'rgba(168,85,247,0.12)',
      border: 'rgba(168,85,247,0.25)',
      top: '15%', left: '72%',
      parallaxFactor: 0.025,
      animation: 'float-slow 10s ease-in-out infinite',
      type: 'circle',
    },
    {
      size: 120,
      color: 'rgba(6,182,212,0.08)',
      border: 'rgba(6,182,212,0.2)',
      top: '60%', left: '8%',
      parallaxFactor: 0.018,
      animation: 'float-medium 7s ease-in-out infinite 1s',
      type: 'circle',
    },
    {
      size: 60,
      color: 'rgba(59,130,246,0.1)',
      border: 'rgba(59,130,246,0.3)',
      top: '80%', left: '75%',
      parallaxFactor: 0.035,
      animation: 'float-slow 8s ease-in-out infinite 0.5s',
      type: 'square',
    },
    {
      size: 90,
      color: 'rgba(168,85,247,0.06)',
      border: 'rgba(168,85,247,0.15)',
      top: '30%', left: '85%',
      parallaxFactor: 0.015,
      animation: 'float-medium 12s ease-in-out infinite 2s',
      type: 'triangle',
    },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
      {shapes.map((s, i) => {
        const px = (mouseX - 0.5) * s.parallaxFactor * -100;
        const py = (mouseY - 0.5) * s.parallaxFactor * -100;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: s.top,
              left: s.left,
              width: s.size,
              height: s.size,
              transform: `translate(${px}px, ${py}px) ${s.type === 'square' ? 'rotate(45deg)' : ''}`,
              animation: s.animation,
              borderRadius: s.type === 'circle' ? '50%' : s.type === 'square' ? '12px' : '0',
              background: s.color,
              border: `1px solid ${s.border}`,
              backdropFilter: 'blur(2px)',
              transition: 'transform 0.15s ease-out',
              display: s.type === 'triangle' ? 'none' : 'block', // skip SVG triangle for simplicity
            }}
          />
        );
      })}

      {/* Inner spinning ring */}
      <div
        style={{
          position: 'absolute',
          top: '12%', left: '68%',
          width: 220, height: 220,
          borderRadius: '50%',
          border: '1px solid rgba(168,85,247,0.15)',
          transform: `translate(${(mouseX - 0.5) * -2}px, ${(mouseY - 0.5) * -2}px)`,
          animation: 'spin-slow 30s linear infinite',
          transition: 'transform 0.3s ease-out',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '14%', left: '70%',
          width: 160, height: 160,
          borderRadius: '50%',
          border: '1px dashed rgba(6,182,212,0.15)',
          transform: `translate(${(mouseX - 0.5) * -1.5}px, ${(mouseY - 0.5) * -1.5}px)`,
          animation: 'spin-slow 20s linear infinite reverse',
          transition: 'transform 0.3s ease-out',
        }}
      />
    </div>
  );
};

const Hero = () => {
  const [mouse, setMouse] = useState({ x: 0.5, y: 0.5 });
  const sectionRef = useRef(null);

  const typedText = useTypewriter(
    ['Full-Stack Developer', 'Problem Solver', 'UI Craftsman', 'Open Source Enthusiast'],
    70,
    2200
  );

  useEffect(() => {
    const onMove = (e) => {
      setMouse({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const parallaxX = (mouse.x - 0.5) * 20;
  const parallaxY = (mouse.y - 0.5) * 12;

  return (
    <section
      id="home"
      ref={sectionRef}
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 80,
      }}
    >
      {/* Ambient background orbs */}
      <div style={{
        position: 'absolute', top: '-10%', left: '-5%',
        width: 600, height: 600,
        background: 'radial-gradient(circle, rgba(168,85,247,0.12) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
        transform: `translate(${parallaxX * 0.4}px, ${parallaxY * 0.4}px)`,
        transition: 'transform 0.3s ease-out',
      }} />
      <div style={{
        position: 'absolute', bottom: '-15%', right: '-5%',
        width: 500, height: 500,
        background: 'radial-gradient(circle, rgba(6,182,212,0.1) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
        transform: `translate(${-parallaxX * 0.3}px, ${-parallaxY * 0.3}px)`,
        transition: 'transform 0.3s ease-out',
      }} />
      <div style={{
        position: 'absolute', top: '40%', left: '40%',
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Floating 3D geometry */}
      <FloatingGeometry mouseX={mouse.x} mouseY={mouse.y} />

      {/* Grid background */}
      <div
        className="grid-bg"
        style={{
          position: 'absolute', inset: 0, zIndex: 0, opacity: 0.5,
          transform: `translate(${parallaxX * 0.1}px, ${parallaxY * 0.1}px)`,
          transition: 'transform 0.5s ease-out',
        }}
      />

      {/* Main content */}
      <div
        style={{
          position: 'relative', zIndex: 2,
          textAlign: 'center',
          padding: '0 24px',
          maxWidth: 860,
          transform: `translate(${parallaxX * 0.3}px, ${parallaxY * 0.3}px)`,
          transition: 'transform 0.15s ease-out',
        }}
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '8px 20px',
            background: 'rgba(168,85,247,0.08)',
            border: '1px solid rgba(168,85,247,0.2)',
            borderRadius: 999,
            marginBottom: 40,
          }}
        >
          <span style={{
            width: 7, height: 7, background: '#4ade80',
            borderRadius: '50%',
            boxShadow: '0 0 8px #4ade80',
            animation: 'glow-pulse 2s ease-in-out infinite',
            display: 'inline-block',
          }} />
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.08em',
          }}>
            AVAILABLE FOR NEW PROJECTS
          </span>
          <Sparkles size={12} style={{ color: '#a855f7' }} />
        </motion.div>

        {/* Name */}
        <h1
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(3rem, 8vw, 6.5rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.03em',
            marginBottom: 24,
          }}
        >
          <AnimatedText text="Anuj" delay={0.4} />{' '}
          <AnimatedText
            text="Maurya"
            delay={0.4}
            style={{
              background: 'linear-gradient(135deg, #a855f7 0%, #3b82f6 50%, #06b6d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          />
        </h1>

        {/* Typewriter role */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 'clamp(1rem, 2.5vw, 1.35rem)',
            color: 'rgba(255,255,255,0.4)',
            marginBottom: 20,
            letterSpacing: '0.02em',
            minHeight: 40,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
          }}
        >
          <span style={{ color: '#a855f7' }}>&gt;</span>{' '}
          <span style={{ color: '#06b6d4' }}>{typedText}</span>
          <span
            style={{
              display: 'inline-block', width: 2, height: '1.2em',
              background: '#06b6d4',
              marginLeft: 2,
              animation: 'blink 1s step-end infinite',
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.6 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(0.95rem, 2vw, 1.15rem)',
            color: 'rgba(255,255,255,0.28)',
            maxWidth: 520,
            margin: '0 auto 52px',
            lineHeight: 1.7,
          }}
        >
          Crafting immersive digital experiences at the intersection of elegant design and robust engineering.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.9 }}
          style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}
        >
          <a href="#projects" className="btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn-ghost">
            Let's Talk
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.4 }}
          style={{
            position: 'absolute',
            bottom: -100,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}
        >
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.2)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown size={16} style={{ color: 'rgba(255,255,255,0.2)' }} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
