import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useExperienceTime = () => {
  const { t } = useTranslation();
  const [experienceTime, setExperienceTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    totalMonths: 0
  });

  useEffect(() => {
    const calculateExperience = () => {
      const startDate = new Date('2024-07-01');
      const currentDate = new Date();

      const diffTime = currentDate.getTime() - startDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

      const years = Math.floor(diffDays / 365);
      const months = Math.floor((diffDays % 365) / 30);
      const days = diffDays % 30;
      const totalMonths = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 30));

      setExperienceTime({
        years,
        months,
        days,
        totalMonths
      });
    };

    calculateExperience();

    const interval = setInterval(calculateExperience, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const getFormattedTime = () => {
    const totalMonths = experienceTime.totalMonths;
    if (totalMonths > 0) {
      return `${totalMonths} ${totalMonths > 1 ? t('common.months') : t('common.month')}`;
    } else {
      return `${experienceTime.days} ${experienceTime.days > 1 ? t('common.days') : t('common.day')}`;
    }
  };

  return {
    ...experienceTime,
    formatted: getFormattedTime()
  };
};



