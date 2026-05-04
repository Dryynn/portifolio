import { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { Home } from 'lucide-react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

const sections = [
  { id: 'home', label: <Home size={18} /> },
  { id: 'about', label: 'Sobre' },
  { id: 'skills', label: 'Stack' },
  { id: 'projects', label: 'Projetos' },
  { id: 'experience', label: 'Trajetória' },
];

const observerSections = [
  ...sections,
  { id: 'education', label: '' },
  { id: 'contact', label: '' }
];

const NavBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowNav(true);
      } else {
        setShowNav(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      // Linha focal de 1% localizada a 30% do topo da tela. 
      // Garante que apenas uma seção esteja ativa por vez.
      rootMargin: '-30% 0px -69% 0px',
      threshold: 0
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      // Se o usuário clicou em um link, ignoramos o observer até o scroll terminar
      if (isScrollingRef.current) return;

      // Pega as seções que cruzaram a linha neste momento
      const intersectingEntries = entries.filter(e => e.isIntersecting);

      if (intersectingEntries.length > 0) {
        // Se rolamos rápido, pega a última que entrou
        const currentEntry = intersectingEntries[intersectingEntries.length - 1];
        const currentId = currentEntry.target.id;

        // Se currentId não estiver no array (ex: education, contact), index será -1,
        // o que esconde a pílula de forma elegante sem precisar de lógicas extras.
        const index = sections.findIndex(s => s.id === currentId);
        setActiveIndex(index);
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
    // Bloqueia atualizações do observer para evitar "pulos"
    isScrollingRef.current = true;
    setActiveIndex(index);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000); // 1 segundo é suficiente para a maioria dos scrolls suaves

    const element = document.getElementById(id);
    if (element) {
      // Usar GSAP para scroll garante que não haja conflitos com o Lenis ou outros eventos do navegador
      gsap.to(window, {
        scrollTo: { y: element, autoKill: false },
        duration: 1.2,
        ease: 'power3.inOut'
      });
    }
  };

  const scrollToFooter = () => {
    isScrollingRef.current = true;
    setActiveIndex(-1);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 1000);

    const footer = document.getElementById('contact');
    if (footer) {
      gsap.to(window, {
        scrollTo: { y: footer, autoKill: false },
        duration: 1.2,
        ease: 'power3.inOut'
      });
    }
  };

  return (
    <StyledWrapper $visible={showNav}>
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

const StyledWrapper = styled.div<{ $visible: boolean }>`
  .fixed-nav-container {
    position: fixed;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%) translateY(${props => props.$visible ? '0' : '150%'});
    opacity: ${props => props.$visible ? '1' : '0'};
    transition: all 0.6s cubic-bezier(0.22, 1, 0.36, 1);
    z-index: 100;
    pointer-events: ${props => props.$visible ? 'auto' : 'none'};
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
      width: auto;
      max-width: 95vw;
      display: flex;
      justify-content: center;
    }
    .nav-pill {
      gap: 4px;
      padding: 4px;
      width: auto;
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
