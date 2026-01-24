import React from 'react';
import { motion } from 'framer-motion';

const updates = [
  { id: 1, icon: "🔥", label: "ENROLLMENT", text: "Learn the course with Poizdedge.'", status: "Just now", date: "JAN 21", clock: "18:21" },
  // { id: 2, icon: "⚡", label: "FLASH SALE", text: "60% OFF expires in 02:45:12", status: "Limited", date: "JAN 21", clock: "18:15" },
  // { id: 3, icon: "🏆", label: "CERTIFIED", text: "1,200 students graduated this month", status: "Milestone", date: "JAN 20", clock: "14:30" },
  // { id: 4, icon: "💎", label: "NEW COURSE", text: "Advanced React 19 is now available", status: "New", date: "JAN 19", clock: "09:00" },
];

const BoldProMarquee = () => {
  const duplicatedUpdates = [...updates, ...updates, ...updates];
  const CARD_HEIGHT = "80px"; // Preserving the height you liked

  return (
    <div 
      style={{ height: CARD_HEIGHT }}
      className="relative w-full bg-slate-950 overflow-hidden flex items-center shadow-2xl border-y border-slate-900"
    >
      
      {/* 1. Static "LIVE" Badge */}
      <div className="z-30 relative flex items-center gap-3 px-8 h-full bg-blue-600 skew-x-[-15deg] -ml-4 shadow-[20px_0_40px_rgba(37,99,235,0.4)]">
        <div className="skew-x-[15deg] flex items-center gap-3">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-white"></span>
          </span>
          <span className="text-sm font-black uppercase tracking-[0.3em] text-white">Live</span>
        </div>
      </div>

      {/* 2. Horizontal Scrolling Track */}
      <div className="relative flex items-center h-full overflow-hidden">
        <motion.div
          className="flex items-center whitespace-nowrap h-full"
          animate={{ x: ["0%", "-33.33%"] }}
          transition={{
            duration: 35,
            ease: "linear",
            repeat: Infinity,
          }}
          whileHover={{ animationPlayState: "paused" }}
        >
          {duplicatedUpdates.map((item, index) => (
            <div
              key={index}
              className="group flex items-center h-full gap-12 px-16 border-r border-slate-800 hover:bg-slate-900/40 transition-all cursor-pointer"
            >
              {/* DATE & TIME SECTION (Increased Size) */}
              <div className="flex items-center gap-6">
                <div className="flex flex-col items-start justify-center">
                  {/* BIG CLOCK */}
                  <span className="text-2xl font-black text-white font-mono leading-none tracking-tighter group-hover:text-blue-400 transition-colors">
                    {item.clock}
                  </span>
                  {/* BIG DATE */}
                  <span className="text-[12px] font-black text-slate-500 uppercase tracking-[0.2em] mt-1">
                    {item.date}
                  </span>
                </div>

                {/* STATUS PILL */}
                <div className="bg-blue-600/10 border border-blue-500/20 px-3 py-1 rounded-md">
                   <span className="text-[11px] font-black text-blue-500 uppercase">
                    {item.status}
                  </span>
                </div>
              </div>

              {/* CONTENT SECTION */}
              <div className="flex items-center gap-5">
                <span className="text-3xl filter drop-shadow-[0_0_12px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
                  {item.icon}
                </span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-black text-blue-600 tracking-widest uppercase mb-0.5">
                    {item.label}
                  </span>
                  <span className="text-lg font-bold text-slate-100 group-hover:text-white transition-colors">
                    {item.text}
                  </span>
                </div>
              </div>
              
              {/* SEPARATOR DOT */}
              <div className="h-2 w-2 rounded-full bg-slate-800 group-hover:bg-blue-600 transition-colors mx-4" />
            </div>
          ))}
        </motion.div>

        {/* 3. Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-slate-950 via-slate-950/20 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-slate-950 via-slate-950/20 to-transparent z-10 pointer-events-none" />
      </div>
    </div>
  );
};


export default BoldProMarquee;

