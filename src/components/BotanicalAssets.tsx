import React from 'react';

// Hand-painted and ink style SVGs for background and card decorations

export const PeepalLeaf: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 120 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 120"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} opacity-15`}
    style={{ transition: 'all 1s ease' }}
  >
    {/* Elegant curving leaf path mimicking traditional ink drawings */}
    <path
      d="M50 5C45 25 30 35 20 48C10 60 8 75 18 85C28 95 42 98 50 98C58 98 72 95 82 85C92 75 90 60 80 48C70 35 55 25 50 5Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Extended tail (apex tip) of Peepal leaf, unique and beautiful */}
    <path
      d="M50 5C50 1 50 0 50 0"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    {/* Midrib */}
    <path
      d="M50 5C50 40 50 80 50 115"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    {/* Lateral veins */}
    <path d="M50 35C42 30 30 28 22 34" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M50 35C58 30 70 28 78 34" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M50 50C40 45 25 43 16 52" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M50 50C60 45 75 43 84 52" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M50 65C38 62 20 62 12 73" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M50 65C62 62 80 62 88 73" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M50 80C42 78 28 80 22 88" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
    <path d="M50 80C58 78 72 80 78 88" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

export const LotusFlower: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 80 }) => (
  <svg
    width={size}
    height={size * 0.9}
    viewBox="0 0 100 90"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} text-lotus-pink`}
  >
    {/* Elegant central petal */}
    <path
      d="M50 10C46 30 46 50 50 75C54 50 54 30 50 10Z"
      fill="currentColor"
      fillOpacity="0.08"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Left petal 1 */}
    <path
      d="M50 18C38 32 32 48 42 72C46 52 48 35 50 18Z"
      fill="currentColor"
      fillOpacity="0.06"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Right petal 1 */}
    <path
      d="M50 18C62 32 68 48 58 72C54 52 52 35 50 18Z"
      fill="currentColor"
      fillOpacity="0.06"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Left petal 2 */}
    <path
      d="M50 30C28 40 18 58 30 78C38 60 44 48 50 30Z"
      fill="currentColor"
      fillOpacity="0.04"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Right petal 2 */}
    <path
      d="M50 30C72 40 82 58 70 78C62 60 56 48 50 30Z"
      fill="currentColor"
      fillOpacity="0.04"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Bottom support petals */}
    <path
      d="M20 74C32 82 42 82 50 78C58 82 68 82 80 74C68 70 58 72 50 78C42 72 32 70 20 74Z"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M44 78C46 84 54 84 56 78"
      stroke="currentColor"
      strokeWidth="1"
    />
  </svg>
);

export const BananaLeaf: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 150 }) => (
  <svg
    width={size * 0.7}
    height={size}
    viewBox="0 0 70 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} opacity-10 text-olive-green`}
  >
    {/* Elegant long banana leaf */}
    <path
      d="M35 10C25 35 10 70 12 110C13 125 22 135 35 135C48 135 57 125 58 110C60 70 45 35 35 10Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Center stalk */}
    <path
      d="M35 10V148"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    {/* Traditional diagonal cuts & ribs on a banana leaf */}
    <path d="M35 30C25 35 18 42 14 50" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M35 30C45 35 52 42 56 50" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M35 50C22 55 14 65 13 75" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M35 50C48 55 56 65 57 75" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    {/* Natural split cuts typical in traditional sketches */}
    <path d="M35 70C20 78 14 88 15 98" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M35 70C50 78 56 88 55 98" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M35 95C24 105 18 115 20 125" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
    <path d="M35 95C46 105 52 115 50 125" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" />
  </svg>
);

export const BanyanTree: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 200 }) => (
  <svg
    width={size}
    height={size * 0.8}
    viewBox="0 0 200 160"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`${className} text-espresso`}
  >
    {/* Traditional silhouette representation of a Banyan Tree with hanging prop roots */}
    {/* Ground */}
    <path d="M10 150H190" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    
    {/* Trunk */}
    <path
      d="M90 150C90 120 80 110 85 90C90 70 80 50 100 50C120 50 110 70 115 90C120 110 110 120 110 150"
      stroke="currentColor"
      strokeWidth="2"
      fill="currentColor"
      fillOpacity="0.05"
    />
    
    {/* Supporting Prop Roots (faint hanging vertical lines) */}
    <path d="M60 70V145" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
    <path d="M72 80V148" stroke="currentColor" strokeWidth="0.8" />
    <path d="M128 80V148" stroke="currentColor" strokeWidth="0.8" />
    <path d="M140 70V145" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
    
    {/* Sprawling branches */}
    <path d="M85 90C70 85 55 80 40 95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M115 90C130 85 145 80 160 95" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M100 50C85 35 60 40 45 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M100 50C115 35 140 40 155 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />

    {/* Elegant sketched canopy outlines */}
    <path
      d="M25 90C10 75 15 50 35 45C25 30 50 15 70 25C80 10 110 5 125 20C140 5 170 10 180 30C195 40 190 70 175 85C185 105 155 115 140 105C125 115 110 115 95 105C70 115 55 115 45 105C30 115 20 105 25 90Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      fill="currentColor"
      fillOpacity="0.03"
    />
  </svg>
);

export const DevanagariScript: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`${className} select-none pointer-events-none text-espresso/5 font-serif text-center italic tracking-widest leading-relaxed`}>
    <p className="text-xl md:text-2xl font-cinzel my-2">॥ योगश्चित्तवृत्तिनिरोधः ॥</p>
    <p className="text-xs font-mono uppercase tracking-[0.25em]">Yoga is the resolution of mental fluctuations</p>
    <p className="text-xl md:text-2xl font-cinzel my-4">॥ समत्वं योग उच्यते ॥</p>
    <p className="text-xs font-mono uppercase tracking-[0.25em]">Sameness of mind is called Yoga</p>
  </div>
);

export const BotanicalBorder: React.FC<{ className?: string; position?: 'top' | 'bottom' }> = ({ className = '', position = 'top' }) => (
  <div className={`w-full overflow-hidden flex justify-center items-center gap-12 py-3 border-y border-dashed border-biscuit/30 ${className}`}>
    <LotusFlower className="opacity-15 shrink-0" size={30} />
    <span className="w-1.5 h-1.5 rounded-full bg-biscuit/40" />
    <LotusFlower className="opacity-25 shrink-0" size={40} />
    <span className="w-2 h-2 rounded-full bg-biscuit/60" />
    <LotusFlower className="opacity-15 shrink-0" size={30} />
  </div>
);
