import React from 'react';
import { Github, Linkedin, Twitter, Heart, ArrowUp } from 'lucide-react';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer style={{
      padding: '60px 24px 40px',
      position: 'relative',
      zIndex: 1,
      borderTop: '1px solid rgba(255,255,255,0.04)',
    }}>
      {/* Gradient line */}
      <div style={{
        position: 'absolute',
        top: 0, left: '10%', right: '10%',
        height: 1,
        background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.3), rgba(6,182,212,0.3), transparent)',
      }} />

      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div style={{
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: 24,
        }}>
          {/* Logo */}
          <div>
            <a href="#home" style={{ textDecoration: 'none', display: 'block' }}>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: '1.2rem',
                background: 'linear-gradient(135deg, #a855f7, #06b6d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}>
                ANUJ MAURYA
              </span>
            </a>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.2)',
              marginTop: 6,
            }}>
              Crafting premium digital experiences.
            </p>
          </div>

          {/* Socials */}
          <div style={{ display: 'flex', gap: 12 }}>
            {[
              { icon: Github, href: 'https://github.com/anujmaurya2024', glow: '#ffffff' },
              { icon: Linkedin, href: 'https://linkedin.com', glow: '#0A66C2' },
              { icon: Twitter, href: 'https://twitter.com', glow: '#1DA1F2' },
            ].map(({ icon: Icon, href, glow }) => (
              <a
                key={href}
                href={href}
                target="_blank"
                rel="noreferrer"
                style={{
                  width: 40, height: 40, borderRadius: 10,
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.3)',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = glow;
                  e.currentTarget.style.borderColor = glow;
                  e.currentTarget.style.boxShadow = `0 0 16px rgba(${glow === '#ffffff' ? '255,255,255' : glow === '#0A66C2' ? '10,102,194' : '29,161,242'}, 0.25)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.3)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>

          {/* Back to top */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'rgba(168,85,247,0.08)',
              border: '1px solid rgba(168,85,247,0.15)',
              borderRadius: 999,
              padding: '8px 18px',
              color: 'rgba(255,255,255,0.4)',
              cursor: 'pointer',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.7rem',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(168,85,247,0.4)';
              e.currentTarget.style.color = '#a855f7';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(168,85,247,0.15)';
              e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
            }}
          >
            <ArrowUp size={12} />
            Back to top
          </button>
        </div>

        {/* Bottom bar */}
        <div style={{
          marginTop: 40,
          paddingTop: 24,
          borderTop: '1px solid rgba(255,255,255,0.04)',
          display: 'flex', flexWrap: 'wrap',
          alignItems: 'center', justifyContent: 'space-between',
          gap: 12,
        }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.15)',
          }}>
            © {year} Anuj Maurya. All rights reserved.
          </span>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.15)',
            display: 'flex', alignItems: 'center', gap: 6,
          }}>
            Built with <Heart size={11} style={{ color: '#ec4899', fill: '#ec4899' }} /> and React
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
