'use client';

import { useState, useEffect } from 'react';

interface LoadingPhase {
  id: string;
  priority: number;
  loaded: boolean;
}

export const useProgressiveLoading = () => {
  const [phases, setPhases] = useState<LoadingPhase[]>([
    { id: 'header', priority: 1, loaded: false },
    { id: 'projects', priority: 1, loaded: false },
    { id: 'about', priority: 2, loaded: false },
    { id: 'techstack', priority: 3, loaded: false },
    { id: 'contact', priority: 4, loaded: false },
  ]);

  const [currentPhase, setCurrentPhase] = useState(1);

  useEffect(() => {
    const loadPhase = (phaseId: string, delay: number) => {
      setTimeout(() => {
        setPhases(prev => 
          prev.map(phase => 
            phase.id === phaseId 
              ? { ...phase, loaded: true }
              : phase
          )
        );
        setCurrentPhase(prev => prev + 1);
      }, delay);
    };
    loadPhase('header', 0);      
    loadPhase('projects', 0);  
    loadPhase('about', 400);    
    loadPhase('techstack', 600);
    loadPhase('contact', 800);   

  }, []);

  const isPhaseLoaded = (phaseId: string) => {
    return phases.find(phase => phase.id === phaseId)?.loaded || false;
  };

  const getPhaseDelay = (phaseId: string) => {
    const phase = phases.find(p => p.id === phaseId);
    return phase ? (phase.priority - 1) * 200 : 0;
  };

  return {
    phases,
    currentPhase,
    isPhaseLoaded,
    getPhaseDelay,
  };
};
