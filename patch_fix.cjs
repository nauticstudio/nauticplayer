const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

code = code.replace(
  '<GlassCard className="mt-10 max-w-3xl mx-auto" rounded="rounded-[1.5rem]">\n            <img src="/captures/drop_player-bl.webp" alt="NauticPlayer Bit-Perfect Audio" className="w-full h-auto block" />\n          </div>',
  '<GlassCard className="mt-10 max-w-3xl mx-auto" rounded="rounded-[1.5rem]">\n            <img src="/captures/drop_player-bl.webp" alt="NauticPlayer Bit-Perfect Audio" className="w-full h-auto block" />\n          </GlassCard>'
);

fs.writeFileSync('src/App.tsx', code);
