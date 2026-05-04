# Portfólio - Adryan

Este é meu portfólio pessoal, um projeto onde reúno meus projetos e habilidades como desenvolvedor front-end. Construído com React, TypeScript e Vite, o foco foi criar uma experiência visual moderna e fluida, com animações suaves que tornam a navegação mais agradável e imersiva.

Acesse aqui meu [portifolio](https://portifolio-adryan.vercel.app/).

## Destaques

- **Design Moderno**: Interface elegante com componentes customizados
- **Animações Suaves**: Implementadas com GSAP e Framer Motion
- **Responsivo**: Totalmente adaptado para diferentes tamanhos de tela
- **Performance**: Otimizado com Vite para carregamento rápido
- **Acessibilidade**: Componentes construídos com boas práticas de UX
- **Modular**: Código bem organizado e fácil de manter

## Stack Tecnológico

### Front-end
- **React 19** - Biblioteca UI moderna
- **TypeScript** - Tipagem estática para maior segurança
- **Vite** - Build tool rápido e eficiente
- **Tailwind CSS** - Utilitários CSS para styling
- **Framer Motion** - Animações declarativas
- **GSAP** - Animações avançadas com ScrollTrigger

### Componentes & UI
- **shadcn/ui** - Componentes acessíveis e customizáveis
- **Lucide React** - Ícones modernos e consistentes
- **Radix UI** - Primitivos UI sem estilos

### Desenvolvimento
- **ESLint** - Linter para manter código consistente
- **PostCSS** - Processador CSS avançado

## Estrutura do Projeto

```
src/
├── components/
│   ├── sections/
│   │   ├── Hero.tsx              # Seção inicial do portfólio
│   │   ├── About.tsx             # Sobre mim
│   │   ├── Projects.tsx          # Projetos destacados
│   │   ├── Experience.tsx        # Experiência profissional
│   │   ├── Education.tsx         # Formação educacional
│   │   ├── Skills.tsx            # Habilidades técnicas
│   │   └── Footer.tsx            # Rodapé
│   └── ui/
│       ├── NavBar.tsx            # Navegação principal
│       ├── Card.tsx              # Componente de card
│       ├── Button.tsx            # Componente de botão
│       ├── GlareCard.tsx         # Card com efeito glare
│       ├── SpotlightCard.tsx     # Card com spotlight
│       ├── ScrollReveal.tsx      # Animação de scroll
│       └── SmoothScroll.tsx      # Scroll suave
├── lib/
│   └── utils.ts                  # Utilidades
├── App.tsx                       # Componente raiz
└── main.tsx                      # Entrada da aplicação
```

## Como Começar

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn como gerenciador de pacotes

### Instalação

1. **Clone o repositório**
```bash
git clone https://github.com/seu-usuario/portifolio.git
cd portifolio
```

2. **Instale as dependências**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

4. **Abra no navegador**
```
http://localhost:5173
```

## Scripts Disponíveis

```bash
# Inicia o servidor de desenvolvimento com HMR
npm run dev

# Compila TypeScript e constrói para produção
npm run build

# Visualiza a build de produção localmente
npm run preview

# Executa verificação de linting
npm run lint
```

## Seções do Portfólio

- **Hero**: Apresentação inicial com animação de entrada
- **About**: Breve descrição sobre mim e minha missão
- **Projects**: Showcase dos projetos desenvolvidos
- **Experience**: Histórico profissional e experiências
- **Education**: Formação educacional e cursos
- **Skills**: Competências técnicas organizadas por categoria

## Animações e Efeitos

O projeto utiliza várias bibliotecas de animação:

- **GSAP com ScrollTrigger**: Para animações sincronizadas com scroll
- **Framer Motion**: Para transições suaves entre componentes
- **CSS Animations**: Efeitos customizados com Tailwind CSS

## Configuração do Build

O projeto está configurado com:
- **TypeScript strict mode** para melhor segurança de tipos
- **ESLint** para manter a qualidade do código
- **Vite** como bundler para máxima performance

## Licença

Este projeto está disponível sob a licença MIT - veja o arquivo LICENSE para detalhes.

## Autor

**Adryan** - Estudante de Engenharia de Software e Desenvolvedor Front-End

- LinkedIn: https://www.linkedin.com/in/adryan-silva-garcia-2373573a8
- Email: adryansilva3421@gmail.com

---

Desenvolvido usando React, TypeScript e Vite
```
