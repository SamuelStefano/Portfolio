import React from 'react';
import { useTranslation } from 'react-i18next';
import { Calendar, Clock, Mail, Phone } from 'lucide-react';
import { Card, CardContent } from '@/components/atoms/card/card';
import { Button } from '@/components/atoms/button/button';
import { Icon } from '@/components/atoms/Icon/Icon';
import { Heading } from '@/components/atoms/Heading/Heading';
import { Text } from '@/components/atoms/Text/Text';

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
    <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20 hover-glow">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <Icon icon={Calendar} size="lg" className="text-primary" />
            </div>
          </div>
          <Heading level={4} className="mb-2">
            {t('about.availability.title')}
          </Heading>
          <Text className="text-muted-foreground">
            {t('about.availability.description')}
          </Text>
        </div>

        {}
        <div className="mb-6 p-4 bg-background/50 rounded-lg">
          <div className="flex items-center gap-2 mb-3">
            <Icon icon={Clock} size="sm" className="text-primary" />
            <Text className="font-medium">{t('about.availability.hours')}</Text>
          </div>
          <div className="space-y-2 text-sm text-muted-foreground">
            <Text variant="small">• {t('about.availability.weekdays')}</Text>
            <Text variant="small">• {t('about.availability.tuesday')}</Text>
            <Text variant="small">• {t('about.availability.saturday')}</Text>
            <Text variant="small">• {t('about.availability.response')}</Text>
          </div>
        </div>

        {}
        <div className="space-y-3">
          <Button
            onClick={handleScheduleMeeting}
            className="w-full bg-primary hover:bg-primary/90"
          >
            <Icon icon={Calendar} size="sm" className="mr-2" />
            {t('about.availability.schedule')}
          </Button>

          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleEmailContact}
              className="flex-1"
            >
              <Icon icon={Mail} size="sm" className="mr-2" />
              {t('about.availability.email')}
            </Button>

            <Button
              variant="outline"
              onClick={handleWhatsAppContact}
              className="flex-1"
            >
              <Icon icon={Phone} size="sm" className="mr-2" />
              {t('about.availability.whatsapp')}
            </Button>
          </div>
        </div>

        {}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
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



