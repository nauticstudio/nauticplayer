const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// Drag & Drop changes
code = code.replace(
  'h-48 bg-[#242832] rounded-xl border border-black/10 shadow-inner mb-6 w-full',
  'h-48 bg-gray-50/50 rounded-xl border border-gray-200/60 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] mb-6 w-full'
);
code = code.replace(
  '<span className="text-[14px] text-gray-400 font-semibold tracking-wide">Nautic</span>',
  '<span className="text-[14px] text-gray-600 font-semibold tracking-wide">Nautic</span>'
);
code = code.replace(
  '<span className="text-[14px] text-gray-400 font-semibold tracking-wide">DAW</span>',
  '<span className="text-[14px] text-gray-600 font-semibold tracking-wide">DAW</span>'
);
code = code.replace(
  '<svg className="w-14 h-14 text-[#4ac1e8] stroke-2"',
  '<svg className="w-14 h-14 text-blue-400 stroke-2"'
);

// Shortcuts Graphic changes
code = code.replace(
  'gap-6 sm:gap-10 h-48 bg-[#242832] rounded-xl border border-black/10 shadow-inner mb-6 w-full',
  'gap-6 sm:gap-10 h-48 bg-gray-50/50 rounded-xl border border-gray-200/60 shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] mb-6 w-full'
);

code = code.replace(
  'rounded-[14px] border-[1.5px] border-gray-500/50 bg-[#3a3f4b] flex items-center justify-center shadow-md',
  'rounded-[14px] border border-gray-200 bg-white flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.1)]'
);

code = code.replace(
  '<span className="text-[28px] font-bold text-[#0a84ff]">F</span>',
  '<span className="text-[28px] font-bold text-blue-600">F</span>'
);

code = code.replace(
  '<span className="text-[14px] text-gray-300 font-medium">Favorites</span>',
  '<span className="text-[14px] text-gray-600 font-medium">Favorites</span>'
);

code = code.replace(
  'rounded-[14px] border-[1.5px] border-gray-500/50 bg-[#3a3f4b] flex items-center justify-center shadow-md',
  'rounded-[14px] border border-gray-200 bg-white flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.05),0_1px_3px_rgba(0,0,0,0.1)]'
);

code = code.replace(
  '<span className="text-[14px] text-gray-300 font-medium">Trash</span>',
  '<span className="text-[14px] text-gray-600 font-medium">Trash</span>'
);

fs.writeFileSync('src/App.tsx', code);
console.log("Replaced dark backgrounds with light backgrounds successfully.");
