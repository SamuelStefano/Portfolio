import { Code, Database, Server, Globe, Cpu, GitBranch } from 'lucide-react';

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

const TechStack = () => {
  return (
    <section className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Stack Tecnológica
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Tecnologias e ferramentas que domino para criar soluções completas
          </p>
        </div>

        {/* Tech Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {techCategories.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div
                key={categoryIndex}
                className="group bg-card border-border rounded-xl p-6 hover-glow transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${categoryIndex * 0.1}s` }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <div key={skillIndex} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-foreground">
                          {skill.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {skill.level}%
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                        <div
                          className="h-full bg-gradient-primary rounded-full transition-all duration-1000 ease-out animate-scale-in"
                          style={{ 
                            width: `${skill.level}%`,
                            animationDelay: `${(categoryIndex * 0.2) + (skillIndex * 0.1)}s`
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Skills */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-foreground mb-6">
            Outras Competências
          </h3>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {[
              'Judge0 API',
              'REST APIs',
              'Responsive Design',
              'UI/UX Design',
              'Automação',
              'Notas Fiscais Eletrônicas',
              'Suporte Técnico',
              'Inglês B2',
              'Trabalho em Equipe',
              'Metodologias Ágeis'
            ].map((skill, index) => (
              <div
                key={index}
                className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium text-foreground hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Experience Timeline */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-center text-foreground mb-12">
            Experiência Profissional
          </h3>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-primary" />
              
              {/* Experience Items */}
              <div className="space-y-12">
                {[
                  {
                    company: 'DevFellowship',
                    role: 'Desenvolvedor Full-Stack',
                    period: '2023 - Presente',
                    description: 'Desenvolvimento de projetos educacionais e plataformas de desafios. Trabalho em equipe com metodologias ágeis.',
                    technologies: ['React', 'TypeScript', 'Node.js', 'Supabase']
                  },
                  {
                    company: 'M&M Informática',
                    role: 'Suporte Técnico & Desenvolvedor',
                    period: '2022 - 2023',
                    description: 'Suporte técnico especializado e desenvolvimento de sistemas para automação de notas fiscais eletrônicas.',
                    technologies: ['JavaScript', 'Automação', 'APIs', 'Sistemas Fiscais']
                  }
                ].map((job, index) => (
                  <div
                    key={index}
                    className="relative flex items-start gap-6 animate-slide-up"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    {/* Timeline Dot */}
                    <div className="w-4 h-4 bg-primary rounded-full flex-shrink-0 mt-6 relative z-10 animate-pulse-glow" />
                    
                    {/* Content */}
                    <div className="flex-1 bg-card border border-border rounded-lg p-6 hover-glow">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                        <h4 className="text-lg font-bold text-foreground">
                          {job.role}
                        </h4>
                        <span className="text-sm text-muted-foreground">
                          {job.period}
                        </span>
                      </div>
                      
                      <h5 className="text-primary font-semibold mb-3">
                        {job.company}
                      </h5>
                      
                      <p className="text-muted-foreground mb-4">
                        {job.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {job.technologies.map((tech, techIndex) => (
                          <span
                            key={techIndex}
                            className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
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