import React, { useRef, useState } from 'react'
import { Download, Copy, Check, MapPin } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import styled from 'styled-components'
import curriculo from '/AdryanSilvaGarcia_Curriculo.pdf?url'

const EMAIL = 'adryansilva321@email.com'

const ActionButton = styled.button`
  position: relative;
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.02em;
  border-radius: 100px;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.03);
  color: #fff;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  transition: all 0.4s cubic-bezier(0.23, 1, 0.32, 1);
  backdrop-filter: blur(10px);

  span {
    position: relative;
    z-index: 10;
    display: inline-flex;
    align-items: center;
    gap: 0.8em;
    padding: 1.2em 2.4em;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: #fff;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.6s ease, height 0.6s ease;
    z-index: 0;
  }

  &:hover {
    color: #000;
    border-color: #fff;
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(255, 255, 255, 0.1);
  }

  &:hover::before {
    width: 300%;
    height: 500%;
  }

  &:active {
    transform: scale(0.95);
  }
`

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [copied, setCopied] = useState(false)

  useGSAP(() => {
    // Efeito Magnético em múltiplos elementos
    const magnets = gsap.utils.toArray('.magnetic') as HTMLElement[]

    magnets.forEach((magnet) => {
      magnet.addEventListener('mousemove', (e) => {
        const position = magnet.getBoundingClientRect()
        const x = e.clientX - position.left - position.width / 2
        const y = e.clientY - position.top - position.height / 2

        gsap.to(magnet, {
          x: x * 0.2,
          y: y * 0.2,
          duration: 0.6,
          ease: 'power3.out'
        })
      })

      magnet.addEventListener('mouseleave', () => {
        gsap.to(magnet, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: 'elastic.out(1, 0.3)'
        })
      })
    })

    // Animação da Aura de fundo
    gsap.to('.footer-aura', {
      scale: 1.2,
      opacity: 0.4,
      duration: 8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }, { scope: containerRef })

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" ref={containerRef} style={{ 
      minHeight: '80vh', 
      padding: '150px 20px', 
      background: '#050505', 
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderTop: '1px solid rgba(255, 255, 255, 0.05)'
    }}>
      {/* Elementos Visuais de Fundo */}
      <div className="footer-aura" style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(80px)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        <div className="magnetic" style={{ display: 'inline-block', cursor: 'default' }}>
          <h2 ref={headingRef} style={{ 
            fontSize: 'clamp(3rem, 10vw, 7rem)', 
            marginBottom: '1rem', 
            letterSpacing: '-0.04em', 
            fontWeight: 900, 
            lineHeight: 0.9,
            background: 'linear-gradient(to bottom, #fff 40%, rgba(255,255,255,0.4))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Vamos trabalhar Juntos
          </h2>
        </div>
        
        <p style={{ 
          color: 'var(--text-muted)', 
          marginBottom: '80px', 
          fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
          maxWidth: '600px',
          margin: '0 auto 80px auto',
          fontWeight: 400
        }}>
          Estou sempre aberto a novos desafios e colaborações inovadoras. 
          Sinta-se à vontade para me chamar.
        </p>

        {/* Botões de Ação */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '25px', marginBottom: '100px', flexWrap: 'wrap' }}>
          <ActionButton onClick={handleCopyEmail} className="magnetic">
            <span>
              {copied ? <Check size={22} /> : <Copy size={22} />}
              {copied ? 'Email Copiado!' : 'Copiar meu Email'}
            </span>
          </ActionButton>

          <ActionButton as="a" href={curriculo} download style={{ textDecoration: 'none' }} className="magnetic">
            <span>
              <Download size={22} />
              Meu Currículo
            </span>
          </ActionButton>
        </div>

        {/* Redes Sociais e Info */}
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            {[
              { href: 'https://www.linkedin.com/in/adryan-silva-garcia-2373573a8', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> },
              { href: 'https://github.com/Dryynn', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg> }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="social-link-new magnetic"
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.02)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  color: 'rgba(255,255,255,0.5)',
                  transition: 'all 0.3s ease'
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'rgba(255,255,255,0.3)', fontSize: '0.9rem' }}>
            <MapPin size={16} />
            <span>ITAPURANGA, GO — BRASIL</span>
          </div>
        </div>
      </div>

      <style>{`
        .social-link-new:hover {
          color: #fff !important;
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: #fff !important;
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        }
      `}</style>
    </section>
  )
}

export default Footer
