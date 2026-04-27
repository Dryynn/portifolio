import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

interface SmoothScrollProps {
  children: React.ReactNode
}

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing suave
      syncTouch: true, // Melhora no mobile
      touchMultiplier: 2,
    })

    // Sincroniza o Lenis com o ScrollTrigger do GSAP
    lenis.on('scroll', ScrollTrigger.update)

    // Adiciona o ticker do Lenis ao GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })

    // Desativa a defasagem natural do GSAP
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove(lenis.raf)
    }
  }, [])

  return <>{children}</>
}

export default SmoothScroll
