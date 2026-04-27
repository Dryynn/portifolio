import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const sections = [
  { id: 'home', label: 'Início' },
  { id: 'about', label: 'Sobre' },
  { id: 'projects', label: 'Projetos' },
  { id: 'experience', label: 'Trajetória' },
];

const observerSections = [
  ...sections,
  { id: 'skills', label: '' },
  { id: 'education', label: '' },
  { id: 'contact', label: '' }
];

const NavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrollingToContact = useRef(false);

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-15% 0px -15% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isScrollingToContact.current) return;

      // Encontrar a seção que está mais visível ou a última que entrou
      const intersectingEntries = entries.filter(e => e.isIntersecting);

      if (intersectingEntries.length > 0) {
        // Pega a entrada que está mais próxima do topo do viewport
        const bestEntry = intersectingEntries.reduce((prev, curr) => {
          return curr.boundingClientRect.top < prev.boundingClientRect.top ? curr : prev;
        });

        const id = bestEntry.target.id;
        const isGhostSection = ['skills', 'education', 'contact'].includes(id);

        if (isGhostSection) {
          setActiveIndex(-1);
        } else {
          const index = sections.findIndex(s => s.id === id);
          if (index !== -1) {
            setActiveIndex(index);
          }
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    observerSections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string, index: number) => {
    isScrollingToContact.current = false; // Cancela bloqueio se clicar em outro
    setActiveIndex(index);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToFooter = () => {
    isScrollingToContact.current = true;
    setActiveIndex(-1);
    const footer = document.getElementById('contact');
    if (footer) {
      footer.scrollIntoView({ behavior: 'smooth' });
    }

    // Tempo maior para o Lenis concluir o scroll longo
    setTimeout(() => {
      isScrollingToContact.current = false;
    }, 2000);
  };

  return (
    <StyledWrapper>
      <div className="fixed-nav-container">
        <div className="nav-pill">
          <div className="wrap">
            {sections.map((section, index) => (
              <button
                key={section.id}
                className={`label ${activeIndex === index ? 'active' : ''}`}
                onClick={() => scrollTo(section.id, index)}
              >
                <span>{section.label}</span>
              </button>
            ))}
            <div
              className="slidebar"
              style={{
                transform: `translateX(${activeIndex * 100}%)`,
                opacity: activeIndex === -1 ? 0 : 1
              }}
            />
          </div>
          <button className="contact-btn" onClick={scrollToFooter}>
            Contate-me
          </button>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .fixed-nav-container {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
  }
  
  .nav-pill {
    background: rgba(10, 10, 10, 0.75);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    padding: 6px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.03) inset;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .wrap {
    --w-label: 100px;
    display: flex;
    align-items: center;
    position: relative;
    border-radius: 12px;
    z-index: 1;
  }

  .label {
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 500;
    font-family: 'Poppins', sans-serif;
    color: #71717a;
    background: transparent;
    border: none;
    padding: 12px 16px;
    width: var(--w-label);
    text-align: center;
    transition: color 0.3s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;
    white-space: nowrap;
  }

  .label:hover {
    color: #d4d4d8;
  }

  .label.active {
    color: #ffffff;
  }

  .slidebar {
    position: absolute;
    height: 100%;
    width: var(--w-label);
    border-radius: 10px;
    background: rgba(255, 255, 255, 0.08);
    top: 0;
    left: 0;
    z-index: 0;
    transition: transform 0.4s cubic-bezier(0.33, 0.83, 0.99, 0.98);
  }

  .contact-btn {
    cursor: pointer;
    font-size: 0.85rem;
    font-weight: 600;
    font-family: 'Poppins', sans-serif;
    color: #000;
    background: #ffffff;
    border: none;
    padding: 10px 20px;
    border-radius: 10px;
    white-space: nowrap;
    transition: all 0.3s ease;
    letter-spacing: 0.02em;
  }

  .contact-btn:hover {
    background: #d4d4d8;
    transform: scale(1.05);
  }

  .contact-btn:active {
    transform: scale(0.95);
  }

  @media (max-width: 600px) {
    .fixed-nav-container {
      bottom: 20px;
      width: 95%;
      display: flex;
      justify-content: center;
    }
    .nav-pill {
      gap: 4px;
      padding: 4px;
      width: 100%;
      justify-content: center;
    }
    .wrap {
      --w-label: 65px;
    }
    .label {
      font-size: 0.65rem;
      padding: 8px 4px;
    }
    .contact-btn {
      font-size: 0.65rem;
      padding: 8px 10px;
    }
  }
`;

export default NavBar;
