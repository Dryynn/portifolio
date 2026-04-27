import React, { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import SplitType from 'split-type'
import Squares from '../ui/Squares'

const Hero: React.FC = () => {
  const container = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  useGSAP(() => {
    if (!titleRef.current) return

    // Dividir o texto em caracteres para a animação
    const text = new SplitType(titleRef.current, { types: 'chars' })
    const chars = text.chars

    // Animação inicial
    const tl = gsap.timeline()
    
    tl.from(chars, {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: 'power4.out',
      delay: 0.2
    })
    .from(subtitleRef.current, {
      y: 20,
      opacity: 0,
      duration: 1,
      ease: 'power3.out'
    }, "-=0.5")

    // Efeito magnético e de cor no hover com as letras
    if (chars) {
      chars.forEach((char) => {
        char.addEventListener('mouseenter', () => {
          gsap.to(char, {
            y: -15,
            color: 'var(--text-muted)',
            scale: 1.2,
            duration: 0.3,
            ease: 'back.out(2)'
          })
        })
        
        char.addEventListener('mouseleave', () => {
          gsap.to(char, {
            y: 0,
            color: 'var(--foreground)',
            scale: 1,
            duration: 0.5,
            ease: 'power2.out'
          })
        })
      })
    }

    // Cleanup splitType on unmount
    return () => {
      text.revert()
    }
  }, { scope: container })

  return (
    <section id="home" ref={container} style={{ 
      position: 'relative',
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      overflow: 'hidden',
      background: 'var(--background)' // Cobre as bolinhas globais
    }}>
      
      {/* Background animado Squares (React Bits Shape Grid) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0 }}>
        <Squares 
          direction="diagonal" 
          speed={0.5} 
          squareSize={40} 
          borderColor="rgba(255, 255, 255, 0.05)" 
          hoverFillColor="#ffffff"
        />
      </div>
      
      {/* Máscara de vinheta para fazer o grid sumir suavemente nas bordas */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1,
        background: 'radial-gradient(circle at center, transparent 20%, var(--background) 100%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
        <h1 
          ref={titleRef} 
          style={{ 
            fontSize: 'clamp(2rem, 10vw, 8rem)', 
            fontWeight: 900,
            lineHeight: 1,
            marginBottom: '20px',
            cursor: 'default'
          }}
        >
          ADRYAN
        </h1>
        <p 
          ref={subtitleRef} 
          style={{ 
            fontSize: 'clamp(0.8rem, 2.5vw, 1.5rem)', 
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
            letterSpacing: '0.2em'
          }}
        >
          Software Engineer & Front-End Developer
        </p>
      </div>
    </section>
  )
}

export default Hero
