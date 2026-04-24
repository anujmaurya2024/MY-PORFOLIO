import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Send, Mail, MapPin, Phone, Github, Linkedin, Twitter, CheckCircle, AlertCircle } from 'lucide-react';
import axios from 'axios';

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com/anujmaurya2024', color: '#ffffff', hoverBg: 'rgba(255,255,255,0.08)' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com', color: '#0A66C2', hoverBg: 'rgba(10,102,194,0.15)' },
  { icon: Twitter, label: 'Twitter', href: 'https://twitter.com', color: '#1DA1F2', hoverBg: 'rgba(29,161,242,0.1)' },
];

const contactInfo = [
  { icon: Mail, label: 'Email', value: 'anjalimaurya028@gmail.com', href: 'mailto:anjalimaurya028@gmail.com' },
  { icon: Phone, label: 'Phone', value: '+91 9305178105', href: 'tel:+919305178105' },
  { icon: MapPin, label: 'Location', value: 'Srinagar, Uttarakhand', href: null },
];

const FloatingLabelInput = ({ label, type = 'text', value, onChange, required, textarea = false }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;

  const commonStyle = {
    width: '100%',
    background: 'rgba(6,11,20,0.8)',
    border: `1px solid ${focused ? 'rgba(168,85,247,0.5)' : 'rgba(255,255,255,0.07)'}`,
    borderRadius: 12,
    padding: textarea ? '22px 20px 14px' : '22px 20px 10px',
    color: 'rgba(255,255,255,0.85)',
    fontSize: '0.95rem',
    outline: 'none',
    resize: textarea ? 'vertical' : 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    boxShadow: focused ? '0 0 0 3px rgba(168,85,247,0.1), 0 0 20px rgba(168,85,247,0.1)' : 'none',
    fontFamily: "'Inter', sans-serif",
  };

  return (
    <div style={{ position: 'relative' }}>
      <label style={{
        position: 'absolute',
        left: 20,
        top: focused || hasValue ? 8 : '50%',
        transform: focused || hasValue ? 'none' : 'translateY(-50%)',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: focused || hasValue ? '0.65rem' : '0.88rem',
        color: focused ? '#a855f7' : 'rgba(255,255,255,0.25)',
        letterSpacing: focused || hasValue ? '0.08em' : '0',
        textTransform: focused || hasValue ? 'uppercase' : 'none',
        transition: 'all 0.25s ease',
        pointerEvents: 'none',
        zIndex: 1,
      }}>
        {label}
      </label>
      {textarea ? (
        <textarea
          required={required}
          value={value}
          onChange={onChange}
          rows={5}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{ ...commonStyle, paddingTop: 28 }}
        />
      ) : (
        <input
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={commonStyle}
        />
      )}
    </div>
  );
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null); // null | 'loading' | 'success' | 'error'
  const [msg, setMsg] = useState('');
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await axios.post('/api/contact', form);
      setStatus('success');
      setMsg(res.data.message || 'Message sent! I\'ll get back to you soon.');
      setForm({ name: '', email: '', message: '' });
    } catch (err) {
      setStatus('error');
      setMsg(err.response?.data?.message || 'Something went wrong. Please try again.');
    }
    setTimeout(() => setStatus(null), 5000);
  };

  return (
    <section id="contact" style={{ padding: '120px 24px', position: 'relative', zIndex: 1 }}>
      {/* Atmospheric glow */}
      <div style={{
        position: 'absolute',
        bottom: 0, left: '50%',
        transform: 'translateX(-50%)',
        width: 600, height: 400,
        background: 'radial-gradient(ellipse, rgba(168,85,247,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1000, margin: '0 auto' }} ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: 72 }}
        >
          <div className="section-label" style={{ justifyContent: 'center', display: 'inline-flex' }}>
            Contact
          </div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 'clamp(2rem, 5vw, 3.2rem)',
            letterSpacing: '-0.03em',
            marginTop: 16,
          }}>
            Let's <span className="text-gradient">connect</span>
          </h2>
          <p style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '1rem',
            color: 'rgba(255,255,255,0.28)',
            marginTop: 12,
            maxWidth: 480,
            margin: '12px auto 0',
            lineHeight: 1.7,
          }}>
            Have a project in mind or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 48 }}>
          {/* Left: contact info + socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 40 }}
          >
            {/* Contact info */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {contactInfo.map(({ icon: Icon, label, value, href }) => (
                <div
                  key={label}
                  style={{ display: 'flex', alignItems: 'center', gap: 16 }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                    background: 'rgba(168,85,247,0.08)',
                    border: '1px solid rgba(168,85,247,0.15)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <Icon size={18} style={{ color: '#a855f7' }} />
                  </div>
                  <div>
                    <div style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.65rem',
                      color: 'rgba(255,255,255,0.25)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      marginBottom: 3,
                    }}>
                      {label}
                    </div>
                    {href ? (
                      <a href={href} style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.9rem',
                        color: 'rgba(255,255,255,0.7)',
                        textDecoration: 'none',
                        transition: 'color 0.2s',
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#a855f7'}
                      onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
                      >
                        {value}
                      </a>
                    ) : (
                      <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>
                        {value}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.65rem',
                color: 'rgba(255,255,255,0.25)',
                textTransform: 'uppercase',
                letterSpacing: '0.12em',
                marginBottom: 16,
              }}>
                Find me on
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                {socialLinks.map(({ icon: Icon, label, href, color, hoverBg }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    title={label}
                    style={{
                      width: 48, height: 48, borderRadius: 12,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'rgba(255,255,255,0.4)',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = hoverBg;
                      e.currentTarget.style.borderColor = color;
                      e.currentTarget.style.color = color;
                      e.currentTarget.style.boxShadow = `0 0 16px ${hoverBg}`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)';
                      e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="glass"
            style={{
              borderRadius: 24,
              padding: 36,
              border: '1px solid rgba(255,255,255,0.07)',
              position: 'relative',
            }}
          >
            {/* Top accent */}
            <div style={{
              position: 'absolute', top: 0, left: 0, right: 0,
              height: 1, borderRadius: '24px 24px 0 0',
              background: 'linear-gradient(90deg, transparent, rgba(168,85,247,0.4), rgba(6,182,212,0.4), transparent)',
            }} />

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <FloatingLabelInput
                label="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              <FloatingLabelInput
                label="Email Address"
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              <FloatingLabelInput
                label="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                textarea
              />

              {status && status !== 'loading' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    padding: '12px 16px',
                    borderRadius: 12,
                    background: status === 'success' ? 'rgba(74,222,128,0.08)' : 'rgba(248,113,113,0.08)',
                    border: `1px solid ${status === 'success' ? 'rgba(74,222,128,0.2)' : 'rgba(248,113,113,0.2)'}`,
                  }}
                >
                  {status === 'success' ? (
                    <CheckCircle size={16} style={{ color: '#4ade80', flexShrink: 0 }} />
                  ) : (
                    <AlertCircle size={16} style={{ color: '#f87171', flexShrink: 0 }} />
                  )}
                  <span style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.85rem',
                    color: status === 'success' ? '#4ade80' : '#f87171',
                  }}>
                    {msg}
                  </span>
                </motion.div>
              )}

              <button
                type="submit"
                disabled={status === 'loading'}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  padding: '16px 32px',
                  background: status === 'loading'
                    ? 'rgba(168,85,247,0.3)'
                    : 'linear-gradient(135deg, rgba(168,85,247,0.3), rgba(59,130,246,0.25))',
                  border: '1px solid rgba(168,85,247,0.4)',
                  borderRadius: 12,
                  color: status === 'loading' ? 'rgba(255,255,255,0.4)' : 'white',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: '0.95rem',
                  cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                  marginTop: 4,
                }}
                onMouseEnter={(e) => {
                  if (status !== 'loading') {
                    e.currentTarget.style.boxShadow = '0 0 32px rgba(168,85,247,0.3)';
                    e.currentTarget.style.transform = 'translateY(-2px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.transform = 'none';
                }}
              >
                {status === 'loading' ? (
                  <>
                    <div style={{
                      width: 16, height: 16,
                      border: '2px solid rgba(255,255,255,0.2)',
                      borderTop: '2px solid white',
                      borderRadius: '50%',
                      animation: 'spin-slow 0.8s linear infinite',
                    }} />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
