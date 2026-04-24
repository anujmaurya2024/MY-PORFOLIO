import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';

const skillData = {
  'ML & Data': [
    'TensorFlow', 'Scikit-learn', 'Pandas', 'NumPy',
    'Deep Learning', 'Data Analytics', 'BeautifulSoup',
  ],
  'Full Stack': [
    'React Native', 'React.js', 'Node.js', 'Express.js',
    'Django', 'Flask', 'FastAPI', 'REST APIs',
  ],
  'Languages & DBs': [
    'Python', 'C++', 'JavaScript', 'PostgreSQL',
    'MongoDB', 'MySQL', 'Git', 'Expo',
  ],
};

const categoryColors = {
  'ML & Data': { primary: '#a855f7', secondary: 'rgba(168,85,247,0.15)', border: 'rgba(168,85,247,0.3)' },
  'Full Stack': { primary: '#06b6d4', secondary: 'rgba(6,182,212,0.12)', border: 'rgba(6,182,212,0.3)' },
  'Languages & DBs': { primary: '#3b82f6', secondary: 'rgba(59,130,246,0.12)', border: 'rgba(59,130,246,0.3)' },
};

// CSS 3D Orbiting Sphere
const SkillSphere = ({ skills, color }) => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 15, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(null);
  const autoRotate = useRef(null);

  useEffect(() => {
    autoRotate.current = setInterval(() => {
      if (!isDragging) {
        setRotation((r) => ({ ...r, y: r.y + 0.4 }));
      }
    }, 16);
    return () => clearInterval(autoRotate.current);
  }, [isDragging]);

  const onMouseDown = (e) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX, y: e.clientY, rx: rotation.x, ry: rotation.y };
  };
  const onMouseMove = (e) => {
    if (!isDragging || !dragStart.current) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setRotation({
      x: dragStart.current.rx - dy * 0.4,
      y: dragStart.current.ry + dx * 0.4,
    });
  };
  const onMouseUp = () => setIsDragging(false);

  const count = skills.length;
  const radius = 130;

  return (
    <div
      ref={containerRef}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      style={{
        width: 320, height: 320,
        perspective: 800,
        cursor: isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
        margin: '0 auto',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Center glow */}
      <div style={{
        position: 'absolute',
        width: 80, height: 80,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color.secondary} 0%, transparent 70%)`,
        filter: 'blur(20px)',
        pointerEvents: 'none',
      }} />

      <div style={{ position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' }}>
        {skills.map((skill, i) => {
          // Spherical distribution
          const phi = Math.acos(-1 + (2 * i) / count);
          const theta = Math.sqrt(count * Math.PI) * phi;
          const x = radius * Math.sin(phi) * Math.cos(theta);
          const y = radius * Math.sin(phi) * Math.sin(theta);
          const z = radius * Math.cos(phi);

          // Apply sphere rotation
          const rx = rotation.x * (Math.PI / 180);
          const ry = rotation.y * (Math.PI / 180);

          // Y-axis rotation
          const x1 = x * Math.cos(ry) + z * Math.sin(ry);
          const y1 = y;
          const z1 = -x * Math.sin(ry) + z * Math.cos(ry);
          // X-axis rotation
          const x2 = x1;
          const y2 = y1 * Math.cos(rx) - z1 * Math.sin(rx);
          const z2 = y1 * Math.sin(rx) + z1 * Math.cos(rx);

          // Depth-based opacity and scale
          const depthFactor = (z2 + radius) / (2 * radius);
          const opacity = 0.2 + depthFactor * 0.8;
          const scale = 0.6 + depthFactor * 0.5;

          return (
            <div
              key={skill}
              style={{
                position: 'absolute',
                top: '50%', left: '50%',
                transform: `translate(calc(${x2}px - 50%), calc(${y2}px - 50%))`,
                opacity,
                zIndex: Math.round(z2 + radius),
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  padding: '5px 12px',
                  background: 'rgba(6,11,20,0.85)',
                  border: `1px solid ${z2 > 0 ? color.border : 'rgba(255,255,255,0.06)'}`,
                  borderRadius: 999,
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: `${0.62 + depthFactor * 0.18}rem`,
                  fontWeight: 500,
                  color: z2 > 0 ? color.primary : 'rgba(255,255,255,0.3)',
                  whiteSpace: 'nowrap',
                  backdropFilter: 'blur(8px)',
                  transform: `scale(${scale})`,
                  transformOrigin: 'center',
                  transition: 'all 0.1s ease',
                  boxShadow: z2 > 60 ? `0 0 12px ${color.secondary}` : 'none',
                  cursor: 'default',
                }}
              >
                {skill}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Skills = () => {
  const [activeCategory, setActiveCategory] = useState('ML & Data');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const color = categoryColors[activeCategory];

  return (
    <section id="skills" style={{ padding: '120px 24px', position: 'relative', zIndex: 1 }}>
      <div style={{
        position: 'absolute', top: '10%', right: '-5%',
        width: 350, height: 350,
        background: 'radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }} ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 60 }}
        >
          <div className="section-label" style={{ justifyContent: 'center', display: 'inline-flex' }}>
            Skills
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            letterSpacing: '-0.03em',
            marginTop: 16,
          }}>
            My <span className="text-gradient">technical</span> arsenal
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.25)',
            marginTop: 12,
          }}>
            Drag the sphere to explore
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.2 }}
          style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 60, flexWrap: 'wrap' }}
        >
          {Object.keys(skillData).map((cat) => {
            const isActive = cat === activeCategory;
            const c = categoryColors[cat];
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  padding: '10px 24px',
                  borderRadius: 999,
                  border: `1px solid ${isActive ? c.border : 'rgba(255,255,255,0.08)'}`,
                  background: isActive ? c.secondary : 'transparent',
                  color: isActive ? c.primary : 'rgba(255,255,255,0.35)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 600,
                  fontSize: '0.875rem',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                  boxShadow: isActive ? `0 0 20px ${c.secondary}` : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
        </motion.div>

        {/* Sphere + skill list */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48, alignItems: 'center' }}>
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
          >
            <SkillSphere skills={skillData[activeCategory]} color={color} />
          </motion.div>

          {/* Skill cards list */}
          <motion.div
            key={`list-${activeCategory}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
          >
            {skillData[activeCategory].map((skill, i) => (
              <motion.div
                key={skill}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 20px',
                  background: 'rgba(6,11,20,0.6)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: 12,
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = color.border;
                  e.currentTarget.style.boxShadow = `0 0 16px ${color.secondary}`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span style={{
                  width: 6, height: 6,
                  borderRadius: '50%',
                  background: color.primary,
                  boxShadow: `0 0 8px ${color.primary}`,
                  flexShrink: 0,
                }} />
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'rgba(255,255,255,0.65)',
                }}>
                  {skill}
                </span>
                {/* Bar */}
                <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.04)', borderRadius: 999, marginLeft: 'auto' }}>
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${70 + Math.random() * 30}%` }}
                    transition={{ duration: 0.8, delay: i * 0.06 + 0.3 }}
                    style={{ height: '100%', background: `linear-gradient(90deg, ${color.primary}, transparent)`, borderRadius: 999 }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
