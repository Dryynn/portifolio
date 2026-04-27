import React, { useRef, useEffect } from 'react';
import styled from 'styled-components';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SkillCardItem {
  icon: React.ReactNode;
  label: string;
  rotation: number;
}

interface SkillCardProps {
  items: SkillCardItem[];
  categoryLabel: string;
}

const SkillCard: React.FC<SkillCardProps> = ({ items, categoryLabel }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll('.glass');

    // Estado inicial: empilhado e rotacionado
    const isMobile = window.innerWidth <= 600;
    cards.forEach((card, i) => {
      const el = card as HTMLElement;
      const rotation = items[i]?.rotation || 0;
      gsap.set(el, {
        rotation: isMobile ? rotation * 0.7 : rotation,
        margin: isMobile ? '0 -35px' : '0 -45px',
      });
    });

    // Animação ao scrollar: abre o leque
    gsap.to(cards, {
      rotation: 0,
      margin: isMobile ? '0 5px' : '0 10px',
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        end: 'top 40%',
        toggleActions: 'play none none reverse',
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach(t => {
        if (t.trigger === containerRef.current) t.kill();
      });
    };
  }, [items]);

  return (
    <StyledWrapper>
      <div className="skill-group">
        <p className="category-label">{categoryLabel}</p>
        <div className="card-fan" ref={containerRef}>
          {items.map((item, i) => (
            <div
              key={i}
              data-text={item.label}
              className="glass"
              style={{ '--r': item.rotation } as React.CSSProperties}
            >
              {item.icon}
            </div>
          ))}
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .skill-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
  }

  .category-label {
    color: var(--text-muted);
    font-size: 0.85rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-family: 'Poppins', sans-serif;
  }

  .card-fan {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 220px;
  }

  .card-fan .glass {
    position: relative;
    width: 160px;
    height: 190px;
    background: linear-gradient(rgba(255,255,255,0.08), transparent);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 25px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    margin: 0 -45px;
    backdrop-filter: blur(10px);
    transform: rotate(calc(var(--r) * 1deg));
    transition: box-shadow 0.3s ease;
  }

  @media (max-width: 600px) {
    .card-fan .glass {
      width: 120px;
      height: 150px;
      margin: 0 -35px;
    }
    .card-fan .glass svg {
      width: 32px !important;
      height: 32px !important;
    }
    .card-fan {
      min-height: 180px;
    }
  }

  .card-fan .glass:hover {
    box-shadow: 0 25px 35px rgba(0, 0, 0, 0.4), 0 0 20px rgba(255,255,255,0.05);
  }

  .card-fan .glass::before {
    content: attr(data-text);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 30px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 0 0 10px 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #a1a1aa;
    font-size: 0.75rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    font-family: 'Poppins', sans-serif;
  }

  .card-fan .glass svg {
    width: 44px;
    height: 44px;
    color: #d4d4d8;
  }
`;

export default SkillCard;
