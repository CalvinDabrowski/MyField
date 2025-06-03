export default function MyFieldLinkLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`${className} flex items-center gap-3`}>
      {/* Interlocking Links Icon */}
      <svg viewBox="0 0 100 100" className="h-full w-8" style={{ background: 'transparent' }}>
        <defs>
          <style>
            {`.logo-path { fill: #1e3a5f; }`}
          </style>
        </defs>

        {/* Main interlocking links shape */}
        <path
          className="logo-path"
          d="M25 20 C35 10, 50 10, 60 20 L60 35 C60 45, 50 55, 40 55 L25 55 C15 55, 5 45, 5 35 L5 20 C5 10, 15 0, 25 0 L40 0 C50 0, 60 10, 60 20 L60 35 M40 45 C50 35, 65 35, 75 45 L75 60 C75 70, 65 80, 55 80 L40 80 C30 80, 20 70, 20 60 L20 45 C20 35, 30 25, 40 25 L55 25 C65 25, 75 35, 75 45 L75 60"
          strokeWidth="8"
          stroke="#1e3a5f"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Text */}
      <div className="flex items-baseline">
        <span className="text-nexfield-slate font-bold text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          MyField
        </span>
        <span className="text-nexfield-emerald font-bold text-xl" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
          Link
        </span>
      </div>
    </div>
  );
}
