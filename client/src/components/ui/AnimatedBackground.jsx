import React, { useEffect, useRef, useCallback } from 'react';

const NUM_PARTICLES = 80;
const CONNECTION_DISTANCE = 150;
const PARTICLE_SPEED = 0.35;
const SCROLL_PARALLAX_FACTOR = 0.15;

function createParticle(canvas) {
  return {
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    vx: (Math.random() - 0.5) * PARTICLE_SPEED,
    vy: (Math.random() - 0.5) * PARTICLE_SPEED,
    radius: Math.random() * 1.8 + 0.8,
    baseOpacity: Math.random() * 0.5 + 0.3,
    pulseOffset: Math.random() * Math.PI * 2,
  };
}

export const AnimatedBackground = ({ isDark = false }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animFrameRef = useRef(null);
  const scrollYRef = useRef(0);
  const timeRef = useRef(0);
  const mouseRef = useRef({ x: -9999, y: -9999 });

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    ctx.clearRect(0, 0, W, H);

    const scrollOffset = scrollYRef.current * SCROLL_PARALLAX_FACTOR;
    const t = timeRef.current;
    timeRef.current += 0.005;

    // --- Aurora gradient background ---
    const aurora1 = ctx.createRadialGradient(W * 0.2, H * 0.1 - scrollOffset * 0.3, 0, W * 0.2, H * 0.1 - scrollOffset * 0.3, W * 0.6);
    aurora1.addColorStop(0, isDark ? 'rgba(99,102,241,0.22)' : 'rgba(99,102,241,0.12)');
    aurora1.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = aurora1;
    ctx.fillRect(0, 0, W, H);

    const aurora2 = ctx.createRadialGradient(W * 0.8, H * 0.5 + scrollOffset * 0.2, 0, W * 0.8, H * 0.5 + scrollOffset * 0.2, W * 0.55);
    aurora2.addColorStop(0, isDark ? 'rgba(6,182,212,0.18)' : 'rgba(6,182,212,0.09)');
    aurora2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = aurora2;
    ctx.fillRect(0, 0, W, H);

    const aurora3 = ctx.createRadialGradient(W * 0.5, H * 0.8 - scrollOffset * 0.15, 0, W * 0.5, H * 0.8 - scrollOffset * 0.15, W * 0.5);
    aurora3.addColorStop(0, isDark ? 'rgba(168,85,247,0.18)' : 'rgba(168,85,247,0.09)');
    aurora3.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = aurora3;
    ctx.fillRect(0, 0, W, H);

    // --- Update + draw particles ---
    const particles = particlesRef.current;
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around edges
      if (p.x < -10) p.x = W + 10;
      if (p.x > W + 10) p.x = -10;
      if (p.y < -10) p.y = H + 10;
      if (p.y > H + 10) p.y = -10;

      // Scroll parallax offset per particle
      const drawY = p.y - scrollOffset * (0.05 + (i % 5) * 0.02);

      // Pulse opacity
      const pulse = Math.sin(t * 1.5 + p.pulseOffset) * 0.2 + p.baseOpacity;

      // Mouse repel
      const dx = p.x - mouseRef.current.x;
      const dy = drawY - mouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 100) {
        const force = (100 - dist) / 100;
        p.x += (dx / dist) * force * 1.2;
        p.y += (dy / dist) * force * 1.2;
      }

      // Draw connections
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const drawQY = q.y - scrollOffset * (0.05 + (j % 5) * 0.02);
        const cdx = p.x - q.x;
        const cdy = drawY - drawQY;
        const cdist = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cdist < CONNECTION_DISTANCE) {
          const lineOpacity = (1 - cdist / CONNECTION_DISTANCE) * 0.45;
          ctx.beginPath();
          ctx.strokeStyle = isDark
            ? `rgba(139,92,246,${lineOpacity})`
            : `rgba(99,102,241,${lineOpacity})`;
          ctx.lineWidth = 0.8;
          ctx.moveTo(p.x, drawY);
          ctx.lineTo(q.x, drawQY);
          ctx.stroke();
        }
      }

      // Draw particle dot
      ctx.beginPath();
      ctx.arc(p.x, drawY, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? `rgba(165,180,252,${pulse})`
        : `rgba(99,102,241,${pulse})`;
      ctx.fill();

      // Glow ring on larger ones
      if (p.radius > 2) {
        ctx.beginPath();
        ctx.arc(p.x, drawY, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(139,92,246,${pulse * 0.2})`
          : `rgba(99,102,241,${pulse * 0.15})`;
        ctx.fill();
      }
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, [isDark]);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    particlesRef.current = Array.from({ length: NUM_PARTICLES }, () => createParticle(canvas));
  }, []);

  const resize = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }, [initParticles]);

  useEffect(() => {
    resize();

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouse, { passive: true });
    window.addEventListener('mouseleave', handleLeave);

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouse);
      window.removeEventListener('mouseleave', handleLeave);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [resize, draw]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none bg-slate-50 dark:bg-slate-950"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
};
