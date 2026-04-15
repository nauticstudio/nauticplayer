const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Inject GlassCard before App
const glassCardDef = `
const GlassCard = ({ children, className = "", rounded = "rounded-[2rem]" }: any) => (
  <div className={\`relative overflow-hidden bg-transparent shadow-[0_6px_6px_rgba(0,0,0,0.2),0_0_20px_rgba(0,0,0,0.1)] \${rounded} \${className}\`}>
    <div className="absolute inset-0 backdrop-blur-[4px] z-0" style={{ filter: 'url(#lensFilter) saturate(120%) brightness(1.15)' }}></div>
    <div className="absolute inset-0 bg-white/25 z-10"></div>
    <div className={\`absolute inset-0 shadow-[inset_1px_1px_0_rgba(255,255,255,0.75),inset_0_0_5px_rgba(255,255,255,0.75)] z-20 pointer-events-none \${rounded}\`}></div>
    <div className="relative z-30 h-full w-full">
      {children}
    </div>
  </div>
);

`;

code = code.replace('export default function App() {', glassCardDef + 'export default function App() {');

// Remove icons (which are exactly identical lines)
const iconStr = `<div className="w-12 h-12 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>
          </div>`;
const icon2Str = `<div className="w-12 h-12 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>`;
const icon3Str = `<div className="w-12 h-12 mx-auto bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" /></svg>
          </div>`;

code = code.replace(iconStr, '');
code = code.replace(icon2Str, '');
code = code.replace(icon3Str, '');

// Card 1
code = code.replace('<div className="mt-14 max-w-4xl mx-auto rounded-3xl overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] bg-white border border-gray-200/50 p-8 md:p-16">', '<GlassCard className="mt-14 max-w-4xl mx-auto">\n            <div className="p-8 md:p-16">');
// Since Card 1 ends at line 256 just before </section> we need to replace its closing div.
code = code.replace('              </div>\n\n            </div>\n          </div>\n        </section>\n\n        {/* Section 2: Eficiencia */}', '              </div>\n\n            </div>\n            </div>\n          </GlassCard>\n        </section>\n\n        {/* Section 2: Eficiencia */}');

// Card 2
code = code.replace('<div className="w-full max-w-sm rounded-[1rem] md:rounded-[1.5rem] overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] border border-gray-200/50 bg-white">', '<GlassCard className="w-full max-w-sm" rounded="rounded-[1.5rem]">');
code = code.replace('              <img src="/captures/statusbar_player.webp" alt="NauticPlayer Status Bar Native Integration" className="w-full h-auto block" />\n            </div>\n          </div>\n        </section>', '              <img src="/captures/statusbar_player.webp" alt="NauticPlayer Status Bar Native Integration" className="w-full h-auto block" />\n            </GlassCard>\n          </div>\n        </section>');

// Card 3
code = code.replace('<div className="mt-10 max-w-3xl mx-auto rounded-[1.5rem] overflow-hidden shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] border border-gray-800/50 bg-[#1e1e1e]">', '<GlassCard className="mt-10 max-w-3xl mx-auto" rounded="rounded-[1.5rem]">');
code = code.replace('              <img src="/captures/drop_player-bl.webp" alt="NauticPlayer Bit-Perfect Audio" className="w-full h-auto block" />\n          </div>\n        </section>', '              <img src="/captures/drop_player-bl.webp" alt="NauticPlayer Bit-Perfect Audio" className="w-full h-auto block" />\n          </GlassCard>\n        </section>');

// Cards 4 & 5
code = code.replace('<div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">', '<GlassCard rounded="rounded-2xl">\n            <div className="p-8">');
code = code.replace('<div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">', '<GlassCard rounded="rounded-2xl">\n            <div className="p-8">');

// We need to close Cards 4 & 5
code = code.replace('creadores de contenido.\n            </p>\n          </div>', 'creadores de contenido.\n            </p>\n            </div>\n          </GlassCard>');
code = code.replace('enviarla a la papelera.\n            </p>\n          </div>', 'enviarla a la papelera.\n            </p>\n            </div>\n          </GlassCard>');

fs.writeFileSync('src/App.tsx', code);
console.log("Patched successfully");
