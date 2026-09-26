const BLOBS = [
  { pos: 'top-[10%] left-[5%] w-[15vw] h-[15vw] min-w-[100px] min-h-[100px] max-w-[300px] max-h-[300px] md:min-w-[150px] md:min-h-[150px]', fill: 'bg-neon-blue/5 blur-2xl md:blur-3xl', anim: 'animate-float', delay: undefined, duration: undefined },
  { pos: 'top-[20%] right-[10%] w-[12vw] h-[12vw] min-w-[80px] min-h-[80px] max-w-[250px] max-h-[250px] md:min-w-[120px] md:min-h-[120px]', fill: 'bg-neon-purple/5 blur-2xl md:blur-3xl', anim: 'animate-float', delay: '2s', duration: undefined },
  { pos: 'bottom-[15%] left-[8%] w-[18vw] h-[18vw] min-w-[120px] min-h-[120px] max-w-[350px] max-h-[350px] md:min-w-[180px] md:min-h-[180px]', fill: 'bg-neon-cyan/5 blur-2xl md:blur-3xl', anim: 'animate-float', delay: '4s', duration: undefined },
  { pos: 'hidden sm:block top-[60%] right-[5%] w-[10vw] h-[10vw] min-w-[100px] min-h-[100px] max-w-[200px] max-h-[200px]', fill: 'bg-accent/5 blur-3xl', anim: 'animate-float', delay: '1s', duration: undefined },
  { pos: 'hidden sm:block bottom-[30%] right-[15%] w-[14vw] h-[14vw] min-w-[140px] min-h-[140px] max-w-[280px] max-h-[280px]', fill: 'bg-neon-green/5 blur-3xl', anim: 'animate-float', delay: '3s', duration: undefined },
  { pos: 'hidden md:block top-[40%] left-[20%] w-[8vw] h-[8vw] min-w-[80px] min-h-[80px] max-w-[160px] max-h-[160px]', fill: 'bg-primary/5 blur-3xl', anim: 'animate-float', delay: '5s', duration: undefined },
  { pos: 'hidden lg:block top-[70%] left-[30%] w-[6vw] h-[6vw] min-w-[60px] min-h-[60px] max-w-[120px] max-h-[120px]', fill: 'bg-neon-blue/3 blur-2xl', anim: 'animate-float', delay: '0.5s', duration: '8s' },
  { pos: 'hidden lg:block bottom-[60%] right-[25%] w-[5vw] h-[5vw] min-w-[50px] min-h-[50px] max-w-[100px] max-h-[100px]', fill: 'bg-neon-purple/3 blur-2xl', anim: 'animate-float', delay: '2.5s', duration: '6s' },
  { pos: 'hidden lg:block top-[25%] left-[50%] w-[7vw] h-[7vw] min-w-[70px] min-h-[70px] max-w-[140px] max-h-[140px]', fill: 'bg-neon-cyan/3 blur-2xl', anim: 'animate-float', delay: '4.5s', duration: '10s' },
  { pos: 'top-[15%] left-[40%] w-[20vw] h-[20vw] min-w-[150px] min-h-[150px] max-w-[400px] max-h-[400px] md:min-w-[200px] md:min-h-[200px]', fill: 'bg-gradient-to-r from-neon-blue/2 to-neon-purple/2 md:from-neon-blue/3 md:to-neon-purple/3 blur-2xl md:blur-3xl', anim: 'animate-pulse', delay: '1.5s', duration: undefined },
  { pos: 'hidden md:block bottom-[20%] left-[60%] w-[16vw] h-[16vw] min-w-[160px] min-h-[160px] max-w-[320px] max-h-[320px]', fill: 'bg-gradient-to-r from-neon-green/3 to-accent/3 blur-3xl', anim: 'animate-pulse', delay: '3.5s', duration: undefined },
];

export const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-card" />

      <div className="absolute inset-0">
        {BLOBS.map((blob, i) => (
          <div
            key={i}
            className={`decor-anim absolute ${blob.pos} ${blob.anim}`}
            style={{ animationDelay: blob.delay, animationDuration: blob.duration }}
          >
            <div className={`h-full w-full rounded-full ${blob.fill}`} />
          </div>
        ))}
      </div>

      <div className="absolute inset-0 opacity-[0.01] md:opacity-[0.02]">
        <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,rgb(255,255,255)_1px,transparent_0)] bg-[length:30px_30px] md:bg-[length:20px_20px]" />
      </div>
    </div>
  );
};

export default AnimatedBackground;
