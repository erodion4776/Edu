import React, { useState } from "react";
import { 
  User, 
  School as SchoolIcon, 
  ArrowLeft, 
  CheckCircle2, 
  Mail, 
  MapPin, 
  GraduationCap, 
  Phone,
  ShieldCheck,
  Building2,
  Rocket,
  ArrowRight
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface RegistrationProps {
  onBack: () => void;
  onSuccess: () => void;
}

type RegType = 'student' | 'school';

export default function Registration({ onBack, onSuccess }: RegistrationProps) {
  const [type, setType] = useState<RegType>('student');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onSuccess();
      }, 3000);
    }, 2000);
  };

  if (submitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center space-y-8"
      >
        <div className="w-24 h-24 bg-emerald-500 rounded-[2rem] flex items-center justify-center text-white shadow-2xl shadow-emerald-500/40 rotate-12">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <div className="space-y-4">
          <h2 className="text-5xl font-black text-white tracking-tighter">Registration Received!</h2>
          <p className="text-slate-400 max-w-sm mx-auto font-medium">Welcome to the Arena. Our team will verify your credentials and send a confirmation email within 24 hours.</p>
        </div>
        <div className="flex items-center gap-2 px-6 py-3 glass rounded-2xl border-white/5 animate-pulse">
           <Rocket className="w-5 h-5 text-primary" />
           <span className="text-[10px] font-black uppercase tracking-widest text-primary">Preparing your Dashboard...</span>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 pb-20">
      <div className="space-y-4">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-slate-500 hover:text-primary font-black uppercase tracking-widest text-xs transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </button>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
           <div className="space-y-2">
             <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">Join the Arena</h2>
             <p className="text-slate-400 font-medium text-lg">Choose your registration path and become a part of the future of education.</p>
           </div>
        </div>
      </div>

      {/* Type Switcher */}
      <div className="glass p-2 rounded-[2rem] border-white/5 flex gap-2 w-fit mx-auto md:mx-0 shadow-2xl">
         <button 
           onClick={() => setType('student')}
           className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all ${type === 'student' ? 'bg-primary text-white shadow-lg shadow-primary/40' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
         >
           <User className="w-5 h-5" />
           Individual Student
         </button>
         <button 
           onClick={() => setType('school')}
           className={`flex items-center gap-3 px-8 py-4 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all ${type === 'school' ? 'bg-primary text-white shadow-lg shadow-primary/40' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
         >
           <SchoolIcon className="w-5 h-5" />
           School Institution
         </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
        {/* Registration Form */}
        <motion.form 
          key={type}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onSubmit={handleSubmit}
          className="lg:col-span-2 glass-card p-10 md:p-14 rounded-[3.5rem] border-white/5 shadow-2xl space-y-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {type === 'student' ? (
              <>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Full Name</label>
                  <div className="relative group">
                    <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-primary transition-colors" />
                    <input 
                      required 
                      type="text" 
                      placeholder="John Doe" 
                      className="w-full glass border border-white/5 rounded-[1.2rem] pl-16 pr-6 py-5 text-white focus:outline-none focus:border-primary/50 transition-all font-medium" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">School Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-primary transition-colors" />
                    <input 
                      required 
                      type="email" 
                      placeholder="john@school.edu" 
                      className="w-full glass border border-white/5 rounded-[1.2rem] pl-16 pr-6 py-5 text-white focus:outline-none focus:border-primary/50 transition-all font-medium" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Current Grade</label>
                  <div className="relative group">
                    <GraduationCap className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-primary transition-colors" />
                    <select className="w-full glass border border-white/5 rounded-[1.2rem] pl-16 pr-6 py-5 text-white focus:outline-none focus:border-primary/50 transition-all font-medium appearance-none">
                       <option className="bg-slate-900">Senior Secondary 1 (SS1)</option>
                       <option className="bg-slate-900">Senior Secondary 2 (SS2)</option>
                       <option className="bg-slate-900">Senior Secondary 3 (SS3)</option>
                    </select>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Phone Number</label>
                  <div className="relative group">
                    <Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-primary transition-colors" />
                    <input 
                      required 
                      type="tel" 
                      placeholder="+234 800 000 0000" 
                      className="w-full glass border border-white/5 rounded-[1.2rem] pl-16 pr-6 py-5 text-white focus:outline-none focus:border-primary/50 transition-all font-medium" 
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">School Identity Name</label>
                  <div className="relative group">
                    <Building2 className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-primary transition-colors" />
                    <input 
                      required 
                      type="text" 
                      placeholder="Edu Arena International College" 
                      className="w-full glass border border-white/5 rounded-[1.2rem] pl-16 pr-6 py-5 text-white focus:outline-none focus:border-primary/50 transition-all font-medium" 
                    />
                  </div>
                </div>
                <div className="space-y-3 md:col-span-2">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Location / Address</label>
                  <div className="relative group">
                    <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-primary transition-colors" />
                    <input 
                      required 
                      type="text" 
                      placeholder="Lekki Phase 1, Lagos, Nigeria" 
                      className="w-full glass border border-white/5 rounded-[1.2rem] pl-16 pr-6 py-5 text-white focus:outline-none focus:border-primary/50 transition-all font-medium" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Admin Email</label>
                  <div className="relative group">
                    <Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-primary transition-colors" />
                    <input 
                      required 
                      type="email" 
                      placeholder="admin@eduarena.edu" 
                      className="w-full glass border border-white/5 rounded-[1.2rem] pl-16 pr-6 py-5 text-white focus:outline-none focus:border-primary/50 transition-all font-medium" 
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Estimated Students</label>
                  <div className="relative group">
                    <ShieldCheck className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-600 group-focus-within:text-primary transition-colors" />
                    <input 
                      required 
                      type="number" 
                      placeholder="500" 
                      className="w-full glass border border-white/5 rounded-[1.2rem] pl-16 pr-6 py-5 text-white focus:outline-none focus:border-primary/50 transition-all font-medium" 
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="pt-8 border-t border-white/5">
             <button 
               type="submit"
               disabled={isSubmitting}
               className="w-full py-6 bg-primary text-white rounded-2xl font-black text-lg transition-all hover:scale-[1.02] shadow-2xl shadow-primary/30 flex items-center justify-center gap-3 disabled:opacity-50 disabled:scale-100"
             >
               {isSubmitting ? (
                 <>
                   <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin" />
                   Processing Application...
                 </>
               ) : (
                 <>
                   Submit Registration Inquiry
                   <ArrowRight className="w-5 h-5" />
                 </>
               )}
             </button>
          </div>
          <p className="text-center text-[10px] font-black text-slate-600 uppercase tracking-widest">By registering, you agree to our Terms of Service and Privacy Policy</p>
        </motion.form>

        {/* Benefits Sidebar */}
        <div className="space-y-8">
           <div className="glass-card p-10 rounded-[3rem] border-white/5 shadow-2xl space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-3xl -mr-16 -mt-16" />
             <h4 className="text-xl font-black text-white tracking-tight relative z-10">Why join the Arena?</h4>
             <ul className="space-y-6 relative z-10">
               {[
                 { title: "National Ranking", desc: "See where you stand against thousands of peers." },
                 { title: "Smart Feedback", desc: "Get AI-driven analysis of your weak areas." },
                 { title: "Real Rewards", desc: "Win scholarships and high-end tech equipment." },
                 { title: "24/7 Access", desc: "Practice anytime on any device with offline sync." },
               ].map((benefit, i) => (
                 <li key={i} className="flex gap-4 group">
                    <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all shrink-0">
                       <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <div>
                      <h5 className="font-black text-white text-sm uppercase tracking-widest">{benefit.title}</h5>
                      <p className="text-xs text-slate-500 font-medium leading-relaxed mt-1">{benefit.desc}</p>
                    </div>
                 </li>
               ))}
             </ul>
           </div>

           <div className="glass-card p-10 rounded-[3rem] border-primary/20 bg-primary/5 shadow-2xl shadow-primary/10 space-y-6">
              <h4 className="text-lg font-black text-white tracking-tight">Need verification?</h4>
              <p className="text-xs text-primary/70 font-medium leading-relaxed italic">Valid school identification is required for School Institutional accounts. This ensures the integrity of our national leaderboards.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
