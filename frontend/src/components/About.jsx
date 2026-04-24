import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Code2, Lightbulb, Rocket, Coffee } from 'lucide-react';

const stats = [
  { value: '10+', label: 'Projects Built', icon: Rocket },
  { value: '2+', label: 'Years Coding', icon: Code2 },
  { value: '5+', label: 'Tech Stacks', icon: Lightbulb },
  { value: '∞', label: 'Coffees Consumed', icon: Coffee },
];

const traits = ['Design Thinker', 'Clean Coder', 'Problem Solver', 'Fast Learner', 'Team Player'];

const TiltCard = ({ children }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  const onMove = (e) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 24;
    const y = ((e.clientY - top) / height - 0.5) * -24;
    setTilt({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      style={{
        perspective: 1000,
        cursor: 'none',
      }}
    >
      <div
        style={{
          transform: `rotateY(${tilt.x}deg) rotateX(${tilt.y}deg) scale(${tilt.x !== 0 ? 1.02 : 1})`,
          transition: tilt.x === 0 ? 'transform 0.5s ease' : 'transform 0.1s ease',
          transformStyle: 'preserve-3d',
        }}
      >
        {children}
      </div>
    </div>
  );
};

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } },
  };

  return (
    <section id="about" style={{ padding: '120px 24px', position: 'relative', zIndex: 1 }}>
      {/* Background accent */}
      <div style={{
        position: 'absolute', top: '20%', right: '-10%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }} ref={ref}>
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div className="section-label" style={{ justifyContent: 'center', display: 'inline-flex' }}>
            About Me
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            letterSpacing: '-0.03em',
            lineHeight: 1.15,
            marginTop: 16,
          }}>
            The person behind<br />
            <span className="text-gradient">the code</span>
          </h2>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 60, alignItems: 'start' }}>
          {/* 3D Tilt Photo Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <TiltCard>
              <div
                className="glass-neon"
                style={{ borderRadius: 24, padding: 6, position: 'relative' }}
              >
                {/* Glow ring */}
                <div style={{
                  position: 'absolute', inset: -1,
                  borderRadius: 26,
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.4), rgba(6,182,212,0.2))',
                  zIndex: -1,
                  filter: 'blur(8px)',
                }} />
                <img
                  src="/anuj.jpeg"
                  alt="Anuj Maurya"
                  style={{
                    width: '100%',
                    aspectRatio: '1/1',
                    objectFit: 'cover',
                    borderRadius: 20,
                    display: 'block',
                  }}
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                {/* Fallback avatar */}
                <div style={{
                  display: 'none',
                  width: '100%', aspectRatio: '1/1',
                  borderRadius: 20,
                  background: 'linear-gradient(135deg, rgba(168,85,247,0.2), rgba(6,182,212,0.15))',
                  alignItems: 'center', justifyContent: 'center',
                  fontSize: '5rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  color: 'rgba(168,85,247,0.5)',
                }}>
                  AM
                </div>
                {/* Floating badge */}
                <div
                  className="glass"
                  style={{
                    position: 'absolute', bottom: 20, right: 20,
                    padding: '10px 16px',
                    borderRadius: 12,
                    border: '1px solid rgba(168,85,247,0.2)',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}
                >
                  <span style={{ fontSize: '0.7rem', fontFamily: "'JetBrains Mono', monospace", color: '#4ade80' }}>● Available</span>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* Bio + stats */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{ display: 'flex', flexDirection: 'column', gap: 28 }}
          >
            <motion.div variants={itemVariants}>
              <h3 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: '1.05rem',
                color: '#a855f7',
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                marginBottom: 16,
              }}>
                Who am I?
              </h3>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.45)',
                lineHeight: 1.8,
                marginBottom: 16,
              }}>
                I'm an <strong style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>Information Technology & Engineering student</strong> with a strong aptitude for Machine Learning and mobile application development.
              </p>
              <p style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                color: 'rgba(255,255,255,0.35)',
                lineHeight: 1.8,
              }}>
                I have proven experience in creating predictive models and performing complex data analysis using Python, TensorFlow, Scikit-learn, and Pandas. Highly skilled in building cross-platform mobile apps with React Native and full-stack web solutions using React.js, Node.js, and FastAPI.
              </p>
            </motion.div>

            {/* Trait pills */}
            <motion.div variants={itemVariants} style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {traits.map((t) => (
                <span
                  key={t}
                  style={{
                    padding: '7px 16px',
                    borderRadius: 999,
                    background: 'rgba(168,85,247,0.06)',
                    border: '1px solid rgba(168,85,247,0.15)',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.82rem',
                    color: 'rgba(255,255,255,0.5)',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(168,85,247,0.15)';
                    e.target.style.borderColor = 'rgba(168,85,247,0.4)';
                    e.target.style.color = 'rgba(255,255,255,0.85)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(168,85,247,0.06)';
                    e.target.style.borderColor = 'rgba(168,85,247,0.15)';
                    e.target.style.color = 'rgba(255,255,255,0.5)';
                  }}
                >
                  {t}
                </span>
              ))}
            </motion.div>

            {/* Stats grid */}
            <motion.div
              variants={itemVariants}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}
            >
              {stats.map(({ value, label, icon: Icon }) => (
                <div
                  key={label}
                  className="glass"
                  style={{
                    borderRadius: 16,
                    padding: '18px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    border: '1px solid rgba(255,255,255,0.05)',
                    transition: 'border-color 0.2s, box-shadow 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(168,85,247,0.2)';
                    e.currentTarget.style.boxShadow = '0 0 20px rgba(168,85,247,0.08)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <Icon size={20} style={{ color: '#a855f7', flexShrink: 0 }} />
                  <div>
                    <div style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: '1.4rem',
                      background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      lineHeight: 1,
                    }}>
                      {value}
                    </div>
                    <div style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.75rem',
                      color: 'rgba(255,255,255,0.3)',
                      marginTop: 4,
                    }}>
                      {label}
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
