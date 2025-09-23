import React, { useState, useEffect } from 'react';
import { Icon } from '@/components/atoms/Icon';
import { Heading } from '@/components/atoms/Heading';
import { Text } from '@/components/atoms/Text';

interface StatItem {
  icon: React.ComponentType<any>;
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
  color?: 'blue' | 'purple' | 'green' | 'cyan' | 'primary';
}

interface StatsCounterProps {
  stats: StatItem[];
  className?: string;
}

export const StatsCounter: React.FC<StatsCounterProps> = ({ stats, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById('stats-counter');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <div id="stats-counter" className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
      {stats.map((stat, index) => (
        <div
          key={index}
          className="text-center p-6 bg-card/50 backdrop-blur-sm rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105"
        >
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-full ${
              stat.color === 'blue' ? 'bg-neon-blue/10' :
              stat.color === 'purple' ? 'bg-neon-purple/10' :
              stat.color === 'green' ? 'bg-neon-green/10' :
              stat.color === 'cyan' ? 'bg-neon-cyan/10' :
              'bg-primary/10'
            }`}>
              <Icon
                icon={stat.icon}
                size="lg"
                className={
                  stat.color === 'blue' ? 'text-neon-blue' :
                  stat.color === 'purple' ? 'text-neon-purple' :
                  stat.color === 'green' ? 'text-neon-green' :
                  stat.color === 'cyan' ? 'text-neon-cyan' :
                  'text-primary'
                }
              />
            </div>
          </div>

          <div className="mb-2">
            <Heading level={3} className="text-3xl font-bold gradient-text">
              {isVisible ? (
                <span data-counter data-target={stat.value} data-duration="2">
                  {stat.prefix || ''}{stat.value}{stat.suffix || ''}
                </span>
              ) : (
                `${stat.prefix || ''}0${stat.suffix || ''}`
              )}
            </Heading>
          </div>

          <Text variant="small" className="text-muted-foreground">
            {stat.label}
          </Text>
        </div>
      ))}
    </div>
  );
};

export default StatsCounter;
