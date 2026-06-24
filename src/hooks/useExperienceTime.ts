import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const START_DATE = new Date('2023-02-01');

export const useExperienceTime = () => {
  const { t } = useTranslation();
  const [experienceTime, setExperienceTime] = useState({
    years: 0,
    months: 0,
    days: 0,
    totalMonths: 0,
  });

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      let years = now.getFullYear() - START_DATE.getFullYear();
      let months = now.getMonth() - START_DATE.getMonth();
      let days = now.getDate() - START_DATE.getDate();
      if (days < 0) months -= 1;
      if (months < 0) { years -= 1; months += 12; }
      const totalMonths = years * 12 + months;
      const diffDays = Math.floor((now.getTime() - START_DATE.getTime()) / 86_400_000);
      setExperienceTime({ years, months, days: diffDays % 30, totalMonths });
    };
    calc();
    const interval = setInterval(calc, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const getFormattedTime = () => {
    const { years, months } = experienceTime;
    const yearLabel = years === 1 ? t('common.year') : t('common.years');
    const monthLabel = months === 1 ? t('common.month') : t('common.months');
    if (years >= 1 && months >= 1) return `${years} ${yearLabel} ${t('common.and')} ${months} ${monthLabel}`;
    if (years >= 1) return `${years} ${yearLabel}`;
    if (months >= 1) return `${months} ${monthLabel}`;
    return `${experienceTime.days} ${experienceTime.days > 1 ? t('common.days') : t('common.day')}`;
  };

  return {
    ...experienceTime,
    formatted: getFormattedTime(),
  };
};
