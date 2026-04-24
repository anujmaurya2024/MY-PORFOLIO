import React, { useEffect, useRef } from 'react';

const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let mouse = { x: width / 2, y: height / 2 };

    const onResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    const onMouse = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouse);

    // Create particles with depth layers
    const NUM = 130;
    const particles = Array.from({ length: NUM }, (_, i) => {
      const depth = Math.random(); // 0 = far, 1 = near
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.15 * (0.2 + depth * 0.8),
        vy: (Math.random() - 0.5) * 0.15 * (0.2 + depth * 0.8),
        radius: 0.5 + depth * 1.8,
        depth,
        opacity: 0.15 + depth * 0.7,
        // Alternate between purple/cyan/blue
        color: i % 3 === 0 ? '168,85,247' : i % 3 === 1 ? '6,182,212' : '59,130,246',
        twinkle: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.01 + Math.random() * 0.02,
      };
    });

    let animId;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Twinkle
        p.twinkle += p.twinkleSpeed;
        const twinkleFactor = 0.6 + 0.4 * Math.sin(p.twinkle);

        // Subtle mouse parallax
        const dx = mouse.x - width / 2;
        const dy = mouse.y - height / 2;
        const parallaxX = dx * p.depth * 0.015;
        const parallaxY = dy * p.depth * 0.015;

        // Move
        p.x += p.vx + parallaxX * 0.01;
        p.y += p.vy + parallaxY * 0.01;

        // Wrap
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        // Draw
        const opacity = p.opacity * twinkleFactor;
        ctx.beginPath();
        ctx.arc(p.x + parallaxX, p.y + parallaxY, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color}, ${opacity})`;
        ctx.fill();

        // Glow for near particles
        if (p.depth > 0.7) {
          ctx.beginPath();
          ctx.arc(p.x + parallaxX, p.y + parallaxY, p.radius * 3, 0, Math.PI * 2);
          const gradient = ctx.createRadialGradient(
            p.x + parallaxX, p.y + parallaxY, 0,
            p.x + parallaxX, p.y + parallaxY, p.radius * 3
          );
          gradient.addColorStop(0, `rgba(${p.color}, ${opacity * 0.3})`);
          gradient.addColorStop(1, 'rgba(0,0,0,0)');
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      animId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        opacity: 0.9,
      }}
    />
  );
};

export default ParticleBackground;
