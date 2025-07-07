import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  life: number;
  maxLife: number;
  originalSize: number;
}

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 12000);

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 1;
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          size,
          originalSize: size,
          opacity: Math.random() * 0.6 + 0.2,
          life: 0,
          maxLife: Math.random() * 300 + 200,
        });
      }
    };

    initParticles();

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, index) => {
        // Mouse interaction
        const dx = mouseRef.current.x - particle.x;
        const dy = mouseRef.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          const force = (150 - distance) / 150;
          const angle = Math.atan2(dy, dx);
          particle.vx += Math.cos(angle) * force * 0.005;
          particle.vy += Math.sin(angle) * force * 0.005;
          particle.size = particle.originalSize * (1 + force * 0.5);
        } else {
          particle.size = particle.originalSize;
        }

        // Update particle position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.life++;

        // Add some friction
        particle.vx *= 0.99;
        particle.vy *= 0.99;

        // Wrap around screen edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Update opacity based on life
        const lifeRatio = particle.life / particle.maxLife;
        particle.opacity = Math.max(0, 0.8 - lifeRatio * 0.6);

        // Reset particle if life is over
        if (particle.life >= particle.maxLife) {
          particle.x = Math.random() * canvas.width;
          particle.y = Math.random() * canvas.height;
          particle.vx = (Math.random() - 0.5) * 0.8;
          particle.vy = (Math.random() - 0.5) * 0.8;
          const size = Math.random() * 3 + 1;
          particle.size = size;
          particle.originalSize = size;
          particle.life = 0;
          particle.maxLife = Math.random() * 300 + 200;
        }

        // Draw particle with glow effect
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity})`;
        ctx.fill();

        // Add subtle glow for larger particles
        if (particle.size > particle.originalSize * 1.2) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(0, 0, 0, ${particle.opacity * 0.1})`;
          ctx.fill();
        }
      });

      // Draw connections between nearby particles
      particlesRef.current.forEach((particle, i) => {
        particlesRef.current.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 120) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            const opacity = ((120 - distance) / 120) * 0.15;
            ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        });
      });

      // Draw connections to mouse
      const mouse = mouseRef.current;
      particlesRef.current.forEach((particle) => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 100) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(mouse.x, mouse.y);
          const opacity = ((100 - distance) / 100) * 0.2;
          ctx.strokeStyle = `rgba(0, 0, 0, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
};

export default ParticlesBackground;
