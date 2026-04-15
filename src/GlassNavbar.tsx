import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function GlassNavbar({ children, className = "" }) {
  const filterRef = useRef(null);
  const debugRef = useRef(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    
    const config = {
      width: isMobile ? 336 : 600,
      height: isMobile ? 96 : 80,
      radius: isMobile ? 16 : 40,
      border: 0.07,
      lightness: 50,
      alpha: 0.93,
      blur: 11,
      blend: 'difference',
      x: 'R',
      y: 'B',
      scale: -180,
      r: 0,
      g: 10,
      b: 20,
      displace: 0.2,
      frost: 0.05,
      saturation: 1,
      icons: true,
      top: false,
      debug: false,
      preset: 'dock',
    };

    const buildDisplacementImage = () => {
      const border = Math.min(config.width, config.height) * (config.border * 0.5);
      const kids = `
        <svg class="displacement-image" viewBox="0 0 ${config.width} ${config.height}" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="red" x1="100%" y1="0%" x2="0%" y2="0%">
              <stop offset="0%" stop-color="#000"/>
              <stop offset="100%" stop-color="red"/>
            </linearGradient>
            <linearGradient id="blue" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#000"/>
              <stop offset="100%" stop-color="blue"/>
            </linearGradient>
          </defs>
          <rect x="0" y="0" width="${config.width}" height="${config.height}" fill="black"></rect>
          <rect x="0" y="0" width="${config.width}" height="${config.height}" rx="${config.radius}" fill="url(#red)" />
          <rect x="0" y="0" width="${config.width}" height="${config.height}" rx="${config.radius}" fill="url(#blue)" style="mix-blend-mode: ${config.blend}" />
          <rect x="${border}" y="${border}" width="${config.width - border * 2}" height="${config.height - border * 2}" rx="${config.radius}" fill="hsl(0 0% ${config.lightness}% / ${config.alpha})" style="filter:blur(${config.blur}px)" />
        </svg>
      `;
      
      if (debugRef.current) {
        debugRef.current.innerHTML = kids;
        const svgEl = debugRef.current.querySelector('.displacement-image');
        if (svgEl) {
          const serialized = new XMLSerializer().serializeToString(svgEl);
          const encoded = encodeURIComponent(serialized);
          const dataUri = "data:image/svg+xml," + encoded;
          gsap.set('.feImageMap', { attr: { href: dataUri } });
        }
      }
      gsap.set('.feDisplacementMapClass', { attr: { xChannelSelector: config.x, yChannelSelector: config.y } });
    };

    const update = () => {
      buildDisplacementImage();
      gsap.set(document.documentElement, {
        '--width': config.width,
        '--height': config.height,
        '--radius': config.radius,
        '--frost': config.frost,
        '--output-blur': config.displace,
        '--saturation': config.saturation,
      });
      gsap.set('.feDisplacementMapClass', { attr: { scale: config.scale } });
      gsap.set('.redchannel', { attr: { scale: config.scale + config.r } });
      gsap.set('.greenchannel', { attr: { scale: config.scale + config.g } });
      gsap.set('.bluechannel', { attr: { scale: config.scale + config.b } });
      gsap.set('.feGaussianBlurClass', { attr: { stdDeviation: config.displace } });
      
      document.documentElement.dataset.icons = String(config.icons);
      document.documentElement.dataset.mode = config.preset;
      document.documentElement.dataset.top = String(config.top);
      document.documentElement.dataset.debug = String(config.debug);
    };

    update();
    
    // Animate opacity to 1 on mount
    gsap.to('.glass-effect-wrapper', { opacity: 1, duration: 0.3 });
  }, []);

  return (
    <>
      <div className={`glass-effect-wrapper fixed z-[999999] opacity-0 transition-opacity duration-300 left-1/2 -translate-x-1/2 bottom-6 sm:bottom-auto sm:top-6 ${className}`} 
           style={{ 
             height: 'calc(var(--height) * 1px)', 
             width: 'calc(var(--width) * 1px)', 
           }}>
        
        <div className="absolute inset-0 w-full h-full pointer-events-none"
             style={{
               borderRadius: 'calc(var(--radius) * 1px)',
               backdropFilter: 'url(#glass-filter) blur(2px) saturate(var(--saturation, 1)) brightness(1.1)',
               WebkitBackdropFilter: 'url(#glass-filter) blur(2px) saturate(var(--saturation, 1)) brightness(1.1)',
               background: 'light-dark(hsl(0 0% 100% / var(--frost, 0)), hsl(0 0% 0% / var(--frost, 0)))',
               boxShadow: '0 0 2px 1px light-dark(color-mix(in oklch, canvasText, #0000 85%), color-mix(in oklch, canvasText, #0000 65%)) inset, 0 0 10px 4px light-dark(color-mix(in oklch, canvasText, #0000 90%), color-mix(in oklch, canvasText, #0000 85%)) inset, 0px 4px 16px rgba(17, 17, 26, 0.05), 0px 8px 24px rgba(17, 17, 26, 0.05), 0px 16px 56px rgba(17, 17, 26, 0.05)'
             }}>
        </div>

        <div className="nav-wrap absolute inset-0 w-full h-full overflow-hidden pointer-events-auto z-10" style={{ borderRadius: 'calc(var(--radius) * 1px)' }}>
          <nav className="w-full h-full flex items-center justify-center p-0 m-0">
            {children}
          </nav>
        </div>
        
        <svg className="filter absolute inset-0 w-full h-full pointer-events-none z-0" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <filter id="glass-filter" colorInterpolationFilters="sRGB">
              <feImage x="0" y="0" width="100%" height="100%" result="map" className="feImageMap"></feImage>
              <feDisplacementMap in="SourceGraphic" in2="map" className="feDisplacementMapClass redchannel" id="redchannel" xChannelSelector="R" yChannelSelector="G" result="dispRed" />
              <feColorMatrix in="dispRed" type="matrix" values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" result="red" />
              <feDisplacementMap in="SourceGraphic" in2="map" className="feDisplacementMapClass greenchannel" id="greenchannel" xChannelSelector="R" yChannelSelector="G" result="dispGreen" />
              <feColorMatrix in="dispGreen" type="matrix" values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0" result="green" />
              <feDisplacementMap in="SourceGraphic" in2="map" className="feDisplacementMapClass bluechannel" id="bluechannel" xChannelSelector="R" yChannelSelector="G" result="dispBlue" />
              <feColorMatrix in="dispBlue" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0" result="blue" />
              <feBlend in="red" in2="green" mode="screen" result="rg" />
              <feBlend in="rg" in2="blue" mode="screen" result="output" />
              <feGaussianBlur in="output" stdDeviation="0.7" className="feGaussianBlurClass" />
            </filter>
          </defs>
        </svg>

        <div className="displacement-debug hidden" ref={debugRef}></div>
      </div>
    </>
  );
}
