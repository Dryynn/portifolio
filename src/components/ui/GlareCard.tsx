import React, { useRef, useState } from 'react';

interface GlareCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlareCard: React.FC<GlareCardProps> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [opacity, setOpacity] = useState(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    
    // Coordenadas relativas do mouse na imagem (0 a 100%)
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    // Rotação 3D sutil (Max 10 degrees)
    const tiltX = (50 - y) / 5;
    const tiltY = (x - 50) / 5;

    setPosition({ x, y });
    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => {
    setOpacity(0);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-2xl border border-white/10 shadow-2xl ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transformStyle: 'preserve-3d',
        transition: opacity === 0 ? 'transform 0.5s ease-out' : 'transform 0.1s linear',
      }}
    >
      {/* O conteúdo (Imagem) */}
      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>

      {/* O Glare (Brilho dinâmico) */}
      <div
        className="pointer-events-none absolute inset-0 z-20"
        style={{
          opacity,
          transition: 'opacity 0.3s ease',
          background: `radial-gradient(circle at ${position.x}% ${position.y}%, rgba(255,255,255,0.25) 0%, transparent 60%)`,
        }}
      />
    </div>
  );
};

export default GlareCard;
