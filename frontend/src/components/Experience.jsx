import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Briefcase, GraduationCap, Award, Target } from 'lucide-react';

const timeline = [
  {
    type: 'achievement',
    icon: Target,
    title: 'Future Goals & Aspirations',
    org: 'Continuous Growth',
    location: 'Global',
    period: 'Upcoming',
    description: 'Currently preparing to participate in the Smart India Hackathon (SIH), GirlScript Summer of Code (GSSoC), and Web3 Summer of Code (WSoC), while maintaining a strong academic record with a target of 7+ CGPA in college.',
    color: '#EEC5A0',
    colorBg: 'rgba(238,197,160,0.08)',
    colorBorder: 'rgba(238,197,160,0.25)',
  },
  {
    type: 'education',
    icon: GraduationCap,
    title: 'B.Tech — Information Technology',
    org: 'Hemvati Nandan Bahuguna Garhwal University',
    location: 'Srinagar, Uttarakhand',
    period: '2024 — 2028 (Expected)',
    description: 'Pursuing a Bachelor of Technology in Information Technology. Focusing on Machine Learning, Data Structures, Algorithms, and full-stack development.',
    color: '#EEC5A0',
    colorBg: 'rgba(238,197,160,0.08)',
    colorBorder: 'rgba(238,197,160,0.25)',
  },

  {
    type: 'experience',
    icon: Briefcase,
    title: 'Student Co-ordinator & Tech Head (TPIC)',
    org: 'Hemvati Nandan Bahuguna Garhwal University',
    location: 'Srinagar, Uttarakhand',
    period: 'Current',
    description: (
      <span>
        Serving as the Student Co-ordinator and Technology & Development Head for the Technology and Product Incubation Center (TPIC). Organized and coordinated entrepreneurial workshops and campus events, including the "Who Am I? (Startup Edition)" quiz competition. Also designed the official frontend platform. View my profile at{' '}
        <a 
          href="https://www.tpic.co.in/connect" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#EEC5A0', textDecoration: 'underline' }}
        >
          tpic.co.in/connect
        </a>.
      </span>
    ),
    color: '#EEC5A0',
    colorBg: 'rgba(238,197,160,0.08)',
    colorBorder: 'rgba(238,197,160,0.25)',
  },
  {
    type: 'achievement',
    icon: Award,
    title: '1st Place — Anveshan 2025 Research Competition',
    org: 'GB PANT UNIVERSITY',
    location: 'Pantnagar',
    period: '2025',
    description: 'Finalist and secured 1st place in the prestigious Anveshan Research competition.',
    color: '#EEC5A0',
    colorBg: 'rgba(238,197,160,0.08)',
    colorBorder: 'rgba(238,197,160,0.25)',
  },
  {
    type: 'achievement',
    icon: Award,
    title: '5th Place — National Entrepreneurship Challenge',
    org: 'IIT BOMBAY',
    location: 'Mumbai',
    period: 'Past',
    description: (
      <span>
        Finalist in the National Entrepreneurship Challenge (NEC), securing 5th place overall. Read more about our journey on{' '}
        <a 
          href="https://www.linkedin.com/company/technology-pre-incubation-cell-hnbgu/posts/" 
          target="_blank" 
          rel="noopener noreferrer"
          style={{ color: '#AD6E54', textDecoration: 'underline' }}
        >
          LinkedIn
        </a>.
      </span>
    ),
    color: '#AD6E54',
    colorBg: 'rgba(173,110,84,0.08)',
    colorBorder: 'rgba(173,110,84,0.25)',
  },
  {
    type: 'achievement',
    icon: Award,
    title: '4th Place — IDEATHON 2025',
    org: 'Hemwati Nandan Bahuguna Garhwal University',
    location: 'Srinagar, Uttarakhand',
    period: '2025',
    description: 'Secured 4th place by pitching real-world solutions. The event was supported and mentored by esteemed partners at IIT Roorkee.',
    color: '#EEC5A0',
    colorBg: 'rgba(238,197,160,0.08)',
    colorBorder: 'rgba(238,197,160,0.25)',
  },
  {
    type: 'achievement',
    icon: Award,
    title: 'Participant — Hackathon Code1',
    org: 'Collazon at BBD College',
    location: 'Delhi',
    period: 'Past',
    description: 'Represented "Team Javabugs" at Hackathon Code1, an intensive coding competition organized by Collazon. Collaborated with team members to brainstorm, design, and rapidly prototype an innovative tech solution under strict time constraints.',
    color: '#AD6E54',
    colorBg: 'rgba(173,110,84,0.08)',
    colorBorder: 'rgba(173,110,84,0.25)',
  },
];

