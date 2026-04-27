import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SmoothScroll from './components/ui/SmoothScroll'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Education from './components/sections/Education'
import Footer from './components/sections/Footer'
import NavBar from './components/ui/NavBar'
import Skills from './components/sections/Skills'

gsap.registerPlugin(ScrollTrigger)

function App() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    // Media Query do GSAP para desabilitar animações pesadas no mobile se necessário
    let mm = gsap.matchMedia()

    mm.add("(min-width: 768px)", () => {
      const sections = gsap.utils.toArray('.section-reveal') as HTMLElement[]
      
      gsap.set(sections, { opacity: 0, y: 50 })

      sections.forEach((section) => {
        gsap.to(section, { 
          opacity: 1, 
          y: 0, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse'
          }
        })
      })
    })

    // No mobile, apenas mostra o conteúdo sem o fade up complexo para garantir a legibilidade
    mm.add("(max-width: 767px)", () => {
      const sections = gsap.utils.toArray('.section-reveal') as HTMLElement[]
      gsap.set(sections, { opacity: 1, y: 0 })
    })

    return () => mm.revert()
  }, { scope: containerRef })

  return (
    <SmoothScroll>
      <div ref={containerRef} className="app-container">
        <div className="dot-pattern-bg" />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Footer />
        <NavBar />
      </div>
    </SmoothScroll>
  )
}

export default App
