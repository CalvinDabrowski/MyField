'use client';

interface VerificationShieldProps {
  className?: string;
}

export default function VerificationShield({ className = "" }: VerificationShieldProps) {
  return (
    <div className={`relative ${className}`}>
      <svg
        width="400"
        height="480"
        viewBox="0 0 400 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto"
      >
        {/* Shield Background */}
        <defs>
          <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2E8B57" />
            <stop offset="50%" stopColor="#3AA866" />
            <stop offset="100%" stopColor="#2E8B57" />
          </linearGradient>
          <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="100%" stopColor="#4FB3D9" />
          </linearGradient>
          <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="10" stdDeviation="15" floodColor="#000000" floodOpacity="0.2"/>
          </filter>
        </defs>

        {/* Shield Border */}
        <path
          d="M200 40 C320 40, 360 80, 360 160 C360 280, 360 360, 200 440 C40 360, 40 280, 40 160 C40 80, 80 40, 200 40 Z"
          fill="url(#borderGradient)"
          filter="url(#shadow)"
        />

        {/* Shield Main Body */}
        <path
          d="M200 50 C310 50, 350 85, 350 160 C350 275, 350 350, 200 425 C50 350, 50 275, 50 160 C50 85, 90 50, 200 50 Z"
          fill="url(#shieldGradient)"
        />

        {/* Highlight */}
        <path
          d="M200 50 C280 50, 320 75, 340 120 C330 90, 290 60, 200 60 C110 60, 70 90, 60 120 C80 75, 120 50, 200 50 Z"
          fill="rgba(255,255,255,0.2)"
        />

        {/* Checkmark */}
        <path
          d="M140 210 L180 250 L260 170"
          stroke="white"
          strokeWidth="20"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Inner glow for checkmark */}
        <path
          d="M140 210 L180 250 L260 170"
          stroke="rgba(255,255,255,0.5)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>

      {/* Animated particles around shield */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-nexfield-sky rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white rounded-full animate-pulse opacity-80" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-nexfield-emerald rounded-full animate-pulse opacity-70" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-1/4 right-1/3 w-1 h-1 bg-white rounded-full animate-pulse opacity-90" style={{animationDelay: '1.5s'}}></div>
      </div>
    </div>
  );
}
