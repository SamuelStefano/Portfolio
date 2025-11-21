import { Project } from '../types/project';

export const translateProjectDescriptions = (projects: Project[], t: any): Project[] => {
  return projects.map(project => {
    const projectKey = getProjectKey(project.title);
    
    if (projectKey) {
      const translatedDescription = t(`projectDescriptions.${projectKey}.description`);
      const translatedLongDescription = t(`projectDescriptions.${projectKey}.longDescription`);
      
      return {
        ...project,
        description: translatedDescription || project.description,
        long_description: translatedLongDescription || project.long_description
      };
    }
    
    return project;
  });
};

const getProjectKey = (title: string): string | null => {
  const titleMap: Record<string, string> = {
    'Skill Evals': 'skillEvals',
    'DevFellowship': 'devfellowship',
    'CodeLibrary': 'codeLibrary',
    'GreenLoop': 'greenloop',
    'TalentDAO': 'talentdao',
    'Review Requests': 'reviewRequests'
  };
  
  return titleMap[title] || null;
};



