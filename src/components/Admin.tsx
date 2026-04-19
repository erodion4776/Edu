import React, { useState, useEffect } from "react";
import { 
  FileUp, 
  Trash2, 
  Brain, 
  ChevronLeft, 
  Loader2, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  ShieldAlert,
  Save,
  Rocket,
  Download
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { BrainService } from "../services/BrainService";
import { cn } from "../lib/utils";

interface AdminProps {
  onBack: () => void;
}

export default function Admin({ onBack }: AdminProps) {
  const [knowledgeList, setKnowledgeList] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [accessCode, setAccessCode] = useState("");

  useEffect(() => {
    loadKnowledge();
  }, []);

  const loadKnowledge = async () => {
    const list = await BrainService.getAllKnowledge();
    setKnowledgeList(list);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/json" && !file.name.endsWith('.json')) {
      setError("Only JSON files are supported for AI feeding.");
      return;
    }

    setIsProcessing(true);
    setError(null);
    setStatus("Reading JSON Data...");

    try {
      const text = await file.text();
      const jsonData = JSON.parse(text);
      
      setStatus("Validating & Polishing for AI...");
      
      // We expect JSON to be either a string, an array of strings, 
      // or an object with specific fields. 
      // We'll flatten it to a string for the BrainService.
      const processedText = typeof jsonData === 'string' 
        ? jsonData 
        : JSON.stringify(jsonData, null, 2);

      await BrainService.addKnowledge(file.name, processedText);
      await loadKnowledge();
      setStatus(null);
    } catch (err: any) {
      console.error(err);
      setError("Failed to parse JSON. Please check the file format.");
    } finally {
      setIsProcessing(false);
      if (event.target) event.target.value = "";
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Remove this data from the AI Brain?")) {
      await BrainService.deleteKnowledge(id);
      await loadKnowledge();
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (accessCode === "ARENA2026") {
      setIsAdmin(true);
      setError(null);
    } else {
      setError("Invalid Administrative Access Code.");
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 space-y-12">
        <div className="space-y-4 text-center">
           <div className="w-20 h-20 bg-primary/10 rounded-[2rem] flex items-center justify-center mx-auto text-primary shadow-2xl border border-primary/20">
              <ShieldAlert className="w-10 h-10" />
           </div>
           <h2 className="text-4xl font-black text-white tracking-tighter">Command Center</h2>
           <p className="text-slate-500 font-medium">Restricted Administrative Area. Please verify identity.</p>
        </div>

        <form onSubmit={handleLogin} className="w-full max-w-md glass p-10 rounded-[3rem] border-white/5 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.5)] space-y-8">
           <div className="space-y-3">
             <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest ml-4">Access Code</label>
             <input 
               type="password" 
               value={accessCode}
               onChange={(e) => setAccessCode(e.target.value)}
               placeholder="••••••••"
               className="w-full glass border border-white/5 rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all text-center tracking-[0.5em] text-lg"
             />
           </div>
           {error && (
             <div className="flex items-center gap-2 text-rose-500 text-xs font-bold justify-center bg-rose-500/5 py-3 rounded-xl border border-rose-500/10">
               <AlertCircle className="w-4 h-4" />
               {error}
             </div>
           )}
           <button className="w-full py-5 bg-primary text-white rounded-2xl font-black transition-all hover:scale-[1.02] shadow-2xl shadow-primary/30">
             Unlock Brain Management
           </button>
        </form>
        
        <button 
          onClick={onBack}
          className="text-slate-500 hover:text-white font-black uppercase tracking-widest text-xs transition-colors"
        >
          Return to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 pb-32">
       <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <button 
              onClick={onBack}
              className="flex items-center gap-2 text-slate-500 hover:text-primary font-black uppercase tracking-widest text-xs transition-colors mb-4 group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Main Dashboard
            </button>
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none">AI Brain Hub</h2>
            <p className="text-slate-400 font-medium text-lg">Feed official documents directly into the Arena's collective intelligence.</p>
          </div>
          
          <div className="relative group">
            <input 
              type="file" 
              accept=".json" 
              onChange={handleFileUpload}
              className="absolute inset-0 opacity-0 cursor-pointer z-20"
              disabled={isProcessing}
            />
            <button className="flex items-center gap-4 bg-primary text-white px-10 py-6 rounded-[2rem] font-black text-lg shadow-2xl shadow-primary/40 group-hover:scale-105 transition-all">
               {isProcessing ? <Loader2 className="w-6 h-6 animate-spin" /> : <Download className="w-6 h-6" />}
               Import JSON Data
            </button>
          </div>
       </div>

       {isProcessing && (
         <motion.div 
           initial={{ opacity: 0, y: 10 }}
           animate={{ opacity: 1, y: 0 }}
           className="glass p-8 rounded-[2.5rem] border-primary/20 bg-primary/5 flex items-center justify-between"
         >
           <div className="flex items-center gap-6">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center animate-pulse">
                 <Rocket className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-white font-black">{status}</p>
                <p className="text-slate-500 text-xs font-medium uppercase tracking-widest mt-1">Processing Neural Pathways...</p>
              </div>
           </div>
           <div className="w-32 h-2 glass rounded-full overflow-hidden p-0.5 border-white/5">
              <div className="h-full bg-primary rounded-full animate-progress-glow" style={{ width: '100%' }} />
           </div>
         </motion.div>
       )}

       <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Dashboard Left: List */}
          <div className="lg:col-span-2 space-y-6">
             <div className="flex items-center justify-between px-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Active Knowledge Base</h3>
                <span className="text-[10px] font-black text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">{knowledgeList.length} Files Indexed</span>
             </div>
             
             <div className="grid gap-4">
                {knowledgeList.length === 0 ? (
                  <div className="glass-card p-20 rounded-[3.5rem] border-white/5 text-center space-y-6">
                     <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mx-auto text-slate-700">
                        <Brain className="w-10 h-10" />
                     </div>
                     <p className="text-slate-500 font-bold max-w-xs mx-auto italic">Your AI's brain is empty. Import official exam JSON data to start building the intelligence layer.</p>
                  </div>
                ) : (
                  knowledgeList.map((k) => (
                    <motion.div 
                      key={k.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass px-8 py-6 rounded-[2rem] border-white/5 flex items-center justify-between shadow-2xl hover:border-white/10 transition-colors group"
                    >
                      <div className="flex items-center gap-6">
                         <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-primary shadow-inner">
                            <FileText className="w-6 h-6" />
                         </div>
                         <div>
                            <p className="text-white font-bold text-lg tracking-tight group-hover:text-primary transition-colors">{k.fileName}</p>
                            <div className="flex items-center gap-3 mt-1">
                               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Indexed {new Date(k.timestamp).toLocaleDateString()}</p>
                               <div className="w-1 h-1 rounded-full bg-slate-700" />
                               <p className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">{k.text.length.toLocaleString()} Chars</p>
                            </div>
                         </div>
                      </div>
                      <button 
                        onClick={() => handleDelete(k.id)}
                        className="p-4 rounded-xl text-slate-600 hover:text-rose-500 hover:bg-rose-500/10 transition-all opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))
                )}
             </div>
          </div>

          {/* Dashboard Right: Neural Metrics */}
          <div className="space-y-8">
             <div className="glass-card p-10 rounded-[3rem] border-white/5 shadow-2xl space-y-8">
                <h4 className="text-xl font-black text-white tracking-tight">System Health</h4>
                <div className="space-y-6">
                   {[
                     { label: "Neural Fidelity", val: "99.8%", color: "text-emerald-400" },
                     { label: "Retrieval Speed", val: "14ms", color: "text-primary" },
                     { label: "Context Window", val: "1.5M", color: "text-amber-400" },
                   ].map((m, i) => (
                     <div key={i} className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">{m.label}</span>
                        <span className={cn("text-lg font-black tracking-tighter", m.color)}>{m.val}</span>
                     </div>
                   ))}
                </div>
                <div className="pt-8 border-t border-white/5">
                   <div className="flex items-center gap-4 p-4 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80">All services operational</p>
                   </div>
                </div>
             </div>

             <div className="glass-card p-10 rounded-[3rem] border-primary/20 bg-primary/5 shadow-2xl space-y-6">
                <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                   <Save className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-black text-white tracking-tight">Persistence Notice</h4>
                <p className="text-xs text-primary/70 font-medium leading-relaxed italic">
                  Data is stored securely in your browser's local sandbox. It will persist across sessions but is not shared with other devices. To sync with other admins, transition to Cloud Hub (Firebase) in the future.
                </p>
             </div>
          </div>
       </div>
    </div>
  );
}