const TimelineCard = ({ item, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });
  const isLeft = index % 2 === 0;
  const Icon = item.icon;

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        justifyContent: isLeft ? 'flex-end' : 'flex-start',
        paddingLeft: isLeft ? 0 : 'calc(50% + 28px)',
        paddingRight: isLeft ? 'calc(50% + 28px)' : 0,
        position: 'relative',
        marginBottom: 48,
      }}
      className="timeline-item"
    >
      {/* Dot on the center line */}
      <div
        style={{
          position: 'absolute',
          left: '50%',
          top: 24,
          transform: 'translateX(-50%)',
          width: 14, height: 14,
          borderRadius: '50%',
          background: item.color,
          border: '2px solid var(--bg-void)',
          boxShadow: `0 0 16px ${item.color}`,
          zIndex: 3,
          opacity: isInView ? 1 : 0,
          transition: 'opacity 0.5s ease',
        }}
      />

      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          background: item.colorBg,
          border: `1px solid ${item.colorBorder}`,
          borderRadius: 20,
          padding: 28,
          maxWidth: 420,
          width: '100%',
          position: 'relative',
        }}
      >
        {/* Top accent */}
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 2, borderRadius: '20px 20px 0 0',
          background: `linear-gradient(90deg, ${item.color}, transparent)`,
        }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 14 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10, flexShrink: 0,
            background: `${item.colorBg}`,
            border: `1px solid ${item.colorBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Icon size={18} style={{ color: item.color }} />
          </div>
          <div>
            <h3 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: '1rem',
              color: 'rgba(255,255,255,0.9)', margin: 0, lineHeight: 1.3,
            }}>
              {item.title}
            </h3>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              color: item.color,
              marginTop: 4,
            }}>
              {item.org} · {item.location}
            </div>
          </div>
          <span style={{
            marginLeft: 'auto', flexShrink: 0,
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem',
            color: 'rgba(255,255,255,0.25)',
            padding: '4px 10px',
            background: 'rgba(255,255,255,0.04)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: 999,
            whiteSpace: 'nowrap',
          }}>
            {item.period}
          </span>
        </div>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: '0.875rem',
          color: 'rgba(255,255,255,0.35)',
          lineHeight: 1.75,
          margin: 0,
        }}>
          {item.description}
        </p>
      </motion.div>
    </div>
  );
};

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="experience" style={{ padding: '120px 24px', position: 'relative', zIndex: 1 }}>
      <div style={{
        position: 'absolute', top: '30%', left: '40%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(168,85,247,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 900, margin: '0 auto' }} ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 80 }}
        >
          <div className="section-label" style={{ justifyContent: 'center', display: 'inline-flex' }}>
            Experience
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            letterSpacing: '-0.03em',
            marginTop: 16,
          }}>
            My <span className="text-gradient">journey</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Center line */}
          <div style={{
            position: 'absolute',
            left: '50%',
            top: 0, bottom: 0,
            width: 1,
            transform: 'translateX(-50%)',
            background: 'linear-gradient(180deg, transparent, rgba(168,85,247,0.3) 15%, rgba(6,182,212,0.3) 85%, transparent)',
          }} />

          {timeline.map((item, i) => (
            <TimelineCard key={i} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Mobile: override to single column */}
      <style>{`
        @media (max-width: 640px) {
          .timeline-item {
            padding-left: 40px !important;
            padding-right: 0 !important;
            justify-content: flex-start !important;
          }
          .timeline-item > div[style*="left: 50%"] {
            left: 10px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default Experience;
