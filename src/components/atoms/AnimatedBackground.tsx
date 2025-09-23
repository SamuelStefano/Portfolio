import React from 'react';

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />

      {}
      <div className="absolute inset-0">
        {}
        <div className="absolute top-[10%] left-[5%] w-[15vw] h-[15vw] min-w-[100px] min-h-[100px] max-w-[300px] max-h-[300px] md:min-w-[150px] md:min-h-[150px] bg-neon-blue/5 rounded-full blur-2xl md:blur-3xl animate-float" />
        <div className="absolute top-[20%] right-[10%] w-[12vw] h-[12vw] min-w-[80px] min-h-[80px] max-w-[250px] max-h-[250px] md:min-w-[120px] md:min-h-[120px] bg-neon-purple/5 rounded-full blur-2xl md:blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[15%] left-[8%] w-[18vw] h-[18vw] min-w-[120px] min-h-[120px] max-w-[350px] max-h-[350px] md:min-w-[180px] md:min-h-[180px] bg-neon-cyan/5 rounded-full blur-2xl md:blur-3xl animate-float" style={{ animationDelay: '4s' }} />

        {}
        <div className="hidden sm:block absolute top-[60%] right-[5%] w-[10vw] h-[10vw] min-w-[100px] min-h-[100px] max-w-[200px] max-h-[200px] bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="hidden sm:block absolute bottom-[30%] right-[15%] w-[14vw] h-[14vw] min-w-[140px] min-h-[140px] max-w-[280px] max-h-[280px] bg-neon-green/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
        <div className="hidden md:block absolute top-[40%] left-[20%] w-[8vw] h-[8vw] min-w-[80px] min-h-[80px] max-w-[160px] max-h-[160px] bg-primary/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '5s' }} />

        {}
        <div className="hidden lg:block absolute top-[70%] left-[30%] w-[6vw] h-[6vw] min-w-[60px] min-h-[60px] max-w-[120px] max-h-[120px] bg-neon-blue/3 rounded-full blur-2xl animate-float" style={{ animationDelay: '0.5s', animationDuration: '8s' }} />
        <div className="hidden lg:block absolute bottom-[60%] right-[25%] w-[5vw] h-[5vw] min-w-[50px] min-h-[50px] max-w-[100px] max-h-[100px] bg-neon-purple/3 rounded-full blur-2xl animate-float" style={{ animationDelay: '2.5s', animationDuration: '6s' }} />
        <div className="hidden lg:block absolute top-[25%] left-[50%] w-[7vw] h-[7vw] min-w-[70px] min-h-[70px] max-w-[140px] max-h-[140px] bg-neon-cyan/3 rounded-full blur-2xl animate-float" style={{ animationDelay: '4.5s', animationDuration: '10s' }} />

        {}
        <div className="absolute top-[15%] left-[40%] w-[20vw] h-[20vw] min-w-[150px] min-h-[150px] max-w-[400px] max-h-[400px] md:min-w-[200px] md:min-h-[200px] bg-gradient-to-r from-neon-blue/2 to-neon-purple/2 md:from-neon-blue/3 md:to-neon-purple/3 rounded-full blur-2xl md:blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
        <div className="hidden md:block absolute bottom-[20%] left-[60%] w-[16vw] h-[16vw] min-w-[160px] min-h-[160px] max-w-[320px] max-h-[320px] bg-gradient-to-r from-neon-green/3 to-accent/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3.5s' }} />
      </div>

      {}
      <div className="absolute inset-0 opacity-[0.01] md:opacity-[0.02]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgb(255,255,255)_1px,transparent_0)] bg-[length:30px_30px] md:bg-[length:20px_20px]" />
      </div>
    </div>
  );
};

export default AnimatedBackground;
