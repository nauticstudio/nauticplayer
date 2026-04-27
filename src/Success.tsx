import { motion } from 'motion/react';
import { CheckCircle2, FileText, House } from 'lucide-react';

const Success = () => {
  return (
    <div className="min-h-screen bg-[#0d0d0d] flex items-center justify-center p-4 font-sans text-white antialiased">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#ff6213]/5 blur-[120px] rounded-full"></div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg bg-white/[0.03] border border-white/[0.08] backdrop-blur-3xl rounded-[2.5rem] p-10 md:p-14 text-center shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)]"
      >
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          className="w-20 h-20 bg-[#ff6213] rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_40px_rgba(255,98,19,0.3)]"
        >
          <CheckCircle2 className="w-10 h-10 text-white stroke-[2.5]" />
        </motion.div>

        <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-balance">Thank you for your purchase!</h1>
        <p className="text-gray-400 text-lg mb-10 font-light leading-relaxed">
          Your <span className="text-white font-medium">License Key</span> has been sent automatically to your email address. You can now activate NauticPlayer.
        </p>

        <div className="space-y-4">
          <a 
            href="/Read_Me.pdf" 
            download
            className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[16px] font-medium transition-[background-color,transform] duration-300 hover:-translate-y-0.5"
          >
            <FileText className="w-5 h-5 text-[#ff6213]" />
            Installation Manual (PDF)
          </a>

          <a 
            href="/"
            className="flex items-center justify-center gap-2 w-full py-4 text-gray-500 hover:text-white transition-colors duration-300 text-[15px]"
            onClick={(e) => {
              if (window.location.pathname === '/success') {
                e.preventDefault();
                window.location.href = '/';
              }
            }}
          >
            <House className="w-4 h-4" />
            Back to Home
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;
