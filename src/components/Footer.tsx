import React, { useRef, useState } from 'react'
import { Download, Copy, Check, MapPin } from 'lucide-react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import styled from 'styled-components'
import curriculo from '../public/AdryanSilvaGarcia_Curriculo.pdf'

const EMAIL = 'adryansilva321@email.com'

const ActionButton = styled.button`
  position: relative;
  font-family: 'Poppins', sans-serif;
  font-weight: 600;
  font-size: 16px;
  letter-spacing: 0.05em;
  border-radius: 0.8em;
  cursor: pointer;
  border: none;
  background: linear-gradient(to right, #3f3f46, #27272a);
  color: ghostwhite;
  overflow: hidden;
  display: inline-flex;
  align-items: center;
  transition: transform 0.2s ease;

  span {
    position: relative;
    z-index: 10;
    transition: color 0.4s;
    display: inline-flex;
    align-items: center;
    gap: 0.5em;
    padding: 0.8em 1.4em;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -10%;
    width: 120%;
    height: 100%;
    background: #000;
    transform: skew(30deg);
    transition: transform 0.4s cubic-bezier(0.3, 1, 0.8, 1);
    z-index: 0;
  }

  &:hover::before {
    transform: translate3d(100%, 0, 0);
  }

  &:active {
    transform: scale(0.95);
  }
`

const Footer: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)

  useGSAP(() => {
    const magnets = gsap.utils.toArray('.social-link') as HTMLElement[]

    magnets.forEach((magnet) => {
      magnet.addEventListener('mousemove', (e) => {
        const position = magnet.getBoundingClientRect()
        const x = e.clientX - position.left - position.width / 2
        const y = e.clientY - position.top - position.height / 2

        gsap.to(magnet, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.5,
          ease: 'power3.out'
        })
      })

      magnet.addEventListener('mouseleave', () => {
        gsap.to(magnet, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: 'elastic.out(1, 0.3)'
        })
      })
    })
  }, { scope: containerRef })

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" ref={containerRef} style={{ minHeight: '50vh', padding: '100px 20px', background: '#0a0a0a', borderTop: '1px solid var(--border-color)' }}>
      <div className="container" style={{ textAlign: 'center' }}>
        <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem', letterSpacing: '-0.05em', fontWeight: 900, color: 'var(--foreground)' }}>
          Vamos Trabalhar Juntos?
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '50px', fontSize: '1.2rem' }}>
          Sempre em busca da próxima grande ideia e novos desafios técnicos.
        </p>

        {/* Botões de Ação */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '60px', flexWrap: 'wrap' }}>
          <ActionButton onClick={handleCopyEmail}>
            <span>
              {copied ? <Check size={20} /> : <Copy size={20} />}
              {copied ? 'Copiado!' : 'Copiar Email'}
            </span>
          </ActionButton>

          <ActionButton as="a" href={curriculo} download style={{ textDecoration: 'none' }}>
            <span>
              <Download size={20} />
              Baixar Currículo
            </span>
          </ActionButton>
        </div>

        {/* Redes Sociais */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '40px' }}>
          <a
            href="https://www.linkedin.com/in/adryan-silva-garcia-2373573a8"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: 'var(--text-muted)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
          </a>
          <a
            href="https://github.com/Dryynn"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '14px',
              border: '1px solid rgba(255,255,255,0.08)',
              background: 'rgba(255,255,255,0.04)',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              textDecoration: 'none',
              color: 'var(--text-muted)'
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          </a>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', color: 'var(--text-muted)' }}>
          <MapPin size={20} color="var(--accent)" />
          <span style={{ fontSize: '1.1rem' }}>Itapuranga, GO - Brasil</span>
        </div>
      </div>

      <style>{`
        .social-link {
          transition: all 0.3s ease;
        }
        .social-link:hover {
          color: var(--foreground) !important;
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          transform: translateY(-5px);
        }
      `}</style>
    </section>
  )
}

export default Footer
