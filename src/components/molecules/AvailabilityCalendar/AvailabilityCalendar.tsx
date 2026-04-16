import { useTranslation } from 'react-i18next';
import { Calendar, Clock, Mail, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/atoms/card/card';
import { Button } from '@/components/atoms/button/button';
import { Icon } from '@/components/atoms/Icon/Icon';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';

const DAYS = [
  { key: 'seg', label: 'Seg', active: true },
  { key: 'ter', label: 'Ter', active: true },
  { key: 'qua', label: 'Qua', active: true },
  { key: 'qui', label: 'Qui', active: true },
  { key: 'sex', label: 'Sex', active: true },
  { key: 'sab', label: 'Sáb', active: false },
  { key: 'dom', label: 'Dom', active: false },
];

export const AvailabilityCalendar = () => {
  const { t } = useTranslation();

  const handleScheduleMeeting = () => {
    window.open('https://calendly.com/samuelstefanodocarmo/30min', '_blank');
  };

  const handleEmailContact = () => {
    window.open('mailto:samuelstefanodocarmo@gmail.com?subject=Reunião - Portfolio', '_blank');
  };

  const handleWhatsAppContact = () => {
    window.open('https://wa.me/5544998795387?text=Olá! Vi seu portfólio e gostaria de agendar uma conversa.', '_blank');
  };

  return (
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover-glow overflow-hidden">
      <CardContent className="p-6">
        {/* Header */}
        <div className="text-center mb-5">
          <div className="flex justify-center mb-3">
            <div className="p-3 bg-primary/10 rounded-full">
              <Icon icon={Calendar} size="lg" className="text-primary" />
            </div>
          </div>
          <Heading level={4} className="mb-1">
            {t('about.availability.title')}
          </Heading>
          <Text className="text-muted-foreground text-sm">
            {t('about.availability.description')}
          </Text>
        </div>

        {/* Day pills */}
        <div className="flex justify-center gap-1.5 mb-5">
          {DAYS.map((d) => (
            <div
              key={d.key}
              className={`flex flex-col items-center gap-1 px-2.5 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                d.active
                  ? 'bg-primary/15 text-primary border border-primary/30'
                  : 'bg-muted/30 text-muted-foreground/50 border border-border/30'
              }`}
            >
              {d.label}
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  d.active ? 'bg-green-500 animate-pulse' : 'bg-muted-foreground/30'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Time slots */}
        <div className="mb-5 p-4 bg-background/60 rounded-xl border border-border/40 space-y-2">
          <div className="flex items-center gap-2 mb-3">
            <Icon icon={Clock} size="sm" className="text-primary" />
            <Text className="font-semibold text-sm">{t('about.availability.hours')}</Text>
          </div>

          {[
            { slot: '08:00 – 12:00', label: t('about.availability.weekdays').replace(/Segunda.*:/, '').trim() || '08:00 – 12:00', period: 'Manhã' },
            { slot: '14:30 – 17:00', label: t('about.availability.tuesday').replace(/Segunda.*:/, '').trim() || '14:30 – 17:00', period: 'Tarde' },
          ].map(({ period, slot }) => (
            <div
              key={slot}
              className="flex items-center justify-between py-2 px-3 rounded-lg bg-primary/8 border border-primary/15 hover:bg-primary/12 transition-colors"
            >
              <span className="text-xs text-muted-foreground">{period}</span>
              <span className="text-xs font-mono text-primary font-semibold tracking-wide">{slot}</span>
            </div>
          ))}

          <div className="flex items-center justify-between py-2 px-3 rounded-lg bg-muted/20 border border-border/30 opacity-50">
            <span className="text-xs text-muted-foreground">Sáb / Dom</span>
            <span className="text-xs text-muted-foreground">{t('about.availability.saturday').split(':')[1]?.trim() || 'Indisponível'}</span>
          </div>

          <Text variant="small" className="text-muted-foreground/70 text-center pt-1">
            ⏱ {t('about.availability.response')}
          </Text>
        </div>

        {/* CTA buttons */}
        <div className="space-y-3">
          <Button
            onClick={handleScheduleMeeting}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Icon icon={Calendar} size="sm" className="mr-2" />
            {t('about.availability.schedule')}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={handleEmailContact} className="flex-1">
              <Icon icon={Mail} size="sm" className="mr-2" />
              {t('about.availability.email')}
            </Button>
            <Button variant="outline" onClick={handleWhatsAppContact} className="flex-1">
              <Icon icon={Phone} size="sm" className="mr-2" />
              {t('about.availability.whatsapp')}
            </Button>
          </div>
        </div>

        {/* Status */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <Text variant="small" className="text-green-600 font-medium">
              {t('about.availability.status')}
            </Text>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AvailabilityCalendar;
