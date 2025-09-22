import { Code, Database, Server, Globe, Cpu } from 'lucide-react';
import { SkillBar } from '@/components/molecules/SkillBar';
import { ExperienceItem } from '@/components/molecules/ExperienceItem';
import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';

interface TechCategory {
  title: string;
  icon: React.ComponentType<any>;
  skills: { name: string; level: number }[];
  color: string;
}

const techCategories: TechCategory[] = [
  {
    title: 'Frontend',
    icon: Globe,
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'TailwindCSS', level: 95 }
    ],
    color: 'neon-blue'
  },
  {
    title: 'Backend',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'NestJS', level: 75 },
      { name: 'Prisma', level: 85 },
      { name: 'n8n', level: 70 }
    ],
    color: 'neon-purple'
  },
  {
    title: 'Database',
    icon: Database,
    skills: [
      { name: 'Supabase', level: 85 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'MySQL', level: 70 }
    ],
    color: 'neon-cyan'
  },
  {
    title: 'DevOps & Tools',
    icon: Cpu,
    skills: [
      { name: 'Docker', level: 70 },
      { name: 'Linux/Ubuntu', level: 80 },
      { name: 'WSL', level: 85 },
      { name: 'Git', level: 90 }
    ],
    color: 'accent'
  }
];

const experienceData = [
  {
    company: 'DevFellowship',
    role: 'Desenvolvedor Full-Stack',
    period: '2023 - Presente',
    description: 'Desenvolvimento de projetos educacionais e plataformas de desafios. Trabalho em equipe com metodologias ágeis.',
    stack: ['React', 'TypeScript', 'Node.js', 'Supabase']
  },
  {
    company: 'M&M Informática',
    role: 'Suporte Técnico & Desenvolvedor',
    period: '2022 - 2023',
    description: 'Suporte técnico especializado e desenvolvimento de sistemas para automação de notas fiscais eletrônicas.',
    stack: ['JavaScript', 'Automação', 'APIs', 'Sistemas Fiscais']
  },
  {
    company: 'Freelancer',
    role: 'Desenvolvedor Web',
    period: '2021 - 2022',
    description: 'Desenvolvimento de sites e aplicações web para pequenas empresas e projetos pessoais.',
    stack: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'PHP']
  },
  {
    company: 'Prefeitura de Marialva',
    role: 'Suporte Técnico',
    period: '2020 - 2021',
    description: 'Suporte Técinico, atendendo órgãos públicos do municipio em relação a informática.',
    stack: ['Suporte Técnico', 'Informação']
  }
];

const additionalSkills = [
  'Judge0 API',
  'REST APIs',
  'Responsive Design',
  'UI/UX Design',
  'Automação',
  'Notas Fiscais Eletrônicas',
  'Suporte Técnico',
  'Inglês B2',
  'Trabalho em Equipe',
  'Metodologias Ágeis',
  'Resolução de Problemas',
  'Comprometimento',
  'Criatividade',
  'Frontend',
  'Backend',
  'Banco de Dados',
  'Git & GitHub',
  'Linux',
  'DevOps',
  'API Development'
];

export const TechStack = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Heading level={2} className="mb-4 gradient-text">
            Stack Tecnológica
          </Heading>
          <Text variant="large" className="max-w-2xl mx-auto">
            Tecnologias e ferramentas que domino para criar soluções completas
          </Text>
        </div>

        {/* Tech Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {techCategories.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <div
                key={categoryIndex}
                className="group bg-card border-border rounded-xl p-6 hover-glow transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon icon={IconComponent} className="text-primary" />
                  </div>
                  <Heading level={3}>
                    {category.title}
                  </Heading>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skillIndex}
                      name={skill.name}
                      level={skill.level}
                      className="animate-scale-in"
                      style={{ 
                        animationDelay: `${(categoryIndex * 0.2) + (skillIndex * 0.1)}s` 
                      }}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Skills - Infinite Carousel */}
        <div className="text-center overflow-hidden">
          <Heading level={3} className="mb-6">
            Outras Competências
          </Heading>
          <div className="relative">
            <div className="flex animate-scroll gap-4 whitespace-nowrap">
              {[...additionalSkills, ...additionalSkills].map((skill, index) => (
                <div
                  key={index}
                  className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 flex-shrink-0"
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mt-20">
          <Heading level={3} className="text-center mb-12">
            Experiência Profissional
          </Heading>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-primary" />
              
              {/* Experience Items */}
              <div className="space-y-12">
                {experienceData.map((job, index) => (
                  <div
                    key={index}
                    className="relative flex items-start gap-6 animate-slide-up hover:scale-105 transition-all duration-300"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {/* Timeline Dot */}
                    <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0 mt-6 relative z-10 animate-pulse-glow" />
                    
                    {/* Content */}
                    <div className="flex-1 bg-card border border-border rounded-lg p-6 hover-glow hover:border-primary/50">
                      <ExperienceItem
                        company={job.company}
                        role={job.role}
                        period={job.period}
                        description={job.description}
                        stack={job.stack}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStack;
