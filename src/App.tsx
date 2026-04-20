import React, { useState, useRef, useEffect } from 'react';


import Success from './Success';

const CHECKOUT_URL = 'https://checkout.dodopayments.com/buy/pdt_0NcpwUcEKDlGXQ0lLKzSZ?quantity=1&redirect_url=https://nauticboy.xyz%2Fsuccess';
const DMG_URL = 'https://github.com/nauticsoftware/NauticPlayer-Releases/releases/download/v1.1/NauticPlayer_v1.1.dmg';



const ThemeShowcase = ({ lightImage = "/captures/player-wt.webp", darkImage = "/captures/player-bl.webp", className = "mt-12" }: { lightImage?: string, darkImage?: string, className?: string }) => {
  const [position, setPosition] = useState(50);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    // Map the mouse directly to the container width, clamped between 5% and 95%
    let percentage = (x / rect.width) * 100;
    percentage = Math.max(5, Math.min(95, percentage));
    setPosition(percentage);
  };

  const handleMouseEnter = () => setIsHovering(true);

  const handleMouseLeave = () => {
    setIsHovering(false);
    setPosition(50);
  };

  return (
    <div
      ref={containerRef}
      className={`relative w-full rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-[0_20px_50px_-12px_rgba(0,0,0,0.3)] border border-gray-200/30 bg-gray-50 group cursor-crosshair ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Skin Blanca (Base) */}
      <img
        src={lightImage}
        alt="NauticPlayer Light Theme"
        className="w-full h-auto block select-none pointer-events-none"
      />

      {/* Skin Negra (Overlay con máscara diagonal) */}
      <div
        className={`absolute inset-0 select-none pointer-events-none ${isHovering ? 'transition-none' : 'transition-all duration-700 ease-out'}`}
        style={{ clipPath: `polygon(0 0, ${position + 15}% 0, ${position - 15}% 100%, 0 100%)` }}
      >
        <img
          src={darkImage}
          alt="NauticPlayer Dark Theme"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Sombra interior para darle profundidad 3D a la división */}
        <div className="absolute inset-0 shadow-[inset_-20px_0_30px_-20px_rgba(0,0,0,0.7)] mix-blend-overlay"></div>
      </div>

      {/* Línea divisoria elegante (Glass Line) */}
      <svg
        className={`absolute inset-0 w-full h-full pointer-events-none filter drop-shadow-[0_0_8px_rgba(0,0,0,0.6)] ${isHovering ? 'transition-none' : 'transition-all duration-700 ease-out'}`}
        preserveAspectRatio="none"
      >
        <line
          x1={`${position + 15}%`} y1="0"
          x2={`${position - 15}%`} y2="100%"
          stroke="rgba(255,255,255,0.4)" strokeWidth="3"
        />
        <line
          x1={`${position + 15}%`} y1="0"
          x2={`${position - 15}%`} y2="100%"
          stroke="rgba(255,255,255,0.9)" strokeWidth="1"
        />
      </svg>
    </div>
  );
}




const GlassCard = ({ children, className = "", rounded = "rounded-[2rem]" }: any) => (
  <div className={`relative overflow-hidden bg-transparent shadow-[0_6px_6px_rgba(0,0,0,0.2),0_0_20px_rgba(0,0,0,0.1)] ${rounded} ${className}`}>
    <div className="absolute inset-0 backdrop-blur-[4px] z-0"></div>
    <div className="absolute inset-0 bg-white/25 z-10"></div>
    <div className={`absolute inset-0 shadow-[inset_1px_1px_0_rgba(255,255,255,0.75),inset_0_0_5px_rgba(255,255,255,0.75)] z-20 pointer-events-none ${rounded}`}></div>
    <div className="relative z-30 h-full w-full">
      {children}
    </div>
  </div>
);
export default function App() {

  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  const handleBuyClick = (e: React.MouseEvent) => {
    e.preventDefault();
    console.log('Redirecting to No-code Dodo Checkout...');
    window.location.href = CHECKOUT_URL;
  };

  if (currentPath === '/success') {
    return <Success />;
  }

  return (
    <div className="min-h-screen bg-white font-sans antialiased relative" data-version="restoration-v3-stable">


      {/* Top Bar Minimalista */}
      <header className="fixed top-0 left-0 right-0 z-50 py-7 pointer-events-none">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
          {/* Logo + Nombre */}
          <a href="#" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="pointer-events-auto flex items-center gap-3 no-underline group transition-transform hover:scale-[1.02] active:scale-[0.98]">
            <div className="w-12 h-12 sm:w-14 h-14 rounded-[14px] flex items-center justify-center overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.08)] bg-white border border-gray-200/50">
              <img src="/icons/np_128x128.png" alt="NauticPlayer Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-semibold text-[20px] sm:text-[22px] text-gray-900 tracking-tight hidden sm:block">
              NauticPlayer <span className="text-gray-500 font-normal">for Mac</span>
            </span>
          </a>

          {/* Botón Download */}
          <a
            href="#buy"
            onClick={handleBuyClick}
            className="pointer-events-auto flex items-center justify-center px-7 py-3 rounded-full border border-[#ff6213]/40 bg-white/50 backdrop-blur-md text-[15px] font-medium text-gray-800 transition-all hover:bg-[#ff6213] hover:border-[#ff6213] hover:text-white hover:shadow-[0_4px_20px_-4px_rgba(255,98,19,0.5)] active:scale-95"
          >
            Download — $19.99
          </a>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 pt-24 sm:pt-32 pb-32 sm:pb-24">
        {/* Hero Section */}
        <section className="text-center mb-24">
          <h1 className="text-4xl md:text-[2.75rem] font-bold tracking-tight mb-2 text-gray-900">NauticPlayer</h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-8 font-normal">Your most minimalist player.</h2>
          <p className="text-[17px] text-gray-700 max-w-2xl mx-auto leading-relaxed mb-12">
            Experience lossless audio with DJ-grade Automixing. Built natively for macOS to deliver lightning-fast performance without draining your battery.
          </p>


          <ThemeShowcase />

        </section>

        {/* Section 2: Eficiencia */}
        <section id="features" className="mb-20 text-center scroll-mt-32">

          <h2 className="text-2xl md:text-[28px] font-semibold mb-4 text-gray-900">Featherweight on your Mac. Heavyweight on Sound.</h2>
          <p className="text-[17px] text-gray-700 mb-10 leading-relaxed max-w-4xl mx-auto">
            Say goodbye to bloated Electron apps. Built natively on Apple's AVAudioEngine for zero CPU spikes, maximum battery life, and control right from your menu bar.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-b from-white to-gray-50/50 border border-gray-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] text-[14px] font-medium text-gray-700 tracking-wide select-none cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6213] shadow-[0_0_6px_rgba(255,98,19,0.6)]"></span>
              AVAudioEngine
            </span>
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-b from-white to-gray-50/50 border border-gray-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] text-[14px] font-medium text-gray-700 tracking-wide select-none cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6213] shadow-[0_0_6px_rgba(255,98,19,0.6)]"></span>
              CPU Usage
            </span>
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-b from-white to-gray-50/50 border border-gray-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] text-[14px] font-medium text-gray-700 tracking-wide select-none cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6213] shadow-[0_0_6px_rgba(255,98,19,0.6)]"></span>
              Battery Life
            </span>
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-b from-white to-gray-50/50 border border-gray-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] text-[14px] font-medium text-gray-700 tracking-wide select-none cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6213] shadow-[0_0_6px_rgba(255,98,19,0.6)]"></span>
              Menu Bar Waveform
            </span>
          </div>
          <div className="mt-14 flex justify-center w-full max-w-4xl mx-auto px-2 sm:px-4">
            {/* Fake MacBook Screen Top Wrapper */}
            <div className="relative w-full">
              <div
                className="w-full rounded-t-[20px] sm:rounded-t-[32px] rounded-b-none border-[12px] sm:border-[20px] border-b-0 border-[#111111] overflow-hidden relative h-56 sm:h-64 bg-black"
                style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)', maskImage: 'linear-gradient(to bottom, black 30%, transparent 95%)' }}
              >

                {/* Wallpaper Background (macOS Tahoe style) */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#1b6bbb] via-[#338cc9] to-[#60b5db]">
                  <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-white/10 to-transparent mix-blend-overlay filter blur-[40px] rounded-full translate-x-20 -translate-y-20"></div>
                  <div className="absolute inset-0 bg-white/5 mix-blend-soft-light" style={{ backgroundImage: "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')" }}></div>
                </div>

                {/* Menu Bar */}
                <div className="relative w-full h-[32px] sm:h-[34px] bg-white/20 backdrop-blur-2xl flex items-center justify-between px-3 text-white text-[13.5px] sm:text-[14px] font-[system-ui] font-medium shadow-[0_1px_3px_rgba(0,0,0,0.1)]">

                  {/* Left side */}
                  <div className="flex items-center gap-4 pl-0 sm:pl-1">
                  </div>

                  {/* Right side: Status Items */}
                  <div className="flex items-center gap-2 sm:gap-1.5 sm:gap-3.5 pr-1 sm:pr-2">

                    {/* NAUTICPLAYER WAVEFORM */}
                    <div className="flex items-center h-full mr-2">
                      <img src="/captures/statusbar_player.webp" alt="Waveform" className="h-[20px] w-auto drop-shadow-md filter contrast-125 brightness-110" />
                    </div>

                    {/* System Icons */}
                    <div className="flex items-center gap-3">
                      {/* Battery */}
                      <svg width="24" height="12" viewBox="0 0 24 12" fill="none" stroke="currentColor" strokeWidth="1.2" className="opacity-95 drop-shadow-sm">
                        <rect x="1" y="1" width="20" height="10" rx="3" stroke="currentColor" fill="none" />
                        <path d="M23 4v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                        <rect x="3" y="3" width="15" height="6" rx="1" fill="currentColor" stroke="none" />
                      </svg>
                      {/* Wifi */}
                      <svg width="16" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm opacity-95 hidden sm:block"><path d="M5 12.55a11 11 0 0 1 14.08 0" /><path d="M1.42 9a16 16 0 0 1 21.16 0" /><path d="M8.53 16.11a6 6 0 0 1 6.95 0" /><circle cx="12" cy="20" r="2.5" fill="currentColor" stroke="none" /></svg>
                      {/* Search */}
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm opacity-95 hidden sm:block"><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /></svg>
                    </div>

                    {/* Time */}
                    <span className="drop-shadow-sm tracking-tight font-medium opacity-95 whitespace-nowrap">
                      <span className="hidden sm:inline">Thu 23 Apr&nbsp;&nbsp;</span>20:16
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Mini Player */}
        <section className="mb-32 text-center">
          <h2 className="text-4xl md:text-[48px] font-bold tracking-tight mb-5 text-gray-900">Mighty Mini. Always in focus.</h2>
          <p className="text-[19px] md:text-[21px] text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
            A beautifully compact interface that stays out of your way. The new MiniPlayer gives you instant access to playback controls and automixing, adapting seamlessly to your macOS theme without cluttering your screen.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-b from-white to-gray-50/50 border border-gray-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] text-[14px] font-medium text-gray-700 tracking-wide select-none cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6213] shadow-[0_0_6px_rgba(255,98,19,0.6)]"></span>
              Adaptive UI
            </span>
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-b from-white to-gray-50/50 border border-gray-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] text-[14px] font-medium text-gray-700 tracking-wide select-none cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6213] shadow-[0_0_6px_rgba(255,98,19,0.6)]"></span>
              Always on Top
            </span>
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-b from-white to-gray-50/50 border border-gray-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] text-[14px] font-medium text-gray-700 tracking-wide select-none cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6213] shadow-[0_0_6px_rgba(255,98,19,0.6)]"></span>
              Minimal Footprint
            </span>
          </div>
          <div className="mt-14 max-w-3xl mx-auto px-4">
            <ThemeShowcase
              lightImage="/captures/miniPlayer_wt@3x.webp"
              darkImage="/captures/miniPlayer_bl@3x.webp"
              className="mt-0"
            />
          </div>
        </section>

        {/* Section 1: Mezcla */}
        <section className="mb-20 text-center">

          <h2 className="text-4xl md:text-[48px] font-bold tracking-tight mb-5 inline-block">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Flawless Transitions. </span>
            <span className="text-gray-900">Zero Effort.</span>
          </h2>
          <p className="text-[19px] md:text-[21px] text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
            Our real-time DJ engine analyzes transients and BPM to synchronize tracks to the millisecond. Experience club-perfect mixes, automatically.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-b from-white to-gray-50/50 border border-gray-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] text-[14px] font-medium text-gray-700 tracking-wide select-none cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6213] shadow-[0_0_6px_rgba(255,98,19,0.6)]"></span>
              Transient Analysis
            </span>
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-b from-white to-gray-50/50 border border-gray-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] text-[14px] font-medium text-gray-700 tracking-wide select-none cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6213] shadow-[0_0_6px_rgba(255,98,19,0.6)]"></span>
              BPM Adjustment
            </span>
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-b from-white to-gray-50/50 border border-gray-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] text-[14px] font-medium text-gray-700 tracking-wide select-none cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6213] shadow-[0_0_6px_rgba(255,98,19,0.6)]"></span>
              Zero-Crossing
            </span>
            <span className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-gradient-to-b from-white to-gray-50/50 border border-gray-200/80 shadow-[0_2px_12px_-4px_rgba(0,0,0,0.06)] text-[14px] font-medium text-gray-700 tracking-wide select-none cursor-default">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff6213] shadow-[0_0_6px_rgba(255,98,19,0.6)]"></span>
              Automix
            </span>
          </div>
          <GlassCard rounded="rounded-[2.5rem]" className="mt-14 max-w-4xl mx-auto bg-gray-50/50 border border-gray-200/50">
            <div className="p-6 md:p-8 md:p-16">
              <div className="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">

                {/* DECK A */}
                <div className="flex flex-col items-center gap-4">
                  <span className="text-blue-600 font-black tracking-widest text-lg md:text-xl">DECK A</span>
                  <div className="w-56 md:w-64 h-24 md:h-28 bg-blue-50/50 border-2 border-blue-200 rounded-2xl flex items-center justify-center gap-1.5 p-4 shadow-[inset_0_0_20px_rgba(59,130,246,0.05)]">
                    {/* Active Waveform */}
                    <div className="w-2 h-[40%] bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-[60%] bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-[30%] bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-[80%] bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-[50%] bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-[30%] bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-[90%] bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-[100%] bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-[70%] bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-[40%] bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-[80%] bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-[60%] bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-[30%] bg-blue-500 rounded-sm"></div>
                    <div className="w-2 h-[20%] bg-blue-500 rounded-sm"></div>
                  </div>
                </div>

                {/* CENTER ICON */}
                <div className="flex flex-col items-center gap-4">
                  <div className="relative flex flex-col items-center justify-center">
                    <svg width="64" height="64" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="drop-shadow-sm">
                      <defs>
                        <linearGradient id="arrow-grad" x1="0" y1="0" x2="48" y2="0" gradientUnits="userSpaceOnUse">
                          <stop offset="0%" stopColor="#2563eb" />
                          <stop offset="100%" stopColor="#9333ea" />
                        </linearGradient>
                      </defs>
                      <path d="M16 14L6 20L16 26" stroke="url(#arrow-grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M42 20H6" stroke="url(#arrow-grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />

                      <path d="M32 26L42 32L32 38" stroke="url(#arrow-grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M6 32H42" stroke="url(#arrow-grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="text-amber-500 font-black tracking-widest text-2xl drop-shadow-sm">DJ</span>
                </div>

                {/* DECK B */}
                <div className="flex flex-col items-center gap-4">
                  <span className="text-purple-600 font-black tracking-widest text-lg md:text-xl">DECK B</span>
                  <div className="w-56 md:w-64 h-24 md:h-28 bg-purple-50/50 border-2 border-purple-200 rounded-2xl flex items-center justify-center gap-1.5 p-4 shadow-[inset_0_0_20px_rgba(168,85,247,0.05)] opacity-80">
                    {/* Faded/Waiting Waveform */}
                    <div className="w-2 h-[15%] bg-purple-300 rounded-sm"></div>
                    <div className="w-2 h-[20%] bg-purple-300 rounded-sm"></div>
                    <div className="w-2 h-[10%] bg-purple-300 rounded-sm"></div>
                    <div className="w-2 h-[30%] bg-purple-300 rounded-sm"></div>
                    <div className="w-2 h-[20%] bg-purple-300 rounded-sm"></div>
                    <div className="w-2 h-[10%] bg-purple-300 rounded-sm"></div>
                    <div className="w-2 h-[40%] bg-purple-300 rounded-sm"></div>
                    <div className="w-2 h-[25%] bg-purple-300 rounded-sm"></div>
                    <div className="w-2 h-[15%] bg-purple-300 rounded-sm"></div>
                    <div className="w-2 h-[20%] bg-purple-300 rounded-sm"></div>
                    <div className="w-2 h-[30%] bg-purple-300 rounded-sm"></div>
                    <div className="w-2 h-[15%] bg-purple-300 rounded-sm"></div>
                    <div className="w-2 h-[10%] bg-purple-300 rounded-sm"></div>
                    <div className="w-2 h-[10%] bg-purple-300 rounded-sm"></div>
                  </div>
                </div>

              </div>
            </div>
          </GlassCard>
        </section>

        {/* Bridge Section: Fidelity */}
        <section className="mb-32 mt-32 max-w-5xl mx-auto px-4">
          <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-[#0a0a0a] text-white p-12 md:p-24 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200%] bg-gradient-to-b from-blue-600/20 via-purple-600/10 to-transparent pointer-events-none blur-[100px]"></div>

            <h2 className="text-4xl md:text-[56px] font-bold tracking-tight mb-8 relative z-10 leading-tight">
              Studio-grade fidelity. <br className="sm:hidden" /> Untouched audio.
            </h2>
            <p className="text-[19px] md:text-[22px] text-gray-400 leading-relaxed max-w-3xl mx-auto relative z-10 font-light">
              Your music deserves to be heard exactly as it was recorded. We bypassed the standard macOS audio stack to deliver an untouched, bit-perfect stream directly to your DAC. Support for lossless formats means you hear every single detail.
            </p>

            <div className="mt-14 flex flex-wrap justify-center gap-4 relative z-10">
              <span className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] font-medium tracking-wide text-gray-200 select-none cursor-default shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6213] shadow-[0_0_8px_rgba(255,98,19,0.8)]"></span>
                Bit-Perfect Engine
              </span>
              <span className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] font-medium tracking-wide text-gray-200 select-none cursor-default shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6213] shadow-[0_0_8px_rgba(255,98,19,0.8)]"></span>
                FLAC / ALAC / AIFF
              </span>
              <span className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] font-medium tracking-wide text-gray-200 select-none cursor-default shadow-[0_4px_12px_rgba(0,0,0,0.2)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff6213] shadow-[0_0_8px_rgba(255,98,19,0.8)]"></span>
                Hardware Sample Rate
              </span>
            </div>
          </div>
        </section>

        {/* Section 4: Drag & Drop and Shortcuts */}
        <section className="mb-32 grid lg:grid-cols-2 gap-8 px-4 max-w-5xl mx-auto text-left">
          {/* Card 1 */}
          <GlassCard rounded="rounded-[2.5rem]" className="bg-gray-50/50 border border-gray-200/50 h-full">
            <div className="p-8 md:p-12 h-full flex flex-col">
              <h3 className="text-[28px] font-bold tracking-tight mb-4 text-gray-900">Your New Sampling Workflow.</h3>
              <p className="text-[18px] text-gray-600 leading-relaxed mb-10 font-light">
                Seamlessly integrated with your studio. Drag any track or sample directly from NauticPlayer into Logic Pro, Ableton, or FL Studio instantly.
              </p>

              <div className="mt-auto relative flex flex-col items-center justify-center h-56 bg-white rounded-2xl border border-gray-200/60 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] w-full">
                {/* Floating Track Badge */}
                <div className="absolute top-6 right-6 sm:right-12 bg-[#0a84ff] text-white font-mono text-[14px] font-bold px-4 py-1.5 rounded-full flex items-center gap-2 shadow-[0_4px_20px_rgba(10,132,255,0.5)] z-10 animate-bounce" style={{ animationDuration: '2.5s' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" /></svg>
                  track
                </div>

                <div className="flex items-center gap-6 sm:gap-6 md:gap-6 md:p-8 translate-y-3">
                  {/* Nautic Side */}
                  <div className="flex flex-col items-center gap-3">
                    <img src="/icons/np_128x128.png" alt="Nautic" className="w-14 h-14 rounded-[14px] object-cover shadow-md" />
                    <span className="text-[14px] text-gray-600 font-semibold tracking-wide">Nautic</span>
                  </div>

                  {/* Arrow */}
                  <svg className="w-6 h-6 text-[#0a84ff] mb-6 stroke-[3px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>

                  {/* DAW Side */}
                  <div className="flex flex-col items-center gap-3">
                    <svg className="w-14 h-14 text-blue-400 stroke-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12h4l3-9 5 18 3-9h3" /></svg>
                    <span className="text-[14px] text-gray-600 font-semibold tracking-wide">DAW</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Card 2 */}
          <GlassCard rounded="rounded-[2.5rem]" className="bg-gray-50/50 border border-gray-200/50 h-full">
            <div className="p-8 md:p-12 h-full flex flex-col">
              <h3 className="text-[28px] font-bold tracking-tight mb-4 text-gray-900">Keyboard-First Control.</h3>
              <p className="text-[18px] text-gray-600 leading-relaxed mb-10 font-light">
                Never break your focus. Tag favorites with <kbd className="bg-white border border-gray-200 px-2 py-0.5 rounded shadow-sm text-sm mx-1 font-sans font-medium text-gray-700">F</kbd> or trash rejects with <kbd className="bg-white border border-gray-200 px-2 py-0.5 rounded shadow-sm text-sm mx-1 font-sans font-medium text-gray-700">Backspace</kbd> without ever touching your mouse.
              </p>

              <div className="mt-auto flex items-center justify-center gap-6 sm:gap-10 h-56 bg-white rounded-2xl border border-gray-200/60 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] w-full">
                {/* F Key */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-16 h-16 rounded-[14px] border border-gray-200 bg-white flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.1)]">
                    <span className="text-2xl md:text-[28px] font-bold text-blue-600">F</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-7 h-7 text-[#ffd60a] drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
                    <span className="text-[14px] text-gray-600 font-medium">Favorites</span>
                  </div>
                </div>
                {/* Backspace Key */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-[5.5rem] h-16 rounded-[14px] border border-gray-200 bg-white flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.1)]">
                    <svg className="w-8 h-8 text-[#ff453a]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z" /></svg>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-7 h-7 text-[#ff453a] drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    <span className="text-[14px] text-gray-600 font-medium">Trash</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        {/* Features Lists */}
        <section className="grid md:grid-cols-2 gap-6 md:gap-6 md:p-8 md:gap-12 mb-24 max-w-4xl mx-auto text-left">
          <div>
            <h3 className="text-[19px] font-semibold mb-4 text-gray-900">Features</h3>
            <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700 marker:text-gray-400">
              <li>Automix with BPM detection</li>
              <li>Real-time transient analysis</li>
              <li>Native AVAudioEngine integration</li>
              <li>Global keyboard shortcuts support</li>
              <li>Native playback notifications</li>
              <li>Duplicate track finder</li>
              <li>Integrated Last.fm scrobbling</li>
              <li>Separate playlist windows</li>
              <li>Regex search and replace</li>
              <li>Smart playlists</li>
              <li>Detailed library statistics</li>
              <li>AppleScript control support</li>
            </ul>
          </div>
          <div>
            <h3 className="text-[19px] font-semibold mb-4 text-gray-900">Audio Playback</h3>
            <ul className="list-disc pl-5 space-y-2 text-[15px] text-gray-700 marker:text-gray-400">
              <li>Support for FLAC, MP3, AIFF, and M4A</li>
              <li>Gapless playback</li>
              <li>ReplayGain tag support</li>
              <li>Automatic device sample rate switching</li>
              <li>Support for cue sheets and embedded cue info</li>
              <li>Bit-perfect audio processing</li>
            </ul>
          </div>
        </section>

        {/* Bridge Section */}
        <section className="text-center mb-16 px-4">
          <p className="text-xl md:text-2xl text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            The industry charges you every month for software you'll never truly own. <span className="text-gray-900 font-medium">We think that's backwards.</span>
          </p>
        </section>

        <section id="buy" className="text-center pt-16 border-t border-gray-100 scroll-mt-32 pb-24">
          <div className="w-16 h-16 mx-auto rounded-[16px] flex items-center justify-center mb-8 overflow-hidden shadow-md border border-black/5 bg-white">
            <img src="/icons/np_128x128.png" alt="NauticPlayer Logo" className="w-full h-full object-cover" />
          </div>

          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4 text-gray-900">Pay once. Own it forever.</h2>
          <p className="text-lg md:text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Most players charge $9.99/month. That's $240 over two years — for software you're just renting. <span className="text-gray-900 font-semibold">NauticPlayer is $19.99. Once.</span>
          </p>

          {/* Visual Comparison Card */}
          <div className="max-w-md mx-auto mb-16 bg-gray-50/50 rounded-3xl border border-gray-200/50 p-8 shadow-sm">
            <div className="grid grid-cols-2 gap-8 text-left">
              <div>
                <span className="text-[12px] font-bold uppercase tracking-wider text-gray-400 block mb-4">NauticPlayer</span>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Year 1</span>
                    <span className="font-semibold text-gray-900">$19.99</span>
                  </div>
                  <div className="flex justify-between items-center text-blue-600 font-medium">
                    <span>Year 2+</span>
                    <span>$0.00</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                    <span className="font-bold text-gray-900">Total</span>
                    <span className="font-bold text-gray-900">$19.99</span>
                  </div>
                </div>
              </div>
              <div className="opacity-50">
                <span className="text-[12px] font-bold uppercase tracking-wider text-gray-400 block mb-4">Typical Subscription</span>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Year 1</span>
                    <span>$119.88</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Year 2+</span>
                    <span>$239.76</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200 flex justify-between items-center">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-medium text-gray-900">$359.64</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-500 font-medium italic">
              ✓ You own it · ✗ Renting forever
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <button
              onClick={handleBuyClick}
              className="px-14 py-5 bg-[#ff6213] rounded-[24px] text-white font-bold text-xl shadow-[0_10px_30px_-5px_rgba(255,98,19,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(255,98,19,0.5)] transition-all hover:-translate-y-1 active:translate-y-0"
            >
              Buy Now — $19.99 · One-Time
            </button>

            <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-[14px] text-gray-500 font-medium">
              <span className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>No subscription, ever</span>
              <span className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>All future updates included</span>
              <span className="flex items-center gap-2"><svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>One license, one Mac</span>
            </div>

            <div className="mt-12">
              <a
                id="download"
                href={DMG_URL}
                download="NauticPlayer_v1.1.dmg"
                className="text-gray-500 hover:text-gray-900 font-medium text-[15px] transition-colors border-b border-transparent hover:border-gray-900 pb-0.5"
              >
                Try free first — no credit card needed
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="support" className="max-w-4xl mx-auto px-4 py-12 border-t border-gray-200 text-[14px] text-gray-500 flex flex-col sm:flex-row items-center justify-between mt-12 scroll-mt-32">
        <div className="mb-4 sm:mb-0">
          © 2026 NauticSoftwares. <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
        </div>
        <div className="hidden sm:flex items-center justify-center">
          <div className="w-6 h-6 rounded flex items-center justify-center overflow-hidden grayscale opacity-70">
            <img src="/icons/np_64x64.png" alt="NauticPlayer" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="flex gap-6">
          <a href="#" className="text-blue-600 hover:underline">Contact</a>
          <a href="#" className="text-blue-600 hover:underline">Documentation</a>
          <a href="#" className="text-blue-600 hover:underline">About</a>
        </div>
      </footer>
    </div>
  );
}