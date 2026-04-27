import ScrollReveal from '../ui/ScrollReveal';
import GlareCard from '../ui/GlareCard';
function About() {

  return (
    <section id="about" style={{ padding: '150px 20px', background: '#0a0a0a' }} className="section-reveal">
      <div className="container">
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-12 items-center max-w-[1200px] mx-auto">
          
          <div className="flex justify-center md:order-2">
            <GlareCard className="w-full max-w-[300px] md:max-w-[400px] aspect-4/5 bg-zinc-900 flex items-center justify-center">
              <img 
                src="/me.png" 
                alt="Adryan" 
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback se a imagem não existir
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x500/111111/ffffff?text=ME.PNG';
                }}
              />
            </GlareCard>
          </div>

          <div className="md:order-1 text-left">
            <ScrollReveal
              baseOpacity={0.1}
              enableBlur
              baseRotation={3}
              blurStrength={4}
              style={{
                fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                lineHeight: 1.4,
                textAlign: 'left'
              }}
            >
              Eu sou Adryan, Graduando de Engenharia de Software, apaixonado por tecnologia e inovação. Busco uma oportunidade para aplicar meus conhecimentos e contribuir para o crescimento e impacto de um produto. Atualmente procuro um desafio como Desenvolvedor Front-End.
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  )

}

export default About

/* 
fontSize: 'clamp(2rem, 5vw, 4rem)',
            lineHeight: 1.3,
            
            maxWidth: '1000px',
            margin: '0 auto',
            // O truque do CSS para o efeito scrub de texto
            background: `linear-gradient(to right, var(--foreground) 50%, rgba(255,255,255,0.1) 50%)`,
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent' */