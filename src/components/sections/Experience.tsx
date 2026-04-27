import  { useRef } from 'react'
import { Briefcase, Calendar, Building2 } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const experiences = [
  {
    company: 'Netside Sistemas',
    role: 'Analista de Suporte',
    period: '06/2025 - Atualmente',
    description: 'Atuo no suporte a clientes, auxiliando na resolução de problemas técnicos e fornecendo informações sobre os produtos e serviços da empresa, organização de arquivos digitais, documentos e informações, além do auxílio nas tarefas administrativas e operacionais do setor financeiro.',
    icon: <Building2 size={20} />
  },
  {
    company: 'Ceramica Mota Itapuranga',
    role: 'Auxiliar Administrativo',
    period: '04/2022 - 05/2025',
    description: 'Gestão de documentos, auxilio no setor administrativo e financeiro utilizando ferramentas como Excel e sistemas internos, emissão de notas fiscais.',
    icon: <Briefcase size={20} />
  },
  {
    company: 'Nacional Auto Peças',
    role: 'Auxiliar de vendedor',
    period: '07/2021 - 04/2022',
    description: 'Apoio no processo de vendas, atendimendo ao cliente, controle de estoque, organização de produtos e ambiente',
    icon: <Briefcase size={20} />
  }
]

const Experience = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Animação da linha de progresso
    gsap.fromTo(lineRef.current, 
      { scaleY: 0 },
      { 
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: timelineRef.current,
          start: 'top 80%',
          end: 'bottom 80%',
          scrub: true,
        }
      }
    )

    // Animação dos itens
    const items = gsap.utils.toArray('.experience-item') as HTMLElement[]
    
    items.forEach((item, index) => {
      const card = item.querySelector('.experience-card')
      const dot = item.querySelector('.experience-dot')
      const isEven = index % 2 === 0

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
          toggleActions: 'play none none reverse'
        }
      })

      tl.fromTo(dot, {
        scale: 0,
        opacity: 0,
      }, {
        scale: 1,
        opacity: 1,
        duration: 0.5,
        ease: 'back.out(1.7)'
      })
      .fromTo(card, {
        x: isEven ? 100 : -100,
        opacity: 0,
      }, {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.3')
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="experience" style={{ padding: '120px 0', overflow: 'hidden' }}>
      <div className="container">
        <h2 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          marginBottom: '5rem', 
          textAlign: 'center',
          fontWeight: 900,
          color: 'var(--foreground)',
          letterSpacing: '-0.03em'
        }}>
          Trajetória <span style={{ color: 'var(--primary)' }}>Profissional</span>
        </h2>
        
        <div ref={timelineRef} className="timeline-wrapper" style={{ 
          position: 'relative', 
          maxWidth: '1000px', 
          margin: '0 auto' 
        }}>
          {/* Eixo Central (Background) */}
          <div className="timeline-axis-bg" style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'rgba(255, 255, 255, 0.05)',
            transform: 'translateX(-50%)',
            borderRadius: '2px'
          }} />

          {/* Eixo Central (Progresso Animado) */}
          <div ref={lineRef} className="timeline-axis-progress" style={{
            position: 'absolute',
            left: '50%',
            top: 0,
            bottom: 0,
            width: '2px',
            background: 'var(--primary)',
            transform: 'translateX(-50%)',
            transformOrigin: 'top',
            borderRadius: '2px',
            zIndex: 1,
            boxShadow: '0 0 15px var(--primary)'
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0
              return (
                <div key={index} className="experience-item" style={{ 
                  display: 'flex', 
                  justifyContent: isEven ? 'flex-end' : 'flex-start',
                  alignItems: 'center',
                  position: 'relative',
                  width: '100%',
                  minHeight: '150px'
                }}>
                  {/* Marcador Central */}
                  <div className="experience-dot" style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'var(--background)',
                    border: '2px solid var(--border-color)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2,
                    color: 'var(--primary)',
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.5)',
                    transition: 'all 0.3s ease'
                  }}>
                    {exp.icon}
                  </div>

                  {/* Card de Conteúdo */}
                  <div className="experience-card" style={{
                    width: 'calc(50% - 50px)',
                    background: 'var(--card-bg)',
                    backdropFilter: 'blur(12px)',
                    border: '1px solid var(--border-color)',
                    padding: '35px',
                    borderRadius: '24px',
                    position: 'relative',
                    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                  }}>
                    {/* Seta indicadora */}
                    <div className="experience-arrow" style={{
                      position: 'absolute',
                      top: '50%',
                      [isEven ? 'left' : 'right']: '-10px',
                      transform: 'translateY(-50%) rotate(45deg)',
                      width: '20px',
                      height: '20px',
                      background: '#0d0d0d', /* Um tom bem escuro para fundir com a borda/fundo */
                      borderLeft: isEven ? '1px solid var(--border-color)' : 'none',
                      borderBottom: isEven ? '1px solid var(--border-color)' : 'none',
                      borderRight: !isEven ? '1px solid var(--border-color)' : 'none',
                      borderTop: !isEven ? '1px solid var(--border-color)' : 'none',
                      zIndex: -1,
                      transition: 'border-color 0.4s ease'
                    }} />

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                      <div style={{ 
                        display: 'inline-flex', 
                        alignItems: 'center', 
                        gap: '8px', 
                        background: 'rgba(0, 210, 255, 0.1)', 
                        color: 'var(--primary)',
                        padding: '6px 14px', 
                        borderRadius: '100px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        width: 'fit-content'
                      }}>
                        <Calendar size={14} />
                        {exp.period}
                      </div>

                      <div>
                        <h3 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--foreground)', marginBottom: '4px' }}>
                          {exp.role}
                        </h3>
                        <p style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: '1.1rem' }}>
                          {exp.company}
                        </p>
                      </div>
                      
                      <p style={{ 
                        color: 'var(--text-muted)', 
                        lineHeight: '1.8',
                        fontSize: '0.95rem' 
                      }}>
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        .experience-card:hover {
          border-color: var(--primary);
          transform: scale(1.02) translateY(-5px);
          box-shadow: 0 20px 40px rgba(0, 210, 255, 0.15);
        }
        
        .experience-card:hover .experience-arrow {
          border-color: var(--primary) !important;
        }
        
        .experience-item:hover .experience-dot {
          border-color: var(--primary);
          color: var(--background);
          background: var(--primary);
          transform: translate(-50%, -50%) scale(1.2);
          box-shadow: 0 0 25px rgba(0, 210, 255, 0.5);
        }

        @media (max-width: 768px) {
          .timeline-axis-bg, .timeline-axis-progress {
            left: 20px !important;
            transform: none !important;
          }
          .experience-item {
            justify-content: flex-start !important;
            padding-left: 50px !important;
            gap: 20px !important;
          }
          .experience-card {
            width: 100% !important;
            padding: 25px !important;
          }
          .experience-dot {
            left: 20px !important;
            width: 36px !important;
            height: 36px !important;
            transform: translate(-50%, -50%) !important;
          }
          .experience-dot svg {
            width: 16px !important;
            height: 16px !important;
          }
          .experience-arrow {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}

export default Experience
