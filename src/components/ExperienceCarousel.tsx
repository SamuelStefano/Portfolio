import { useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const experiences = [
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
  },
  {
    company: 'Freelancer',
    role: 'Desenvolvedor Web',
    period: '2021 - 2022',
    description: 'Desenvolvimento de sites e aplicações web para pequenas empresas e projetos pessoais.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'PHP']
  }
];

const ExperienceCarousel = () => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div className="mt-20">
      <div className="flex items-center justify-center gap-4 mb-12">
        <h3 className="text-2xl font-bold text-center text-foreground">
          Experiência Profissional
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsPaused(!isPaused)}
          className="opacity-60 hover:opacity-100 transition-opacity"
        >
          {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
        </Button>
      </div>
      
      <div className="overflow-hidden">
        <div 
          className={`flex gap-6 ${isPaused ? '' : 'animate-experience-slide'}`}
          style={{ width: 'calc(300% + 48px)' }}
        >
          {/* Duplicate experiences for seamless loop */}
          {[...experiences, ...experiences].map((job, index) => (
            <Card
              key={index}
              className="bg-card border border-border hover-glow transition-all duration-300 flex-shrink-0 w-80"
            >
              <CardContent className="p-6">
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
                
                <p className="text-muted-foreground mb-4 text-sm">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceCarousel;