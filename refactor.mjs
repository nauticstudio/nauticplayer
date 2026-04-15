import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Replace Section 3 (Mini Player)
const sec3Old = `{/* Section 3: Calidad */}
        <section className="mb-20 text-center">
          
          <h2 className="text-2xl md:text-[28px] font-semibold mb-4 text-gray-900">Bit-Perfect Audio</h2>
          <p className="text-[17px] text-gray-700 mb-10 leading-relaxed max-w-4xl mx-auto">
            Your music deserves to be heard exactly as it was recorded. That's why we offer bit-perfect audio processing and native support without conversions for high-fidelity formats, including FLAC, AIFF, MP3, and M4A. All within a secure environment with complete sandboxing.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[15px]">
            <a href="#" className="text-blue-600 hover:underline">Lossless Formats</a>
            <a href="#" className="text-blue-600 hover:underline">Bit-Perfect</a>
            <a href="#" className="text-blue-600 hover:underline">Secure Sandboxing</a>
          </div>
          <div className="mt-10 max-w-4xl mx-auto">
            <ThemeShowcase 
              lightImage="/captures/miniPlayer_wt@3x.webp" 
              darkImage="/captures/miniPlayer_bl@3x.webp" 
              className="mt-0" 
            />
          </div>
        </section>`;

const sec3New = `{/* Section 3: Mini Player */}
        <section className="mb-32 text-center">
          <h2 className="text-4xl md:text-[48px] font-bold tracking-tight mb-5 text-gray-900">Mighty. Mini.</h2>
          <p className="text-[19px] md:text-[21px] text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
            A beautifully compact interface that stays out of your way. The new MiniPlayer gives you instant access to playback controls and automixing, adapting seamlessly to your macOS theme without cluttering your screen.
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-[15px] font-medium">
            <span className="text-blue-600">Adaptive UI</span>
            <span className="text-blue-600">Always on Top</span>
            <span className="text-blue-600">Minimal Footprint</span>
          </div>
          <div className="mt-14 max-w-3xl mx-auto px-4">
            <ThemeShowcase 
              lightImage="/captures/miniPlayer_wt@3x.webp" 
              darkImage="/captures/miniPlayer_bl@3x.webp" 
              className="mt-0" 
            />
          </div>
        </section>`;

content = content.replace(sec3Old, sec3New);

// 2. Replace Section 1 (Mezcla) Typography
const sec1Old = `<h2 className="text-2xl md:text-[28px] font-semibold mb-4 inline-block">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Flawless Transitions. </span>
            <span className="text-amber-500 drop-shadow-sm">Zero Effort.</span>
          </h2>
          <p className="text-[17px] text-gray-700 mb-10 leading-relaxed max-w-4xl mx-auto">
            Our real-time DJ engine analyzes transients and BPM to synchronize tracks to the millisecond. Experience club-perfect mixes, automatically.
          </p>`;

const sec1New = `<h2 className="text-4xl md:text-[48px] font-bold tracking-tight mb-5 inline-block">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Flawless Transitions. </span>
            <span className="text-gray-900">Zero Effort.</span>
          </h2>
          <p className="text-[19px] md:text-[21px] text-gray-600 mb-10 leading-relaxed max-w-3xl mx-auto font-light">
            Our real-time DJ engine analyzes transients and BPM to synchronize tracks to the millisecond. Experience club-perfect mixes, automatically.
          </p>`;

content = content.replace(sec1Old, sec1New);

// 3. Replace Section 4 (Drag & Drop) and add Bridge
const sec4Regex = /\{\/\* Section 4: Drag & Drop and Shortcuts \*\/\}[\s\S]*?(?=\{\/\* Features Lists \*\/)/;

const sec4New = `{/* Bridge Section: Fidelity */}
        <section className="mb-32 mt-32 max-w-5xl mx-auto px-4">
          <div className="relative rounded-[2.5rem] md:rounded-[3rem] overflow-hidden bg-[#0a0a0a] text-white p-12 md:p-24 text-center shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] border border-white/10">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[200%] bg-gradient-to-b from-blue-600/20 via-purple-600/10 to-transparent pointer-events-none blur-[100px]"></div>

            <h2 className="text-4xl md:text-[56px] font-bold tracking-tight mb-8 relative z-10 leading-tight">
              Uncompromising <br className="sm:hidden" /> Fidelity.
            </h2>
            <p className="text-[19px] md:text-[22px] text-gray-400 leading-relaxed max-w-3xl mx-auto relative z-10 font-light">
              Your music deserves to be heard exactly as it was recorded. We bypassed the standard macOS audio stack to deliver an untouched, bit-perfect stream directly to your DAC. Support for lossless formats means you hear every single detail.
            </p>

            <div className="mt-14 flex flex-wrap justify-center gap-4 relative z-10">
              <span className="px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] font-medium tracking-wide text-gray-200">Bit-Perfect Engine</span>
              <span className="px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] font-medium tracking-wide text-gray-200">FLAC / ALAC / AIFF</span>
              <span className="px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-[15px] font-medium tracking-wide text-gray-200">Hardware Sample Rate</span>
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

              <div className="mt-auto relative rounded-2xl overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-black/5 bg-white">
                <ThemeShowcase 
                  lightImage="/captures/drop_player-wt@3x.webp" 
                  darkImage="/captures/drop_player-bl@3x.webp" 
                  className="mt-0 !rounded-none !shadow-none !border-none" 
                />
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
                    <svg className="w-7 h-7 text-[#ffd60a] drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/></svg>
                    <span className="text-[14px] text-gray-600 font-medium">Favorites</span>
                  </div>
                </div>
                {/* Backspace Key */}
                <div className="flex flex-col items-center gap-4">
                  <div className="w-[5.5rem] h-16 rounded-[14px] border border-gray-200 bg-white flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.1)]">
                     <svg className="w-8 h-8 text-[#ff453a]" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2M3 12l6.414 6.414a2 2 0 001.414.586H19a2 2 0 002-2V7a2 2 0 00-2-2h-8.172a2 2 0 00-1.414.586L3 12z"/></svg>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <svg className="w-7 h-7 text-[#ff453a] drop-shadow-sm" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"><path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                    <span className="text-[14px] text-gray-600 font-medium">Trash</span>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </section>

        `;

content = content.replace(sec4Regex, sec4New);

fs.writeFileSync('src/App.tsx', content);
