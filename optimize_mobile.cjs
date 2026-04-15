const fs = require('fs');
let code = fs.readFileSync('src/App.tsx', 'utf-8');

// 1. Standardize max-widths to max-w-4xl
code = code.replace(/max-w-3xl/g, 'max-w-4xl');

// 2. Responsive Typography for Hero
code = code.replace('text-[2.75rem]', 'text-4xl md:text-[2.75rem]');
code = code.replace('text-2xl text-gray-600', 'text-xl md:text-2xl text-gray-600');

// 3. Responsive Typography for Section Titles
code = code.replace(/text-\[28px\]/g, 'text-2xl md:text-[28px]');

// 4. Navbar mobile tweaks
code = code.replace('pr-8', 'pr-2 sm:pr-8');
code = code.replace('pl-8', 'pl-2 sm:pl-8');
code = code.replace(/w-16 sm:w-20/g, 'w-14 sm:w-20');
code = code.replace(/h-16 sm:h-20/g, 'w-full h-14 sm:h-20');
code = code.replace(/text-\[14px\] font-medium/g, 'text-[11px] sm:text-[14px] font-medium text-center leading-tight');
// NavItem icon mb
code = code.replace('mb-1 filter', 'mb-0.5 sm:mb-1 filter');

// 5. MacBook mockup mobile optimizations
// Hide Search and Wifi on extra small screens to avoid overflow
code = code.replace(
  '<svg width="16" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm opacity-95">',
  '<svg width="16" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm opacity-95 hidden sm:block">'
);
code = code.replace(
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm opacity-95">',
  '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm opacity-95 hidden sm:block">'
);
// Adjust padding/gap on macbook bar for mobile
code = code.replace('gap-3.5 pr-2', 'gap-2 sm:gap-3.5 pr-1 sm:pr-2');
code = code.replace('gap-3', 'gap-1.5 sm:gap-3');
code = code.replace('pl-1', 'pl-0 sm:pl-1');

// 6. Fix gap in feature sections for mobile
code = code.replace(/gap-12/g, 'gap-8 md:gap-12');
code = code.replace(/gap-8/g, 'gap-6 md:gap-8');
code = code.replace(/p-8/g, 'p-6 md:p-8');

fs.writeFileSync('src/App.tsx', code);
console.log("Mobile optimizations applied.");
