import React from "react";
import { 
  Trophy, 
  Users, 
  Timer, 
  ArrowLeft,
  Flame,
  Star,
  Zap,
  Gamepad2,
  ChevronRight
} from "lucide-react";
import { motion } from "motion/react";

interface ChallengesProps {
  onBack: () => void;
}

export default function Challenges({ onBack }: ChallengesProps) {
  return (
    <div className="space-y-16 pb-20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-slate-400 hover:text-primary font-bold text-sm transition-colors mb-2 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <div className="text-4xl md:text-5xl font-black text-white tracking-tight flex items-center gap-4">
            Inter-School Arena
            <div className="bg-rose-500/10 p-2 rounded-2xl">
               <Flame className="w-8 h-8 text-rose-500 fill-rose-500/20" />
            </div>
          </div>
          <p className="text-slate-400 font-medium max-w-xl">Represent your school, win live duels, and climb the national leaderboard.</p>
        </div>
        <div className="flex items-center gap-4 glass-card p-5 rounded-3xl border-white/5 shadow-2xl">
           <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-inner">
             <Trophy className="w-7 h-7" />
           </div>
           <div>
             <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-1">Global Rank</p>
             <p className="text-2xl font-black text-white tracking-tighter">#2,401</p>
           </div>
        </div>
      </div>

      {/* Featured Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-indigo-900 rounded-[3rem] p-12 text-white shadow-2xl shadow-indigo-900/40 group cursor-pointer"
        >
          <div className="relative z-10 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-[10px] font-black uppercase tracking-widest border border-white/10">
              <Gamepad2 className="w-3.5 h-3.5" />
              Live Tournament
            </div>
            <div className="space-y-3">
              <h3 className="text-4xl font-black tracking-tight leading-tight">Weekly Biology Duel</h3>
              <p className="text-indigo-100 opacity-80 font-medium">Join 1,200+ students from 50 schools in this week's main event.</p>
            </div>
            <div className="flex items-center gap-8 pt-4">
               <div className="flex items-center gap-2.5">
                 <Timer className="w-5 h-5 text-indigo-300" />
                 <span className="text-sm font-black tabular-nums tracking-wide">Starts in 02:45:12</span>
               </div>
               <div className="flex items-center gap-2.5">
                 <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                 <span className="text-sm font-black uppercase tracking-widest">500 XP Points</span>
               </div>
            </div>
            <button className="w-full py-5 bg-white text-indigo-900 rounded-[1.5rem] font-black transition-all hover:scale-[1.02] shadow-2xl shadow-indigo-950 group-hover:bg-indigo-50">
              Register Team
            </button>
          </div>
          <Zap className="absolute -bottom-10 -right-10 w-80 h-80 text-white/5 rotate-12" />
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden glass rounded-[3rem] p-12 border-white/5 shadow-2xl group cursor-pointer"
        >
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[10px] font-black uppercase tracking-widest text-primary border-primary/20">
              <Users className="w-3.5 h-3.5" />
              Quick Match
            </div>
            <div className="space-y-3">
              <h3 className="text-4xl font-black tracking-tight text-white leading-tight">1v1 Instant Duel</h3>
              <p className="text-slate-400 font-medium">Challenge a random student in any subject and win regional glory.</p>
            </div>
            <div className="flex -space-x-4 pt-4">
              {[1, 2, 3, 4, 5].map(i => (
                <div key={i} className="w-14 h-14 rounded-full border-4 border-slate-900 overflow-hidden bg-slate-800 ring-2 ring-white/5">
                  <img src={`https://i.pravatar.cc/100?u=school-${i}`} alt="user" />
                </div>
              ))}
              <div className="w-14 h-14 rounded-full border-4 border-slate-900 bg-slate-800 flex items-center justify-center text-slate-400 text-xs font-black ring-2 ring-white/5">
                +42
              </div>
            </div>
            <button className="w-full py-5 glass text-white rounded-[1.5rem] font-black transition-all hover:scale-[1.02] shadow-2xl hover:bg-white/10">
              Find Opponent
            </button>
          </div>
        </motion.div>
      </div>

      {/* Leaderboard Section */}
      <section className="glass rounded-[3rem] border-white/5 shadow-2xl overflow-hidden">
        <div className="p-10 border-b border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <h3 className="text-2xl font-black text-white tracking-tight">National School Leaderboard</h3>
          <button className="text-primary font-black text-xs uppercase tracking-widest hover:underline decoration-2 underline-offset-8">View All Schools</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5">
                <th className="px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-500">Rank</th>
                <th className="px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-500">School Name</th>
                <th className="px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-500 text-center">XP Points</th>
                <th className="px-10 py-5 text-xs font-black uppercase tracking-[0.2em] text-slate-500 text-right">Win Rate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { rank: 1, name: "Kings' College Lagos", xp: "1.2M", win: "89%" },
                { rank: 2, name: "Loyola Jesuit College", xp: "980k", win: "92%" },
                { rank: 3, name: "Grange School", xp: "850k", win: "84%" },
                { rank: 4, name: "Chrisland Schools", xp: "720k", win: "78%" },
                { rank: 5, name: "Lekki British School", xp: "690k", win: "81%" },
              ].map((school, i) => (
                <tr key={i} className="group hover:bg-white/5 transition-colors cursor-pointer">
                  <td className="px-10 py-8">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-black ${school.rank === 1 ? 'bg-amber-400 text-amber-950 rotate-3' : school.rank === 2 ? 'bg-slate-300 text-slate-900 border-2 border-slate-400' : school.rank === 3 ? 'bg-orange-300 text-orange-950 border-2 border-orange-400' : 'text-slate-500'}`}>
                      {school.rank}
                    </div>
                  </td>
                  <td className="px-10 py-8 font-black text-white text-lg tracking-tight group-hover:text-primary transition-colors">{school.name}</td>
                  <td className="px-10 py-8 font-black text-primary text-center text-lg">{school.xp}</td>
                  <td className="px-10 py-8 text-right">
                    <span className="font-black text-emerald-400 bg-emerald-500/10 px-4 py-2 rounded-xl text-xs uppercase tracking-widest border border-emerald-500/20">
                      {school.win} Wins
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Rewards Grid */}
      <section className="glass p-16 rounded-[4rem] border-white/5 space-y-16">
         <div className="text-center space-y-6">
           <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Unlock Epic Rewards</h2>
           <p className="text-slate-400 max-w-lg mx-auto leading-relaxed font-medium text-lg">Top players and schools win real scholarships, hardware, and official certifications.</p>
         </div>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Badges", desc: "Digital glory" },
              { label: "Scholarships", desc: "Top 1% only" },
              { label: "Certificates", desc: "Verified skill" },
              { label: "EduCoins", desc: "Store credit" },
            ].map((reward, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-[2.5rem] text-center border-white/5 shadow-2xl hover:scale-105 transition-all group"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-rose-500 to-rose-700 rounded-2xl mx-auto mb-6 flex items-center justify-center text-white font-black text-xl group-hover:rotate-6 transition-transform shadow-2xl shadow-rose-900/40">
                   {i + 1}
                </div>
                <h4 className="font-black text-white text-lg tracking-tight mb-2">{reward.label}</h4>
                <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] leading-tight">{reward.desc}</p>
              </motion.div>
            ))}
         </div>
      </section>
    </div>
  );
}
