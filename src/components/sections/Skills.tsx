import React from 'react';
import SkillCard from '../ui/Card';
import { Code2, Layers, Terminal, Database, Palette, Zap, Globe, GitBranch } from 'lucide-react';

const frontEndSkills = [
  { icon: <Code2 size={44} />, label: 'React', rotation: -15 },
  { icon: <Layers size={44} />, label: 'Next.js', rotation: 5 },
  { icon: <Terminal size={44} />, label: 'TypeScript', rotation: 25 },
];

const designSkills = [
  { icon: <Palette size={44} />, label: 'Tailwind', rotation: -12 },
  { icon: <Zap size={44} />, label: 'GSAP', rotation: 3 },
  { icon: <Globe size={44} />, label: 'HTML/CSS', rotation: 18 },
];

const backEndSkills = [
  { icon: <Database size={44} />, label: 'Node.js', rotation: -10 },
  { icon: <GitBranch size={44} />, label: 'Git', rotation: 8 },
];

const Skills: React.FC = () => {
  return (
    <section id="skills" className="section-reveal" style={{ padding: '120px 20px', background: '#0a0a0a' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <h2 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: 900,
          textAlign: 'center',
          letterSpacing: '-0.03em',
          marginBottom: '1rem',
          color: 'var(--foreground)'
        }}>
          Stack <span style={{ color: 'var(--text-muted)' }}>Tecnológico</span>
        </h2>
        <p style={{
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '1.1rem',
          maxWidth: '600px',
          margin: '0 auto 80px auto'
        }}>
          As ferramentas que utilizo para construir experiências digitais de alto impacto.
        </p>

        {/* Leques empilhados verticalmente */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '80px',
          alignItems: 'center',
        }}>
          <SkillCard items={frontEndSkills} categoryLabel="Front-End" />
          <SkillCard items={designSkills} categoryLabel="Design & Animação" />
          <SkillCard items={backEndSkills} categoryLabel="Back-End & Tools" />
        </div>

      </div>
    </section>
  );
}

export default Skills;
