import React, { useState, useEffect } from "react";
import { 
  BookOpen, 
  MessageSquare, 
  Trophy, 
  FileText, 
  ArrowRight, 
  Zap, 
  Users, 
  ShieldCheck,
  GraduationCap
} from "lucide-react";
import { motion } from "motion/react";

interface LandingPageProps {
  onStartQuiz: () => void;
  onOpenChat: () => void;
  onOpenSyllabus: () => void;
  onOpenChallenges: () => void;
  onOpenRegistration: () => void;
}

export default function LandingPage({ 
  onStartQuiz, 
  onOpenChat, 
  onOpenSyllabus, 
  onOpenChallenges,
  onOpenRegistration
}: LandingPageProps) {
  const [typedText, setTypedText] = useState("");
  const fullText = "Master Your Exams with Edu Arena";
  
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(fullText.slice(0, index));
      index++;
      if (index > fullText.length) clearInterval(interval);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-32 pb-20">
      {/* Hero Section */}
      <section className="relative pt-12">
        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 space-y-8 text-center md:text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass text-primary text-xs font-bold uppercase tracking-widest">
              <Zap className="w-3 h-3" />
              Empowering Students for Success
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.9]">
              {typedText}<span className="text-primary animate-pulse">_</span>
            </h1>
            <p className="text-xl text-slate-400 leading-relaxed max-w-xl font-medium">
              The ultimate platform for <span className="text-white">JAMB, WAEC, and NECO</span> preparation. 
              Get AI-powered tutorials, practice thousands of past questions, 
              and compete in inter-school challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 pt-4 justify-center md:justify-start">
              <button 
                onClick={onStartQuiz}
                className="px-10 py-5 bg-primary text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:scale-105 transition-all shadow-2xl shadow-primary/40 group"
              >
                Start Practicing
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
              <button 
                onClick={onOpenChat}
                className="px-10 py-5 glass text-white rounded-2xl font-black flex items-center justify-center gap-3 hover:bg-white/10 transition-all"
              >
                Talk to Tutor
                <MessageSquare className="w-6 h-6 text-primary" />
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex-1 relative"
          >
            <div className="relative z-10 glass p-2 rounded-[3.5rem] shadow-2xl overflow-hidden aspect-square max-w-lg mx-auto">
              <img 
                src="https://i.ibb.co/8LdPPM4H/Generated-Image-April-19-2026-8-19-AM.png" 
                alt="Edu Arena Hero" 
                className="w-full h-full object-cover rounded-[3rem] opacity-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent p-10 pt-24">
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-12 h-12 rounded-full border-4 border-slate-900 overflow-hidden ring-2 ring-white/10">
                        <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" />
                      </div>
                    ))}
                  </div>
                  <div className="text-white">
                    <p className="text-sm font-black tracking-tight">Join 50k+ Students</p>
                    <p className="text-[10px] opacity-60 font-bold uppercase tracking-widest">Practicing right now</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating cards */}
            <motion.div 
               animate={{ y: [0, -20, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="absolute -top-10 -right-10 glass-card p-6 rounded-3xl shadow-2xl flex items-center gap-4 z-20"
            >
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div className="text-xs">
                <p className="font-black text-white text-sm">100% Verified</p>
                <p className="text-slate-400 font-bold uppercase tracking-widest">Official Keys</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8 px-4">
        {[
          { 
            title: "Past Questions", 
            desc: "20+ years of JAMB & WAEC archives with zero errors.", 
            icon: BookOpen, 
            color: "from-blue-500 to-blue-700", 
            action: onStartQuiz 
          },
          { 
            title: "AI Tutor Chat", 
            desc: "Instant guidance, personalized study paths, and tips.", 
            icon: MessageSquare, 
            color: "from-purple-500 to-purple-700", 
            action: onOpenChat 
          },
          { 
            title: "Full Syllabus", 
            desc: "Complete breakdown of every topic you need to master.", 
            icon: FileText, 
            color: "from-amber-500 to-amber-700", 
            action: onOpenSyllabus 
          },
          { 
            title: "Arena Challenges", 
            desc: "Compete with other schools and win local glory.", 
            icon: Trophy, 
            color: "from-rose-500 to-rose-700", 
            action: onOpenChallenges 
          },
          { 
            title: "Join the Arena", 
            desc: "Register your school or join as a student today.", 
            icon: Users, 
            color: "from-emerald-500 to-emerald-700", 
            action: onOpenRegistration 
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -12, scale: 1.02 }}
            className="glass-card p-10 rounded-[2.5rem] border-white/5 shadow-2xl transition-all cursor-pointer group"
            onClick={feature.action}
          >
            <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-2xl mb-8 group-hover:rotate-6 transition-transform bg-gradient-to-br", feature.color)}>
              <feature.icon className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black text-white mb-3 tracking-tight">{feature.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed font-medium">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Stats Section */}
      <section className="relative py-24 px-4 overflow-hidden">
        <motion.div 
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="absolute inset-0 glass rounded-[4rem] -z-10" 
        />
        <div className="relative z-10 flex flex-col items-center text-center space-y-16">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">Trusted by Institutions Nationwide</h2>
            <p className="text-slate-400 max-w-2xl mx-auto italic text-xl font-medium opacity-80">\"Edu Arena has transformed how our students prepare for board exams. The challenges bring out the best in them.\""</p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 w-full max-w-5xl">
            {[
              { label: "Questions", value: "250k+" },
              { label: "Schools", value: "1,200+" },
              { label: "Success Rate", value: "92%" },
              { label: "Live Users", value: "8.4k" },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                className="space-y-3"
              >
                <p className="text-4xl md:text-6xl font-black text-primary tracking-tighter">{stat.value}</p>
                <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="text-center space-y-12 py-24 px-4 glass rounded-[4rem] border-white/5 active:scale-[0.99] transition-transform">
        <div className="bg-primary/20 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto text-primary shadow-2xl">
          <GraduationCap className="w-12 h-12" />
        </div>
        <div className="space-y-6">
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Ready to ace your exams?</h2>
          <p className="text-slate-400 max-w-lg mx-auto text-lg font-medium">Join thousands of students currently winning on the Arena.</p>
        </div>
        <button 
          onClick={onStartQuiz}
          className="px-14 py-6 bg-primary text-white rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl shadow-primary/40 block mx-auto"
        >
          Get Started For Free
        </button>
      </section>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
