import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Code2 } from 'lucide-react'
import { CardContainer, CardBody, CardItem } from './ui/3d-card-effect'

gsap.registerPlugin(ScrollTrigger)

const mockProjects = [
  {
    title: 'LivroSaaS',
    description: 'Plataforma SaaS full-stack desenvolvida para revolucionar a leitura digital. Arquitetura serverless utilizando tecnologias de ponta para garantir escalabilidade, baixa latência e uma experiência de usuário imersiva e sem interrupções.',
    tech: ['React', 'Next.js', 'Tailwind CSS', 'Shadcn UI'],
    image: '/projects/LivroSaas/image.png',
    glowColor: 'rgba(255, 107, 107, 0.15)', // Coral suave
    lineColor: '#FF6B6B', // Coral Vibrante
    link: 'https://country-list-eta.vercel.app/',
    github: '#'
  },
  {
    title: 'Country List',
    description: 'Dashboard interativo focado em performance e UX. Consome API REST externa com paginação customizada, busca em tempo real e cache eficiente. Otimizado para Core Web Vitals, reduzindo o tempo de carregamento (TTI) significativamente.',
    tech: ['Next.js', 'TypeScript', 'Tailwind CSS'],
    image: '/projects/CountryList/image.png',
    glowColor: 'rgba(78, 205, 196, 0.15)', // Teal suave
    lineColor: '#4ECDC4', // Teal Vibrante
    link: '#',
    github: '#'
  },
  {
    title: 'FTT Academy',
    description: 'Portal institucional de alta conversão. Desenvolvido para unificar o ambiente acadêmico ao mercado profissional. Construído com arquitetura modular, garantindo acessibilidade perfeita e pontuação máxima em SEO no Lighthouse.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Lucide React'],
    image: '/projects/Ftt/image.png',
    glowColor: 'rgba(255, 44, 44, 0.15)',
    lineColor: '#ff2c2c',
    link: '#',
    github: '#'
  }
]

const Projects: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const bgGlowRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    let mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      const sections = gsap.utils.toArray('.project-card') as HTMLElement[]

      // Animação do Scroll Horizontal
      const scrollTween = gsap.to(wrapperRef.current, {
        x: () => -(wrapperRef.current!.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          start: "top top",
          scrub: 1,
          snap: 1 / (sections.length - 1),
          end: () => "+=" + (wrapperRef.current!.scrollWidth - window.innerWidth),
        }
      })

      // Transição de cor do fundo dinâmico baseada no scroll (Fix Reverse Bug)
      sections.forEach((section, idx) => {
        // idx 0 é o card de introdução (Sem cor / Transparente)
        // idx 1 é o Projeto 1 (mockProjects[0])
        const color = idx === 0 ? 'transparent' : mockProjects[idx - 1].glowColor;

        ScrollTrigger.create({
          trigger: section,
          containerAnimation: scrollTween,
          start: "left center",
          end: "right center",
          onToggle: (self) => {
            // O GSAP vai disparar isso sempre que o card entrar OU sair do centro da tela
            if (self.isActive) {
              gsap.to(bgGlowRef.current, {
                background: `radial-gradient(circle at center, ${color}, transparent 70%)`,
                duration: 0.8,
                overwrite: "auto" // Evita que animações de scroll rápido entrem em conflito
              })
            }
          }
        })
      })
    })

    return () => mm.revert()
  }, { scope: containerRef })

  return (
    // FIX: display: 'block' para evitar que o align-items centralize tudo e corte o primeiro card
    <section ref={containerRef} id="projects" style={{ padding: 0, margin: 0, overflow: 'hidden', width: '100vw', background: '#050505', position: 'relative', display: 'block' }}>

      {/* Background Glow Dinâmico */}
      <div
        ref={bgGlowRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80vw',
          height: '80vh',
          background: 'radial-gradient(circle at center, transparent, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.8,
          zIndex: 0,
          pointerEvents: 'none'
        }}
      />

      <div className="projects-wrapper flex flex-col md:flex-row md:flex-nowrap md:w-max relative z-10" ref={wrapperRef}>

        {/* Card de introdução */}
        <div className="project-card" style={{ width: '100vw', minHeight: '80vh', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
          <h2 style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', fontWeight: 900, textAlign: 'center', lineHeight: 1, letterSpacing: '-0.03em' }}>
            PROJETOS <br />
            <span style={{ color: 'var(--foreground)' }}>SELECIONADOS</span>
            <p style={{ fontSize: '1rem', marginTop: '20px', fontWeight: 400, color: 'var(--text-muted)', letterSpacing: 'normal' }}>
              {window.innerWidth > 768 ? 'Scroll para explorar →' : 'Role para baixo ↓'}
            </p>
          </h2>
        </div>

        {/* Cards dos projetos - Design Editorial (Sem bordas globais) */}
        {mockProjects.map((project, idx) => (
          <div key={idx} className="project-card" style={{ width: '100vw', minHeight: '100vh', height: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px 20px' }}>
            <div className="w-full max-w-[1400px] grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-12 md:gap-24 items-center">
              
              {/* Lado Esquerdo - Info Minimalista */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {/* Título com linha reta na cor do projeto */}
                  <h3 style={{ 
                    fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
                    fontWeight: 900, 
                    color: 'var(--foreground)', 
                    lineHeight: 1.1, 
                    letterSpacing: '-0.02em',
                    borderBottom: `4px solid ${project.lineColor}`,
                    paddingBottom: '8px',
                    width: 'fit-content'
                  }}>

                    {project.title}
                  </h3>
                </div>

                <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', lineHeight: 1.6, maxWidth: '450px', marginTop: '10px' }}>

                  {project.description}
                </p>

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '15px 0' }}>
                  {project.tech.map(t => (
                    <span key={t} style={{
                      padding: '4px 12px',
                      borderRadius: '100px',
                      border: '1px solid rgba(255,255,255,0.1)',
                      fontSize: '0.8rem',
                      color: 'var(--foreground)'
                    }}>
                      {t}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '25px', marginTop: '10px' }}>
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 600, fontSize: '1.1rem' }}
                  >
                    <ExternalLink size={20} color={project.glowColor.replace('0.15', '1')} /> Live Demo
                  </a>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 500 }}
                  >
                    <Code2 size={20} /> GitHub
                  </a>
                </div>
              </div>

              {/* Lado Direito - Imagem com 3D Card Effect */}
              <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <CardContainer className="inter-var w-full">
                  <CardBody className="bg-black/20 relative group/card w-full h-auto rounded-2xl border-white/10 border">
                    <CardItem translateZ="50" className="w-full">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-auto object-cover rounded-2xl"
                        style={{ 
                          boxShadow: `0 30px 60px -15px ${project.glowColor.replace('0.15', '0.4')}`,
                          transform: 'translateZ(0)', // Evita blur de aceleração de hardware
                          willChange: 'transform',

                        }}
                      />
                    </CardItem>
                  </CardBody>
                </CardContainer>
              </div>

            </div>
          </div>
        ))}

      </div>
    </section>
  )
}

export default Projects
