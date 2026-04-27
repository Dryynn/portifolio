import React, { useRef, useEffect } from 'react';

interface SquaresProps {
  direction?: 'diagonal' | 'up' | 'right' | 'down' | 'left';
  speed?: number;
  borderColor?: string;
  hoverFillColor?: string;
  squareSize?: number;
  className?: string;
}

const Squares: React.FC<SquaresProps> = ({
  direction = 'diagonal',
  speed = 0.5,
  borderColor = 'rgba(255, 255, 255, 0.05)', // Borda sutil de prata
  hoverFillColor = '#ffffff', // Cor de preenchimento quando o mouse passa
  squareSize = 40,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let gridOffset = { x: 0, y: 0 };
    
    // Armazena os quadrados que o mouse passou com a data de ativação
    const hoveredSquares = new Map<string, number>();

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const cols = Math.ceil(canvas.width / squareSize) + 1;
      const rows = Math.ceil(canvas.height / squareSize) + 1;
      
      const startX = gridOffset.x % squareSize;
      const startY = gridOffset.y % squareSize;

      const now = Date.now();
      
      // Limpa quadrados que já apagaram totalmente (ex: 2 segundos)
      for (const [key, timestamp] of hoveredSquares.entries()) {
        if (now - timestamp > 2000) {
          hoveredSquares.delete(key);
        }
      }

      for (let i = -1; i <= cols; i++) {
        for (let j = -1; j <= rows; j++) {
          const x = i * squareSize + startX;
          const y = j * squareSize + startY;
          
          // Coordenadas absolutas reais do grid para não acender quadrados errados enquanto o fundo se move
          const absX = i - Math.floor(gridOffset.x / squareSize);
          const absY = j - Math.floor(gridOffset.y / squareSize);
          const key = `${absX},${absY}`;

          ctx.beginPath();
          ctx.rect(x, y, squareSize, squareSize);

          if (hoveredSquares.has(key)) {
            const timeDiff = now - hoveredSquares.get(key)!;
            // Opacidade vai de 1 (ou 0.2 máximo para elegância) até 0
            const maxOpacity = 0.15; // Não queremos o branco cegando o usuário
            const opacity = Math.max(0, maxOpacity - (timeDiff / 2000) * maxOpacity);
            
            ctx.fillStyle = hoverFillColor;
            ctx.globalAlpha = opacity;
            ctx.fill();
            ctx.globalAlpha = 1;
          }

          ctx.strokeStyle = borderColor;
          ctx.stroke();
        }
      }

      // Atualiza o deslocamento dependendo da direção
      if (direction === 'right' || direction === 'diagonal') gridOffset.x += speed;
      if (direction === 'left') gridOffset.x -= speed;
      if (direction === 'down' || direction === 'diagonal') gridOffset.y += speed;
      if (direction === 'up') gridOffset.y -= speed;

      animationFrameId = requestAnimationFrame(draw);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;

      const col = Math.floor((mouseX - (gridOffset.x % squareSize)) / squareSize);
      const row = Math.floor((mouseY - (gridOffset.y % squareSize)) / squareSize);
      
      const absX = col - Math.floor(gridOffset.x / squareSize);
      const absY = row - Math.floor(gridOffset.y / squareSize);
      const key = `${absX},${absY}`;

      hoveredSquares.set(key, Date.now());
    };

    // Suporte para touch no mobile
    const handleTouchMove = (e: TouchEvent) => {
      if(e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = e.touches[0].clientX - rect.left;
        const mouseY = e.touches[0].clientY - rect.top;

        const col = Math.floor((mouseX - (gridOffset.x % squareSize)) / squareSize);
        const row = Math.floor((mouseY - (gridOffset.y % squareSize)) / squareSize);
        
        const absX = col - Math.floor(gridOffset.x / squareSize);
        const absY = row - Math.floor(gridOffset.y / squareSize);
        const key = `${absX},${absY}`;

        hoveredSquares.set(key, Date.now());
      }
    }

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('touchmove', handleTouchMove);
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('touchmove', handleTouchMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [direction, speed, borderColor, hoverFillColor, squareSize]);

  return (
    <canvas 
      ref={canvasRef} 
      className={className}
      style={{ width: '100%', height: '100%', display: 'block' }} 
    />
  );
};

export default Squares;
