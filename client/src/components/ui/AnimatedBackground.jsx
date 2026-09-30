import React, { useEffect, useRef, useCallback } from 'react';

export const AnimatedBackground = ({ isDark = false }) => {
  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);
  const timeRef = useRef(0);
  const scrollYRef = useRef(0);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const particlesRef = useRef([]);

  const initParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const p = [];
    const numParticles = 40;
    for (let i = 0; i < numParticles; i++) {
      p.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: Math.random() * 2 + 0.5, // size
        vx: (Math.random() - 0.5) * 0.4,
        vy: Math.random() * -0.8 - 0.2, // float upwards
        baseAlpha: Math.random() * 0.6 + 0.2,
        offset: Math.random() * 100
      });
    }
    particlesRef.current = p;
  }, []);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;

    // Time progression for smooth animation
    const t = timeRef.current;
    timeRef.current += 0.003;

    // Parallax scroll offset
    const scrollOffset = scrollYRef.current * 0.15;

    ctx.clearRect(0, 0, W, H);

    // --- 1. Morphing Fluid Aurora Gradients ---
    // Blob 1 (Indigo/Blue)
    const x1 = W * 0.3 + Math.cos(t * 0.8) * W * 0.2;
    const y1 = H * 0.4 + Math.sin(t * 0.5) * H * 0.3 - scrollOffset * 0.8;
    const g1 = ctx.createRadialGradient(x1, y1, 0, x1, y1, W * 0.5);
    g1.addColorStop(0, isDark ? 'rgba(99,102,241,0.18)' : 'rgba(99,102,241,0.08)');
    g1.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g1;
    ctx.fillRect(0, 0, W, H);

    // Blob 2 (Purple)
    const x2 = W * 0.7 + Math.sin(t * 1.2) * W * 0.2;
    const y2 = H * 0.7 + Math.cos(t * 0.9) * H * 0.2 - scrollOffset * 0.5;
    const g2 = ctx.createRadialGradient(x2, y2, 0, x2, y2, W * 0.45);
    g2.addColorStop(0, isDark ? 'rgba(168,85,247,0.15)' : 'rgba(168,85,247,0.07)');
    g2.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g2;
    ctx.fillRect(0, 0, W, H);

    // Blob 3 (Cyan)
    const x3 = W * 0.5 + Math.cos(t * 0.7 + Math.PI) * W * 0.2;
    const y3 = H * 0.2 + Math.sin(t * 1.1) * H * 0.3 - scrollOffset * 1.2;
    const g3 = ctx.createRadialGradient(x3, y3, 0, x3, y3, W * 0.5);
    g3.addColorStop(0, isDark ? 'rgba(6,182,212,0.12)' : 'rgba(6,182,212,0.06)');
    g3.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g3;
    ctx.fillRect(0, 0, W, H);

    // --- 2. Topographic Cyber Wave Mesh ---
    const linesCount = Math.floor(H / 40) + 12; // Extra lines for overflow
    const pointsPerLine = Math.floor(W / 50);
    const spacingX = W / pointsPerLine;

    ctx.lineWidth = 1.2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    for (let i = -5; i < linesCount; i++) {
      // Calculate base Y for this wave line, applying parallax scroll loop
      const baseY = (i * 40) - (scrollOffset % 40);

      ctx.beginPath();
      let firstPoint = true;

      for (let j = 0; j <= pointsPerLine; j++) {
        const bx = j * spacingX;

        // Generate fluid wave deformations using multiple sine waves
        const wave1 = Math.sin(bx * 0.003 + t * 2 + i * 0.15) * 20;
        const wave2 = Math.cos(bx * 0.005 - t * 1.5 + i * 0.08) * 15;
        const wave3 = Math.sin(bx * 0.01 + t) * 5;

        let by = baseY + wave1 + wave2 + wave3;

        // Interactive Mouse Ripples & Magnetism
        const dx = bx - mouseRef.current.x;
        // Adjust Y distance calculation to account for base Y vs actual mouse Y
        const dy = by - mouseRef.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 350) { // Increased interaction radius from 250 to 350
          const force = (350 - dist) / 350;
          // Stronger magnetic ripple bump
          const ripple = Math.cos(dist * 0.03 - t * 8) * 35 * force;
          by += ripple - (dy * force * 0.35); // Stronger magnetic pull
        }

        if (firstPoint) {
          ctx.moveTo(bx, by);
          firstPoint = false;
        } else {
          // Add slight bezier curves for smoother lines (using quadratic curve approx)
          // For simplicity and performance, straight line segments with enough points look smooth
          ctx.lineTo(bx, by);
        }
      }

      // Dynamic depth opacity (lines lower on screen are more visible)
      const depthRatio = Math.max(0, Math.min(1, baseY / H));
      // Increased opacity for both modes for better visibility
      const lineAlpha = isDark ? 0.08 + (depthRatio * 0.25) : 0.06 + (depthRatio * 0.2);

      // Cyber gradient for each line
      const strokeG = ctx.createLinearGradient(0, 0, W, 0);
      strokeG.addColorStop(0, isDark ? `rgba(99,102,241,0)` : `rgba(99,102,241,0)`);
      strokeG.addColorStop(0.3, isDark ? `rgba(99,102,241,${lineAlpha})` : `rgba(99,102,241,${lineAlpha})`);
      strokeG.addColorStop(0.7, isDark ? `rgba(168,85,247,${lineAlpha})` : `rgba(168,85,247,${lineAlpha})`);
      strokeG.addColorStop(1, isDark ? `rgba(6,182,212,0)` : `rgba(6,182,212,0)`);

      ctx.strokeStyle = strokeG;
      ctx.stroke();
    }

    // --- 3. Floating Data Node Particles ---
    const pList = particlesRef.current;
    for (let i = 0; i < pList.length; i++) {
      const p = pList[i];
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around screen
      if (p.y < -20) p.y = H + 20;
      if (p.x < -20) p.x = W + 20;
      if (p.x > W + 20) p.x = -20;

      // Mouse repel for particles
      const dx = p.x - mouseRef.current.x;
      const dy = p.y - mouseRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 150) {
        const force = (150 - dist) / 150;
        p.x += (dx / dist) * force * 2;
        p.y += (dy / dist) * force * 2;
      }

      // Oscillate opacity
      const pulse = Math.sin(t * 3 + p.offset) * 0.3 + p.baseAlpha;
      const finalAlpha = Math.max(0.1, Math.min(1, pulse));

      // Draw particle (anti-gravity data fragment)
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
      ctx.fillStyle = isDark
        ? `rgba(165,180,252,${finalAlpha})`
        : `rgba(99,102,241,${finalAlpha})`;
      ctx.fill();
      
      // Glow on larger particles
      if(p.s > 1.5) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s * 3, 0, Math.PI * 2);
        ctx.fillStyle = isDark
          ? `rgba(168,85,247,${finalAlpha * 0.2})`
          : `rgba(99,102,241,${finalAlpha * 0.15})`;
        ctx.fill();
      }
    }

    animFrameRef.current = requestAnimationFrame(draw);
  }, [isDark]);

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
      mouseRef.current = { x: -1000, y: -1000 };
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

