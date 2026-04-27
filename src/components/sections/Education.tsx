import  { useRef } from 'react'
import { GraduationCap, Award, BookOpen, Code2 } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SpotlightCard from '../ui/SpotlightCard'

gsap.registerPlugin(ScrollTrigger)

const graduation = {
  institution: 'UniEvangélica (Ceres - GO)',
  degree: 'Engenharia de Software',
  period: '01/2024 - 12/2027 (Cursando)',
  description: 'O curso trata de toda a estrutura do software, desde o seu planejamento inicial até a sua criação no código.',
}

const courses = [
  {
    title: 'JavaScript [40 Horas]',
    provider: 'Curso em Vídeo',
  },
  {
    title: 'HTML5 e CSS3 (Módulos 1 ao 4)',
    provider: 'Curso em Vídeo (Gustavo Guanabara)',
  },
  {
    title: 'Algoritmos e Lógica de Programação [40 horas]',
    provider: 'Curso em Vídeo',
  },
  {
    title: 'Scrum Fundamentals Certified',
    provider: 'SCRUMstudy',
  }
]

const Education = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Animação para o Card Principal (Graduação)
    gsap.from('.edu-main-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none reverse'
      },
      y: 50,
      opacity: 0,
      scale: 0.95,
      duration: 0.8,
      ease: 'back.out(1.5)'
    })

    // Animação Stagger para os Cursos
    gsap.from('.edu-course-card', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
        toggleActions: 'play none none reverse'
      },
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
      ease: 'power3.out'
    })
  }, { scope: containerRef })

  return (
    <section ref={containerRef} id="education" style={{ padding: '120px 0', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1100px' }}>
        <h2 style={{ 
          fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
          marginBottom: '5rem', 
          textAlign: 'center',
          fontWeight: 900,
          color: 'var(--foreground)',
          letterSpacing: '-0.03em'
        }}>
          Minha <span style={{ color: 'var(--primary)' }}>Formação</span>
        </h2>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
          gap: '40px',
          alignItems: 'start'
        }}>
          {/* Lado Esquerdo - Graduação Principal */}
          <div className="edu-main-card">
            <h3 style={{ 
              marginBottom: '25px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              fontSize: '1.8rem',
              fontWeight: 800
            }}>
              <GraduationCap size={32} color="var(--primary)" /> 
              Ensino Superior
            </h3>
            
            <SpotlightCard className="grad-spotlight" spotlightColor="rgba(0, 210, 255, 0.15)">
              <div style={{ padding: '40px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <span style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    width: 'fit-content',
                    background: 'rgba(0, 210, 255, 0.1)', 
                    color: 'var(--primary)',
                    padding: '6px 14px', 
                    borderRadius: '100px',
                    fontSize: '0.85rem',
                    fontWeight: 600
                  }}>
                    {graduation.period}
                  </span>

                  <h4 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--foreground)', lineHeight: '1.2' }}>
                    {graduation.degree}
                  </h4>
                  
                  <p style={{ fontWeight: 600, color: 'var(--text-muted)', fontSize: '1.1rem' }}>
                    {graduation.institution}
                  </p>

                  <p style={{ 
                    color: 'var(--foreground)', 
                    opacity: 0.7, 
                    lineHeight: '1.8',
                    marginTop: '10px',
                    fontSize: '1rem' 
                  }}>
                    {graduation.description}
                  </p>

                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Lado Direito - Certificações e Cursos */}
          <div>
            <h3 style={{ 
              marginBottom: '25px', 
              display: 'flex', 
              alignItems: 'center', 
              gap: '12px',
              fontSize: '1.8rem',
              fontWeight: 800
            }}>
              <Award size={32} color="var(--secondary)" /> 
              Certificações & Cursos
            </h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '15px' }}>
              {courses.map((course, index) => (
                <SpotlightCard key={index} className="edu-course-card" spotlightColor="rgba(157, 0, 255, 0.1)">
                  <div style={{ 
                    padding: '25px', 
                    display: 'flex', 
                    alignItems: 'flex-start',
                    gap: '15px' 
                  }}>
                    <div style={{ 
                      background: 'rgba(157, 0, 255, 0.1)', 
                      padding: '12px', 
                      borderRadius: '12px',
                      color: 'var(--secondary)'
                    }}>
                      {index % 2 === 0 ? <Code2 size={24} /> : <BookOpen size={24} />}
                    </div>
                    
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                      <h4 style={{ 
                        fontSize: '1.2rem', 
                        fontWeight: 700, 
                        color: 'var(--foreground)' 
                      }}>
                        {course.title}
                      </h4>
                      <p style={{ 
                        color: 'var(--text-muted)', 
                        fontSize: '0.95rem',
                        fontWeight: 500
                      }}>
                        {course.provider}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Education
